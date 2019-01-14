using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table Actor
    /// </summary>
    [Table("Actor")]
   public class Actor
    {
        [Key]
        public int ActorID { get; set; }

        [MaxLength(50)]
        [Required]
        public string ActorName { get; set; }

        public bool Gender { get; set; }

        public DateTime Birthday { get; set; }

        public string Describe { get; set; }

        public string Img { get; set; }

        public bool Status { get; set; }

        public virtual ICollection<SubActor> SubActors { get; set; }
    }
}
