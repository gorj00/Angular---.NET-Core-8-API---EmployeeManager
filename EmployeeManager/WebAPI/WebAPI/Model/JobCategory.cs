using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    [Index(nameof(Title), IsUnique = true)]
    public class JobCategory // Only all categories available in the system, relations in JobCategory_Employee model
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(150, MinimumLength = 3)]
        public string Title { get; set; }
    }
}
