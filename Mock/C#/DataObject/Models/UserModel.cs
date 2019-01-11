using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataObject.Models
{
    /// <summary>
    /// this class help you transfer data user
    /// </summary>
    public class UserModel
    {
        #region infomation of each user
        public int UserID { get; set; }

        public string Name { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public bool Gender { get; set; }

        public DateTime Birthday { get; set; }

        public string Phone { get; set; }

        public bool isAdmin { get; set; }

        public string Email { get; set; }

        public ICollection<FilmModel> FilmModels { get; set; }

        #endregion
        // token infomation----------
        public string AccessToken { get; set; }

        public DateTime AccessDate { get; set; }
        //---------------------------
    }
}
