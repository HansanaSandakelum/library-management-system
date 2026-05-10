using LibraryManagement.Application.DTOs;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Commands;

public record UpdateBookCommand(int Id, UpdateBookDto UpdateBookDto) : IRequest<BookDto?>;
