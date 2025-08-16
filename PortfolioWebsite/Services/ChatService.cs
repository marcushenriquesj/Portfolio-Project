using System.Net.Http.Json;
using PortfolioWebsite.Models;

namespace PortfolioWebsite.Services;

public class ChatService
{
    private readonly HttpClient _httpClient;
    private readonly List<ChatMessage> _messages = new();

    public ChatService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public IReadOnlyList<ChatMessage> Messages => _messages.AsReadOnly();

    public async Task<ChatMessage> SendMessageAsync(string message)
    {
        var userMessage = new ChatMessage
        {
            Content = message,
            IsUser = true,
            Timestamp = DateTime.Now
        };

        _messages.Add(userMessage);

        try
        {
            // Using a free AI API (Hugging Face Inference API)
            var response = await GetAIResponseAsync(message);
            
            var aiMessage = new ChatMessage
            {
                Content = response,
                IsUser = false,
                Timestamp = DateTime.Now
            };

            _messages.Add(aiMessage);
            return aiMessage;
        }
        catch (Exception)
        {
            var errorMessage = new ChatMessage
            {
                Content = "Sorry, I'm having trouble connecting to the AI service. Please try again later.",
                IsUser = false,
                Timestamp = DateTime.Now
            };

            _messages.Add(errorMessage);
            return errorMessage;
        }
    }

    private async Task<string> GetAIResponseAsync(string message)
    {
        try
        {
            // Using a simple mock response for demo purposes
            // In a real implementation, you would use a free AI API like Hugging Face
            await Task.Delay(1000); // Simulate API delay

            var responses = new[]
            {
                "Hello! I'm an AI assistant. How can I help you today?",
                "That's an interesting question. Let me think about that...",
                "I'd be happy to help you with that!",
                "Thanks for reaching out. I'm here to assist you.",
                "Great question! Here's what I think about that...",
                "I'm always learning and improving. What would you like to know?",
                "That's a fascinating topic! Let me share some thoughts...",
                "I appreciate your message. How can I be of assistance?",
                "Welcome! I'm here to help with any questions you might have.",
                "Interesting perspective! Let me provide some insights..."
            };

            var random = new Random();
            return responses[random.Next(responses.Length)];
        }
        catch
        {
            return "I'm sorry, but I'm currently unable to process your request. Please try again later.";
        }
    }

    public void ClearMessages()
    {
        _messages.Clear();
    }
}
