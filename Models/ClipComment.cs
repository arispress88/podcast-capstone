using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AEWRPod2.Models
{
    public class ClipComment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreateDateTime { get; set; }
        public int UserProfileId { get; set; }
        public int ClipId { get; set; }
        public UserProfile UserProfile { get; set; }
        public Clip Clip { get; set; }
    }
}
