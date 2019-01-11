using DataObject.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject.Models;

namespace DataAccess.Types
{
    public interface InterfaceType
    {
        List<TypeFilmModel> GetListAll();

        List<FilmModel> GetFilmByTypes(int id);

        TypeFilmModel FindById(int id);

        List<TypeFilmModel> FindByeName(string name);

        int AddNewType(TypeFilmModel typeFilm);

        int EditType(TypeFilmModel typeFilm);

        int DeleteType(int id);
    }
}
