using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactApp1.Server.Models
{
    public class Phone : EDevice
    {
        public int PhoneCPUId { get; set; }

        public PhoneCPU? PhoneCPU { get; set; }

        [BindProperty]
        public int Price { get; set; }
    }
}
