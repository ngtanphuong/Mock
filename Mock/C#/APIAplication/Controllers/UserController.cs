using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DataAccess.User;
using DataObject.Models;

namespace APIAplication.Controllers
{
    public class UserController : ApiController
    {
        
        UserServices userServices = new UserServices();

        // GET api/user/getUser
        public IHttpActionResult GetUser()
        {
            try
            {
                var result = userServices.GetAllUsers();
                return Ok(result);
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.BadRequest, ex);
            }

        }

        // GET api/user/getUser/5
        public IHttpActionResult GetUser(int id)
        {
            try
            {
                var result = userServices.GetUserById(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

        // POST api/user/EditUser/5
        [HttpPost]
        public IHttpActionResult EditUser([FromBody] UserModel user)
        {
            
                if (user != null)
                {
                    var result = userServices.EditUser(user.UserID, user);
                    return Ok(result);
                }
                else return Content(HttpStatusCode.BadRequest, "User null");
           
            //catch (Exception ex)
            //{
            //    return Content(HttpStatusCode.BadRequest, ex);
            //}

        }

        // POST api/user/AddUser
        [HttpPost]
        public IHttpActionResult AddUser(UserModel user)
        {
            try
            {
                var result = userServices.AddUser(user);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return Content(HttpStatusCode.BadRequest, ex);

            }

        }


        // DELETE api/user/DeleteUser/5   Real
        [HttpDelete]
        public IHttpActionResult DeleteUserForever(int id)
        {
            userServices.DeleteUser(id);
            return Ok(id);
        }

        // DELETE api/user/DeleteUser/5
        [HttpPost]
        public IHttpActionResult DeleteUser([FromBody]DataObject.EF.User user)
        {
            try
            {
                if (user != null)
                {
                    var result = userServices.DeleteUser(user.UserID);
                    return Ok(result);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.BadRequest, ex);
            }

        }

        [HttpPost]
        public IHttpActionResult SetRole([FromBody]DataObject.EF.User user)
        {
            try
            {
                if (user != null)
                {
                    var result = userServices.setRole(user.UserID, user.isAdmin);
                    return Ok(result);
                }
                else return NotFound();
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.BadRequest, ex);
            }
        }


        // api/getuserbyusername/?username=:username
        [HttpGet]
        public IHttpActionResult GetUserByUsername(string username)
        {
            try
            {
                var result = userServices.GetUserByUsername(username);
                return Ok(result);
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.BadRequest, ex);
            }
        }

    }
}
