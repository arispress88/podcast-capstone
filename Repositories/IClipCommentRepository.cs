using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IClipCommentRepository
    {
        void Add(ClipComment clipComment);
        void Update(ClipComment clipComment);
        List<ClipComment> GetClipComments(int clipId);
    }
}