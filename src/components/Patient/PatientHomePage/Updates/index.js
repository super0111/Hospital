import classes from "./Updates.module.css"
import { BiFastForward } from "react-icons/bi";
import Moment from 'moment';
import { MdDeleteForever } from "react-icons/md";
import { notifyDelete } from './../../../../apis/notify'

const Updates = (props) => {
    const notifications = props.notifications;
    const setNotifications = props.setNotifications;
    const handleDelete = (i) => {
      notifyDelete(i)
      .then((res) => {
          setNotifications(res.data)
      })
    }
  
    return(
        <div className={classes.updates}>
          <div className={classes.updates_title}>
            Notifitions
          </div>
          <div className={classes.body}>
            {notifications?.map((notification, i) => (
              <div key={i} className={classes.item}>
                  <div className={classes.date}>{Moment(notification.date).format('YYYY-MM-DD HH:mm')}</div>
                  <div className={classes.text}>{notification.content}</div>
                  <div className={classes.delete_btn} onClick={ () => handleDelete(notification._id)} ><MdDeleteForever size={20} color="rgb(215, 95, 61)" /></div>
              </div>
            ))}
          </div>
          <div className={classes.btn}>All Updates <BiFastForward size={22} color="white" /></div>
        </div>
    )
}
export default Updates