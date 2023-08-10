using System;
using Microsoft.AspNetCore.Mvc;
using AEWRPod2.Models;
using AEWRPod2.Repositories;

namespace AEWRPod2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private IUserRepository _userRepository;

        public UserProfileController(IUserProfileRepository userProfileRepository, IUserRepository userRepository)
        {
            _userProfileRepository = userProfileRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var profile = _userProfileRepository.GetUserProfileById(id);
            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        [HttpGet("GetByEmail")]
        public IActionResult GetByEmail(string email)
        {
            var user = _userRepository.GetByEmail(email);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile userProfile)
        {
            if (id != userProfile.Id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(userProfile);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.USER_ID;
            _userRepository.Add(userProfile);
            return CreatedAtAction("GetByEmail", new { email = userProfile.Email }, userProfile);
        }

        [HttpGet("GetUserTypes")]
        public IActionResult GetUserTypes()
        {
            return Ok(_userRepository.GetUserTypes());
        }

        [HttpPatch("UpdateUserType/{id}/{userTypeId}")]
        public IActionResult UpdateUserType(int id, [FromBody] int userTypeId)
        {
            UserProfile userProfile = _userProfileRepository.GetUserProfileById(id);
            if (userProfile == null)
            {
                return NotFound();
            }
            _userRepository.UpdateUserType(id, userTypeId);
            return NoContent();
        }
    }
}
