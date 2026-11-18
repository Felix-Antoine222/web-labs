using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using serveur21.Models;

namespace serveur21.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        await using AsyncServiceScope scope = services.CreateAsyncScope();

        Serveur21Context context = scope.ServiceProvider
            .GetRequiredService<Serveur21Context>();

        UserManager<User> userManager = scope.ServiceProvider
            .GetRequiredService<UserManager<User>>();

        // Pourrait servir plus tard.
        RoleManager<IdentityRole> roleManager = scope.ServiceProvider
            .GetRequiredService<RoleManager<IdentityRole>>();

        await context.Database.MigrateAsync();

        IdentityRole? role1 = await roleManager.FindByIdAsync("1");
        if (role1 is null)
        {
            role1 = new IdentityRole { Id = "1", Name = "corruptedTeacher" };
            IdentityResult result = await roleManager.CreateAsync(role1);
            if (!result.Succeeded)
            {
                string errors = string.Join(", ",
                    result.Errors.Select(error => error.Description));
                throw new InvalidOperationException(
                    $"Impossible de créer l'utilisateur 'corruptedTeacher' : {errors}");
            }
        }

        IdentityRole? role2 = await roleManager.FindByIdAsync("2");
        if (role2 is null)
        {
            role2 = new IdentityRole { Id = "2", Name = "student" };
            IdentityResult result = await roleManager.CreateAsync(role2);

            if (!result.Succeeded)
            {
                string errors = string.Join(", ",
                    result.Errors.Select(error => error.Description));
                throw new InvalidOperationException(
                    $"Impossible de créer l'utilisateur 'student' : {errors}");
            }
        }

        User u1 = await CreateUserIfMissingAsync(
            userManager,
            "11111111-1111-1111-1111-111111111111", "Maxou", "m@m.m",
            "allo"
        );
        User u2 = await CreateUserIfMissingAsync(
            userManager,
            "11111111-1111-1111-1111-111111111112", "Pielle-Arexandre", "p@p.p",
            "allo"
        );
        User u3 = await CreateUserIfMissingAsync(
            userManager,
            "11111111-1111-1111-1111-111111111113", "Masie-Carrandra", "c@c.c",
            "allo"
        );

        IdentityResult resultReal = await userManager.CreateAsync(u1, "Salut1!");

        await userManager.AddToRoleAsync(u1, "corruptedTeacher");
        await userManager.AddToRoleAsync(u2, "student");
        await userManager.AddToRoleAsync(u3, "student");

        if (!resultReal.Succeeded)
        {
            string errors = string.Join(", ",
                resultReal.Errors.Select(error => error.Description));
            throw new InvalidOperationException(
                $"Impossible de créer l'utilisateur 'Bob69' : {errors}");
        }


        await context.SaveChangesAsync();
    }

    private static async Task<User> CreateUserIfMissingAsync(
        UserManager<User> userManager,
        string userId,
        string userName,
        string email,
        string password)
    {
        User? user = await userManager.FindByIdAsync(userId);

        if (user is not null)
        {
            return user;
        }

        user = new User
        {
            Id = userId,
            UserName = userName,
            Email = email,
            EmailConfirmed = true
        };

        IdentityResult result = await userManager.CreateAsync(user, password);

        if (!result.Succeeded)
        {
            string errors = string.Join(
                ", ",
                result.Errors.Select(error => error.Description));

            throw new InvalidOperationException(
                $"Impossible de créer l'utilisateur '{userName}' : {errors}");
        }

        return user;
    }

    // À utiliser?!
    private static async Task<IdentityRole> CreateRoleIfMissingAsync(
        RoleManager<IdentityRole> roleManager,
        string roleId,
        string roleName)
    {
        IdentityRole? role = await roleManager.FindByIdAsync(roleId);

        if (role is not null)
        {
            return role;
        }

        role = new IdentityRole
        {
            Id = roleId,
            Name = roleName
        };

        IdentityResult result = await roleManager.CreateAsync(role);

        if (!result.Succeeded)
        {
            string errors = string.Join(
                ", ",
                result.Errors.Select(error => error.Description));

            throw new InvalidOperationException(
                $"Impossible de créer l'utilisateur '{roleName}' : {errors}");
        }

        return role;
    }
}