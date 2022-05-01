import classes from "./ConfirmNotify.module.css"
import { BiFastForward } from "react-icons/bi";
import Moment from 'moment';
import { MdDeleteForever } from "react-icons/md";
import { confirmNotifyDelete } from "./../../../../apis/notify"

const ConfirmNotify = (props) => {
    const setIsShow = props.setIsShow;
    const setConfirmData = props.setConfirmData;
    const notifications = props.confirmNotfications;
    const setNotifications = props.setConfirmNotifications;
    
    const handleDelete = (i) => {
      confirmNotifyDelete(i)
      .then((res) => {
          setNotifications(res.data)
      })
    }

    const handleShowConfirm = (data) => {
        setConfirmData(data)
        setIsShow(true)
    }
    return (
        <div className={classes.confirmNotify}>
            <div className={classes.updates_title}>
                Confirm Notifitions
            </div>
            <div className={classes.body}>
                {notifications.length != 0 ? notifications.map((notification, i) => (
                <div key={i} className={classes.item}>
                    <div className={classes.date} onClick={ () => handleShowConfirm(notification) }  >{Moment(notification.date).format('YYYY-MM-DD HH:mm')}</div>
                    <div className={classes.text} onClick={ () => handleShowConfirm(notification) } >{notification.testName}</div>
                    <div className={classes.delete_btn} onClick={ () => handleDelete(notification._id)} ><MdDeleteForever size={20} color="rgb(215, 95, 61)" /></div>
                </div>
                )) : <div className={classes.notify_content}>No Notifications</div>}
            </div>
        </div>
    )
}
 export default ConfirmNotify