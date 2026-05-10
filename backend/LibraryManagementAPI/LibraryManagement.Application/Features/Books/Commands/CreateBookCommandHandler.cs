using LibraryManagement.Application.DTOs;
using LibraryManagement.Application.Interfaces;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Commands;

public class CreateBookCommandHandler : IRequestHandler<CreateBookCommand, BookDto>
{
    private readonly IBookRepository _repository;

    public CreateBookCommandHandler(IBookRepository repository)
    {
        _repository = repository;
    }

    public async Task<BookDto> Handle(CreateBookCommand request, CancellationToken cancellationToken)
    {
        var book = new Domain.Entities.Book
        {
            Title       = request.CreateBookDto.Title.Trim(),
            Author      = request.CreateBookDto.Author.Trim(),
            Description = request.CreateBookDto.Description.Trim(),
            CreatedAt   = DateTime.UtcNow,
            UpdatedAt   = DateTime.UtcNow
        };

        var created = await _repository.CreateAsync(book);
        return new BookDto
        {
            Id          = created.Id,
            Title       = created.Title,
            Author      = created.Author,
            Description = created.Description,
            CreatedAt   = created.CreatedAt,
            UpdatedAt   = created.UpdatedAt
        };
    }
}
