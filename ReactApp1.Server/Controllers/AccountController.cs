using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ReactApp1.Server.Controllers
{
    [Authorize]
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly SignInManager<IdentityUser> signInManager;
        public AccountController(UserManager<IdentityUser> userMgr, SignInManager<IdentityUser> signinMgr)
        {
            userManager = userMgr;
            signInManager = signinMgr;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] Models.UserModel model)
        {
            if (model == null)
                return BadRequest();

            IdentityUser user = await userManager.FindByNameAsync(model.UserName);
            if (user == null)
                return Unauthorized();

            var isValidPassword = await userManager.CheckPasswordAsync(user, model.Password);
            if (!isValidPassword)
                return Unauthorized();

            var claims = new List<Claim> {new Claim("name", model.UserName)};

            var jwt = new JwtSecurityToken(
                issuer: "MyAuthServer",
                audience: "MyAuthClient",
                claims: claims,
                expires: DateTime.UtcNow.Add(TimeSpan.FromDays(1)),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(
                new SymmetricSecurityKey(Encoding.UTF8.GetBytes("mysupersecret_secretsecretsecretkey!123")), SecurityAlgorithms.HmacSha256));
            
            return  Ok(new JwtSecurityTokenHandler().WriteToken(jwt));
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            await signInManager.SignOutAsync();
            return RedirectToAction("Index", "Home");
        }


    }
}
