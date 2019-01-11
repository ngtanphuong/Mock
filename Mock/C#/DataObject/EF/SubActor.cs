using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataObject.EF
{
    /// <summary>
    /// Create table SubActor
    /// </summary>
    [Table("SubActor")]
    public class SubActor
    {
        [Key, Column(Order = 0)]
        public int ActorID { get; set; }

        [Key, Column(Order = 1)]
        public int FilmID { get; set; }

        [ForeignKey("ActorID")]
        public Actor Actor { get; set; }

        [ForeignKey("FilmID")]
        public Film Film { get; set; }

    }
}
