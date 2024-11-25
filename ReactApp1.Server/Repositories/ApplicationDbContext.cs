using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ReactApp1.Server.Models;

namespace ReactApp1.Server.Repositories
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<PhoneCPU> PhoneCPUs { get; set; } = null!;
        public DbSet<Phone> Phones { get; set; } = null!;
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            //Database.EnsureDeleted();
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
            {
                Id = "44546e06-8719-4ad8-b88a-f271ae9d6eab",
                Name = "admin",
                NormalizedName = "ADMIN"
            });

            modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
            {
                Id = "3b62472e-4f66-49fa-a20f-e7685b9565d8",
                Email = "admin@test.com",
                UserName = "admin",
                NormalizedUserName = "ADMIN",
                PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, "123"),
                SecurityStamp = string.Empty
            });

            modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
            {
                RoleId = "44546e06-8719-4ad8-b88a-f271ae9d6eab",
                UserId = "3b62472e-4f66-49fa-a20f-e7685b9565d8"
            });

            modelBuilder.Entity<PhoneCPU>().HasData(
               new PhoneCPU { Id = 1, Cores = 6, Manufacturer = "Apple", Name = "Apple A13 Bionic" },
               new PhoneCPU { Id = 2, Cores = 6, Manufacturer = "Apple", Name = "Apple A17 Pro" }
           );

            modelBuilder.Entity<Phone>().HasData(
                    new Phone
                    {
                        Id = 1,
                        Name = "Xiaomi Redmi 11",
                        Price = "30 000",
                        Images = new List<string>()
                        {
                            "M3-Black-Back.png",
                            "M3-Black-Bottom_Top.png",
                            "M3-Black-Lef_right.png",
                            "M3-Black-Left_45-Back.png",
                            "M3-Black-Right_45-Back.png"
                        },
                        Manufacturer = "Xiaomi"
                    },
                    new Phone
                    {
                        Id = 2,
                        Name = "Sumsung M2",
                        Price = "17 880",
                        Images = new List<string>()
                        {
                            "1.jpg",
                            "2.jpg",
                            "3.jpg",
                            "4.jpg",
                            "5.jpg"
                        },
                        Manufacturer = "Samsung"
                    },
                    new Phone
                    {
                        Id = 3,
                        Name = "Sumsung M3",
                        Price = "37 999",
                        Images = new List<string>()
                        {
                            "z1_2.jpg",
                            "z2_2.jpg",
                            "z4_1.jpg",
                            "z8_1.jpg",
                            "z9_1.jpg"
                        },
                        Manufacturer = "Samsung"
                    },
                    new Phone
                    {
                        Id = 4,
                        Name = "Samsung Galaxy A35",
                        Price = "28 999",
                        Images = new List<string>()
                        {
                            "Sumsung1.jpg",
                            "Sumsung2.jpg",
                            "Sumsung3.jpg",
                            "Sumsung4.jpg",
                            "Sumsung5.jpg"
                        },
                        Manufacturer = "Samsung"
                    },
                    new Phone
                    {
                        Id = 5,
                        Name = "IPhone 15",
                        Price = "77 000",
                        Images = new List<string>()
                        {
                            "Iphone_1.png",
                            "Iphone_2.jpg",
                            "Iphone_3.jpg"
                        },
                        Manufacturer = "Apple"
                    },
                    new Phone
                    {
                        Id = 6,
                        Name = "IPhone 16",
                        Price = "100 000",
                        Images = new List<string>()
                        {
                            "Iphone16_1.jpeg",
                            "Iphone16_2.jpeg",
                            "Iphone16_3.jpeg",
                            "Iphone16_4.jpeg",
                            "Iphone16_5.jpeg"
                        },
                        Manufacturer = "Apple"
                    }
            );
        }
    }
}
