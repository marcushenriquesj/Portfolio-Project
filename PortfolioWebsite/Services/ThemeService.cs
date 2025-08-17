using MudBlazor;
using Microsoft.JSInterop;

namespace PortfolioWebsite.Services;

public class ThemeService
{
    private readonly IJSRuntime _jsRuntime;
    private bool _isDarkMode = true;

    public event Action? OnThemeChanged;

    public ThemeService(IJSRuntime jsRuntime)
    {
        _jsRuntime = jsRuntime;
        _ = LoadThemePreference();
    }

    public bool IsDarkMode => _isDarkMode;

    public MudTheme GetCurrentTheme()
    {
        return _isDarkMode ? GetDarkTheme() : GetLightTheme();
    }

    public async Task ToggleThemeAsync()
    {
        _isDarkMode = !_isDarkMode;
        await SaveThemePreferenceAsync();
        OnThemeChanged?.Invoke();
    }

    private async Task LoadThemePreference()
    {
        try
        {
            var savedTheme = await _jsRuntime.InvokeAsync<string>("localStorage.getItem", "theme");
            _isDarkMode = savedTheme == "dark";
        }
        catch
        {
            // Default to dark theme if localStorage is not available
            _isDarkMode = true;
        }
    }

    private async Task SaveThemePreferenceAsync()
    {
        try
        {
            await _jsRuntime.InvokeVoidAsync("localStorage.setItem", "theme", _isDarkMode ? "dark" : "light");
        }
        catch
        {
            // Ignore if localStorage is not available
        }
    }

    private static MudTheme GetLightTheme()
    {
        return new MudTheme()
        {
            Palette = new PaletteLight()
            {
                Primary = "#1976d2",
                Secondary = "#dc004e",
                AppbarBackground = "#1976d2",
                Background = "#f5f5f5",
                Surface = "#ffffff",
                DrawerBackground = "#ffffff",
                DrawerText = "rgba(0,0,0, 0.87)",
                Success = "#4caf50",
                Error = "#f44336",
                Warning = "#ff9800",
                Info = "#2196f3"
            }
        };
    }

    private static MudTheme GetDarkTheme()
    {
        return new MudTheme()
        {
            Palette = new PaletteDark()
            {
                Primary = "#4CAF50",
                Secondary = "#FFC107",
                AppbarBackground = "#1A1A1A",
                Background = "#1A1A1A",
                Surface = "#2D2D2D",
                DrawerBackground = "#2D2D2D",
                DrawerText = "rgba(255,255,255, 0.87)",
                Success = "#4CAF50",
                Error = "#f44336",
                Warning = "#FFC107",
                Info = "#2196f3"
            }
        };
    }
}
