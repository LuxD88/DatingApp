using System.Text.Json.Serialization;

namespace API.DTOs
{
    public class UserDto
    {
        // [JsonName("birthdate")]
        [JsonPropertyName("username")]
        public string UserName { get; set; }
        [JsonPropertyName("token")]
        public string Token { get; set; }
        public string PhotoUrl { get; set; }
        public string KnownAs { get; set; }
    }
}