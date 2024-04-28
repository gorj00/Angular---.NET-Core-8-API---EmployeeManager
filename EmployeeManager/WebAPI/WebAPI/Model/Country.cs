using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Security.Policy;

namespace WebAPI.Model
{
    [Index(nameof(Name), IsUnique = true)]
    public class Country
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 2)] // Longest with 46 chars United Kingdom of Great Britain and Northern Ireland, shortest UK
        public required string Name { get; set; }
    }
}
