using backend.Exceptions;

namespace backend.Configurations;

public static class ApplicationExtensions
{
    public static void AddGlobalErrorHandler(this IApplicationBuilder app)
    {
        app.UseExceptionHandler("/error");
        app.Use(async (context, next) =>
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                await GlobalExceptionHandler.HandleExceptionAsync(context, e);
            }
        });
    }
}