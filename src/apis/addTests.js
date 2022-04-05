import config from '../config'

const addTests = (formData, history) => {
    console.log("api fomrdata", formData)
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
export { addTests }