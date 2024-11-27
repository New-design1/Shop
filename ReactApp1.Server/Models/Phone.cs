using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models
{
    public class Phone : EDevice
    {
        [BindProperty]
        public string Price { get; set; }

        [BindProperty]
        public List<string> Images { get; set; }

    }
}
