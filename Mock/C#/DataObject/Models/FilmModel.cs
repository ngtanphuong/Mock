using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataObject.Models
{
    /// <summary>
    /// this class help you transfer data Film
    /// </summary>
    public class FilmModel
    {
        #region infomation of film
        public int FilmID { get; set; }
        
        public string FilmName { get; set; }
        
        public string Describe { get; set; }
        
        public int Rate { get; set; }
        
        public DateTime Year { get; set; }
        
        public string Img { get; set; }
        
        public bool Status { get; set; }

        public virtual ICollection<TypeFilmModel> TypeFilms { get; set; }
        public virtual ICollection<ActorModel> Actors { get; set; }
        public virtual ICollection<DirectorModel> Directors { get; set; }
        #endregion
    }
}
