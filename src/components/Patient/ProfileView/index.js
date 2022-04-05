import { useEffect, useState } from "react";
import classes from "./ProfileView.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
import {editProfile} from "../../../apis/patient";
import config from "../../../config";

const ProfileView = () => {
    const [fullName, setFullName] = useState("")
    const [id, setId] = useState("")
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState("")
    const [birthday, setBirthday] = useState("")
    const [isAllergies, setIsAllergies] = useState("")
    const [isADHD, setIsADHD] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [information, setInformation] = useState("")
    const [summary, setSummary] = useState("")
    const [phone, setPhone] = useState('')
    const [avatar, setAvatar] = useState("")

    let [currentUser, setCurrentUser] = useState(undefined);
    useEffect(() => {
            const userString = localStorage.getItem('token');
            const current_user = jwt_decode(userString);
            const current_id = current_user.patient_user.id
            setCurrentUser(current_id);
    }, [currentUser])
       
    useEffect( () => {
        const fetchPosts = async () => {
            const res = await fetch(`${config.server_url}api/patient/getProfile/${currentUser}`);
            const profileData = await res.json();
            setFullName(profileData.fullname)
            setId(profileData.id)
            setBirthday(profileData.birthday)
            setGender(profileData.gender)
            setHeight(profileData.height)
            setWeight(profileData.weight)
            setInformation(profileData.information)
            setSummary(profileData.summary)
            setIsADHD(profileData.isADHD)
            setIsAllergies(profileData.isAllergies)
            setEmail(profileData.email)
            setPassword(profileData.password)
            setPhone(profileData.phoneNumber)
            setAvatar(profileData.picture)
        };
        fetchPosts();
    }, [currentUser]);

    return(
        <div className={classes.profileEdit}>
            <div className={classes.form_wrapper_login}>
                <h1 className={classes.title}>My Profile</h1>
                <div className={classes.avatar}>
                    <img src={avatar} className={classes.avatar_img} />
                </div>
                <form>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>FullName :</div>
                        <div className={classes.input}>{fullName}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Id :</div>
                        <div className={classes.input}>{id}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Email :</div>
                        <div className={classes.input}>{email}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Password :</div>
                        <div className={classes.input}>{password}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Phone Number :</div>
                        <div className={classes.input}>{phone}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Gender :</div>
                        <div className={classes.input}>{gender}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Birthday :</div>
                        <div className={classes.input}>{birthday}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Phone Number :</div>
                        <div className={classes.input}>{phone}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Is Allergies :</div>
                        <div className={classes.input}>{isAllergies==true? "Yes":"No"}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Is ADHD :</div>
                        <div className={classes.input}>{isADHD==true ? "Yes" : "No"}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Height :</div>
                        <div className={classes.input}>{height}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Weight :</div>
                        <div className={classes.input}>{weight}</div>
                    </div>
                    <div className={classes.information}>
                        <div className={classes.input_name}>Information :</div>
                        <div className={classes.input_info}>{information}</div>
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Summary :</div>
                        <div className={classes.input_info}>{summary}</div>
                    </div>
                </form>
                <ToastContainer /> 
            </div>
        </div>
    )
}
export default ProfileView