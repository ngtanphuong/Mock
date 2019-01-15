using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.Models;

namespace DataAccess.SubDirector
{
    public class SubDirectorService : ISubDirector
    {
        // datacontext
        private FilmDataContext ctx = null;

        // constructor
        public SubDirectorService() { }


        #region METHODS

        /// <summary>
        /// Add subdirector to database
        /// </summary>
        /// <param name="subDirector"> subdirector you want to add </param>
        /// <returns> add status </returns>
        public int AddSubDirector(SubDirectorModel subDirector)
        {
            // connect database
            using (ctx = new FilmDataContext())
            {
                // paramater subDirector is null return -1
                if (subDirector == null)
                {
                    return -1;
                }
                // Creating MySubDirector and data is map to a subDirector(SubDirector)
                DataObject.EF.SubDirector MySubDirector = new DataObject.EF.SubDirector
                {
                    FilmID = subDirector.FilmID,
                    DirectorID = subDirector.DirectorID
                };
                // add mySubActor to database
                ctx.SubDirectors.Add(MySubDirector);
                return ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Delete subdirector by id director
        /// </summary>
        /// <param name="idDirector"> id of director </param>
        /// <returns> status delete </returns>
        public int DeleteSubDirectorById(int idDirector)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get myData (data type SubDirector)
                var myData = ctx.SubDirectors.Where(sd => sd.DirectorID == idDirector).ToList();
                
                //remove myData
                foreach (var item in myData)
                {
                    ctx.SubDirectors.Remove(item);
                }
                return ctx.SaveChanges();
            }
        }

        /// <summary>
        /// get all subdirector
        /// </summary>
        /// <returns> list subdirector </returns>
        public List<SubDirectorModel> GetAllSubDirector()
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list subdirector map to  SubDirectorModel
                var Mydata = ctx.SubDirectors.Select(sd => new SubDirectorModel
                {
                    FilmID = sd.FilmID,
                    DirectorID = sd.DirectorID
                }).ToList();
                // Create list SubDirectors to store Mydata
                List<SubDirectorModel> list = Mydata;
                return list;
            }
        }

        /// <summary>
        /// get subdirector by id director
        /// </summary>
        /// <param name="idDirector"> id of director </param>
        /// <returns> list subdirector </returns>
        public List<SubDirectorModel> GetSubDirectorByIdDirector(int idDirector)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list SubDirector and map to SubDirectorModel
                var MyData = ctx.SubDirectors.Where(sd => sd.DirectorID == idDirector).Select(data =>
                    new SubDirectorModel
                    {
                        FilmID = data.FilmID,
                        DirectorID = data.DirectorID
                    }).ToList();
                // Create list subActorModel to store Mydata
                List<SubDirectorModel> list = MyData;
                return list;
            }
        }

        /// <summary>
        /// get subdirector by id
        /// </summary>
        /// <param name="idFilm"></param>
        /// <returns> list director </returns>
        public List<SubDirectorModel> GetSubDirectorByIdFilm(int idFilm)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list SubDirector and map to SubDirectorModel
                var MyData = ctx.SubDirectors.Where(sd => sd.FilmID == idFilm).Select(data =>
                    new SubDirectorModel
                    {
                        FilmID = data.FilmID,
                        DirectorID = data.DirectorID
                    }).ToList();

                // Create list subDirectorModel to store Mydata
                List<SubDirectorModel> list = MyData;
                return list;
            }
        }

        #endregion

    }
}
