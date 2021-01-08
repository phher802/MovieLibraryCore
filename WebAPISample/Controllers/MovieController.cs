using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPISample.Data;
using WebAPISample.Models;

namespace WebAPISample.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private ApplicationContext _context;
        public MovieController(ApplicationContext context)
        {
            _context = context;
        }
        // GET api/movie
        [HttpGet]
        public IActionResult Get()
        {
            var movies = _context.Movies.ToList();

            // Retrieve all movies from db logic
            return Ok(new string[] { "movie1 string", "movie2 string" });
        }

        // GET api/movie/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            // Retrieve movie by id from db logic

            var movie = _context.Movies.Where(m => m.MovieId == id).ToList();

            // return Ok(movie);
            return Ok(movie);
        }

        // POST api/movie
        [HttpPost]
        public IActionResult Post([FromBody]Movie value)
        {

            // Create movie in db logic
            _context.Movies.Add(value);
            _context.SaveChanges();
            return Ok();
        }

        // PUT api/movie
        
        [HttpPut]
        public IActionResult Put([FromBody] Movie movie)
        {
            // Update movie in db logic
            var movieInDb = _context.Movies.FirstOrDefault(m => m.MovieId == movie.MovieId);
            movieInDb = movie;
            _context.Update(movieInDb);
            _context.SaveChanges();

            return Ok();
        }

        // DELETE api/movie/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            // Delete movie from db logic
            var movie = _context.Movies.FirstOrDefault(c => c.MovieId == id);
            _context.Remove(movie);
            _context.SaveChanges();

            return Ok();
        }
    }
}