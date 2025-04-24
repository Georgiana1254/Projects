using Microsoft.AspNetCore.Mvc;

namespace Project.Controllers
{
    public class HomeController:Controller
    {
        public IActionResult Error()
        {
            return View();
        }
    }
}
