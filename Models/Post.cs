using System;
using System.ComponentModel.DataAnnotations;

namespace AEWRPod2.Models
{
    public class Post
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Body { get; set; }

        public DateTime CreateDateTime { get; set; }

        [Required]
        public int UserProfileId { get; set; }

        public UserProfile? UserProfile { get; set; }
    }
}
