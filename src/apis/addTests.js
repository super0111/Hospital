import config from '../config'

const addTests = (formData, history) => {
    return fetch(`${config.server_url}api/posts/addTests`, {
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
}

const confirmTest = ( formData ) => {
  return fetch(`${config.server_url}api/posts/confirmTest`, {
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
  });
}

const cancelTest = ( formData ) => {
  return fetch(`${config.server_url}api/posts/cancelTest`, {
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
  });
}
export { addTests, confirmTest, cancelTest }