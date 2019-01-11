using DataObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.SubActor
{
    public interface ISubActor
    {
        // get all sub actor
        List<SubActorModel> GetAllSubActor();

        // get subActor by id film 
        List<SubActorModel> GetSubActorByIdFilm(int idFilm);

        // get subActor by id actor
        List<SubActorModel> GetSubActorByIdActor(int idActor);

        // delete a SubActor and id actor
        int DeleteSubActorById(int idActor);

        // Add subActor to database
        int AddSubActor(SubActorModel subActor);
    }
}
