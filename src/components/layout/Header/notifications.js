import React from 'react';
import FlipMove from 'react-flip-move';

const Notifications = (props) => {
    const notifs = props.notifs
    const list = notifs.map((notif, index) => (
      <div className={notif.read ? 'li' : 'li new'} key={index}>
        <div className="pic">
          <img src="" alt="profile-pic" />
        </div>
        <div className="content">
          <b>{notif.name} </b> {notif.action} your {notif.content}
        </div>
      </div>
    ));

    return (
      <div>
        <FlipMove duration={200} leaveAnimation="fade" enterAnimation="fade">
          {list.reverse()}
        </FlipMove>
      </div>
    );
}

export default Notifications;
