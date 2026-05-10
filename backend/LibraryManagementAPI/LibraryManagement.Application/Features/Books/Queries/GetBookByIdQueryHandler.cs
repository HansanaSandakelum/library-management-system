using LibraryManagement.Application.DTOs;
using LibraryManagement.Application.Interfaces;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Queries;

public class GetBookByIdQueryHandler : IRequestHandler<GetBookByIdQuery, BookDto?>
{
    private readonly IBookRepository _repository;

    public GetBookByIdQueryHandler(IBookRepository repository)
    {
        _repository = repository;
    }

    public async Task<BookDto?> Handle(GetBookByIdQuery request, CancellationToken cancellationToken)
    {
        var book = await _repository.GetByIdAsync(request.Id);
        if (book is null) return null;

        return new BookDto
        {
            Id          = book.Id,
            Title       = book.Title,
            Author      = book.Author,
            Description = book.Description,
            CreatedAt   = book.CreatedAt,
            UpdatedAt   = book.UpdatedAt
        };
    }
}
