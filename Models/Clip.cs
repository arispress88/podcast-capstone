using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AEWRPod2.Models
{
    public class Clip
    {
        public int Id { get; set; }

        [Required]
        public string ClipUrl { get; set; }

        [Required]
        public string UrlData { get; set; }

        public DateTime CreateDateTime { get; set; }

        [DisplayName("Category")]
        public int CategoryId { get; set; }

        public Category? Category { get; set; }

    }
}
