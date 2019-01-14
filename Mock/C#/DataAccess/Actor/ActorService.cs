using System;
using System.Collections.Generic;
using DataObject;
using System.Linq;
using DataObject.EF;
using DataObject.Models;

namespace DataService.Actor
{
    public class ActorService : IActor
    {
        #region Property
        FilmDataContext ctx = null;
        #endregion

        #region Constructor
        public ActorService()
        {
        }
        #endregion

        #region Methods
        /// <summary>
        /// Add a new actor
        /// </summary>
        /// <param name="actor"></param>
        /// <returns></returns>
        public int AddNewActor(ActorModel actor)
        {
            using (ctx = new FilmDataContext())
            {
                if(actor == null)
                {
                    return -1;
                }
                //Create actor
                DataObject.EF.Actor _tActor = new DataObject.EF.Actor()
                {
                    ActorID = actor.ActorID,
                    ActorName = actor.ActorName,
                    Birthday = actor.Birthday,
                    Describe = actor.Describe,
                    Gender = actor.Gender,
                    Img = actor.Img,
                    Status = actor.Status
                };
                ctx.Actors.Add(_tActor);
                return ctx.SaveChanges();
            }
        }

        /// <summary>
        /// deleting a actor
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteActor(int id)
        {
            using (ctx = new FilmDataContext())
            {
                //find actor by id
                var item = ctx.Actors.Find(id);
                if (item != null)
                {
                    ctx.Actors.Remove(item);
                    return ctx.SaveChanges(); //ok
                }
            }
            //fail delete
            return -1;
        }

        /// <summary>
        /// Modify a actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ///PUT
        public int EditActor(int id, ActorModel actor)
        {
            using (ctx = new FilmDataContext())
            {
                var data = ctx.Actors.Where(a => a.ActorID == id).FirstOrDefault();
                if (data != null)
                {
                    data.ActorName = actor.ActorName;
                    data.Birthday = actor.Birthday;
                    data.Describe = actor.Describe;
                    data.Gender = actor.Gender;
                    data.Img = actor.Img;
                    data.Status = actor.Status;

                    return ctx.SaveChanges();
                }
            }
            return -1;
        }

        /// <summary>
        /// Finding a actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ActorModel FindActorByID(int id)
        {
            using (ctx = new FilmDataContext())
            {
                var myActor = ctx.Actors.Where(a => a.ActorID == id).Select(aa => new ActorModel
                {
                    ActorID = aa.ActorID,
                    ActorName = aa.ActorName,
                    Birthday = aa.Birthday,
                    Describe = aa.Describe,
                    Gender = aa.Gender,
                    Img = aa.Img,
                    Status = aa.Status
                });
                ActorModel data = myActor.FirstOrDefault();
                return data;
            }
        }

        /// <summary>
        /// Finding a actor by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<ActorModel> FindActorByName(string name)
        {
            using (ctx = new FilmDataContext())
            {
                var item = ctx.Actors.Where(p => p.ActorName.Contains(name)).Select(a => new ActorModel
                {
                    ActorID = a.ActorID,
                    ActorName = a.ActorName,
                    Status = a.Status,
                    Birthday = a.Birthday,
                    Describe = a.Describe,
                    Gender = a.Gender,
                    Img = a.Img
                }).ToList();
                return item;
            }
        }

        /// <summary>
        /// Getting all metadata actor from database by idActor
        /// </summary>
        /// <returns></returns>
        public List<ActorModel> GetAllListActor()
        {
            using (ctx = new FilmDataContext())
            {
                // get list actor
                var actor = ctx.Actors.Select(a => new ActorModel
                {
                    ActorID = a.ActorID,
                    ActorName = a.ActorName,
                    Birthday = a.Birthday,
                    Describe = a.Describe,
                    Gender = a.Gender,
                    Img = a.Img,
                    Status = a.Status
                }).ToList();
                // transfer
                List<ActorModel> list = actor;
                return list;
            }
        }

        /// <summary>
        /// this Method help you change the status's actor via id of this actor
        /// Example : status = true modify to false
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int EditStatusById(int id)
        {
            using (ctx = new FilmDataContext())
            {
                var editActor = ctx.Actors.Find(id);
                if (editActor != null)
                {
                    editActor.Status = !editActor.Status;
                    return ctx.SaveChanges();
                }
            }
            return -1;
        }
        #endregion
    }
}
