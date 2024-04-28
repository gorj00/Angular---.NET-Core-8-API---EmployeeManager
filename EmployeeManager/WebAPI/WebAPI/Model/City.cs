using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Model
{
    public class City
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 1)]
        public string Name { get; set; }


        [Required]
        public Country Country { get; set; }

        [Required]
        // [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
    }
}
