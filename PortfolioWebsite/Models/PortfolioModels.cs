namespace PortfolioWebsite.Models;

public class Skill
{
    public string Name { get; set; } = string.Empty;
    public int Proficiency { get; set; }
    public string Category { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
}

public class Project
{
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ImageUrl { get; set; } = string.Empty;
    public string LiveDemoUrl { get; set; } = string.Empty;
    public string GitHubUrl { get; set; } = string.Empty;
    public List<string> Technologies { get; set; } = new();
    public string Category { get; set; } = string.Empty;
}

public class Experience
{
    public string Title { get; set; } = string.Empty;
    public string Company { get; set; } = string.Empty;
    public string Period { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public List<string> Achievements { get; set; } = new();
    public string Icon { get; set; } = string.Empty;
}

public class ContactInfo
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}

public class ChatMessage
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Content { get; set; } = string.Empty;
    public bool IsUser { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.Now;
}

public class PortfolioData
{
    public string Name { get; set; } = "Marcus Henriques";
    public string Title { get; set; } = "Full Stack Developer";
    public string Subtitle { get; set; } = "Passionate about creating innovative web solutions";
    public string About { get; set; } = "I'm a dedicated full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.";
    public string Email { get; set; } = "john.doe@example.com";
    public string Phone { get; set; } = "+1 (555) 123-4567";
    public string Location { get; set; } = "New York, NY";
    public List<string> SocialLinks { get; set; } = new();
    public List<Skill> Skills { get; set; } = new();
    public List<Project> Projects { get; set; } = new();
    public List<Experience> Experience { get; set; } = new();
}
