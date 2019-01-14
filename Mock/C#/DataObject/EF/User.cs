using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table User
    /// </summary>
    [Table("User")]
    public class User
    {
        [Key]
        public int UserID { get; set; }

        [MaxLength(50)]
        [Required]
        public string Name { get; set; }

        [MaxLength(20)]
        [Required(ErrorMessage = "Không được bỏ trống")]
        [RegularExpression("[^!@#$%^&*()_+:|<>?~`]{5,20}$", ErrorMessage = "Không chấp nhận ký tự đặc biệt, và dài từ 5-20 kí tự")]
        public string UserName { get; set; }

        [MaxLength(20)]
        [Required(ErrorMessage = "Không được bỏ trống")]
        [RegularExpression("[^!@#$%^&*()_+:|<>?~`]{5,20}$", ErrorMessage = "Không chấp nhận ký tự đặc biệt, và dài từ 5-20 kí tự")]
        public string Password { get; set; }

        public bool Gender { get; set; }

        public DateTime Birthday { get; set; }

        public string Email { get; set; }

        [MaxLength(15)]
        public string Phone { get; set; }
        
        public bool isAdmin { get; set; }


        public bool status { get; set; }

        // PhatLA test random token
        public string AccessToken { get; set; }

        public DateTime? AccessDate { get; set; }


        public virtual ICollection<SubUser> SubUsers { get; set; }
    }
}
