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
        
        public ClipController(IClipRepository clipRepository)
        {
            _clipRepository = clipRepository;
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
    }
}
