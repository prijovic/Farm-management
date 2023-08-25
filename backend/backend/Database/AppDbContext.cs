using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace backend.Database;

public class AppDbContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Parcel> Parcels { get; set; }

    public DbSet<ParcelOperation> ParcelOperations { get; set; }
    
    public DbSet<Location> Locations { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>(entity =>
        {
            entity.HasMany<Parcel>(e => e.Parcels)
                .WithOne(e => e.User)
                .HasForeignKey(e => e.UserId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne<Address>(e => e.Address)
                .WithOne(e => e.User)
                .HasForeignKey<Address>()
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
        });

        builder.Entity<Parcel>(entity =>
        {
            entity.HasMany<ParcelOperation>(e => e.Operations)
                .WithOne(e => e.Parcel)
                .HasForeignKey(e => e.ParcelId)
                .IsRequired();

            entity.HasMany<Location>(e => e.Polygon)
                .WithOne(e => e.Parcel)
                .HasForeignKey(e => e.ParcelId)
                .IsRequired();
        });
    }
}