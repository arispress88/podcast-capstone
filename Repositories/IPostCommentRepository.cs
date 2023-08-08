using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IPostCommentRepository
    {
        List<PostComment> GetPostCommentsByPostId(int postId);
        void Add(PostComment postComment);
        void Update(PostComment postComment);
    }
}