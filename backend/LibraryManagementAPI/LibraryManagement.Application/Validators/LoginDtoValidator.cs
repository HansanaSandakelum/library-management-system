using FluentValidation;
using LibraryManagement.Application.DTOs;

namespace LibraryManagement.Application.Validators;

public class LoginDtoValidator : AbstractValidator<LoginDto>
{
    public LoginDtoValidator()
    {
        RuleFor(u => u.Username)
            .NotEmpty().WithMessage("Please enter a username.")
            .MinimumLength(3).WithMessage("Username needs to be at least 3 chars.")
            .MaximumLength(100).WithMessage("Username is too long.");

        RuleFor(u => u.Password)
            .NotEmpty().WithMessage("Password can't be empty.")
            .MinimumLength(6).WithMessage("Password should be 6 characters or more.");
    }
}
