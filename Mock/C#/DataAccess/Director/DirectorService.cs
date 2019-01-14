using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.EF;
using DataObject.Models;

namespace DataService.Director
{
    public class DirectorService : IDirector
    {
        FilmDataContext ctx = null;

        public DirectorService()
        {
            ctx = new FilmDataContext();
        }

        /// <summary>
        /// get all director of list
        /// </summary>
        /// <returns> list of director </returns>
        public List<DirectorModel> GetAllDirectors()
        {
            using (ctx = new FilmDataContext())
            {
                // get list director
                var lstDir = ctx.Directors.Select(dir => new DirectorModel
                {
                    DirectorID = dir.DirectorID,
                    DirectorName = dir.DirectorName,
                    DirectorBirthday = dir.DirectorBirthday,
                    DirectorGender = dir.DirectorGender,
                    DirectorImg = dir.DirectorImg,
                    DirectorStatus = dir.DirectorStatus,
                    DirectorDescribe = dir.DirectorDescribe
                }).ToList();
                // transfer
                List<DirectorModel> list = lstDir;
                return list;
            }
        }

        /// <summary>
        /// Get director by id
        /// </summary>
        /// <param name="id"> id of director</param>
        /// <returns> director </returns>
        public DirectorModel GetDirectorByID(int id)
        {
            using (ctx = new FilmDataContext())
            {
                // get list director
                var myDirector = ctx.Directors.Where(d => d.DirectorID == id).Select(dir => new DirectorModel
                {
                    DirectorID = dir.DirectorID,
                    DirectorName = dir.DirectorName,
                    DirectorBirthday = dir.DirectorBirthday,
                    DirectorGender = dir.DirectorGender,
                    DirectorImg = dir.DirectorImg,
                    DirectorStatus = dir.DirectorStatus,
                    DirectorDescribe = dir.DirectorDescribe
                });
                // transfer
                DirectorModel data = myDirector.FirstOrDefault();
                return data;
            }
        }

        /// <summary>
        /// Add new director
        /// </summary>
        /// <param name="director"> director </param>
        /// <returns> status add </returns>
        public int AddNewDirector(DirectorModel director)
        {
            using (ctx = new FilmDataContext())
            {
                if (director == null)
                {
                    return -1;
                }

                //Create director
                DataObject.EF.Director addDirector = new DataObject.EF.Director()
                {
                    DirectorID = director.DirectorID,
                    DirectorName = director.DirectorName,
                    DirectorGender = director.DirectorGender,
                    DirectorBirthday = director.DirectorBirthday,
                    DirectorImg = director.DirectorImg,
                    DirectorStatus = director.DirectorStatus,
                    DirectorDescribe = director.DirectorDescribe
                };
                ctx.Directors.Add(addDirector);
                return ctx.SaveChanges();
            }
        }


        /// <summary>
        /// Remove director by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns> result status </returns>
        public int RemoveDirectorByID(int id)
        {
            using (ctx = new FilmDataContext())
            {
                //find director by id
                var item = ctx.Directors.Find(id);
                if (item != null)
                {
                    // Delete director
                    ctx.Directors.Remove(item);

                    // Return 1 if success, 0 if fail
                    return ctx.SaveChanges();
                }
            }
            //fail delete
            return -1;
        }

        /// <summary>
        /// PUT: edit a director
        /// </summary>
        /// <param name="id"> id of director </param>
        /// <param name="director"> director </param>
        /// <returns> result status </returns>
        public int UpdateDirector(DirectorModel director)
        {
            if (director == null)
            {
                return -1;
            }

            // search director by ID
            var select = ctx.Directors.Where(d => d.DirectorID == director.DirectorID).SingleOrDefault();

            if (select != null)
            {
                // update

                select.DirectorID = director.DirectorID;
                select.DirectorName = director.DirectorName;
                select.DirectorBirthday = director.DirectorBirthday;
                select.DirectorGender = director.DirectorGender;
                select.DirectorDescribe = director.DirectorDescribe;
                select.DirectorStatus = director.DirectorStatus;
                select.DirectorImg = director.DirectorImg;

                // return 1 if update success, 0 if update fail
                return ctx.SaveChanges();
            }

            return -1;
        }

        /// <summary>
        /// Find directors by name
        /// </summary>
        /// <param name="name"> name of director </param>
        /// <returns> list director </returns>
        public List<DirectorModel> FindDirectorByName(string name)
        {
            // find director by name
            return ctx.Directors.Where(d => d.DirectorName.Contains(name)).Select(dir => new DirectorModel
            {
                DirectorID = dir.DirectorID,
                DirectorName = dir.DirectorName,
                DirectorBirthday = dir.DirectorBirthday,
                DirectorGender = dir.DirectorGender,
                DirectorDescribe = dir.DirectorDescribe,
                DirectorStatus = dir.DirectorStatus,
                DirectorImg = dir.DirectorImg

            }).ToList();
        }


        /// <summary>
        /// Update director status by ID
        /// </summary>
        /// <param name="id"> id of director </param>
        /// <returns> result of update </returns>
        public int UpdateStatusDirectorByID(int id)
        {

            using (ctx = new FilmDataContext())
            {
                // search director by ID
                var editDirector = ctx.Directors.Find(id);
                if (editDirector != null)
                {
                    editDirector.DirectorStatus = !editDirector.DirectorStatus;
                    // return status update
                    return ctx.SaveChanges();
                }
            }
            // Update fail
            return -1;
        }

    }
}
