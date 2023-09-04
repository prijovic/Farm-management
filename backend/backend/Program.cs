using System.Text;
using backend.Configurations;
using backend.Database;
using backend.Models;
using backend.Services.auth;
using backend.Services.Cache;
using backend.Services.Parcel;
using backend.Services.ParcelOperation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using RefreshToken = backend.Services.auth.RefreshToken;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddEntityFrameworkNpgsql().AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});

var tokenValidationParameters = new TokenValidationParameters
{
    ValidateIssuerSigningKey = true,
    ValidateLifetime = true,
    ValidateIssuer = false, // DEVELOPMENT
    ValidateAudience = false, // DEVELOPMENT
    RequireExpirationTime = true,
    IssuerSigningKey =
        new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JWTConfig:Secret").Value))
};

builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.SaveToken = true;
        options.TokenValidationParameters = tokenValidationParameters;
    });

builder.Services.AddIdentity<User, IdentityRole<Guid>>(options =>
    {
        options.SignIn.RequireConfirmedAccount = false;
        options.SignIn.RequireConfirmedEmail = false;
        options.User.RequireUniqueEmail = true;
        options.Password.RequiredLength = 12;
        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.MaxFailedAccessAttempts = 3;
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddSingleton(tokenValidationParameters);
builder.Services.AddSingleton(new CacheConnectionString
{
    Value = builder.Configuration.GetConnectionString("CacheConnection")
});

builder.Services.AddScoped<ICacheService, CacheService>();

builder.Services.AddScoped<SignUpUser>();
builder.Services.AddScoped<LoginUser>();
builder.Services.AddScoped<GenerateJwt>();
builder.Services.AddScoped<GenerateRefreshToken>();
builder.Services.AddScoped<RefreshToken>();
builder.Services.AddScoped<GenerateAuthenticationTokens>();
builder.Services.AddScoped<GetLoggedInUser>();
builder.Services.AddScoped<LogoutUser>();

builder.Services.AddScoped<GetAllUserParcels>();
builder.Services.AddScoped<CreateParcel>();
builder.Services.AddScoped<UpdateParcel>();
builder.Services.AddScoped<DeleteParcel>();
builder.Services.AddScoped<GetAllParcelOperations>();
builder.Services.AddScoped<CreateParcelOperation>();
builder.Services.AddScoped<UpdateParcelOperation>();
builder.Services.AddScoped<DeleteParcelOperation>();
builder.Services.AddScoped<UpdateParcelPolygon>();
builder.Services.AddScoped<UpdateParcelOperationPosition>();
builder.Services.AddScoped<GetParcelById>();
builder.Services.AddScoped<GetParcelOperationById>();
builder.Services.AddScoped<GetNextParcelOperationIndex>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(x =>
    x.WithOrigins("http://localhost:3000")
        .AllowAnyMethod()
        .AllowAnyHeader());

// app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.AddGlobalErrorHandler();

app.MapControllers();

app.Services.CreateScope().ServiceProvider.GetRequiredService<AppDbContext>().Database.Migrate();

app.Run();