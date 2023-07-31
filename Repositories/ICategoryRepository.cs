using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface ICategoryRepository
    {
        List<Category> GetAll();
        Category GetCategoryById(int id);
    }
}