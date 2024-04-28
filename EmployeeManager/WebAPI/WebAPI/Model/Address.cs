using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebAPI.Model
{
    public class Address
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string Street { get; set; }

        [Required]
        [StringLength(5)]
        public string ZipCode { get; set; }

        [Required]
        public City City { get; set; }

        [Required]
        // [ForeignKey(nameof(City))]
        public int CityId { get; set; }

        [Required]
        public Country Country { get; set; }

        [Required]
        // [ForeignKey(nameof(Country))], FK handled with Fluent API due to cascade issue
        public int CountryId { get; set; }


        [Required]
        public Boolean IsActive { get; set; }
    }
}
