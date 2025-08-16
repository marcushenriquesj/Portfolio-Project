# Modern Portfolio Website

A modern, responsive portfolio website built with **Blazor WebAssembly** and **MudBlazor** for Material Design. This project showcases a developer's skills, projects, and experience with an interactive AI chat feature.

## ✨ Features

- **🎨 Modern UI/UX**: Material Design with MudBlazor components
- **📱 Responsive Design**: Mobile-first approach with responsive layouts
- **🌙 Dark/Light Theme**: Toggle between dark and light themes
- **⚡ Smooth Animations**: CSS animations and smooth page transitions
- **🤖 AI Chat Integration**: Interactive chat feature with AI responses
- **📊 Interactive Skills**: Progress bars and skill visualization
- **🎯 Project Showcase**: Interactive project cards with live demos
- **📈 Experience Timeline**: Visual timeline of work experience
- **📧 Contact Form**: Validated contact form with error handling
- **♿ Accessibility**: WCAG compliant with proper ARIA labels
- **🚀 Easy Deployment**: Ready for GitHub Pages and Azure Static Web Apps

## 🛠️ Technology Stack

- **Frontend**: Blazor WebAssembly
- **UI Framework**: MudBlazor (Material Design)
- **Styling**: CSS3 with custom animations
- **JavaScript**: Vanilla JS for interactions
- **Deployment**: GitHub Pages / Azure Static Web Apps
- **AI Integration**: Mock AI service (easily replaceable with real API)

## 🚀 Quick Start

### Prerequisites

- .NET 9.0 SDK or later
- Visual Studio 2022 or VS Code
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run the application**
   ```bash
   dotnet run
   ```

4. **Open your browser**
   Navigate to `https://localhost:5001` or `http://localhost:5000`

## 📁 Project Structure

```
PortfolioWebsite/
├── Components/                 # Blazor components
│   ├── HeroSection.razor      # Hero section with animations
│   ├── AboutSection.razor     # About me section
│   ├── SkillsSection.razor    # Skills with progress bars
│   ├── ProjectsSection.razor  # Project showcase
│   ├── ExperienceSection.razor # Experience timeline
│   ├── ContactSection.razor   # Contact form
│   ├── ChatComponent.razor    # AI chat interface
│   └── Dialogs/               # Modal dialogs
├── Models/                    # Data models
│   └── PortfolioModels.cs     # Portfolio data structures
├── Services/                  # Business logic
│   ├── ThemeService.cs        # Theme management
│   ├── ChatService.cs         # AI chat functionality
│   └── PortfolioDataService.cs # Sample data
├── Shared/                    # Shared components
│   ├── MainLayout.razor       # Main layout
│   └── NavMenu.razor          # Navigation menu
├── wwwroot/                   # Static files
│   ├── css/app.css           # Custom styles
│   ├── js/app.js             # JavaScript functions
│   └── index.html            # Main HTML file
└── Pages/                     # Blazor pages
    └── Index.razor           # Main page
```

## 🎨 Customization

### Personal Information

Update your personal information in `Services/PortfolioDataService.cs`:

```csharp
public PortfolioData GetPortfolioData()
{
    return new PortfolioData
    {
        Name = "Your Name",
        Title = "Your Title",
        Subtitle = "Your Subtitle",
        About = "Your about text",
        Email = "your.email@example.com",
        // ... other properties
    };
}
```

### Skills

Modify the skills list in the same file:

```csharp
private List<Skill> GetSkills()
{
    return new List<Skill>
    {
        new() { Name = "Your Skill", Proficiency = 90, Category = "Category", Icon = "mdi-icon", Color = "#color" },
        // ... more skills
    };
}
```

### Projects

Update your projects:

```csharp
private List<Project> GetProjects()
{
    return new List<Project>
    {
        new()
        {
            Title = "Project Title",
            Description = "Project description",
            ImageUrl = "project-image-url",
            LiveDemoUrl = "live-demo-url",
            GitHubUrl = "github-url",
            Technologies = new List<string> { "Tech1", "Tech2" },
            Category = "Category"
        },
        // ... more projects
    };
}
```

### Styling

Customize the appearance by modifying `wwwroot/css/app.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other variables */
}
```

## 🤖 AI Chat Integration

The portfolio includes a mock AI chat service. To integrate with a real AI API:

1. **Update ChatService.cs**:
   ```csharp
   private async Task<string> GetAIResponseAsync(string message)
   {
       // Replace with your AI API call
       var response = await _httpClient.PostAsJsonAsync("your-ai-api-url", new { message });
       return await response.Content.ReadAsStringAsync();
   }
   ```

2. **Popular AI APIs**:
   - OpenAI GPT API
   - Hugging Face Inference API
   - Azure Cognitive Services
   - Google Cloud AI

## 🚀 Deployment

### GitHub Pages

1. **Enable GitHub Pages** in your repository settings
2. **Push to main branch** - the GitHub Action will automatically deploy
3. **Your site will be available** at `https://yourusername.github.io/repository-name`

### Azure Static Web Apps

1. **Create a Static Web App** in Azure Portal
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build Preset: `Blazor`
   - App Location: `/`
   - Output Location: `wwwroot`

### Manual Deployment

1. **Build the project**:
   ```bash
   dotnet publish -c Release -o ./publish
   ```

2. **Deploy the `publish/wwwroot` folder** to your hosting provider

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **High Contrast**: Support for high contrast mode
- **Reduced Motion**: Respects user's motion preferences
- **Focus Indicators**: Clear focus indicators for all interactive elements

## 🔧 Configuration

### Environment Variables

Create `wwwroot/appsettings.json` for configuration:

```json
{
  "Portfolio": {
    "Name": "Your Name",
    "Email": "your.email@example.com"
  },
  "AI": {
    "ApiKey": "your-ai-api-key",
    "Endpoint": "your-ai-endpoint"
  }
}
```

### Theme Configuration

Customize themes in `Services/ThemeService.cs`:

```csharp
private static MudTheme GetLightTheme()
{
    return new MudTheme()
    {
        Palette = new PaletteLight()
        {
            Primary = "#your-primary-color",
            Secondary = "#your-secondary-color",
            // ... other colors
        }
    };
}
```

## 🐛 Troubleshooting

### Common Issues

1. **MudBlazor not loading**:
   - Ensure MudBlazor CSS and JS are referenced in `index.html`
   - Check that MudBlazor services are registered in `Program.cs`

2. **Build errors**:
   - Update to .NET 9.0 SDK
   - Clear NuGet cache: `dotnet nuget locals all --clear`

3. **Deployment issues**:
   - Check GitHub Actions logs
   - Verify build output in `publish/wwwroot`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MudBlazor](https://mudblazor.com/) for the excellent UI components
- [Material Design](https://material.io/) for design inspiration
- [Blazor](https://blazor.net/) for the amazing web framework

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]

---

**Made with ❤️ using Blazor WebAssembly and MudBlazor**
