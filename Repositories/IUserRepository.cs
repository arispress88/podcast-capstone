using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IUserRepository
    {
        UserProfile GetByEmail(string email);
        void Add(UserProfile userProfile);
        List<UserType> GetUserTypes();
        void UpdateUserType(int id, int userTypeId);
    }
}