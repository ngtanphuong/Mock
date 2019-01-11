using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table Film
    /// </summary>
    [Table ("Film")]
    public class Film
    {
        [Key]
        public int FilmID { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        //[RegularExpression("[^!@#$%^&*()_+:|<>?~`]{5,100}$", ErrorMessage = "Không chấp nhận ký tự đặc biệt, và dài từ 5-100 kí tự")]
        public string FilmName { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        //[RegularExpression("[^!@#$%^&*()_+:|<>?~`]{5,500}$", ErrorMessage = "Không chấp nhận ký tự đặc biệt, và dài từ 5-500 kí tự")]
        public string Describe { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        //[RegularExpression("^[0-9]{9,12}$", ErrorMessage = "Chỉ chấp nhận số")]
        public int Rate { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        public DateTime Year { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        //[RegularExpression("[^!@#$%^&*()_+:|<>?~`]{5,500}$", ErrorMessage = "Không chấp nhận ký tự đặc biệt, và dài từ 5-500 kí tự")]
        public string Img { get; set; }

        [Required(ErrorMessage = "Không được bỏ trống")]
        public bool Status { get; set; }

        public virtual ICollection<SubType> SubTypes { get; set; }
        public virtual ICollection<SubActor> SubActors { get; set; }
        public virtual ICollection<SubDirector> SubDirectors { get; set; }
        public virtual ICollection<SubUser> SubUsers { get; set; }
    }
}
