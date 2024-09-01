using ReactApp1.Server.Models;

namespace ReactApp1.Server.Repositories
{
    public interface IRepository<T> where T : Entity
    {
        T Get(int id);
        void Update(T entity);
        void Delete(int id);
        void Insert(T entity);
    }
}
