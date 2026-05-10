using System.Net;
using System.Text.Json;

namespace LibraryManagement.API.Middleware;

public class ErrorHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ErrorHandlingMiddleware> _logger;

    public ErrorHandlingMiddleware(RequestDelegate next, ILogger<ErrorHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception error)
        {
            var res = context.Response;
            res.ContentType = "application/json";
            
            switch(error)
            {
                case UnauthorizedAccessException:
                    res.StatusCode = (int)HttpStatusCode.Unauthorized;
                    break;
                case KeyNotFoundException:
                    res.StatusCode = (int)HttpStatusCode.NotFound;
                    break;
                default:
                    res.StatusCode = (int)HttpStatusCode.InternalServerError;
                    _logger.LogError(error, "Something went wrong processing the request");
                    break;
            }

            var result = JsonSerializer.Serialize(new { 
                error = error?.Message ?? "Internal Server Error"
            });
            await res.WriteAsync(result);
        }
    }
}
