#define Debug_  //PhatLA test

using DataService.Film;
using DataObject.EF;
using System.Web.Http;
using System.Collections.Generic;
// using tự sinh ????
using HttpGetAttribute = System.Web.Http.HttpGetAttribute;
using System.Threading;
using APIAplication.Models;
using DataObject.Models;

namespace APIAplication.Controllers
{
    /// <summary>
    /// APIController Phim - kiểm soát toàn bộ hoạt động liên quan đến phim
    /// </summary>
    [BasicAuthentication]
    public class FilmController : ApiController
    {

        /// <summary>
        /// GET:  lấy toàn bộ list phim
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/film/GetAllListFilm")]
        public IHttpActionResult GetAllListFilm()
        {
            //string userName = Thread.CurrentPrincipal.Identity.Name;

            // khởi tạo server film
            ServiceFilm serviceFilm = new ServiceFilm();
            // lấy toàn bộ list phim
            var select = serviceFilm.GetAllListFilm();

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }


        /// <summary>
        /// GET: tìm phim theo tên
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/film/FindFilmByName/{name}")]
        public IHttpActionResult FindFilmByName(string name)
        {
            // khởi tạo server film
            ServiceFilm serviceFilm = new ServiceFilm();
            // lấy về phim có tên gần giống
            var select = serviceFilm.FindFilmByName(name);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }


        /// <summary>
        /// GET: tìm phim theo id
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/film/findfilmbyid/{id}")]
        public IHttpActionResult FindFilmByID(int id)
        {
            // khởi tạo server film
            ServiceFilm serviceFilm = new ServiceFilm();
            // lấy về phim có id giống với id cần tìm
            var select = serviceFilm.FindFilmByID(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return NotFound();
            }
        }


        /// <summary>
        /// Thêm phim mới
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/film/AddNewFilm/")]
        public IHttpActionResult AddNewFilm([FromBody]FilmModel film)
        {
#if Debug_
            // kiểm tra phim thêm mới có null hay không
            if (film != null)
            {
#endif
                // khởi tạo server film
                ServiceFilm serviceFilm = new ServiceFilm();
                // thêm phim mới
                var add = serviceFilm.AddNewFilm(film);

                // thêm mới thành công hay thất bại?
                if (add > 0)
                {
                    return Ok(film);
                }
                else
                {
                    return BadRequest("Thêm mới phim thất bại");
                }
#if Debug_
            }
            else
            {
                return BadRequest("Phim thêm mới đang bị NULL");
            }
#endif
        }


        /// <summary>
        /// Xóa phim theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/film/DeleteFilm/{id}")]
        public IHttpActionResult DeleteFilm(int id)
        {
            // khởi tạo server film
            ServiceFilm serviceFilm = new ServiceFilm();
            // xóa phim theo ID
            var delete = serviceFilm.DeleteFilm(id);
            // xóa thành công hay thất bại?
            if (delete > 0)
            {
                return Ok(delete);
            }
            else
            {
                return BadRequest("Xóa phim thất bại");
            }
        }


        /// <summary>
        /// Chỉnh sữa phim
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/film/EditFilm/")]
        public IHttpActionResult EditFilm([FromBody]FilmModel film)
        {
#if Debug_
            if (film != null)
            {
#endif
                // khởi tạo server film
                ServiceFilm serviceFilm = new ServiceFilm();
                // chỉnh sửa phim
                var edit = serviceFilm.EditFilm(film);
                // chỉnh sửa thành công hay thất bại?
                if (edit > 0)
                {
                    return Ok(film);
                }
                else
                {
                    return BadRequest("Chỉnh sữa thất bại");
                }
#if Debug_
            }
            else
            {
                return BadRequest("Phim muốn xóa đang bị NULL");
            }
#endif
        }

        /// <summary>
        /// Cập nhật trạng thái phim
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/film/EditStatustFilm/{id}")]
        public IHttpActionResult EditStatustFilm(int id)
        {
            // khởi tạo server film
            ServiceFilm serviceFilm = new ServiceFilm();
            // xóa phim theo ID
            var delete = serviceFilm.EditStatustFilm(id);
            // xóa thành công hay thất bại?
            if (delete > 0)
            {
                return Ok(delete);
            }
            else
            {
                return BadRequest("Xóa phim thất bại");
            }
        }

        // Note Update: tìm phim theo tên đạo diễn, diễn viên
    }
}
