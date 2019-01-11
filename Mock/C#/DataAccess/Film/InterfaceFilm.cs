using System.Collections.Generic;
using DataObject.EF;
using DataObject.Models;

namespace DataService.Film
{
    public interface InterfaceFilm
    {
        /// <summary>
        /// Lấy toàn bộ danh sách phim
        /// </summary>
        /// <returns></returns>
        List<FilmModel> GetAllListFilm();

        /// <summary>
        /// Tìm phim bằng ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        FilmModel FindFilmByID(int id);

        /// <summary>
        /// Tìm phim bằng tên
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        List<DataObject.Models.FilmModel> FindFilmByName(string name);

        /// <summary>
        /// Thêm phim mới
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        int AddNewFilm(DataObject.Models.FilmModel film);

        /// <summary>
        /// Chỉnh sữa phim
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        int EditFilm(DataObject.Models.FilmModel film);

        /// <summary>
        /// Xóa phim
        /// </summary>
        /// <param name="film"></param>
        /// <returns></returns>
        int DeleteFilm(int id);

        /// <summary>
        /// Chỉnh sửa trạng thái phim
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        int EditStatustFilm(int id);
    }
}
