using LibraryManagement.Domain.Entities;

namespace LibraryManagement.Application.Interfaces;

public interface IUserRepository
{
    Task<User?> GetByUsernameAsync(string username);
    Task<User> CreateAsync(User user);
}
