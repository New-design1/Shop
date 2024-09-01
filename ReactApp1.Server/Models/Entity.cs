using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class Entity
    {
        [Key]
        public int Id { get; set; }
        public string? Name { get; set; }
    }
}
