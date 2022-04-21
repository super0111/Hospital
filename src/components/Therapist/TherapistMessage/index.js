import classes from "./TherapistMessage.module.css";
import config from "../../../config";
import jwt_decode from "jwt-decode";
import { useState, useEffect, useRef } from "react";
import { BiSend } from "react-icons/bi";
import {saveMessage} from './../../../apis/message'
import { io } from "socket.io-client";

const TherapistMessage = () => {
    const [ patientsLists, setPatientLists ] = useState([])
    const [ messageLists, setMessageLists ] = useState([])
    const [ messages, setMessages ] = useState([])
    const [ currentUserName, setCurrentUserName ] = useState(undefined);
    const [ currentUserAvatar, setCurrentUserAvatar ] = useState(undefined);
    const [ currentUserId, setCurrentUserId ] = useState(undefined);
    const [ currentPatientName, setCurrentPatientName ] = useState(undefined);
    const [ currentPatientId, setCurrentPatientId ] = useState(undefined);
    const [ currentPatientAvatar, setCurrentPatientAvatar ] = useState(undefined);

    const [ messageValue, setMessageValue ] = useState("")
    const [ isActive, setIsActive ] = useState(0)
    const [ patientMessageInfo, setPatientMessageInfo ] = useState([])

const [state, setState] = useState({ message: "" })


    const socketRef = useRef();
    useEffect(() => {
        socketRef.current = io(config, { transports : ['websocket'] });
        socketRef.current.on('patient_message_send', (patient_message) => {
            setPatientMessageInfo(patient_message.message)
        })
    }, []);

    useEffect(() => {
        if(patientMessageInfo) {
            setMessages([...messages, patientMessageInfo]);
        }
    }, [patientMessageInfo])

    useEffect(() => {
        const userString = localStorage.getItem('token');
        if(userString) {
            const current_user = jwt_decode(userString);
            const current_userName = current_user.user.fullname;
            const current_userAvatar = current_user.user.avatar;
            const current_userId = current_user.user.id;
            setCurrentUserName(current_userName);
            setCurrentUserAvatar(current_userAvatar);
            setCurrentUserId(current_userId)
        }
    }, []);

    useEffect(async () => {
        const fetchMessages = async () => {
            const res = await fetch(`${config.server_url}api/message`);
            const message = await res.json();
            setMessageLists(message);
        };
        const fetchPatientss = async () => {
            const res = await fetch(`${config.server_url}api/posts/getPatients`);
            const patients = await res.json();
            setPatientLists(patients);
        };
        await fetchMessages(); 
        await fetchPatientss();  
    }, [])


    useEffect(() => {
        if(patientsLists && patientsLists.length > 0) {
            handlePatientSelect(patientsLists[0]);
        }
    }, [patientsLists]);

    const handlePatientSelect = (patient, i) => {
        setIsActive(i)
        setCurrentPatientId(patient._id)
        setCurrentPatientName(patient.fullname)
        setCurrentPatientAvatar(patient.picture)
        const message = messageLists.filter((item) => item.patient_id === patient._id );
        setMessages(message)
    }

    const handleMessageChange = (e) => {
        setMessageValue(e.target.value)
    }

    const handleMessageSend = () => {
        const date = new Date().toLocaleString();
        const formData = {
            date : date,
            therapist_id : currentUserId,
            therapist_name : currentUserName,
            therapist_avatar : currentUserAvatar,
            patient_name : currentPatientName,
            patient_avatar : currentPatientAvatar,
            patient_id : currentPatientId,
            message : messageValue,
            isTherapistMessage: 1
        }
        setMessages([...messages, formData]);
        setMessageLists([...messageLists, formData]);
        setMessageValue("")
        saveMessage(formData)
        .then((res) => {
            console.log("message res", res)
            socketRef.current.emit("therapist_message_send", res);
        })
        .catch((error) => console.log(error));
    }
    return(
        <div className={classes.therapist}>
            <div className={classes.title}>Message Send Box</div>
            <div className={classes.therapistMessage}>
                <div className={classes.patientMenu}>
                    <div className={classes.patientMenu_title}>Patients List</div>
                    <div className={classes.patientMenu_divider}></div>
                    <div className={classes.patientMenu_body}>
                        { patientsLists.map((patientsList, i) => (
                            <div key={i} className={ isActive === i ? classes.patientMenu_item_active  :  classes.patientMenu_item  } onClick={()=>handlePatientSelect(patientsList, i)}>
                                 <img alt="" className={classes.patientMenu_avatar} src={patientsList.picture} />
                                 <div className={classes.patientMenu_patient}>{patientsList.fullname}</div>
                             </div>
                        )) }
                    </div>
                </div>
                <div className={classes.body}>
                    <div className={classes.messageBody}>
                        { messages.map((message, i) => (
                            <div key={i} className={ message.isTherapistMessage === 1 ? classes.messageItem : classes.messageItem2}>
                                <img alt="" className={classes.messageAvatar} src={ message.isTherapistMessage === 2 ? message.patient_avatar : "/images/Therapist_Avatar.png" } />
                                <div className={classes.name_field}>
                                    <div className={ message.isTherapistMessage === 2 ? classes.name_title : classes.name_title_my }>{message.isTherapistMessage === 2 ? message.patient_name: message.therapist_name}</div>
                                    <div className={ message.isTherapistMessage === 2 ? classes.message_text : classes.message_text_my}>{message.message}</div>
                                    <div className={ message.isTherapistMessage === 2 ? classes.date : classes.date_my }>{message.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={classes.messageSendBox}>
                        <input className={classes.messageInput} onChange={handleMessageChange} value={messageValue}
                            onKeyPress={(e) => { if (e.key === "Enter") { handleMessageSend() } }} 
                            type="text" 
                            placeholder="Enter Message..." 
                        />
                        <BiSend size={30} onClick={handleMessageSend} className={classes.messageSendIcon} />
                    </div>
                </div>
            </div>
        </div>
      
    )
}
export default TherapistMessage