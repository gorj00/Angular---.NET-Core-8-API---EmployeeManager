using WebAPI.Model;
using WebAPI.Repository;

namespace WebAPI.Interface
{
    public interface IUnitOfWork : IDisposable
    {
        // IGenereicRepository<Country> countries { get; }
        Task Save();

    }
}
