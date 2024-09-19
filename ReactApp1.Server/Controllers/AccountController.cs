using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol;

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
            //Models.UserModel model = modelData.FromJson<Models.UserModel>();
            //if (ModelState.IsValid)
            //{
            IdentityUser user = await userManager.FindByNameAsync(model.UserName);
            if (user != null)
            {
                //await signInManager.SignOutAsync();
                await signInManager.SignInAsync(user, false);
                //Microsoft.AspNetCore.Identity.SignInResult result = await signInManager.PasswordSignInAsync(user, model.Password, model.RememberMe, false);
                ////if (result.Succeeded)
                //    {
                //        return Redirect("https://localhost:5173/admin");
                //    }
                //return Redirect("https://localhost:5173/admin");
            }
            //  ModelState.AddModelError(nameof(Models.UserModel.UserName), "Неверный логин или пароль");
            //}
            //return View(model);
            return new EmptyResult();
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
