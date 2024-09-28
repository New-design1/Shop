using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace ReactApp1.Server.Models
{
    public class Phone
    {
        public int Id { get; set; }

        [BindProperty]
        public string? Name { get; set; }

        [BindProperty]
        public string Price { get; set; }

        [BindProperty]
        public List<string> Images { get; set; }
    }
}
