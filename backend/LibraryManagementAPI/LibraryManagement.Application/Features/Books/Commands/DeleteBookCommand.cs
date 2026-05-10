using MediatR;

namespace LibraryManagement.Application.Features.Books.Commands;

public record DeleteBookCommand(int Id) : IRequest<bool>;
