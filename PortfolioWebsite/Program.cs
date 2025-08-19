using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using PortfolioWebsite;
using PortfolioWebsite.Services;
using MudBlazor.Services;

/// <summary>
/// Main entry point for the Blazor WebAssembly application.
/// </summary>
var builder = WebAssemblyHostBuilder.CreateDefault(args);

// Add root components
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

// Configure services
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddMudServices();

// Register application services
builder.Services.AddScoped<ChatService>();
builder.Services.AddScoped<PortfolioDataService>();

// Build and run the application
await builder.Build().RunAsync();
