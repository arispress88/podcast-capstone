﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("GetPostCommentsByPostId/{postId}")]
        public IActionResult GetPostCommentsByPostId(int postId)
        {
            var comment = _postCommentRepository.GetPostCommentsByPostId(postId).OrderByDescending(c => c.CreateDateTime).ToList();

            if (comment == null)
            {
                return NotFound();
            }

            return Ok(comment);
        }
    }
}