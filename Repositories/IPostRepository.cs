using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        Post GetPostById(int id);
        void Add(Post post);
        void Delete(int id);
        void Update(Post post);
    }
}