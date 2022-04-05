import config from "../config";
import axios from 'axios'

const editProfile = (formData, history) => {
  return fetch(`${config.server_url}api/patient/editProfile`, {
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

const fileUploadEdit = async (file) => {
  let formData = new FormData()
  formData.append('file', file)
  const res = await axios.post(`${config.server_url}api/file`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return Promise.resolve(res)
};

export { editProfile,fileUploadEdit };
