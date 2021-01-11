using Microsoft.EntityFrameworkCore;
using WebAPISample.Models;

namespace WebAPISample.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions options)
            : base(options)
        {

        }

        public ApplicationContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Seed data - needs migration

            modelBuilder.Entity<Movie>()
                .HasData(
                    new Movie
                    {
                        MovieId = 1,
                        Title = "Lion King",
                        Director = "Jon Favreau",
                        Genre = "Animation",

                    },
                    new Movie
                    {
                        MovieId = 2,
                        Title = "The Dark Knight",
                        Genre = "Drama",
                        Director = "Christopher Nolan"
                    },
                    new Movie
                    {
                        MovieId = 3,
                        Title = "Inception",
                        Genre = "Drama",
                        Director = "Christopher Nolan"
                    },
                     new Movie
                     {
                         MovieId = 4,
                         Title = "Pineapple Express",
                         Genre = "Comedy",
                         Director = "David Gordon Green"
                     },
                     new Movie
                     {
                          MovieId = 5,
                          Title = "Die Hard",
                          Genre = "Action",
                          Director = "John McTiernan"
                     });
        }

        public DbSet<Movie> Movies { get; set; }
    }
}
