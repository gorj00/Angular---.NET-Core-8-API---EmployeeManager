using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        IGenericRepository<Country> countries { get; }
        IGenericRepository<Address> addresses { get; }
        IGenericRepository<City> cities { get; }
        IGenericRepository<Salary> salaries { get; }
        IGenericRepository<Employee> employees { get; }
        IGenericRepository<JobCategory> jobCategories { get; }
        IGenericRepository<JobCategory_Employee> jobCategoriesEmployees { get; }

        Task Save();

    }
}
