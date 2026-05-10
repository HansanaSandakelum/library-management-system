using LibraryManagement.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace LibraryManagement.Infrastructure.Persistence;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Book> Books => Set<Book>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Book>(entity =>
        {
            entity.HasKey(b => b.Id);

            entity.Property(b => b.Title)
                  .IsRequired()
                  .HasMaxLength(200);

            entity.Property(b => b.Author)
                  .IsRequired()
                  .HasMaxLength(200);

            entity.Property(b => b.Description)
                  .HasMaxLength(1000);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(u => u.Id);
            entity.Property(u => u.Username).IsRequired().HasMaxLength(100);
            entity.Property(u => u.PasswordHash).IsRequired();
            entity.Property(u => u.Role).IsRequired().HasMaxLength(50);

            // admin user (Password: admin123)
            entity.HasData(new User
            {
                Id = 1,
                Username = "admin",
                PasswordHash = "$2a$11$91v.k0e31uP.728BfE3JPe4N6Y1f5.w5h0dK3/vA7lA2Z.s0hFp9G",
                Role = "Admin"
            });
        });
    }
}
