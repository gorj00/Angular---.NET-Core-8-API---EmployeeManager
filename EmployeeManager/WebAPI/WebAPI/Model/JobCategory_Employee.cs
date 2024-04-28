using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    [Index(nameof(EmployeeId), IsUnique = true)] // Each Employee can have max 1 record
    public class JobCategory_Employee
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public JobCategory JobCategory  { get; set; }

        [Required]
        // [ForeignKey(nameof(JobCategory))]
        public int JobCategoryId { get; set; }

        [Required]
        public Employee Employee { get; set; }

        [Required]
        // [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }
    }
}
