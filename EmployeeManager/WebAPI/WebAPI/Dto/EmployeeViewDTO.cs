using System.ComponentModel.DataAnnotations;
using WebAPI.Enum;
using WebAPI.Model;

namespace WebAPI.Dto
{
    public class EmployeeViewDTO
    {
        public int Id { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string FirstName { get; set; }

        [StringLength(250, MinimumLength = 1)]
        public string? MiddleName { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 1)]
        public string LastName { get; set; }

        [Required]
        public DateTime BirthDate { get; set; }

        [Required]
        public EGender Gender { get; set; }

        [Required]
        public Address Address { get; set; }

        [Required]
        public int AddressId { get; set; }

        [Required]
        public Country Country { get; set; }

        [Required]
        public int CountryId { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string Email { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string PhoneNumber { get; set; }

        [Required]
        public DateTime JoinedDate { get; set; }

        public DateTime? ExitedDay { get; set; } // optional, NULL means currently active Employee

        public Employee? Superior { get; set; }
        public int? SuperiorId { get; set; }

        public List<Salary> Salaries = [];
        public List<Employee> Subordinates = [];
    }
}
