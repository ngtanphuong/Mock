using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table SubType
    /// </summary>
    [Table ("SubType")]
    public class SubType
    {
        [Key, Column(Order = 0)]        
        public int TypeID { get; set; }

        [Key, Column(Order = 1)]        
        public int FilmID { get; set; }

        [ForeignKey("TypeID")]
        public TypeFilm Type { get; set; }

        [ForeignKey("FilmID")]
        public Film Film { get; set; }
    }
}
