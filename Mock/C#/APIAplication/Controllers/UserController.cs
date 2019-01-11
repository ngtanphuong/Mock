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
        public List<UserModel> GetUser()
        {
            var result= userServices.GetAllUsers();
            return result;
        }

        // GET api/user/getUser/5
        public UserModel GetUser(int id)
        {
            return userServices.GetUserById(id);
        }

        // POST api/user/AddUser
        [HttpPost]
        public int AddUser(UserModel user)
        {
            return userServices.AddUser(user);
        }

        // PUT api/user/EditUser/5
        [HttpPut]
        public int EditUser(int id, [FromBody] UserModel user)
        {
            return userServices.EditUser(id, user);
        }

        // DELETE api/user/DeleteUser/5
        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
        {
            userServices.DeleteUser(id);
            return Ok(id);
        }
    }
}
