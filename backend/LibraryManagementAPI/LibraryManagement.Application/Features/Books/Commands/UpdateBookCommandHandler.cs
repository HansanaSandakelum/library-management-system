using LibraryManagement.Application.DTOs;
using LibraryManagement.Application.Interfaces;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Commands;

public class UpdateBookCommandHandler : IRequestHandler<UpdateBookCommand, BookDto?>
{
    private readonly IBookRepository _repository;

    public UpdateBookCommandHandler(IBookRepository repository)
    {
        _repository = repository;
    }

    public async Task<BookDto?> Handle(UpdateBookCommand request, CancellationToken cancellationToken)
    {
        var existing = await _repository.GetByIdAsync(request.Id);
        if (existing is null)
            return null;

        existing.Title       = request.UpdateBookDto.Title.Trim();
        existing.Author      = request.UpdateBookDto.Author.Trim();
        existing.Description = request.UpdateBookDto.Description.Trim();
        existing.UpdatedAt   = DateTime.UtcNow;

        var updated = await _repository.UpdateAsync(existing);
        if (updated is null) return null;

        return new BookDto
        {
            Id          = updated.Id,
            Title       = updated.Title,
            Author      = updated.Author,
            Description = updated.Description,
            CreatedAt   = updated.CreatedAt,
            UpdatedAt   = updated.UpdatedAt
        };
    }
}
