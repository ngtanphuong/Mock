using System.Web.Http;
using DataService.Actor;
using DataObject.Models;
using APIAplication.Models;

namespace APIAplication.Controllers
{
    [BasicAuthentication]
    public class ActorController : ApiController
    {
        //GET all actor
        /// <summary>
        /// Delete a actor
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllActor()
        {
            ActorService actorService = new ActorService();
            var listActor = actorService.GetAllListActor();
            if (listActor != null)
            {
                return Ok(listActor);
            }
            return NotFound();
        }

        //POST a actor by id
        /// <summary>
        /// Post a actor by id
        /// </summary>
        /// <param name="actor"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddActor([FromBody]ActorModel actor)
        {
            ActorService actorService = new ActorService();
            var newActor = actorService.AddNewActor(actor);
            if (newActor != -1)
            {
                return Ok(newActor);
            }
            return BadRequest("Không thể thêm diễn viên mới!");
        }

        /// <summary>
        /// PUT: modify actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="actor"></param>
        /// <returns></returns>
        [HttpPut]
        public IHttpActionResult UpdateActor(int id, ActorModel actor)
        {
            ActorService actorService = new ActorService();
            var editActor = actorService.EditActor(id, actor);
            if (editActor != -1)
            {
                return Ok(editActor);
            }
            return BadRequest("Không thể thay đổi diễn viên này!");
        }

        /// <summary>
        /// PUT : change status of actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult EditStatusById(int id)
        {
            ActorService actorService = new ActorService();
            var m_status = actorService.EditStatusById(id);
            if (m_status != -1)
            {
                return Ok(m_status);
            }
            return BadRequest("không thể thay đổi trạng thái của diễn viên này!");
        }
        //DELETE a actor
        /// <summary>
        /// Delete a actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult DeleteActor(int id)
        {
            ActorService actorService = new ActorService();
            var delActor = actorService.DeleteActor(id);
            if (delActor != -1)
            {
                return Ok(delActor);
            }
            return BadRequest("Không thể xóa diễn viên!");
        }


        //PhatLA update code
        [HttpGet]
        [Route("api/Actor/GetAllListActorByFilmID/{id}")]
        public IHttpActionResult GetAllListActorByFilmID(int id)
        {
            ActorService serviceType = new ActorService();
            var select = serviceType.GetAllListActorByFilmID(id);

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
        [Route("api/Actor/GetAllListActorNotInFilmByFilmID/{id}")]
        public IHttpActionResult GetAllListActorNotInFilmByFilmID(int id)
        {
            ActorService serviceType = new ActorService();
            var select = serviceType.GetAllListActorNotInFilmByFilmID(id);

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
        [Route("api/Actor/AddNewActorForFilm/")]
        public IHttpActionResult AddNewActorForFilm(AddActorFilm model)
        {
            ActorService serviceType = new ActorService();
            var add = serviceType.AddActorForFilm(model.FilmID, model.ActorID);

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
        [Route("api/Actor/RemoveActorForFilm/")]
        public IHttpActionResult RemoveActorForFilm(AddActorFilm model)
        {
            ActorService serviceType = new ActorService();
            var add = serviceType.RemoveActorForFilm(model.FilmID, model.ActorID);

            if (add >= 1)
            {
                return Ok(model);
            }
            else
            {
                return BadRequest("Thêm tyle thất bại");
            }
        }
        [HttpGet]
        public IHttpActionResult searchListActorByName(string name)
        {
            ActorService actorService = new ActorService();
            var search = actorService.FindActorByName(name);
            if(search != null)
            {
                return Ok(search);
            }
            return NotFound();
        }
    }

    public class AddActorFilm
    {
        public int FilmID { get; set; }
        public int ActorID { get; set; }
    }
}
