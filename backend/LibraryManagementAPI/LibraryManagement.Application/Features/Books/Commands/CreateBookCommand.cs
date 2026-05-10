using LibraryManagement.Application.DTOs;
using MediatR;

namespace LibraryManagement.Application.Features.Books.Commands;

public record CreateBookCommand(CreateBookDto CreateBookDto) : IRequest<BookDto>;
