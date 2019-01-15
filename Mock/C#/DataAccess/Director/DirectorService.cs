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
                // Add director
                ctx.Directors.Add(addDirector);
                // return 1 if success, 0 if fail
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
            return 0;
        }

        /// <summary>
        /// Remove director
        /// </summary>
        /// <param name="director"> director </param>
        /// <returns> status remove </returns>
        public int RemoveDirector(DirectorModel director)
        {
            using (FilmDataContext database = new FilmDataContext())
            {
                if (director == null)
                {
                    return -1;
                }
                else
                {
                    DataObject.EF.Director _tDirector = new DataObject.EF.Director()
                    {
                        DirectorStatus = director.DirectorStatus,
                        DirectorBirthday = director.DirectorBirthday,
                        DirectorDescribe = director.DirectorDescribe,
                        DirectorGender = director.DirectorGender,
                        DirectorID = director.DirectorID,
                        DirectorImg = director.DirectorImg,
                        DirectorName = director.DirectorName
                    };
                    // Remove director 
                    database.Directors.Remove(_tDirector);

                    // return status add ( return 1 if success, 0 if fail
                    return database.SaveChanges();
                }
            }
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

        /// <summary>
        /// Lấy director phim cua phim đang tìm
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<DirectorModel> GetAllListDirectorByFilmID(int id)
        {
            return (from directors in ctx.Directors
                    where (from sub in ctx.SubDirectors where sub.FilmID == id select sub.DirectorID).Contains(directors.DirectorID)
                    select new DirectorModel
                    {
                        DirectorID = directors.DirectorID,
                        DirectorBirthday = directors.DirectorBirthday,
                        DirectorDescribe = directors.DirectorDescribe,
                        DirectorGender = directors.DirectorGender,
                        DirectorImg = directors.DirectorImg,
                        DirectorName = directors.DirectorName,
                        DirectorStatus = directors.DirectorStatus
                    }).ToList();
        }


        /// <summary>
        /// Lấy những director không thuộc phim đang tìm
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<DirectorModel> GetAllListDirectorNotInFilmByFilmID(int id)
        {
            return (from directors in ctx.Directors
                    where !(from sub in ctx.SubDirectors where sub.FilmID == id select sub.DirectorID).Contains(directors.DirectorID)
                    select new DirectorModel
                    {
                        DirectorID = directors.DirectorID,
                        DirectorBirthday = directors.DirectorBirthday,
                        DirectorDescribe = directors.DirectorDescribe,
                        DirectorGender = directors.DirectorGender,
                        DirectorImg = directors.DirectorImg,
                        DirectorName = directors.DirectorName,
                        DirectorStatus = directors.DirectorStatus
                    }).ToList();
        }



        /// <summary>
        /// Thêm mới director
        /// </summary>
        /// <param name="filmID"></param>
        /// <param name="typeID"></param>
        /// <returns></returns>
        public int AddDirectorForFilm(int filmID, int directorID)
        {
            SubDirector sub = new SubDirector()
            {
                FilmID = filmID,
                DirectorID = directorID
            };

            ctx.SubDirectors.Add(sub);

            return ctx.SaveChanges();
        }


        /// <summary>
        /// Xóa Director
        /// </summary>
        /// <param name="filmID"></param>
        /// <param name="typeID"></param>
        /// <returns></returns>
        public int RemoveDirectorForFilm(int filmID, int directorID)
        {
            var sub = ctx.SubDirectors.Where(s => s.FilmID == filmID && s.DirectorID == directorID).FirstOrDefault();
            ctx.SubDirectors.Remove(sub);

            return ctx.SaveChanges();
        }
    }
}
