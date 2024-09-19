using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;

var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
//}).AddCookie(options =>
//{
//    options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
//    options.Cookie.MaxAge = options.ExpireTimeSpan; // optional
//    options.SlidingExpiration = true;
//    options.Cookie.Path = "/login";
//   
//});
builder.Services.AddAuthorization();

// Add services to the container.
string connection = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connection));

builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "WebSiteAuth";
    options.ExpireTimeSpan = TimeSpan.FromDays(1);
    options.Cookie.MaxAge = TimeSpan.FromDays(1);
    options.Cookie.HttpOnly = true;
    options.LoginPath = "/";
    options.SlidingExpiration = true;
    options.Cookie.SameSite = SameSiteMode.None;
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

//using (var scope = app.Services.CreateScope())
//{
//    var services = scope.ServiceProvider;

//    var context = services.GetRequiredService<ApplicationDbContext>();
    
//    context.Database.EnsureCreated();
//    // DbInitializer.Initialize(context);
//}

app.UseDefaultFiles();
app.UseStaticFiles();

//Нужно, чтобы react-клиент мог обратиться до конечных точек бэка
app.UseCors(builder => builder.WithOrigins("https://localhost:5173")
                                           .AllowCredentials()
                                           .AllowAnyMethod()
                                           .AllowAnyHeader());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

//app.MapIdentityApi<IdentityUser>();
app.MapControllers();


app.MapFallbackToFile("/index.html");

app.Run();
