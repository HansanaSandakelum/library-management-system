using LibraryManagement.Application.DTOs;
using LibraryManagement.Application.Features.Books.Commands;
using LibraryManagement.Application.Features.Books.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using FluentValidation;
using Microsoft.AspNetCore.Authorization;

namespace LibraryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly IMediator _mediator;
    private readonly IValidator<CreateBookDto> _createValidator;
    private readonly IValidator<UpdateBookDto> _updateValidator;

    public BooksController(
        IMediator mediator,
        IValidator<CreateBookDto> createValidator,
        IValidator<UpdateBookDto> updateValidator)
    {
        _mediator         = mediator;
        _createValidator  = createValidator;
        _updateValidator  = updateValidator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var books = await _mediator.Send(new GetAllBooksQuery());
        return Ok(books);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var book = await _mediator.Send(new GetBookByIdQuery(id));
        if (book is null)
            return NotFound(new { message = $"Book with id {id} was not found." });

        return Ok(book);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateBookDto dto)
    {
        var validation = await _createValidator.ValidateAsync(dto);
        if (!validation.IsValid)
            return BadRequest(new { errors = validation.Errors.Select(e => e.ErrorMessage) });

        var created = await _mediator.Send(new CreateBookCommand(dto));
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateBookDto dto)
    {
        var validation = await _updateValidator.ValidateAsync(dto);
        if (!validation.IsValid)
            return BadRequest(new { errors = validation.Errors.Select(e => e.ErrorMessage) });

        var updated = await _mediator.Send(new UpdateBookCommand(id, dto));
        if (updated is null)
            return NotFound(new { message = $"Book with id {id} was not found." });

        return Ok(updated);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _mediator.Send(new DeleteBookCommand(id));
        if (!deleted)
            return NotFound(new { message = $"Book with id {id} was not found." });

        return NoContent();
    }
}
