using System;
using System.Linq;
using System.Text;
using DataObject;

namespace DataAccess.Login
{
    public class LoginServices : ILoginServices
    {
        FilmDataContext database = null;

        public LoginServices()
        {
            database = new FilmDataContext();
        }

        // PhatLA check login
        public int CheckUserLogin(string userName, string password)
        {
                var user = database.Users.Where(u => u.UserName == userName).FirstOrDefault();

                // kiểm tra tên đăng nhập
                if (user != null)
                {
                    if (user.Password == password)
                    {
                        // đăng nhập thành công
                        return 1;
                    }
                    else
                    {
                        // sai mật khẩu
                        return 0;
                    }
                }
                // tên không tồn tại
                else
                {
                    return -1;
                }
        }

        /// <summary>
        /// Kiểm tra token
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <param name="token"></param>
        /// <returns></returns>
        public int CheckUserToken(string userName, string password, string token)
        {
            var select = database.Users.Where(u => u.UserName == userName && u.Password == password).FirstOrDefault();

            if (select != null)
            {
                if (select.AccessToken == token && DateTime.Now < select.AccessDate)
                {
                    string decodeToken = Encoding.UTF8.GetString(Convert.FromBase64String(token));
                    string[] baseString = decodeToken.Split(':');
                    string _userName = baseString[0];
                    string[] _sub = baseString[1].Split('|');
                    string _password = _sub[0];

                    if(userName == _userName && password == _password)
                    {
                        return 1;
                    }
                    else
                    {
                        return 0;
                    }
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        public int CheckToken(string token)
        {
            // decode token to get data login
            string decodeToken = Encoding.UTF8.GetString(Convert.FromBase64String(token));
            string[] baseString = decodeToken.Split(':');
            string _userName = baseString[0];
            string[] _sub = baseString[1].Split('|');
            string _password = _sub[0];

            var select = database.Users.Where(u => u.UserName == _userName && u.Password == _password).FirstOrDefault();
            if(select != null)
            {
                if(token == select.AccessToken && DateTime.Now < select.AccessDate)
                {
                    return 1;
                }
                else
                {
                    return 0;
                }
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// Tạo mới token
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public int CreateToken(string userName, string password)
        {
            string baseString = userName + ":" + password + "|" + RandomString();
            var token = Encoding.UTF8.GetBytes(baseString);

            var select = database.Users.Where(u => u.UserName == userName && u.Password == password).FirstOrDefault();

            var theDate = new DateTime(DateTime.Today.Year, DateTime.Today.Month, DateTime.Today.Day, DateTime.Now.Hour + 1, 0, 0, 0);


            if (select != null)
            {
                select.AccessToken = Convert.ToBase64String(token);
                select.AccessDate = theDate;

                return database.SaveChanges();
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// Trả token mối về cho người dùng
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        public string ReturnUserLoginToken(string userName, string password)
        {
            var select = database.Users.Where(u => u.UserName == userName && u.Password == password).FirstOrDefault();

            return select.AccessToken;
        }

        /// <summary>
        /// Sinh chuỗi random
        /// </summary>
        /// <returns></returns>
        public string RandomString()
        {
            var baseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[5];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = baseString[random.Next(baseString.Length)];
            }

            var RandomString = new String(stringChars);

            return RandomString;
        }
    }
}
