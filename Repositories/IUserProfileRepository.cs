using System.Collections.Generic;
using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetUserProfileById(int id);
    }
}