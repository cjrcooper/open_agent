using Microsoft.EntityFrameworkCore;

namespace openAgent.Models
{
    public class DbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public DbContext(DbContextOptions<DbContext> options)
            : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql(
                    "server=localhost;port=3306;database=open_agent;uid=root;password=MyComplexPassword!");
            }
        }

        public DbSet<Address> Address { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("id").IsRequired();
                entity.Property(e => e.StreetAddress).HasColumnName("street_address");
                entity.Property(e => e.Suburb).HasColumnName("suburb");
                entity.Property(e => e.Postcode).HasColumnName("postcode");
                entity.Property(e => e.State).HasColumnName("state");
                entity.Property(e => e.Unit).HasColumnName("unit");
                entity.Property(e => e.DateAdded).HasColumnName("date_added");
            });
        }
    }
}