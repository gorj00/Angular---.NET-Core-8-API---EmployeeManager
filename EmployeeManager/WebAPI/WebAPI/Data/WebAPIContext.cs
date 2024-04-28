using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WebAPI.Model;

namespace WebAPI.Data
{
    public class WebAPIContext : DbContext
    {
        public WebAPIContext (DbContextOptions<WebAPIContext> options)
            : base(options)
        {
        }

        public DbSet<WebAPI.Model.Employee> Employee { get; set; } = default!;
        public DbSet<WebAPI.Model.Country> Country { get; set; } = default!;
        public DbSet<WebAPI.Model.City> City { get; set; } = default!;
        public DbSet<WebAPI.Model.Address> Address { get; set; } = default!;
        public DbSet<WebAPI.Model.JobCategory> JobCategory { get; set; } = default!;
        public DbSet<WebAPI.Model.JobCategory_Employee> JobCategory_Employee { get; set; } = default!;
        public DbSet<WebAPI.Model.Salary> Salary { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // ADDRESS FK + CASCADE
            modelBuilder.Entity<Address>()
            .HasOne(e => e.Country)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Address>()
            .HasOne(e => e.City)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            // CITY FK + CASCADE
            modelBuilder.Entity<City>()
            .HasOne(e => e.Country)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            // EMPLOYEE FK + CASCADE
            // -- Define the filter for IsActive in Address
            modelBuilder.Entity<Address>()
                .HasQueryFilter(a => a.IsActive);

            // -- Define the unique constraint for AddressId in Employee
            modelBuilder.Entity<Employee>()
                .HasIndex(e => e.AddressId)
                .IsUnique();

            modelBuilder.Entity<Employee>()
            .HasOne(e => e.Address)
            .WithOne()
            .OnDelete(DeleteBehavior.Restrict); 

            modelBuilder.Entity<Employee>()
            .HasOne(e => e.Country)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Employee>()
            .HasOne(e => e.Superior)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            // JOBCATEGORY_EMPLOYEE FK + CASCADE
            modelBuilder.Entity<JobCategory_Employee>()
            .HasOne(e => e.Employee)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<JobCategory_Employee>()
            .HasOne(e => e.JobCategory)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);

            // SALARY FK + CASCADE
            modelBuilder.Entity<Salary>()
            .HasOne(e => e.Employee)
            .WithMany()
            .OnDelete(DeleteBehavior.Restrict);


            // Handle DECIMAL type
            var decimalProps = modelBuilder.Model
           .GetEntityTypes()
           .SelectMany(t => t.GetProperties())
           .Where(p => (System.Nullable.GetUnderlyingType(p.ClrType) ?? p.ClrType) == typeof(decimal));

            foreach (var property in decimalProps)
            {
                property.SetPrecision(18);
                property.SetScale(2);
            }
        }
    }
}
