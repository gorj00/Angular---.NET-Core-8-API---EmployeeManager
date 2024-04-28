using WebAPI.Data;
using WebAPI.Interface;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WebAPIContext _context;
        private IGenericRepository<Address> _addresses;
        private IGenericRepository<Country> _countries;
        private IGenericRepository<Salary> _salaries;
        private IGenericRepository<Employee> _employees;
        private IGenericRepository<City> _cities;
        private IGenericRepository<JobCategory> _jobCategories;
        private IGenericRepository<JobCategory_Employee> _jobCategoriesEmployees;

        public UnitOfWork(WebAPIContext context)
        {
            _context = context;
        }

        public IGenericRepository<Address> addresses => _addresses ??= new GenericRepository<Address>(_context);
        public IGenericRepository<Country> countries => _countries ??= new GenericRepository<Country>(_context);
        public IGenericRepository<Salary> salaries => _salaries ??= new GenericRepository<Salary>(_context);
        public IGenericRepository<Employee> employees => _employees ??= new GenericRepository<Employee>(_context);
        public IGenericRepository<City> cities => _cities ??= new GenericRepository<City>(_context);
        public IGenericRepository<JobCategory> jobCategories => _jobCategories ??= new GenericRepository<JobCategory>(_context);
        public IGenericRepository<JobCategory_Employee> jobCategoriesEmployees => _jobCategoriesEmployees ??= new GenericRepository<JobCategory_Employee>(_context);

        public void Dispose()
        {
            _context.Dispose();
            GC.SuppressFinalize(this);
        }

        public async Task Save()
        {
            await _context.SaveChangesAsync();
        }
    }
}
