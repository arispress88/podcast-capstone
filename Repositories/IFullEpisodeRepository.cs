using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IFullEpisodeRepository
    {
        void Add(FullEpisode fullEpisode);
        void Delete(int id);
        List<FullEpisode> GetAll();
        FullEpisode GetEpisodeByCategory(int CategoryId);
    }
}