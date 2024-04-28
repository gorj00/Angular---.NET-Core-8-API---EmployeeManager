using WebAPI.Data;
using WebAPI.Interface;
using WebAPI.Model;

namespace WebAPI.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly WebAPIContext _context;
        // private IGenereicRepository<Country> _countries;

        public UnitOfWork(WebAPIContext context)
        {
            _context = context;
        }

        // public IGenericRepository<Country> countries => _countries ??= new GenericRepository<Country>(_context);

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
