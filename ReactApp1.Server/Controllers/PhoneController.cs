using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Repositories;

namespace ReactApp1.Server.Controllers
{
    //[ApiController]
    [Route("[controller]/[action]")]
    public class PhoneController : Controller
    {
        private readonly GenericRepository<Phone> repository;

        public PhoneController(ApplicationDbContext context)
        {
            repository = new GenericRepository<Phone>(context);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult> GetPhoneCharacteristics()
        {
            var characteristics = new 
            {
                Name = "Название",
                Price = "Цена"
            };

            return Json(characteristics);
        }

        [HttpGet]
        public async Task<ActionResult<Phone>> GetPhone()
        {
            var phone = await repository.GetAll().FirstOrDefaultAsync();

            return phone;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetAllPhones()
        {
            try
            {
                var phones = await repository.GetAll().ToListAsync();
                return Ok(phones); // Возвращаем 200 OK с данными
            }
            catch (Exception ex)
            {
                // Логирование ошибки (если нужно)
                return StatusCode(500, "Internal server error"); // Возвращаем 500 при ошибке
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Phone phone)
        {
            if (ModelState.IsValid)
            {
                repository.Insert(phone);
                await repository.SaveAsync();
                return Ok();
            }
            return BadRequest();
        }
    }
}
