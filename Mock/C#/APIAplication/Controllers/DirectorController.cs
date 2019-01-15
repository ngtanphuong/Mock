using DataObject;
using DataObject.EF;
using DataObject.Models;
using DataService.Director;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace APIAplication.Controllers
{
    public class DirectorController : ApiController
    {
        //    private DirectorService db = new DirectorService();

        /// <summary>
        /// GET: gets list director
        /// </summary>
        /// <returns> list director </returns>
        [HttpGet]
        [Route("api/director/GetAllDirectors")]
        public IHttpActionResult GetAllDirectors()
        {
            // create server director
            DirectorService DirectorService = new DirectorService();
            DirectorService serviceDirector = new DirectorService();

            // get list director
            var select = DirectorService.GetAllDirectors();

            if (select != null)
            {
                return Ok(select);
            }

            return NotFound();
        }

        /// <summary>
        /// GET: Search director by name
        /// </summary>
        /// <param name="name"> name of director </param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/director/FindDirectorByName/{name}")]
        public IHttpActionResult FindDirectorByName(string name)
        {
            // create server director
            DirectorService DirectorService = new DirectorService();
            DirectorService serviceDirector = new DirectorService();

            // get director have directorName like name
            var select = DirectorService.FindDirectorByName(name);

            if (select != null)
            {
                return Ok(select);
            }

            return NotFound();
        }

        /// <summary>
        /// GET: Search director have directorID like id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/director/FindDirectorByID/{id}")]
        public IHttpActionResult FindDirectorByID(int id)
        {
            // create server director
            DirectorService DirectorService = new DirectorService();
            DirectorService serviceDirector = new DirectorService();

            // get director have directorID like id
            var select = DirectorService.GetDirectorByID(id);

            if (select != null)
            {
                return Ok(select);
            }
            return NotFound();
        }

        /// <summary>
        /// Create new director
        /// </summary>
        /// <param name="director"> director want add </param>
        // POST: api/Director
        [HttpPost]
        [Route("api/director/AddNewDirector/")]
        public IHttpActionResult AddNewDirector([FromBody]DirectorModel director)
        {
            // director not null
            if (director != null)
            {
                // create server director
                DirectorService DirectorService = new DirectorService();
                DirectorService serviceDirector = new DirectorService();

                // add director
                var check = DirectorService.AddNewDirector(director);

                // add success
                if (check > 0)
                {
                    return Ok(director);
                }
                else
                {
                    return BadRequest("Thêm đạo diễn thất bại");
                }
            }

            // director is null
            return BadRequest("Đạo diễn thêm mới đang bị NULL");
        }

        /// <summary>
        /// Edit director
        /// </summary>
        /// <param name="director"> A director you want update </param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/director/EditDirector/")]
        public IHttpActionResult EditDirector([FromBody]DirectorModel director)
        {
            if (director != null)
            {
                // create server director
                DirectorService DirectorService = new DirectorService();
                DirectorService serviceDirector = new DirectorService();

                // Edit director
                var edit = DirectorService.UpdateDirector(director);

                if (edit > 0)
                {
                    return Ok(director);
                }
                else
                {
                    return BadRequest("Chỉnh sửa đạo diễn thất bại !");
                }
            }

            return BadRequest("Đạo diễn muốn chỉnh sửa đang bị NULL");
        }

        /// <summary>
        /// Delete a director
        /// </summary>
        /// <param name="id"> id of director </param>
        [HttpGet]
        [Route("api/director/RemoveDirectorByID/{id}")]
        public IHttpActionResult RemoveDirectorByID(int id)
        {
            // create server director
            DirectorService DirectorService = new DirectorService();
            DirectorService serviceDirector = new DirectorService();

            // Delete directo by ID
            var check = DirectorService.RemoveDirectorByID(id);

            // Delete 
            if (check > 0)
            {
                return Ok(check);
            }

            return BadRequest("Xóa đạo diễn thất bại !");
        }

        /// <summary>
        /// Find a director
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private bool DirectorExists(int id)
        {
            // create server director
            DirectorService DirectorService = new DirectorService();
            DirectorService serviceDirector = new DirectorService();

            var c = DirectorService.GetDirectorByID(id);

            // Exists
            if (c != null)
            {
                return true;
            }

            return false;
        }


        //PhatLA update code
        [HttpGet]
        [Route("api/director/GetAllListDirectorByFilmID/{id}")]
        public IHttpActionResult GetAllListDirectorByFilmID(int id)
        {
            DirectorService serviceType = new DirectorService();
            var select = serviceType.GetAllListDirectorByFilmID(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return BadRequest("Không tìm thấy đạo diễn phim");
            }
        }

        [HttpGet]
        [Route("api/director/GetAllListDirectorNotInFilmByFilmID/{id}")]
        public IHttpActionResult GetAllListDirectorNotInFilmByFilmID(int id)
        {
            DirectorService serviceType = new DirectorService();
            var select = serviceType.GetAllListDirectorNotInFilmByFilmID(id);

            if (select != null)
            {
                return Ok(select);
            }
            else
            {
                return BadRequest("Không tìm thấy đạo diễn phim");
            }
        }

        [HttpPost]
        [Route("api/director/AddNewDirectorForFilm/")]
        public IHttpActionResult AddNewDirectorForFilm(AddDirectorFilm model)
        {
            DirectorService serviceType = new DirectorService();
            var add = serviceType.AddDirectorForFilm(model.FilmID, model.DirectorID);

            if (add >= 1)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Thêm director thất bại");
            }
        }

        [HttpPost]
        [Route("api/director/RemoveDirectorForFilm/")]
        public IHttpActionResult RemoveDirectorForFilm(AddDirectorFilm model)
        {
            DirectorService serviceType = new DirectorService();
            var add = serviceType.RemoveDirectorForFilm(model.FilmID, model.DirectorID);

            if (add >= 1)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Xóa director thất bại");
            }
        }

        /// <summary>
        /// Update status director by ID
        /// </summary>
        /// <param name="director"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/director/UpdateStatusDirectorByID/{id}")]
        public IHttpActionResult UpdateStatusDirectorByID(int id)
        {

                // create server director
                DirectorService serviceDirector = new DirectorService();

                // Edit director
                var edit = serviceDirector.UpdateStatusDirectorByID(id);

                if (edit > 0)
                {
                    return Ok(edit);
                    // return Ok("Chỉnh sửa đạo diễn thành công !");
                }
                else
                {
                    return BadRequest("Chỉnh sửa đạo diễn thất bại !");
                }
        }
    }

    public class AddDirectorFilm
    {
        public int FilmID { get; set; }
        public int DirectorID { get; set; }
    }
}
