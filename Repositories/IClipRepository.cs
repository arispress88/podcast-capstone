using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IClipRepository
    {
        List<Clip> GetAll();
        Clip GetClipById(int id);
    }
}