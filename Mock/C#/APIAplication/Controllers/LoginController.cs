using APIAplication.Models;
using DataAccess.Login;
using System.Web.Http;

namespace APIAplication.Controllers
{
    public class LoginController : ApiController
    {
        [HttpPost]
        [Route("api/login/login/")]
        public IHttpActionResult Login(LoginModel loginModel)
        {
            if (ModelState.IsValid)
            {
                LoginServices loginServices = new LoginServices();
                int checkLogin = loginServices.CheckUserLogin(loginModel.UserName, loginModel.Password);

                // đăng nhập thành công
                if(checkLogin == 1)
                {

                    // sử lý cái mếu gì ở đây nè chưa biết nữa
                    loginServices.CreateToken(loginModel.UserName, loginModel.Password);

                    string token = loginServices.ReturnUserLoginToken(loginModel.UserName, loginModel.Password);

                    return Ok(token);
                }
                else if(checkLogin == 0)
                {
                    return BadRequest("Sai mật khẩu");
                }
                else if(checkLogin == -1)
                {
                    return BadRequest("Tài khoản đăng nhập không tồn tại");
                }
                else
                {
                    return BadRequest("Đăng nhập thất bại");
                }
            }
            else
            {
                return BadRequest("Đăng nhập thất bại");
            }
        }
        
        [HttpPost]
        [Route("api/login/check/")]
        public IHttpActionResult LoginCheck(TokenModel model)
        {
            LoginServices loginServices = new LoginServices();
            int check = loginServices.CheckToken(model.token);

            if (check == 1)
            {
                return Ok(model.token);
            }
            else
            {
                return BadRequest("Token không tồn tại");
            }
        }
    }
}
