using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IClipRepository
    {
        List<Clip> GetAll();
        Clip GetClipById(int id);
        void Add(Clip clip);
        void Delete(int id);
        Clip GetClipByCategory(int categoryId);
    }
}