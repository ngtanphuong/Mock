using DataObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.User
{
    public interface IUserServices
    {
        List<UserModel> GetAllUsers();

        UserModel GetUserById(int id);

        int AddUser(UserModel user);

        int EditUser(int id, UserModel user);

        int DeleteUser(int id);
    }
}
