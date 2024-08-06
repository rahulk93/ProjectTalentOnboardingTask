using Microsoft.EntityFrameworkCore;

namespace ProjectTalentOnboardingTask.Server.Models
{
    public partial class ApplicationDbContext : DbContext
    {
        //public ApplicationDbContext() { }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) 
        { }
        public virtual DbSet<Customer> Customer { get; set; } = null!;
        public virtual DbSet<Product> Product { get; set; }
        public virtual DbSet<Store> Store { get; set; }
        public virtual DbSet<Sale> Sales { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>(entity => {
                entity.HasKey(k => k.Id);
            });
            modelBuilder.Entity<Product>(entity => {
                entity.HasKey(k => k.Id);
            });
            modelBuilder.Entity<Store>(entity => {
                entity.HasKey(k => k.Id);
            });
            modelBuilder.Entity<Sale>(entity =>
            {
                entity.HasKey(k => k.Id);
                entity.HasOne(s => s.Product)
                      .WithMany()
                      .HasForeignKey(s => s.ProductId);
                entity.HasOne(s => s.Customer)
                      .WithMany()
                      .HasForeignKey(s => s.CustomerId);
                entity.HasOne(s => s.Store)
                      .WithMany()
                      .HasForeignKey(s => s.StoreId);
            });
            OnModelCreatingPartial(modelBuilder);
        }
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
