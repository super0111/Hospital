import config from '../config'

const notifyDelete = (i) => {
    return fetch(`${config.server_url}api/notifications/deleteNotify/${i}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) =>{
      return res.json();
    });
  }

export { notifyDelete }
