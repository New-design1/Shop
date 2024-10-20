﻿using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ReactApp1.Server.Models
{
    public class ApplicationDbContext : IdentityDbContext<IdentityUser>
    {
        public DbSet<Phone> Phones { get; set; } = null!;
        public DbSet<PhoneCPU> PhoneCPUs { get; set; } = null!;
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
                    new Phone { Id = 1, Name = "IPhone 1", Price = 37, Manufacturer = "Apple", PhoneCPUId = 1 },
                    new Phone { Id = 2, Name = "IPhone 2", Price = 41, Manufacturer = "Apple", PhoneCPUId = 2 },
                    new Phone { Id = 3, Name = "IPhone 3", Price = 24, Manufacturer = "Apple", PhoneCPUId = 1 }
            );

            modelBuilder.Entity<Phone>().Navigation(x => x.PhoneCPU).AutoInclude();
        }
    }
}
