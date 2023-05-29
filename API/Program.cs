using Microsoft.EntityFrameworkCore;
using Persistence;

var corsPolicy = "CorsPolicy";

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options => {
    options.AddPolicy(name: corsPolicy, 
    policy => {
        policy.WithOrigins("http://localhost:3000");
    });
});

builder.Services.AddDbContext<DataContext>(opts => opts.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnectionString")));
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 以下snippet等效于命令行 dotnet ef database update
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try{
    var context = services.GetRequiredService<DataContext>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context);
}catch(Exception ex) {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occured during migration");
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/* 
Cors is Cross-Origin Requests;
以https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-7.0为例，
这里的Origin就是https://learn.microsoft.com
*/ 
app.UseCors(corsPolicy);

app.UseAuthorization();

app.MapControllers();

await app.RunAsync();
