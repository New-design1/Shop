using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace ReactApp1.Server.Models
{
    public class Entity
    {
        [Key]
        public int Id { get; set; }

        [BindProperty]
        public string? Name { get; set; }
    }
}
