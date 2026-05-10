using LibraryManagement.Application.DTOs;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Queries;

public record GetBookByIdQuery(int Id) : IRequest<BookDto?>;
