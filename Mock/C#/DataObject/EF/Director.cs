using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table Director containt information of director.
    /// </summary>
    [Table("Director")]
    public class Director
    {
        [Key]
        public int DirectorID { get; set; }

        // Set nvarchar 100
        [MaxLength(150)]
        public string DirectorName { get; set; }

        // Set bool for DirectorGender
        public bool DirectorGender { get; set; }

        // Set Datetime for DirectorBirthday
        public DateTime DirectorBirthday { get; set; }

        // Set string for DirectorDescribe
        public string DirectorDescribe { get; set; }

        // Set string for DirectorImage
        public string DirectorImg { get; set; }

        // Set bool for DirectorStatus
        public bool DirectorStatus { get; set; }

        public virtual ICollection<SubDirector> SubDirectors { get; set; }
    }
}
