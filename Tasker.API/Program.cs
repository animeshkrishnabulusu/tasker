var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(p => p
    .AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);

var tasks = new List<TaskItem>
{
    new(1, "Learn Angular"),
    new(2, "Wire Minimal API")
};

app.MapGet("/tasks", () => tasks);

app.MapPost("/tasks", (CreateTaskDto dto) =>
{
    var task = new TaskItem(tasks.Count + 1, dto.Title);
    tasks.Add(task);
    return Results.Created($"/tasks/{task.Id}", task);
});

app.Run();

record TaskItem(int Id, string Title);
record CreateTaskDto(string Title);
