using DataAccess.Types;
using DataObject.EF;
using DataObject.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIAplication.Controllers
{
    //[EnableCors (origins: "http://localhost:4200", headers:"*", methods:"*")]
    public class TypesController : ApiController
    {
    
        /// <summary>
        /// Trả về danh sách thể loại
        /// </summary>
        // GET: api/Types/GetTypes
        public List<TypeFilmModel> GetTypes()
        {
            ServiceType sv = new ServiceType();
            return sv.GetListAll();
        }

        /// <summary>
        /// Trả về danh sách thể loại
        /// </summary>
        // GET: api/Types/GetFilmByTypes/id
        public List<FilmModel> GetFilmByTypes(int id)
        {
            ServiceType sv = new ServiceType();
            return sv.GetFilmByTypes(id);
        }

        ///<summary>
        /// Trả về thể loại theo ID
        ///</summary>
        // GET: api/Types/GetType/id
        public TypeFilmModel GetType(int id)
        {
            ServiceType sv = new ServiceType();
            return sv.FindById(id);
        }

        ///<summary>
        /// Trả về thể danh sách loại theo tên
        ///</summary>
        // GET: api/Types/GetTypeName
        public List<TypeFilmModel> GetTypeName(string name)
        {
            ServiceType sv = new ServiceType();
            return sv.FindByeName(name);
        }

        ///<summary>
        /// Thêm thể loại
        ///</summary>
        //POST: api/Types/InsertType
        [HttpPost]
        public int InsertType(TypeFilmModel typeFilm)
        {
            ServiceType sv = new ServiceType();
            return sv.AddNewType(typeFilm);
        }

        ///<summary>
        /// Sửa thể loại
        ///</summary>
        //PUT: api/Types/UpdateType
        [HttpPut]
        public void UpdateType(TypeFilmModel typeFilm)
        {
            ServiceType sv = new ServiceType();
            var edit = sv.EditType(typeFilm);
        }


        ///<summary>
        /// Xóa thể loại
        ///</summary>
        //Delete: api/Types/DeleteType
        [HttpDelete]
        public void DeleteType(int id)
        {
            ServiceType sv = new ServiceType();
            var delete = sv.DeleteType(id);
        }
    }
}
