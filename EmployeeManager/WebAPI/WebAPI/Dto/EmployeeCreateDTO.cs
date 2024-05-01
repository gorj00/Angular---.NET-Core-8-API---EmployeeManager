using System.ComponentModel.DataAnnotations;
using WebAPI.Enum;
using WebAPI.Model;

namespace WebAPI.Dto
{
    public class EmployeeCreateDTO
    {
        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string FirstName { get; set; }

        public string? MiddleName { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public EGender Gender { get; set; }

        [Required]
        public AddressCreateDTO AddressCreateDTO { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string Email { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string PhoneNumber { get; set; }

        public int? SuperiorId { get; set; }

        [Required]
        [Range(1, Double.PositiveInfinity)]
        public decimal Salary { get; set; }

        [Required]
        public int JobCategoryId { get; set; }
    }
}
