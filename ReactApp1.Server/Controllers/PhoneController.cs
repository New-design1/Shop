using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Linq;
using Elfie.Serialization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using ReactApp1.Server.Repositories;

namespace ReactApp1.Server.Controllers
{
    [Route("[controller]/[action]")]
    public class PhoneController : Controller
    {
        private readonly IRepository<Phone> repository;

        public PhoneController(ApplicationDbContext context)
        {
            repository = new GenericRepository<Phone>(context);
        }

        [HttpPost]
        public async Task<ActionResult<Phone>> GetPhoneByName()
        {
            try
            {
                string name = "";
                using (StreamReader stream = new StreamReader(HttpContext.Request.Body))
                {
                    name = await stream.ReadToEndAsync();
                }
                if (name == null || name.Length == 0)
                    return BadRequest();
                else
                    return Ok(await repository.GetAll(p => p.Name == name).FirstOrDefaultAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetAllPhones()
        {
            try
            {
                var phones = await repository.GetAll().ToListAsync();
                return Ok(phones); 
            }
            catch (Exception ex)
            {
                
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<IEnumerable<string>>> SearchPhone()
        {
            try
            {
                string name = "";
                using (StreamReader stream = new StreamReader(HttpContext.Request.Body))
                {
                    name = await stream.ReadToEndAsync();
                }
                if (name == null || name.Length == 0)
                    return BadRequest();
                else
                    return Ok(await repository.GetAll(p => p.Name.ToLower().Contains(name.ToLower()))
                                              .Select(p => p.Name)
                                              .Take(5)
                                              .ToListAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromForm] IFormCollection form)
        {
            try
            {
                var phone = new Phone();
                phone.Name = form["name"];
                phone.Price = form["price"];
                phone.Manufacturer = form["manufacturer"];
                phone.Images = new List<string>();

                foreach (var img in form.Files)
                {
                    string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(img.FileName).Replace(" ","");
                    string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                    string fileExtension = Path.GetExtension(img.FileName);
                    string uniqueFileName = $"{fileNameWithoutExtension}_{timestamp}{fileExtension}";
                    //var path = Path.Combine(@"C:\Users\User1\source\repos\ReactApp1\reactapp1.client\public\images\", uniqueFileName);
                    // Путь для compose-контейнера
                    //var path = Path.Combine("/src/reactapp1.client/public/images", uniqueFileName);
                    // Путь для прода
                    var path = Path.Combine("/app/wwwroot/images", uniqueFileName);

                    using (var stream = new FileStream(path, FileMode.Create))
                    {
                        await img.CopyToAsync(stream);
                    }

                    phone.Images.Add(uniqueFileName);
                }

                repository.Create(phone);
                await repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Update([FromForm] IFormCollection form)
        {
            try
            {
                var id = Convert.ToInt32(form["id"]);
                var phone = repository.GetAll(p => p.Id == id).First();
                phone.Name = form["name"];
                phone.Price = form["price"];
                phone.Manufacturer = form["manufacturer"];
                
                if (form.Files.Count != 0)
                {     
                    foreach (var img in phone.Images)
                    {
                        //var fullPath = Path.Combine(@"C:\Users\User1\source\repos\ReactApp1\reactapp1.client\public\images\", img);
                        var fullPath = Path.Combine("/app/wwwroot/images", img);
                        System.IO.File.Delete(fullPath);
                    }

                    phone.Images.Clear();

                    foreach (var img in form.Files)
                    {
                        string fileNameWithoutExtension = Path.GetFileNameWithoutExtension(img.FileName).Replace(" ", "");
                        string timestamp = DateTime.Now.ToString("yyyyMMddHHmmss");
                        string fileExtension = Path.GetExtension(img.FileName);
                        string uniqueFileName = $"{fileNameWithoutExtension}_{timestamp}{fileExtension}";
                        //var path = Path.Combine(@"C:\Users\User1\source\repos\ReactApp1\reactapp1.client\public\images\", uniqueFileName);
                        // Путь для compose-контейнера
                        //var path = Path.Combine("/src/reactapp1.client/public/images", uniqueFileName);
                        // Путь для прода
                        var path = Path.Combine("/app/wwwroot/images", uniqueFileName);

                        using (var stream = new FileStream(path, FileMode.Create))
                        {
                            await img.CopyToAsync(stream);
                        }

                        phone.Images.Add(uniqueFileName);
                    }

                }

                repository.Update(phone);
                await repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Delete([FromForm] IFormCollection form)
        {
            try
            {
                var id = Convert.ToInt32(form["id"]);
                var phone = repository.GetAll(p => p.Id == id).First();
                foreach (var img in phone.Images)
                {
                    //var fullPath = Path.Combine(@"C:\Users\User1\source\repos\ReactApp1\reactapp1.client\public\images\", img);
                    var fullPath = Path.Combine("/app/wwwroot/images", img);
                    System.IO.File.Delete(fullPath);
                }

                repository.Delete(phone);
                await repository.SaveAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"{ex.Message}");
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phone>>> GetManufacturers()
        {
            try
            {
                var manufacturers = await repository.GetAll().Select(p => p.Manufacturer).Distinct().ToListAsync();
                return Ok(manufacturers);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<Phone>>> FilterPhones([FromBody] string[] manufacturers)
        {
            try
            {
                if (manufacturers.Length == 0)
                    return Ok(await repository.GetAll().ToListAsync());
                else
                {
                    return Ok(await repository.GetAll(p => manufacturers.Contains(p.Manufacturer)).ToListAsync());
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
