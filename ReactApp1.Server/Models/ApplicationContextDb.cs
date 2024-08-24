using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Models
{
    public class ApplicationContextDb : DbContext
    {
        public DbSet<Phone> Phones { get; set; } = null!;
        public ApplicationContextDb(DbContextOptions options) : base(options)
        {
           
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Phone>().HasData(
                    new Phone { Id = 1, Name = "IPhone 1", Price = 37 },
                    new Phone { Id = 2, Name = "IPhone 2", Price = 41 },
                    new Phone { Id = 3, Name = "IPhone 3", Price = 24 }
            );
            throw new Exception("EBAT EGO ROT");
        }
    }
}