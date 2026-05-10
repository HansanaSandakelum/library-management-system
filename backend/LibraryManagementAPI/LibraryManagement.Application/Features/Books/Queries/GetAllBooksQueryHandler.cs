using LibraryManagement.Application.DTOs;
using LibraryManagement.Application.Interfaces;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Queries;

public class GetAllBooksQueryHandler : IRequestHandler<GetAllBooksQuery, IEnumerable<BookDto>>
{
    private readonly IBookRepository _repository;

    public GetAllBooksQueryHandler(IBookRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<BookDto>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
    {
        var books = await _repository.GetAllAsync();
        return books.Select(book => new BookDto
        {
            Id          = book.Id,
            Title       = book.Title,
            Author      = book.Author,
            Description = book.Description,
            CreatedAt   = book.CreatedAt,
            UpdatedAt   = book.UpdatedAt
        });
    }
}
