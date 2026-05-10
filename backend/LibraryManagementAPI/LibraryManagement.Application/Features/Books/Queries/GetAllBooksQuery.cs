using LibraryManagement.Application.DTOs;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Queries;

public record GetAllBooksQuery() : IRequest<IEnumerable<BookDto>>;
