using LibraryManagement.Application.DTOs;
using MediatR;

namespace LibraryManagement.Application.Features.Auth.Commands;

public record LoginCommand(LoginDto LoginDto) : IRequest<AuthResponseDto?>;
