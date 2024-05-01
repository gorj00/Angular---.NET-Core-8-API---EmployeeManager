using System.ComponentModel.DataAnnotations;
using WebAPI.Model;

namespace WebAPI.Dto
{
    public class AddressCreateDTO
    {
        [Required]
        [StringLength(250, MinimumLength = 3)]
        public string Street { get; set; }

        [Required]
        [StringLength(5)]
        public string ZipCode { get; set; }


        [Required]
        public int CityId { get; set; }


        [Required]
        public int CountryId { get; set; }
    }
}
