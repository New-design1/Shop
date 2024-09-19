using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace ReactApp1.Server.Models
{
    public class UserModel
    {
        [Required]
     
        public string UserName { get; set; }

        [Required]
        
        public string Password { get; set; }

        
        public bool RememberMe { get; set; }
    }
}
