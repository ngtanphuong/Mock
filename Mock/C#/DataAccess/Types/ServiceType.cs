using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.EF;
using DataObject.Models;

namespace DataAccess.Types
{

    /// <summary>
    /// kế thừa interface Type
    /// </summary>
    public class ServiceType : InterfaceType
    {
        FilmDataContext db = null;

        ///<summary>
        /// Khởi tạo chuỗi kết nối
        ///</summary>
        public ServiceType()
        {
            db = new FilmDataContext();
        }

        ///<summary>
        /// Thêm mới
        ///</summary>
        public int AddNewType(TypeFilmModel typeFilm)
        {
            if (typeFilm == null)
            {
                return -1;
            }
            //Create actor
            DataObject.EF.TypeFilm _tType = new DataObject.EF.TypeFilm()
            {
                NameType = typeFilm.NameType,
                TypeID = typeFilm.TypeID
            };
            db.TypeFilms.Add(_tType);
            return db.SaveChanges();
        }

        ///<summary>
        /// Xóa
        ///</summary>
        public int DeleteType(int id)
        {
            var select = db.TypeFilms.Where(t => t.TypeID == id).FirstOrDefault();

            if (select != null)
            {
                db.TypeFilms.Remove(select);
                return db.SaveChanges();

            }
            return 0;
        }

        ///<summary>
        /// Sửa
        ///</summary>
        public int EditType(TypeFilmModel typeFilm)
        {
            var select = db.TypeFilms.Where(f => f.TypeID == typeFilm.TypeID).FirstOrDefault();

            // tìm kiếm phim có hay không?
            if (select != null)
            {
                // update
                select.NameType = typeFilm.NameType;

                // return db
                return db.SaveChanges();
            }
            else
            {
                return 0;
            }
        }

        ///<summary>
        /// Tìm thể loại theo tên
        ///</summary>
        public List<TypeFilmModel> FindByeName(string name)
        {
            var item = db.TypeFilms.Where(p => p.NameType.Contains(name)).Select(a => new TypeFilmModel
            {
                NameType = a.NameType,
                TypeID = a.TypeID
            }).ToList();
            return item;
        }

        ///<summary>
        /// Tìm thể loại theo id
        ///</summary>
        public TypeFilmModel FindById(int id)
        {
            var myType = db.TypeFilms.Where(a => a.TypeID == id).Select(aa => new TypeFilmModel
            {
                NameType = aa.NameType,
                TypeID = aa.TypeID
            });
            TypeFilmModel data = myType.FirstOrDefault();
            return data;
        }

        ///<summary>
        /// Trả về danh sách thể loại
        ///</summary>
        public List<TypeFilmModel> GetListAll()
        {
            // Danh sách thể loại
            var type = db.TypeFilms.Select(a => new TypeFilmModel
            {
                TypeID = a.TypeID,
                NameType = a.NameType,

            }).ToList();
            // transfer
            // List<TypeFilmModel> list = type;
            return type;
        }

        ///<summary>
        /// Trả về danh sách phim theo thể loại
        ///</summary>
        public List<FilmModel> GetFilmByTypes(int id)
        {
            var lstFilm = (from film in db.Films
                           join sub in db.SubTypes
                           on film.FilmID equals sub.FilmID
                           where sub.TypeID == id
                           select new FilmModel
                           {
                               FilmID = film.FilmID,
                               FilmName = film.FilmName,
                               Status = film.Status,
                               Year = film.Year,
                               Describe = film.Describe,
                               Rate = film.Rate,
                               Img = film.Img,
                               // thể loại phim
                               TypeFilms = (from type in db.TypeFilms
                                            join sub in db.SubTypes
                                            on type.TypeID equals sub.TypeID
                                            where sub.FilmID == film.FilmID
                                            select new TypeFilmModel
                                            {
                                                TypeID = type.TypeID,
                                                NameType = type.NameType
                                            }).ToList(),
                               // diễn viên tham gia
                               Actors = (from actor in db.Actors
                                         join sub in db.SubActors
                                         on actor.ActorID equals sub.ActorID
                                         where sub.FilmID == film.FilmID
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
                               Directors = (from director in db.Directors
                                            join sub in db.SubDirectors
                                            on director.DirectorID equals sub.DirectorID
                                            where sub.FilmID == film.FilmID
                                            select new DirectorModel
                                            {
                                                DirectorBirthday = director.DirectorBirthday,
                                                DirectorDescribe = director.DirectorDescribe,
                                                DirectorGender = director.DirectorGender,
                                                DirectorID = director.DirectorID,
                                                DirectorImg = director.DirectorImg,
                                                DirectorName = director.DirectorName,
                                                DirectorStatus = director.DirectorStatus
                                            }).ToList(),
                           }).ToList();

            return lstFilm;
        }
    }
}
