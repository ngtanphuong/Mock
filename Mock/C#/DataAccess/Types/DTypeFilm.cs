using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataObject;
using DataObject.EF;

namespace DataAccess.TypeFilm
{
    public class DTypeFilm : IFTypeFilm
    {
        FilmDataContext Filmdt = null;

        public List<DataObject.EF.TypeFilm> GetListAll()
        {
            return Filmdt.TypeFilms.ToList();
        }

        public DataObject.EF.TypeFilm FindById(int id)
        {
            return Filmdt.TypeFilms.Where(t => t.TypeID == id).FirstOrDefault();
        }

        public List<DataObject.EF.TypeFilm> FindByeName(string name)
        {
            return Filmdt.TypeFilms.Where(t => t.NameType == name).ToList();
        }

        int AddNewType(DataObject.EF.TypeFilm typeFilm)
        {
            Filmdt.TypeFilms.Add(typeFilm);
            return Filmdt.SaveChanges();
        }

        int EditType(DataObject.EF.TypeFilm typeFilm)
        {
            throw new NotImplementedException();
        }

        int DeleteType(DataObject.EF.TypeFilm typeFilm)
        {
            throw new NotImplementedException();
        }
    }
}
