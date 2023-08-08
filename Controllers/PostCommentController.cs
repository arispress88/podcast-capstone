using Microsoft.AspNetCore.Mvc;
using AEWRPod2.Repositories;
using AEWRPod2.Models;

namespace AEWRPod2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostCommentController : ControllerBase
    {
        private readonly IPostCommentRepository _postCommentRepository;
        public PostCommentController(IPostCommentRepository postCommentRepository)
        {
            _postCommentRepository = postCommentRepository;
        }

        [HttpGet("GetPostCommentsByPostId/{id}")]
        public IActionResult GetPostCommentsByPostId(int postId)
        {
            var comment = _postCommentRepository.GetPostCommentsByPostId(postId).OrderByDescending(c => c.CreateDateTime).ToList();

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }

        [HttpPost]
        public IActionResult Post(PostComment postComment)
        {
            _postCommentRepository.Add(postComment);
            return CreatedAtAction("GetPostCommentsByPostId", new { id = postComment.Id }, postComment);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, PostComment postComment)
        {
            if (id != postComment.Id)
            {
                return BadRequest();
            }

            _postCommentRepository.Update(postComment);
            return NoContent();
        }
    }
}
