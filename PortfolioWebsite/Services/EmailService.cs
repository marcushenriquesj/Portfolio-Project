using PortfolioWebsite.Models;
using Microsoft.JSInterop;

namespace PortfolioWebsite.Services;

/// <summary>
/// Service for handling email operations using EmailJS for client-side email sending.
/// </summary>
public class EmailService
{
    private readonly IJSRuntime _jsRuntime;
    private readonly ILogger<EmailService> _logger;

    /// <summary>
    /// Initializes a new instance of the EmailService.
    /// </summary>
    /// <param name="jsRuntime">JavaScript runtime for interop calls.</param>
    /// <param name="logger">Logger for tracking email operations.</param>
    public EmailService(IJSRuntime jsRuntime, ILogger<EmailService> logger)
    {
        _jsRuntime = jsRuntime;
        _logger = logger;
    }

    /// <summary>
    /// Sends a contact form email using EmailJS or falls back to simulation.
    /// </summary>
    /// <param name="contactInfo">The contact information from the form.</param>
    /// <returns>True if the email was sent successfully, false otherwise.</returns>
    public async Task<bool> SendContactEmailAsync(ContactInfo contactInfo)
    {
        try
        {
            _logger.LogInformation("Attempting to send email from {Email} with subject: {Subject}", 
                contactInfo.Email, contactInfo.Subject);

            // Call the JavaScript email sending function
            var result = await _jsRuntime.InvokeAsync<bool>("sendContactEmail", contactInfo);
            
            if (result)
            {
                _logger.LogInformation("Email sent successfully from {Email}", contactInfo.Email);
            }
            else
            {
                _logger.LogWarning("Email sending failed for {Email}", contactInfo.Email);
            }
            
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send contact email from {Email}", contactInfo.Email);
            return false;
        }
    }
}
