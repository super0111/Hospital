import config from '../config'

const allNotifySave = (formData) => {
    console.log('notify save');
    return fetch(`${config.server_url}api/notifications/saveAllNotify`, {
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
    });
  }

const notifyConfirmSave = (formData) => {
    console.log('notify save');
    return fetch(`${config.server_url}api/notifications/saveNotify`, {
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
    });
  }

const confirmNotifyDelete = (i) => {
    return fetch(`${config.server_url}api/notifications/deleteConfirmNotify/${i}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) =>{
      return res.json();
    });
  }

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

export { notifyDelete, confirmNotifyDelete, notifyConfirmSave, allNotifySave }
