using Microsoft.EntityFrameworkCore;
using ReactApp1.Server.Models;
using System.Linq.Expressions;

namespace ReactApp1.Server.Repositories
{
    public class GenericRepository<TEntity> : IRepository<TEntity> 
        where TEntity : class
    {
        internal ApplicationDbContext context;
        internal DbSet<TEntity> set;

        public GenericRepository(ApplicationDbContext context)
        {
            this.context = context;
            set = context.Set<TEntity>();
        }

        public virtual IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>>? filter = null)
        {
            IQueryable<TEntity> query = set;

            if (filter != null)
            {
                query = query.Where(filter);
            }

            return query;
        }

        public virtual async Task<TEntity> GetByIdAsync(int id)
        {
            return await set.FindAsync(id);
        }

        public virtual void Insert(TEntity entity)
        {
            set.Add(entity);
        }

        public virtual void Update(TEntity entity)
        {
            set.Attach(entity);
            context.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(TEntity entity)
        {
            if (context.Entry(entity).State == EntityState.Detached)
            {
                set.Attach(entity);
            }
            set.Remove(entity);
        }

        public virtual async Task<int> SaveAsync()
        {
            return await context.SaveChangesAsync();
        }

        public virtual IQueryable<TEntity> SortBy<TKey>(Expression<Func<TEntity, TKey>> order)
        {
            return set.OrderBy(order);
        }
    }
}
