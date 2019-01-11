using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table SubDirector
    /// </summary>
    [Table("SubDirector")]
    public class SubDirector
    {
        [Key,Column(Order = 0)]
        public int DirectorID { get; set; }

        [Key, Column(Order = 1)]
        public int FilmID { get; set; }

        [ForeignKey("DirectorID")]
        public Director Director { get; set; }

        [ForeignKey("FilmID")]
        public Film Film { get; set; }

    }
}
