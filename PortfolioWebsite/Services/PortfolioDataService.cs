using PortfolioWebsite.Models;

namespace PortfolioWebsite.Services;

public class PortfolioDataService
{
    public PortfolioData GetPortfolioData()
    {
        return new PortfolioData
        {
            Name = "Marcus Henriques",
            Title = "Full-Stack Developer",
            Subtitle = "Passionate about creating innovative web solutions",
            About = "I’m Marcus Henriques, a Full-Stack Software Engineer with expertise in building scalable, secure, and efficient solutions. With a focus on modern technologies like C# .NET 8.0, Azure, Blazor, and SQL, I deliver impactful software from front to back. Passionate about clean design, robust systems, and collaborative problem-solving, I strive to create software that drives success.",
            Email = "MarcusjHenriques@Gmail.com",
            Phone = "+1 (516) 253-8334",
            Location = "New York, NY",
            SocialLinks = new List<string>
            {
                "https://https://github.com/marcushenriquesj",
                "https://www.linkedin.com/in/marcusj-henriques/"
            },
            Skills = GetSkills(),
            Projects = GetProjects(),
            Experience = GetExperience()
        };
    }

    private List<Skill> GetSkills()
    {
        return new List<Skill>
        {
            new() { Name = "C#", Proficiency = 100, Category = "Backend", Icon = "mdi-language-csharp", Color = "#178600" },
            new() { Name = ".NET", Proficiency = 95, Category = "Backend", Icon = "mdi-dot-net", Color = "#512BD4" },
            new() { Name = "Blazor", Proficiency = 90, Category = "Frontend", Icon = "mdi-microsoft", Color = "#512BD4" },
            new() { Name = "JavaScript", Proficiency = 80, Category = "Frontend", Icon = "mdi-language-javascript", Color = "#F7DF1E" },
            new() { Name = "TypeScript", Proficiency = 70, Category = "Frontend", Icon = "mdi-language-typescript", Color = "#3178C6" },
            new() { Name = "SQL Server", Proficiency = 90, Category = "Database", Icon = "mdi-database", Color = "#CC2927" },
            new() { Name = "Azure", Proficiency = 80, Category = "Cloud", Icon = "mdi-microsoft-azure", Color = "#0089D6" },
            new() { Name = "Docker", Proficiency = 70, Category = "DevOps", Icon = "mdi-docker", Color = "#2496ED" },
            new() { Name = "Git", Proficiency = 90, Category = "Tools", Icon = "mdi-git", Color = "#F05032" }
        };
    }

    private List<Project> GetProjects()
    {
        return new List<Project>
        {
            new()
            {
                Title = "E-Commerce Platform",
                Description = "A full-stack e-commerce platform built with Blazor WebAssembly and .NET 8. Features include user authentication, product management, shopping cart, and payment integration.",
                ImageUrl = "https://via.placeholder.com/400x250/1976d2/ffffff?text=E-Commerce",
                LiveDemoUrl = "https://demo-ecommerce.example.com",
                GitHubUrl = "https://github.com/johndoe/ecommerce-platform",
                Technologies = new List<string> { "Blazor", ".NET 8", "SQL Server", "Azure", "Stripe" },
                Category = "Full Stack"
            },
            new()
            {
                Title = "Task Management App",
                Description = "A collaborative task management application with real-time updates, team collaboration, and project tracking features.",
                ImageUrl = "https://via.placeholder.com/400x250/4caf50/ffffff?text=Task+Manager",
                LiveDemoUrl = "https://demo-taskmanager.example.com",
                GitHubUrl = "https://github.com/johndoe/task-manager",
                Technologies = new List<string> { "React", "Node.js", "MongoDB", "Socket.io", "JWT" },
                Category = "Full Stack"
            },
            new()
            {
                Title = "Weather Dashboard",
                Description = "A responsive weather dashboard that displays current weather conditions and forecasts using multiple weather APIs.",
                ImageUrl = "https://via.placeholder.com/400x250/ff9800/ffffff?text=Weather+App",
                LiveDemoUrl = "https://demo-weather.example.com",
                GitHubUrl = "https://github.com/johndoe/weather-dashboard",
                Technologies = new List<string> { "Blazor", "C#", "Weather API", "Chart.js", "CSS3" },
                Category = "Frontend"
            },
            new()
            {
                Title = "Portfolio Website",
                Description = "A modern, responsive portfolio website built with Blazor WebAssembly and MudBlazor for Material Design.",
                ImageUrl = "https://via.placeholder.com/400x250/9c27b0/ffffff?text=Portfolio",
                LiveDemoUrl = "https://demo-portfolio.example.com",
                GitHubUrl = "https://github.com/johndoe/portfolio",
                Technologies = new List<string> { "Blazor", "MudBlazor", "C#", "CSS3", "JavaScript" },
                Category = "Frontend"
            }
        };
    }

    private List<Experience> GetExperience()
    {
        return new List<Experience>
        {
            new()
            {
                Title = "Senior Full Stack Developer",
                Company = "Tech Solutions Inc.",
                Period = "2022 - Present",
                Description = "Leading development of enterprise applications using .NET and modern web technologies.",
                Achievements = new List<string>
                {
                    "Led a team of 5 developers in building a customer portal",
                    "Improved application performance by 40% through optimization",
                    "Implemented CI/CD pipelines reducing deployment time by 60%"
                },
                Icon = "mdi-briefcase"
            },
            new()
            {
                Title = "Full Stack Developer",
                Company = "Digital Innovations",
                Period = "2020 - 2022",
                Description = "Developed web applications using React, Node.js, and various cloud services.",
                Achievements = new List<string>
                {
                    "Built 10+ client applications with React and Node.js",
                    "Integrated third-party APIs and payment gateways",
                    "Mentored junior developers and conducted code reviews"
                },
                Icon = "mdi-laptop"
            },
            new()
            {
                Title = "Junior Developer",
                Company = "StartUp Ventures",
                Period = "2019 - 2020",
                Description = "Started career developing small business websites and learning modern web technologies.",
                Achievements = new List<string>
                {
                    "Developed 15+ websites for small businesses",
                    "Learned modern web development frameworks",
                    "Contributed to open-source projects"
                },
                Icon = "mdi-school"
            }
        };
    }
}
