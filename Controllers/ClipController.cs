using System;
using Microsoft.AspNetCore.Mvc;
using AEWRPod2.Repositories;
using AEWRPod2.Models;

namespace AEWRPod2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClipController : ControllerBase
    {
        private readonly IClipRepository _clipRepository;
        private readonly ICategoryRepository _categoryRepository;
        
        public ClipController(IClipRepository clipRepository, ICategoryRepository categoryRepository)
        {
            _clipRepository = clipRepository;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_clipRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var clip = _clipRepository.GetClipById(id);
            if (clip == null)
            {
                return NotFound();
            }
            return Ok(clip);
        }

        [HttpPost]
        public IActionResult Post(Clip clip)
        {
            _clipRepository.Add(clip);
            return CreatedAtAction("Get", new { id = clip.Id }, clip);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _clipRepository.Delete(id);
            return NoContent();
        }

        [HttpGet("category/{categoryId}")]
        public IActionResult GetClipByCategory(int categoryId)
        {
            var clip = _clipRepository.GetClipByCategory(categoryId);
            if (clip == null)
            {
                return NotFound();
            }
            return Ok(clip);
        }
        
    }
}
