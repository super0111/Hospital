import config from "../config";

const registerPatient = (formData, history) => {
  console.log("API FormData", formData)
  return fetch(`${config.server_url}api/posts/registerPatient`, {
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

const treatmentChange = (formData, history) => {
  return fetch(`${config.server_url}api/posts/changeTreatment`, {
    method: "PUT",
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


export { registerPatient, treatmentChange };
