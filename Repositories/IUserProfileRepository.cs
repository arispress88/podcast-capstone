﻿using System.Collections.Generic;
using AEWRPod2.Models;

namespace AEWRPod2.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        UserProfile GetUserProfileById(int id);
        public void Update(UserProfile userProfile);
        public void Delete(int id);
    }
}