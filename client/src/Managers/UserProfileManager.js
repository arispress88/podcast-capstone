const apiUrl = "https://localhost:5001";

export const login = (userObject) => {
    return fetch (`${apiUrl}/api/userprofile/getbyemail?email=${userObject.email}`)
        .then((r) => r.json())
            .then((userProfile) => {
                if(userProfile.id){
                    localStorage.setItem("userProfile", JSON.stringify(userProfile));
                    return userProfile
                }
                else {
                    return undefined
                }
            });
};

export const logout = () => {
    localStorage.clear()
};

export const register = (userObject, password) => {
    return  fetch(`${apiUrl}/api/userprofile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject)
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
      });
  };

  export const getAllUserProfiles = () => {
    return fetch(`${apiUrl}/api/userprofile`)
    .then((r) => r.json())
  };

  export const getUserProfileById = (id) => {
    return fetch (`${apiUrl}/api/userprofile/${id}`).then((r) => r.json());
  };

  export const editUserProfile = (userProfile) => {
    return fetch(`${apiUrl}/api/userprofile/${userProfile.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userProfile)
    })
    .then(() => getAllUserProfiles());
  }

  //Retrieve user types
  export const getAllUserTypes = () => {
    return fetch(`${apiUrl}/api/userprofile/GetUserTypes`)
    .then((r) => r.json())
  }

  //Change the user type
  export const updateUserType = (userProfileId, userTypeId) => {
    return fetch(`${apiUrl}/api/userprofile/UpdateUserType/${userProfileId}/${userTypeId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userTypeId)
    })
  }

  //Delete a user
  export const deleteUserProfile = (id) => {
    return fetch(`${apiUrl}/api/userprofile/${id}`, {
        method: "DELETE",
    })
    .then(() => getAllUserProfiles())
  };