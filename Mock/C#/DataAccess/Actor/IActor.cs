using DataObject.Models;
using System.Collections.Generic;

namespace DataService.Actor
{
    public interface IActor
    {
        /// <summary>
        /// Getting all metadata actor from database
        /// </summary>
        /// <returns></returns>
        List<ActorModel> GetAllListActor();

        /// <summary>
        /// Finding a actor by IDActor
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ActorModel FindActorByID(int id);

        /// <summary>
        /// Finding a actor by name
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        List<ActorModel> FindActorByName(string name);

        /// <summary>
        /// Add new actor
        /// </summary>
        /// <param name="actor"></param>
        /// <returns></returns>
        int AddNewActor(ActorModel actor);

        /// <summary>
        /// Change status of actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int EditStatusById(int id);

        /// <summary>
        /// Modify a actor by id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="actor"></param>
        /// <returns></returns>
        int EditActor(int id, ActorModel actor);

        /// <summary>
        /// deleting a actor
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int DeleteActor(int id);

    }
}
