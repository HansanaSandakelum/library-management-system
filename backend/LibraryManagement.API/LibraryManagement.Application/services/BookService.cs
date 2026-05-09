using LibraryApi.Application.DTOs;
using LibraryApi.Domain.Interfaces;

namespace LibraryApi.Application.Services;

public class BookService
{
    private readonly IBookRepository _repository;

    public BookService(IBookRepository repository)
    {
        _repository = repository;
    }


    public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
    {
        var books = await _repository.GetAllAsync();
        return books.Select(MapToDto);
    }


    public async Task<BookDto?> GetBookByIdAsync(int id)
    {
        var book = await _repository.GetByIdAsync(id);
        return book is null ? null : MapToDto(book);
    }

  
    public async Task<BookDto> CreateBookAsync(CreateBookDto dto)
    {
        var book = new Domain.Entities.Book
        {
            Title       = dto.Title.Trim(),
            Author      = dto.Author.Trim(),
            Description = dto.Description.Trim(),
            CreatedAt   = DateTime.UtcNow,
            UpdatedAt   = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(book);
        return MapToDto(created);
    }


    public async Task<BookDto?> UpdateBookAsync(int id, UpdateBookDto dto)
    {
        var existing = await _repository.GetByIdAsync(id);
        if (existing is null)
            return null;

        existing.Title       = dto.Title.Trim();
        existing.Author      = dto.Author.Trim();
        existing.Description = dto.Description.Trim();
        existing.UpdatedAt   = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(existing);
        return updated is null ? null : MapToDto(updated);
    }


    public async Task<bool> DeleteBookAsync(int id)
    {
        return await _repository.DeleteAsync(id);
    }

    // ── Private helpers ─────────────────────────────────────────────────────

    private static BookDto MapToDto(Domain.Entities.Book book) => new()
    {
        Id          = book.Id,
        Title       = book.Title,
        Author      = book.Author,
        Description = book.Description,
        CreatedAt   = book.CreatedAt,
        UpdatedAt   = book.UpdatedAt
    };
}
