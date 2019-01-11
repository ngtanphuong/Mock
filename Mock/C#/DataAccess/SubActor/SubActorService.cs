using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.Models;

namespace DataAccess.SubActor
{
    public class SubActorService : ISubActor
    {
        #region property

        // datacontext
        private FilmDataContext ctx = null;

        // constructor
        public SubActorService() { }

        #endregion // end property

        #region Methods

        /// <summary>
        /// Delete a actor by Actor's id and Film's id
        /// </summary>
        /// <param name="idFilm"></param>
        /// <param name="idActor"></param>
        /// <returns></returns>
        public int DeleteSubActorById(int idActor)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get myData (data typte SubActor)
                var myData = ctx.SubActors.Where(sa => sa.ActorID == idActor).ToList();
                //remove myData
                foreach (var item in myData)
                {
                    ctx.SubActors.Remove(item);
                }
                return ctx.SaveChanges();
            }
        }

        /// <summary>
        /// Get All SubActor in database
        /// </summary>
        /// <returns></returns>
        public List<SubActorModel> GetAllSubActor()
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list subactor map to  SubActorModel
                var Mydata = ctx.SubActors.Select(sa => new SubActorModel
                {
                    ActorID = sa.ActorID,
                    FilmID = sa.FilmID
                }).ToList();
                // Create list subActorModel to store Mydata
                List<SubActorModel> list = Mydata;
                return list;
            }
        }

        /// <summary>
        /// Get subActor by Actor's id
        /// </summary>
        /// <param name="idActor"></param>
        /// <returns></returns>
        public List<SubActorModel> GetSubActorByIdActor(int idActor)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list SubActor and map to SubActorModel
                var MyData = ctx.SubActors.Where(sa => sa.ActorID == idActor).Select(data =>
                    new SubActorModel
                    {
                        ActorID = data.ActorID,
                        FilmID = data.FilmID
                    }).ToList();
                // Create list subActorModel to store Mydata
                List<SubActorModel> list = MyData;
                return list;
            }
        }

        /// <summary>
        /// Get subActor by Film's Id
        /// </summary>
        /// <param name="idFilm"></param>
        /// <returns></returns>
        public List<SubActorModel> GetSubActorByIdFilm(int idFilm)
        {
            // Connect to database
            using (ctx = new FilmDataContext())
            {
                // get list SubActor and map to SubActorModel
                var MyData = ctx.SubActors.Where(sa => sa.FilmID == idFilm).Select(data =>
                    new SubActorModel
                    {
                        ActorID = data.ActorID,
                        FilmID = data.FilmID
                    }).ToList();

                // Create list subActorModel to store Mydata
                List<SubActorModel> list = MyData;
                return list;
            }
        }

        /// <summary>
        /// Add a subActor to database
        /// </summary>
        /// <param name="subActor"></param>
        /// <returns></returns>
        public int AddSubActor(SubActorModel subActor)
        {
            // connect database
            using(ctx = new FilmDataContext())
            {
                // paramater subActor is null return -1
                if(subActor == null)
                {
                    return -1;
                }
                // Creating MySubActor and data is map to a subActor(SubActorModel)
                DataObject.EF.SubActor MySubActor = new DataObject.EF.SubActor
                {
                    ActorID = subActor.ActorID,
                    FilmID = subActor.FilmID
                };
                // add mySubActor to database
                ctx.SubActors.Add(MySubActor);
                return ctx.SaveChanges();
            }
        }
        #endregion // end region methods
    }
}
