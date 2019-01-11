using DataObject;
using DataObject.Models;
using DataService.Film;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataService.Film
{
    /// <summary>
    /// Kiểm soát hoạt động liên quan đến phim : kế thừa interface Film
    /// </summary>
    public class ServiceFilm : InterfaceFilm
    {
        FilmDataContext database = null;

        /// <summary>
        /// Khởi tạo chuỗi kết nối
        /// </summary>
        public ServiceFilm()
        {
            database = new FilmDataContext();
        }

        /// <summary>
        /// Thêm mới phim
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        public int AddNewFilm(FilmModel film)
        {
            if (film == null)
            {
                return -1;
            }
            //Create actor
            DataObject.EF.Film _tFilm = new DataObject.EF.Film()
            {
                FilmID = film.FilmID,
                FilmName = film.FilmName,
                Rate = film.Rate,
                Describe = film.Describe,
                Year = film.Year,
                Img = film.Img,
                Status = film.Status
            };
            database.Films.Add(_tFilm);
            return database.SaveChanges();
        }

        /// <summary>
        /// Xóa phim
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteFilm(int id)
        {
            // tìm phim theo ID
            var select = database.Films.Find(id);

            // kiểm tra tìm thấy phim hay không
            if (select != null)
            {
                // xóa film
                database.Films.Remove(select);

                // trả về 1 nếu thành công, 0 nếu thất bại
                return database.SaveChanges();
            }

            // trả về 0 nếu NULL 
            return 0;
        }

        /// <summary>
        /// Chỉnh sửa phim
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int EditFilm(FilmModel film)
        {

            // tìm kiếm phim theo ID
            var select = database.Films.Where(f => f.FilmID == film.FilmID).FirstOrDefault();

            // tìm kiếm phim có hay không?
            if (select != null)
            {
                // update
                select.FilmName = film.FilmName;
                select.Describe = film.Describe;
                select.Rate = film.Rate;
                select.Year = film.Year;
                select.Img = film.Img;
                select.Status = film.Status;

                // return database
                return database.SaveChanges();
            }
            else
            {
                return 0;
            }
        }

        /// <summary>
        /// Tìm phim bằng ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public FilmModel FindFilmByID(int id)
        {
            // tìm kiếm phim bằng ID và trả về
            var myFilm = database.Films.Where(a => a.FilmID == id).Select(a => new FilmModel
            {
                FilmID = a.FilmID,
                FilmName = a.FilmName,
                Rate = a.Rate,
                Describe = a.Describe,
                Year = a.Year,
                Img = a.Img,
                Status = a.Status,
                // thể loại phim
                TypeFilms = (from type in database.TypeFilms
                             join sub in database.SubTypes
                             on type.TypeID equals sub.TypeID
                             where sub.FilmID == a.FilmID
                             select new TypeFilmModel
                             {
                                 TypeID = type.TypeID,
                                 NameType = type.NameType
                             }).ToList(),
                // diễn viên tham gia
                Actors = (from actor in database.Actors
                          join sub in database.SubActors
                          on actor.ActorID equals sub.ActorID
                          where sub.FilmID == a.FilmID
                          select new ActorModel
                          {
                              ActorID = actor.ActorID,
                              ActorName = actor.ActorName,
                              Birthday = actor.Birthday,
                              Describe = actor.Describe,
                              Gender = actor.Gender,
                              Img = actor.Img,
                              Status = actor.Status
                          }).ToList(),
                // đạo diễn
                Directors = (from director in database.Directors
                             join sub in database.SubDirectors
                             on director.DirectorID equals sub.DirectorID
                             where sub.FilmID == a.FilmID
                             select new DirectorModel
                             {
                                 DirectorBirthday = director.DirectorBirthday,
                                 DirectorDescribe = director.DirectorDescribe,
                                 DirectorGender = director.DirectorGender,
                                 DirectorID = director.DirectorID,
                                 DirectorImg = director.DirectorImg,
                                 DirectorName = director.DirectorName,
                                 DirectorStatus = director.DirectorStatus
                             }).ToList()
            });
            FilmModel data = myFilm.FirstOrDefault();
            return data;
        }

        /// <summary>
        /// Tìm phim bằng tên
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        public List<FilmModel> FindFilmByName(string name)
        {
            // tìm kiếm phim có tên gần giống và trả về list
            var film = database.Films.Where(p => p.FilmName.Contains(name)).Select(a => new FilmModel
            {
                FilmID = a.FilmID,
                FilmName = a.FilmName,
                Status = a.Status,
                Year = a.Year,
                Describe = a.Describe,
                Rate = a.Rate,
                Img = a.Img,
                // thể loại phim
                TypeFilms = (from type in database.TypeFilms
                             join sub in database.SubTypes
                             on type.TypeID equals sub.TypeID
                             where sub.FilmID == a.FilmID
                             select new TypeFilmModel
                             {
                                 TypeID = type.TypeID,
                                 NameType = type.NameType
                             }).ToList(),
                // diễn viên tham gia
                Actors = (from actor in database.Actors
                          join sub in database.SubActors
                          on actor.ActorID equals sub.ActorID
                          where sub.FilmID == a.FilmID
                          select new ActorModel
                          {
                              ActorID = actor.ActorID,
                              ActorName = actor.ActorName,
                              Birthday = actor.Birthday,
                              Describe = actor.Describe,
                              Gender = actor.Gender,
                              Img = actor.Img,
                              Status = actor.Status
                          }).ToList(),
                // đạo diễn
                Directors = (from director in database.Directors
                             join sub in database.SubDirectors
                             on director.DirectorID equals sub.DirectorID
                             where sub.FilmID == a.FilmID
                             select new DirectorModel
                             {
                                 DirectorBirthday = director.DirectorBirthday,
                                 DirectorDescribe = director.DirectorDescribe,
                                 DirectorGender = director.DirectorGender,
                                 DirectorID = director.DirectorID,
                                 DirectorImg = director.DirectorImg,
                                 DirectorName = director.DirectorName,
                                 DirectorStatus = director.DirectorStatus
                             }).ToList()

            }).ToList();
            return film;
        }

        /// <summary>
        /// Lấy toàn bộ list phim
        /// </summary>
        /// <returns></returns>
        public List<FilmModel> GetAllListFilm()
        {
            // trả về list phim
            return database.Films.Select(a => new FilmModel
            {
                FilmID = a.FilmID,
                FilmName = a.FilmName,
                Status = a.Status,
                Year = a.Year,
                Describe = a.Describe,
                Rate = a.Rate,
                Img = a.Img,
                // thể loại phim
                TypeFilms = (from type in database.TypeFilms
                             join sub in database.SubTypes
                             on type.TypeID equals sub.TypeID
                             where sub.FilmID == a.FilmID
                             select new TypeFilmModel
                             {
                                 TypeID = type.TypeID,
                                 NameType = type.NameType
                             }).ToList(),
                // diễn viên tham gia
                Actors = (from actor in database.Actors
                          join sub in database.SubActors
                          on actor.ActorID equals sub.ActorID
                          where sub.FilmID == a.FilmID
                          select new ActorModel
                          {
                              ActorID = actor.ActorID,
                              ActorName = actor.ActorName,
                              Birthday = actor.Birthday,
                              Describe = actor.Describe,
                              Gender = actor.Gender,
                              Img = actor.Img,
                              Status = actor.Status
                          }).ToList(),
                // đạo diễn
                Directors = (from director in database.Directors
                             join sub in database.SubDirectors
                             on director.DirectorID equals sub.DirectorID
                             where sub.FilmID == a.FilmID
                             select new DirectorModel
                             {
                                 DirectorBirthday = director.DirectorBirthday,
                                 DirectorDescribe = director.DirectorDescribe,
                                 DirectorGender = director.DirectorGender,
                                 DirectorID = director.DirectorID,
                                 DirectorImg = director.DirectorImg,
                                 DirectorName = director.DirectorName,
                                 DirectorStatus = director.DirectorStatus
                             }).ToList()

            }).ToList();
        }

        /// <summary>
        /// Chỉnh sửa trạng thái phim
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int EditStatustFilm(int id)
        {
            // tìm kiếm phim theo ID
            var select = database.Films.Where(f => f.FilmID == id).FirstOrDefault();

            // tìm kiếm phim có hay không?
            if (select != null)
            {
                // update
                select.Status = !select.Status;

                // return database
                return database.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
    }
}
