using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.EF;
using DataObject.Models;

namespace DataAccess.User
{
    public class UserServices : IUserServices
    {
       
        public int AddUser(UserModel user)
        {
            using (FilmDataContext ctx =new FilmDataContext())
            {
                if (user == null)
                {
                    return -1;
                }
                //Create actor
                DataObject.EF.User _tUser = new DataObject.EF.User()
                {
                    UserID = user.UserID,
                    UserName = user.UserName,
                    Birthday = user.Birthday,
                    Email = user.Email,
                    Gender = user.Gender,
                    Phone = user.Phone,
                    Name = user.Name,
                    Password =user.Password,
                    isAdmin = user.isAdmin,
                    status = true
                   
                    // AccessDate = user.AccessDate,
                    // AccessToken = user.AccessToken
                };
                ctx.Users.Add(_tUser);
                return ctx.SaveChanges();
            }
        }

        public int EditUser(int id, UserModel user)
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                DataObject.EF.User userToEdit = new DataObject.EF.User();
                userToEdit = ctx.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (userToEdit != null)
                {
                    userToEdit.UserName = user.UserName;
                    userToEdit.Name = user.Name;
                    userToEdit.Password = user.Password;
                    userToEdit.Phone = user.Phone;
                    userToEdit.Birthday = user.Birthday;
                    userToEdit.Gender = user.Gender;
                    userToEdit.isAdmin = user.isAdmin;
                    userToEdit.status = user.status;
                    
                    return ctx.SaveChanges();
                }
                else return 0;
            }
        }
        public int DeleteUserForever(int id)
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                DataObject.EF.User userToDelete = ctx.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (userToDelete != null)
                {
                    ctx.Users.Remove(userToDelete);
                    return ctx.SaveChanges();
                }
                else return 0;
                
               
            }
        }

        public int DeleteUser(int id)
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                DataObject.EF.User userToDelete = ctx.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (userToDelete != null)
                {
                    userToDelete.status = false;
                    return ctx.SaveChanges();
                }
                else return 0;
            }
        }

        public List<UserModel> GetAllUsers()
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                var user = ctx.Users.Where(u => u.status == true).Select(a => new UserModel
                {
                    UserID = a.UserID,
                    UserName = a.UserName,
                    Birthday = a.Birthday,
                    Email = a.Email,
                    Gender = a.Gender,
                    Phone = a.Phone,
                    Name = a.Name,
                    Password = a.Password,
                    isAdmin = a.isAdmin,
                    filmModel = (from film in ctx.Films
                                join sub in ctx.SubUsers
                                on film.FilmID equals sub.FilmID
                                where sub.UserID == a.UserID
                                select new FilmModel
                                {
                                    FilmID = film.FilmID,
                                    FilmName = film.FilmName,
                                    Describe = film.Describe,
                                    Rate = film.Rate,
                                    Year = film.Year,
                                    Img = film.Img,
                                    Status = film.Status,
                                    //// thể loại phim
                                    //TypeFilms = (from type in ctx.TypeFilms
                                    //             join sub in ctx.SubTypes
                                    //             on type.TypeID equals sub.TypeID
                                    //             where sub.FilmID == film.FilmID
                                    //             select new TypeFilmModel
                                    //             {
                                    //                 TypeID = type.TypeID,
                                    //                 NameType = type.NameType
                                    //             }).ToList(),
                                    //// diễn viên tham gia
                                    //Actors = (from actor in ctx.Actors
                                    //          join sub in ctx.SubActors
                                    //          on actor.ActorID equals sub.ActorID
                                    //          where sub.FilmID == film.FilmID
                                    //          select new ActorModel
                                    //          {
                                    //              ActorID = actor.ActorID,
                                    //              ActorName = actor.ActorName,
                                    //              Birthday = actor.Birthday,
                                    //              Describe = actor.Describe,
                                    //              Gender = actor.Gender,
                                    //              Img = actor.Img,
                                    //              Status = actor.Status
                                    //          }).ToList(),
                                    //// đạo diễn
                                    //Directors = (from director in ctx.Directors
                                    //             join sub in ctx.SubDirectors
                                    //             on director.DirectorID equals sub.DirectorID
                                    //             where sub.FilmID == film.FilmID
                                    //             select new DirectorModel
                                    //             {
                                    //                 DirectorBirthday = director.DirectorBirthday,
                                    //                 DirectorDescribe = director.DirectorDescribe,
                                    //                 DirectorGender = director.DirectorGender,
                                    //                 DirectorID = director.DirectorID,
                                    //                 DirectorImg = director.DirectorImg,
                                    //                 DirectorName = director.DirectorName,
                                    //                 DirectorStatus = director.DirectorStatus
                                    //             }).ToList()
                                }).ToList()
                    //,AccessDate = user.AccessDate,
                    //AccessToken = user.AccessToken
                }).ToList();
                // transfer
                //List<UserModel> list = user;
                return user;
            }
        }

        public UserModel GetUserById(int id)
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                var myUser = ctx.Users.Where(a => a.UserID == id).Select(aa => new UserModel
                {
                    UserID = aa.UserID,
                    UserName = aa.UserName,
                    Birthday = aa.Birthday,
                    Email = aa.Email,
                    Gender = aa.Gender,
                    Phone = aa.Phone,
                    Name = aa.Name,
                    Password = aa.Password,
                    isAdmin = aa.isAdmin
                    //,AccessDate = user.AccessDate,
                    //AccessToken = user.AccessToken
                });
                UserModel data = myUser.FirstOrDefault();
                return data;
            }
        }

        public int setRole(int id, bool admin)
        {
            using (FilmDataContext ctx = new FilmDataContext())
            {
                DataObject.EF.User user = ctx.Users.Where(u => u.UserID == id).FirstOrDefault();
                if (user != null)
                {
                    user.isAdmin = admin;
                    return ctx.SaveChanges();
                }
                else return 0;
            }
        }
    }
}
