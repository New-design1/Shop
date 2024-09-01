using Microsoft.EntityFrameworkCore;

namespace ReactApp1.Server.Models
{
    public class ApplicationContextDb : DbContext
    {
        public DbSet<Phone> Phones { get; set; } = null!;
        public DbSet<PhoneCPU> PhoneCPUs { get; set; } = null!;
        public ApplicationContextDb(DbContextOptions options) : base(options)
        {
            Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Ignore<Entity>();
            var appleCPU = new PhoneCPU { Id = 1, Cores = 6, Manufacturer = "Apple", Name = "Apple A13 Bionic" };
            var IPhone1 = new Phone { Id = 1, Name = "IPhone 1", Price = 37, Manufacturer = "Apple", PhoneCPUId = 1 };
            var IPhone2 = new Phone { Id = 2, Name = "IPhone 2", Price = 41, Manufacturer = "Apple", PhoneCPUId = 1 };
            var IPhone3 = new Phone { Id = 3, Name = "IPhone 3", Price = 24, Manufacturer = "Apple", PhoneCPUId = 1 };

            modelBuilder.Entity<PhoneCPU>().HasData(appleCPU);
            modelBuilder.Entity<Phone>().HasData(IPhone1, IPhone2, IPhone3);

        }
    }
}
