using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class Salary
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Range(1, Double.PositiveInfinity)]
        public decimal Amount { get; set; }

        [Required]
        public DateTime From { get; set; }

        public DateTime To { get; set; } // optional, salary currently still active

        [Required]
        public Employee Employee { get; set; }

        [Required]
        // [ForeignKey(nameof(Employee))]
        public int EmployeeId { get; set; }

    }
}
