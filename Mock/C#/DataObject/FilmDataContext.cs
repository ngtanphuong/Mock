using DataObject.EF;
using System.Data.Entity;

namespace DataObject
{
    public class FilmDataContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<TypeFilm> TypeFilms { get; set; }

        public DbSet<Actor> Actors { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<User> Users { get; set; }

        public DbSet<SubType> SubTypes { get; set; }
        public DbSet<SubActor> SubActors { get; set; }
        public DbSet<SubDirector> SubDirectors { get; set; }
        public DbSet<SubUser> SubUsers { get; set; }

        public FilmDataContext() : base("FilmManagement")
        {

        }

        public void Init()
        {
            this.Database.CreateIfNotExists();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
