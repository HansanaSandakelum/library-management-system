using FluentValidation;
using LibraryManagement.Application.DTOs;

namespace LibraryManagement.Application.Validators;

public class CreateBookValidator : AbstractValidator<CreateBookDto>
{
    public CreateBookValidator()
    {
        RuleFor(b => b.Title)
            .NotEmpty().WithMessage("Book title is required.")
            .MaximumLength(200).WithMessage("Title is too long (max 200 chars).");

        RuleFor(b => b.Author)
            .NotEmpty().WithMessage("Author name is required.")
            .MaximumLength(200).WithMessage("Author name is too long.");

        RuleFor(b => b.Description)
            .MaximumLength(1000).WithMessage("Description is way too long.");
    }
}
