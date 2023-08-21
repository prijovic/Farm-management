using System.Text.Json;

namespace backend.Exceptions;

public static class GlobalExceptionHandler
{
    public static Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        int statusCode;
        var message = exception.Message;
        var exceptionType = exception.GetType();

        if (exceptionType == typeof(BadRequestException))
            statusCode = 400;
        else if (exceptionType == typeof(UnauthorizedException))
            statusCode = 403;
        else if (exceptionType == typeof(NotFoundException))
            statusCode = 404;
        else if (exceptionType == typeof(UserExistsException))
            statusCode = 409;
        else if (exceptionType == typeof(InvalidTokenException))
            statusCode = 498;
        else
            statusCode = 500;

        var exceptionResult = JsonSerializer.Serialize(new { error = message });
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = statusCode;

        return context.Response.WriteAsync(exceptionResult);
    }
}