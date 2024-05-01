using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebAPI.Data;
using WebAPI.Interface;
using WebAPI.Repository;
using WebAPI.Service;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<WebAPIContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("WebAPIContext") ?? throw new InvalidOperationException("Connection string 'WebAPIContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(o => {
    o.AddPolicy("AllowAll", builder =>
        builder.AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());
});

builder.Services.AddTransient<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IEmployeeService, EmployeeService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
