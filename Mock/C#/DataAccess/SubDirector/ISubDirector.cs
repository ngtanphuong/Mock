using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject.Models;

namespace DataAccess.SubDirector
{
    interface ISubDirector
    {
        // get all sub actor
        List<SubDirectorModel> GetAllSubDirector();

        // get subActor by id film 
        List<SubDirectorModel> GetSubDirectorByIdFilm(int idFilm);

        // get subDirector by id director
        List<SubDirectorModel> GetSubDirectorByIdDirector(int idDirector);

        // delete a SubDirector and id Director
        int DeleteSubDirectorById(int idDirector);

        // Add subDirector to database
        int AddSubDirector(SubDirectorModel subDirector);

    }
}
