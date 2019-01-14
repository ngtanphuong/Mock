using APIAplication.Models;
using DataAccess.SubActor;
using DataObject.Models;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace APIAplication.Controllers
{
    [BasicAuthentication]
    public class SubActorController : ApiController
    {

        /// <summary>
        /// add a subActor to database
        /// </summary>
        /// <param name="subActor"></param>
        /// <returns></returns>
        [HttpPost]
        public IHttpActionResult AddSubActor(SubActorModel subActor)
        {
            SubActorService subActorService = new SubActorService();
            int data = subActorService.AddSubActor(subActor);
            if(data > 0)
            {
                return Ok(data);
            }
            return BadRequest("Không thể thêm subActor!");
        }

        /// <summary>
        /// DeleteSubActor by id film and actor
        /// </summary>
        /// <param name="idFilm"></param>
        /// <param name="idActor"></param>
        /// <returns></returns>
        [HttpDelete]
        public IHttpActionResult DeleteSubActorById(int idActor)
        {
            SubActorService  subActorService = new SubActorService();
            int rs = subActorService.DeleteSubActorById(idActor);
            if(rs > 0)
            {
                return Ok(rs);
            }
            return BadRequest("Không thể xóa subActor này!");
        }

        /// <summary>
        /// get all subActor to list
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetAllSubActor()
        {
            SubActorService subActorService = new SubActorService();
            List<SubActorModel> list = subActorService.GetAllSubActor();
            if(list != null)
            {
                return Ok(list);
            }
            return NotFound();
        }

        /// <summary>
        /// get all subActor to list by id actor
        /// </summary>
        /// <param name="idActor"></param>
        /// <returns></returns>
        [HttpGet]
        public IHttpActionResult GetSubActorByIdActor(int idActor)
        {
            SubActorService subActorService = new SubActorService();
            List<SubActorModel> list = subActorService.GetSubActorByIdActor(idActor);
            if(list != null)
            {
                return Ok(list);
            }
            return NotFound();
        }

        /// <summary>
        /// get all subActor to list by id film
        /// </summary>
        /// <param name="idFilm"></param>
        /// <returns></returns>
        public IHttpActionResult GetSubActorByIdFilm(int idFilm)
        {
            SubActorService subActorService = new SubActorService();
            List<SubActorModel> list = subActorService.GetSubActorByIdFilm(idFilm);
            if(list != null)
            {
                return Ok(list);
            }
            return NotFound();
        }
    }
}
