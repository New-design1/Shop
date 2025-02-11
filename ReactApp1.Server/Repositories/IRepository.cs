﻿using System.Linq.Expressions;

namespace ReactApp1.Server.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IQueryable<TEntity> GetAll(Expression<Func<TEntity, bool>>? filter = null);
        Task<TEntity> GetByIdAsync(int id);
        void Create(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        Task<int> SaveAsync();
    }
}
