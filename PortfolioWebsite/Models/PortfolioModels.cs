using System.ComponentModel.DataAnnotations;

namespace PortfolioWebsite.Models;

/// <summary>
/// Represents a technical skill with proficiency level and metadata.
/// </summary>
public class Skill
{
    /// <summary>
    /// The name of the skill.
    /// </summary>
    public string Name { get; set; } = string.Empty;
    
    /// <summary>
    /// Proficiency level from 0 to 100.
    /// </summary>
    public int Proficiency { get; set; }
    
    /// <summary>
    /// Category of the skill (e.g., Backend, Frontend, Database).
    /// </summary>
    public string Category { get; set; } = string.Empty;
    
    /// <summary>
    /// Material Design icon identifier.
    /// </summary>
    public string Icon { get; set; } = string.Empty;
    
    /// <summary>
    /// Color code for the skill.
    /// </summary>
    public string Color { get; set; } = string.Empty;
}

/// <summary>
/// Represents a portfolio project with details and links.
/// </summary>
public class Project
{
    /// <summary>
    /// The title of the project.
    /// </summary>
    public string Title { get; set; } = string.Empty;
    
    /// <summary>
    /// Detailed description of the project.
    /// </summary>
    public string Description { get; set; } = string.Empty;
    
    /// <summary>
    /// URL to the project screenshot or image.
    /// </summary>
    public string ImageUrl { get; set; } = string.Empty;
    
    /// <summary>
    /// URL to the live demo of the project.
    /// </summary>
    public string LiveDemoUrl { get; set; } = string.Empty;
    
    /// <summary>
    /// URL to the GitHub repository.
    /// </summary>
    public string GitHubUrl { get; set; } = string.Empty;
    
    /// <summary>
    /// List of technologies used in the project.
    /// </summary>
    public List<string> Technologies { get; set; } = new();
    
    /// <summary>
    /// Category of the project (e.g., Full Stack, Frontend).
    /// </summary>
    public string Category { get; set; } = string.Empty;
}

/// <summary>
/// Represents work experience with achievements and details.
/// </summary>
public class Experience
{
    /// <summary>
    /// Job title or position.
    /// </summary>
    public string Title { get; set; } = string.Empty;
    
    /// <summary>
    /// Company or organization name.
    /// </summary>
    public string Company { get; set; } = string.Empty;
    
    /// <summary>
    /// Employment period (e.g., "2022 - Present").
    /// </summary>
    public string Period { get; set; } = string.Empty;
    
    /// <summary>
    /// Job description and responsibilities.
    /// </summary>
    public string Description { get; set; } = string.Empty;
    
    /// <summary>
    /// List of key achievements and accomplishments.
    /// </summary>
    public List<string> Achievements { get; set; } = new();
    
    /// <summary>
    /// Material Design icon identifier.
    /// </summary>
    public string Icon { get; set; } = string.Empty;
}

/// <summary>
/// Represents contact form information with validation attributes.
/// </summary>
public class ContactInfo
{
    /// <summary>
    /// The sender's full name.
    /// </summary>
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100, ErrorMessage = "Name cannot exceed 100 characters")]
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// The sender's email address.
    /// </summary>
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Please enter a valid email address")]
    [StringLength(255, ErrorMessage = "Email cannot exceed 255 characters")]
    public string Email { get; set; } = string.Empty;

    /// <summary>
    /// The subject of the message.
    /// </summary>
    [Required(ErrorMessage = "Subject is required")]
    [StringLength(200, ErrorMessage = "Subject cannot exceed 200 characters")]
    public string Subject { get; set; } = string.Empty;

    /// <summary>
    /// The message content.
    /// </summary>
    [Required(ErrorMessage = "Message is required")]
    [StringLength(2000, MinimumLength = 10, ErrorMessage = "Message must be between 10 and 2000 characters")]
    public string Message { get; set; } = string.Empty;
}

/// <summary>
/// Represents the complete portfolio data including personal information, skills, projects, and experience.
/// </summary>
public class PortfolioData
{
    /// <summary>
    /// Full name of the portfolio owner.
    /// </summary>
    public string Name { get; set; } = "Marcus Henriques";
    
    /// <summary>
    /// Professional title or role.
    /// </summary>
    public string Title { get; set; } = "Full Stack Developer";
    
    /// <summary>
    /// Brief professional subtitle or tagline.
    /// </summary>
    public string Subtitle { get; set; } = "Passionate about creating innovative web solutions";
    
    /// <summary>
    /// Detailed about section describing background and expertise.
    /// </summary>
    public string About { get; set; } = "I'm a dedicated full-stack developer with expertise in modern web technologies. I love building scalable applications and solving complex problems.";
    
    /// <summary>
    /// Contact email address.
    /// </summary>
    public string Email { get; set; } = "john.doe@example.com";
    
    /// <summary>
    /// Contact phone number.
    /// </summary>
    public string Phone { get; set; } = "+1 (555) 123-4567";
    
    /// <summary>
    /// Location or address.
    /// </summary>
    public string Location { get; set; } = "New York, NY";
    
    /// <summary>
    /// List of social media profile URLs.
    /// </summary>
    public List<string> SocialLinks { get; set; } = new();
    
    /// <summary>
    /// List of technical skills and competencies.
    /// </summary>
    public List<Skill> Skills { get; set; } = new();
    
    /// <summary>
    /// List of portfolio projects.
    /// </summary>
    public List<Project> Projects { get; set; } = new();
    
    /// <summary>
    /// List of work experience entries.
    /// </summary>
    public List<Experience> Experience { get; set; } = new();
}
