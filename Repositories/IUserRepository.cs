using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IUserRepository
    {
        UserProfile GetByEmail(string email);
    }
}