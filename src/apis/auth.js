import config from "../config";

const registerUser = (formData, history) => {
  return fetch(`${config.server_url}api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData, // Use your own property name / key
    }),
  })
  .then((res) =>{
    return res.json();
  } );
};

const loginUser = (formData) => {
  return fetch(`${config.server_url}api/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData, // Use your own property name / key
    }),
  })
  .then((res) => {
    return res.json();
    // localStorage.setItem('token', res.token);
  });
};

const changePassword = (formData) => {
  return fetch(`${config.server_url}api/users/changePassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...formData, // Use your own property name / key
    }),
  })
  .then((res) => {
    console.log("password",res)
    return res.json();
  });
};

export { registerUser, loginUser, changePassword };
