using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table Type
    /// </summary>
    [Table("Type")]
    public class TypeFilm
    {      
        [Key]
        public int TypeID { get; set; }

        [Required]
        [MaxLength(100)]      
        public string NameType { get; set; }

        public virtual ICollection<SubType> SubTypes { get; set; }     
    }
}
