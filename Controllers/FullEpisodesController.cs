using System;
using Microsoft.AspNetCore.Mvc;
using AEWRPod2.Repositories;
using AEWRPod2.Models;

namespace AEWRPod2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullEpisodesController : ControllerBase
    {
        private readonly IFullEpisodeRepository _fullEpisodeRepository;
        private readonly ICategoryRepository _categoryRepository;

        public FullEpisodesController(IFullEpisodeRepository fullEpisodeRepository, ICategoryRepository categoryRepository)
        {
            _fullEpisodeRepository = fullEpisodeRepository;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_fullEpisodeRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Post(FullEpisode fullEpisode)
        {
            _fullEpisodeRepository.Add(fullEpisode);
            return CreatedAtAction("Get", new { id = fullEpisode.Id }, fullEpisode);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _fullEpisodeRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetEpisodeByCategory(int categoryId)
        {
            var fullEpisode = _fullEpisodeRepository.GetEpisodeByCategory(categoryId);
            if (fullEpisode == null)
            {
                return NotFound();
            }
            return Ok(fullEpisode);
        }
    }
}
