using System;
using Microsoft.AspNetCore.Mvc;
using AEWRPod2.Repositories;
using AEWRPod2.Models;

namespace AEWRPod2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClipCommentController : ControllerBase
    {
        private readonly IClipCommentRepository _clipCommentRepository;
        public ClipCommentController(IClipCommentRepository clipCommentRepository)
        {
            _clipCommentRepository = clipCommentRepository;
        }

        [HttpGet("GetClipComments/{id}")]
        public IActionResult GetClipComments(int clipId)
        {
            var comment = _clipCommentRepository.GetClipComments(clipId).OrderByDescending(c => c.CreateDateTime).ToList();

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpPost]
        public IActionResult Post(ClipComment clipComment)
        {
            _clipCommentRepository.Add(clipComment);
            return CreatedAtAction("GetClipComments", new { id = clipComment.Id }, clipComment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, ClipComment clipComment)
        {
            if (id != clipComment.Id)
            {
                return BadRequest();
            }

            _clipCommentRepository.Update(clipComment);
            return NoContent();
        }
    }
}
