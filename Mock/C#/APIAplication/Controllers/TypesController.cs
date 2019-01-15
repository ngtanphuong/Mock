using APIAplication.Models;
using DataAccess.Types;
using DataObject.EF;
using DataObject.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIAplication.Controllers
{
    //[EnableCors (origins: "http://localhost:4200", headers:"*", methods:"*")]
    [BasicAuthentication]
    public class TypesController : ApiController
    {
        // khởi tạo type
        ServiceType sv = new ServiceType();
        /// <summary>
        /// Trả về danh sách thể loại
        /// </summary>
        // GET: api/Types/GetTypes
        public IHttpActionResult GetTypes()
        {
            var select = sv.GetListAll();

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }

        ///<summary>
        /// Trả về thể loại theo ID
        ///</summary>
        // GET: api/Types/GetType/id
        public IHttpActionResult GetType(int id)
        {        
            var select = sv.FindById(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }

        ///<summary>
        /// Trả về thể danh sách loại theo tên
        ///</summary>
        // GET: api/Types/GetTypeName
        public IHttpActionResult GetTypeName(string name)
        {         
            var select = sv.FindByeName(name);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }

        ///<summary>
        /// Thêm thể loại
        ///</summary>
        //POST: api/Types/InsertType
        [HttpPost]
        public IHttpActionResult InsertType([FromBody] TypeFilmModel typeFilm)
        {

            if (typeFilm != null)
            {
                var insert = sv.AddNewType(typeFilm);
                return Ok(insert);
            }
            else
            {
                return BadRequest("Thêm thể loại thất bại !!!");
            }
        }

        ///<summary>
        /// Sửa thể loại
        ///</summary>
        //POST: api/Types/UpdateType
        [HttpPost]
        public IHttpActionResult UpdateType([FromBody] TypeFilmModel typeFilm)
        {                
            if (typeFilm != null)
            {
                var update = sv.EditType(typeFilm);
                return Ok(update);
            }
            else
            {
                return BadRequest("Sửa thể loại thất bại !!!");
            }
        }


        ///<summary>
        /// Xóa thể loại
        ///</summary>
        //Delete: api/Types/DeleteType
        [HttpDelete]
        public IHttpActionResult DeleteType(int id)
        {           
            var delete = sv.DeleteType(id);
            return Ok(delete);
        }


        /// <summary>
        /// Trả về danh sách phim theo thể loại
        /// </summary>
        // GET: api/Types/GetFilmByTypes/id
        public IHttpActionResult GetFilmByTypes(int id)
        {
            var select = sv.GetFilmByTypes(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }

        }

        //----------------------------------------PhatLA UPDATE CODE--------------------------------------------------

        [HttpGet]
        [Route("api/Types/GetAllListTypeByFilmID/{id}")]
        public IHttpActionResult GetAllListTypeByFilmID(int id)
        {
            ServiceType serviceType = new ServiceType();
            var select = serviceType.GetAllListTypeByFilmID(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return BadRequest("Không tìm thấy thể loại phim");
            }
        }

        [HttpGet]
        [Route("api/Types/GetAllListTypeNotInFilmByFilmID/{id}")]
        public IHttpActionResult GetAllListTypeNotInFilmByFilmID(int id)
        {
            ServiceType serviceType = new ServiceType();
            var select = serviceType.GetAllListTypeNotInFilmByFilmID(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return BadRequest("Không tìm thấy thể loại phim");
            }
        }

        [HttpPost]
        [Route("api/Types/AddNewTypeForFilm/")]
        public IHttpActionResult AddNewTypeForFilm(AddTypeFilm model)
        {
            ServiceType serviceType = new ServiceType();
            var add = serviceType.AddTypeForFilm(model.FilmID, model.TypeID);

            if (add >= 1)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Thêm tyle thất bại");
            }
        }

        [HttpPost]
        [Route("api/Types/RemoveTypeForFilm/")]
        public IHttpActionResult RemoveTypeForFilm(AddTypeFilm model)
        {
            ServiceType serviceType = new ServiceType();
            var add = serviceType.RemoveTypeForFilm(model.FilmID, model.TypeID);

            if (add >= 1)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Thêm tyle thất bại");
            }
        }
    }

    public class AddTypeFilm
    {
        public int FilmID { get; set; }
        public int TypeID { get; set; }
    }

}
