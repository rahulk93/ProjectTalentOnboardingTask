using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProjectTalentOnboardingTask.Server.Models
{
    public class Sale
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public int CustomerId { get; set; }

        [Required]
        public int StoreId { get; set; }

        [Required]
        public DateOnly DateSold { get; set; }


        public Product? Product { get; set; }
        public Customer? Customer { get; set; }
        public Store? Store { get; set; }
    }
}
