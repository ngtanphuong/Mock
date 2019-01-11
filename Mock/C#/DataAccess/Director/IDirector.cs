using DataObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataService.Director
{
	/// Class interface IServiceDirector: Call api interface
    public interface IDirector
    {
        /// <summary>
        /// get all director of list
        /// </summary>
        /// <returns> list of director </returns>
        List<DirectorModel> GetAllDirectors();

        /// <summary>
        /// Get director by id
        /// </summary>
        /// <param name="id"> id of director</param>
        /// <returns> director </returns>
        DirectorModel GetDirectorByID(int id);

        /// <summary>
        /// Add new director
        /// </summary>
        /// <param name="director"> director </param>
        /// <returns> status add </returns>
        int AddNewDirector(DirectorModel director);

        /// <summary>
        /// Remove director by ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns> result status </returns>
        int RemoveDirectorByID(int id);

        /// <summary>
        /// PUT: edit a director
        /// </summary>
        /// <param name="id"> id of director </param>
        /// <param name="director"> director </param>
        /// <returns> result status </returns>
        int UpdateDirector(DirectorModel director);

        /// <summary>
        /// Find directors by name
        /// </summary>
        /// <param name="name"> name of director </param>
        /// <returns> list director </returns>
        List<DirectorModel> FindDirectorByName(string name);

        /// <summary>
        /// Update director status by ID
        /// </summary>
        /// <param name="id"> id of director </param>
        /// <returns> result of update </returns>
        int UpdateStatusDirectorByID(int id);
    }
}
