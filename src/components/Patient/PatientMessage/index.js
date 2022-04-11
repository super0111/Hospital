import classes from "./PatientMessage.module.css"
import { BiSend } from "react-icons/bi";
import { useEffect, useState, useRef } from "react";
import config from "./../../../config";
import jwt_decode from "jwt-decode";
import {saveMessage} from './../../../apis/message'
import { io } from "socket.io-client";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PatientMessage = () => {

    const [ currentPatientName, setCurrentPatientName ] = useState(undefined);
    const [ current_patientAvatar, setCurrentPatientAvatar ] = useState(undefined);
    const [ currentPatientId, setCurrentPatientId ] = useState(undefined);
    const [ messageLists, setMessageLists ] = useState([])
    const [ messages, setMessages ] = useState([])
    const [ messageValue, setMessageValue ] = useState("")
    const [ therapistMessageInfo, setTherapistMessageInfo ] = useState([])
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io("http://10.10.10.249:5000", { transports : ['websocket'] });
        socketRef.current.on('therapist_message_send', (therapist_message) => {
            setTherapistMessageInfo(therapist_message.message)
        })
    }, []);
    
    useEffect(() => {
        if(therapistMessageInfo) {
            if(currentPatientId == therapistMessageInfo.patient_id) {
                setMessages([...messages, therapistMessageInfo]);
            }
        }
    }, [therapistMessageInfo])


    useEffect(() => {
        const userString = localStorage.getItem('token');
        if(userString) {
            const current_patient = jwt_decode(userString);
            const current_patientName = current_patient.patient_user.fullname;
            const current_patientAvatar = current_patient.patient_user.avatar;
            const current_patientId = current_patient.patient_user.id;
            setCurrentPatientName(current_patientName);
            setCurrentPatientId(current_patientId);
            setCurrentPatientAvatar(current_patientAvatar);
        }
    }, []);

    useEffect ( async () => {
        const fetchMessages = async () => {
            const res = await fetch(`${config.server_url}api/message/`);
            const message = await res.json();
            setMessageLists(message);
        };
        await fetchMessages();
    }, []);

    useEffect (() => {
        const message = messageLists.filter((item) => item.patient_id === currentPatientId)
        setMessages(message)
    }, [messageLists])

    const handleMessageChange = (e) => {
        setMessageValue(e.target.value)
    }

    const handleMessageSend = () => {
        if(therapistMessageInfo) {
            const date = new Date().toLocaleString();
            const formData = {
                date: date,
                therapist_id : therapistMessageInfo.therapist_id,
                therapist_name : therapistMessageInfo.therapist_name,
                patient_name : currentPatientName,
                patient_avatar : current_patientAvatar,
                patient_id : currentPatientId,
                message : messageValue,
                isTherapistMessage: 2,
            }
            setMessages([...messages, formData]);
            setMessageValue("")
            saveMessage(formData)
            .then((res) => {
                socketRef.current.emit("patient_message_send", res);
            })
            .catch((err) => console.log(err))
        }
    }

    return(
        <div className={classes.patientMessage}>
            <div className={classes.title}>Message Send Box</div>
            <div className={classes.body}>
                <div className={classes.messageBody}>
                    { messages && messages.map((message, i) => (
                        <div key={i} className={ message.isTherapistMessage === 2 ? classes.messageItem : classes.messageItem2}>
                            <img alt="" className={classes.messageAvatar} src={ message.isTherapistMessage === 2 ? message.patient_avatar : "/images/Therapist_Avatar.png" } />
                            <div className={classes.name_field}>
                                <div className={message.isTherapistMessage === 1 ? classes.name_title : classes.name_title_my}>{message.isTherapistMessage === 2 ? message.patient_name: message.therapist_name}</div>
                                <div className={message.isTherapistMessage === 1 ? classes.message_text : classes.message_text_my}>{message.message}</div>
                                <div className={message.isTherapistMessage === 1 ? classes.date : classes.date_my}>{message.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={classes.messageSendBox}>
                    <input className={classes.messageInput} onChange={handleMessageChange} value={messageValue} type="text" placeholder="Enter Message..." />
                    <BiSend size={30} onClick={handleMessageSend} className={classes.messageSendIcon} />
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}
export default PatientMessage