import config from '../config'

const saveMessage = (formData, history) => {
    return fetch(`${config.server_url}api/message`, {
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
export {saveMessage}