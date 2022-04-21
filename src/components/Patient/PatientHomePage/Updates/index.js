import classes from "./Updates.module.css"
import { BiFastForward } from "react-icons/bi";

const Updates = () => {
    return(
        <div className={classes.updates}>
          <div className={classes.updates_title}>
            Notifitions
          </div>
          <div className={classes.body}>
              <div className={classes.item}>
                  <div className={classes.date}>06:00 PM</div>
                  <div className={classes.text}>asdfsdfsd</div>
              </div>
          </div>
          <div className={classes.btn}>All Updates <BiFastForward size={22} color="white" /></div>
        </div>
    )
}
export default Updates