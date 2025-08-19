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

    /// <summary>
    /// Gets the list of projects for the portfolio.
    /// </summary>
    /// <returns>A list of <see cref="Project"/> objects.</returns>
    private static List<Project> GetProjects()
    {
        return new List<Project>
        {
            new()
            {
                Title = "Blazor WASM eBay Mockup",
                Description = "A comprehensive e-commerce platform built with Blazor WebAssembly, featuring product listings, user authentication, shopping cart functionality, and a modern responsive design. This project demonstrates full-stack development capabilities with .NET technologies.",
                ImageUrl = "images/ebay-mock-up-scrnsht.png",
                LiveDemoUrl = "", // Add live demo URL if available
                GitHubUrl = "https://github.com/marcushenriquesj/BlazorWASMEbayMockUp",
                Technologies = new List<string> { "Blazor WebAssembly", ".NET", "C#", "HTML/CSS", "JavaScript", "API Integration" },
                Category = "Full Stack"
            },
            new()
            {
                Title = "Portfolio Website",
                Description = "A modern, responsive portfolio website built with Blazor WebAssembly and MudBlazor. Features include animated backgrounds, smooth scrolling, interactive components, and a professional design showcasing software engineering expertise.",
                ImageUrl = "images/portfolio-scrnsht.png",
                LiveDemoUrl = "", // Add live demo URL if available
                GitHubUrl = "https://github.com/marcushenriquesj/portfolio-website", // Update with actual repo URL
                Technologies = new List<string> { "Blazor WebAssembly", "MudBlazor", "C#", "CSS3", "JavaScript", "Responsive Design" },
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
