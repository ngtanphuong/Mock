using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace APIAplication.Models
{
    public class LoginModel
    {
        [Required (ErrorMessage = "Tên đăng nhập không được bỏ trống")]
        [MaxLength(20)]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Tên đăng nhập không được bỏ trống")]
        [MaxLength(20)]
        public string Password { get; set; }

        // [Required]
        // public string Token { get; set; }
    }
}