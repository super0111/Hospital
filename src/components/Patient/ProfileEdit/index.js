import classes from "./ProfileEdit.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import {editProfile, fileUploadEdit} from "../../../apis/patient";
import config from "../../../config";

const ProfileEdit = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [uploadBtn, setUploadBtn] = useState("init")
    const handleUploadClick = () => {
        setInterval(() => {
            setUploadBtn("upload")
          }, 4000);
    }

    const [avatar, setImsetAvatarage] = useState({ preview: '', data: '' })
    const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImsetAvatarage(img)
    }


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
            setEmail(profileData.email)
            setPassword(profileData.password)
            setPhone(profileData.phoneNumber)
            setImsetAvatarage(profileData.picture)
        };
        fetchPosts();
    }, [currentUser]);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneNumberChange = (e) => {
        setPhone(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const formData = {
            id: currentUser,
            emailValue: email,
            phoneNumberValue: phone,
            passwordValue: password,
        };
        fileUploadEdit(avatar.data)
        .then((resFile) => {
            formData.avatar = resFile.data.file
            editProfile(formData)
            .then((res) => {
                if(res.status == "success") {
                    toast.info("Edit profile Successfull!")
                }
                else 
                    toast.error(res.errors.msg)    
            })
        })
        .catch((error) => console.log(error));
    }

    return(
        <div className={classes.profileEdit}>
            <div className={classes.form_wrapper_login}>
                <h1 className={classes.title}>Profile Edit</h1>
                <div className={classes.avatar}>
                    { uploadBtn == "init" ?  <img src={avatar} className={classes.avatar_img} /> : <img src={avatar.preview} className={classes.avatar_img} />}
                </div>
                <label onClick={handleUploadClick} className={classes.imageUpload_field}>
                    <input type="file" style={{display:'none'}} onChange={handleFileChange}  />
                    <div className={classes.upload_text}>Avatar Upload</div>
                    <img className={classes.imageUpload_icon} src='images/image uploading.png' />
                </label>
                <form onSubmit={submitHandler}>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Email :</div>
                        <input
                            className={classes.input}
                            type="text"
                            id="name"
                            placeholder="Email"
                            value={email}
                            onChange = {handleEmailChange}
                        />
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Phone Number :</div>
                        <input
                            className={classes.input}
                            type="text"
                            id="phone"
                            placeholder="Phone Number"
                            value={phone}
                            onChange = {handlePhoneNumberChange}
                        />
                    </div>
                    <div className={classes.flexRow}>
                        <div className={classes.input_name}>Password :</div>
                        <input
                            className={classes.input}
                            type="password"
                            id="password"
                            placeholder="Change Password"
                            value={password}
                            onChange = {handlePasswordChange}
                        />
                    </div>
                    <div className={classes.form_actions}>
                        <button className={classes.button} >
                            Edit
                        </button>
                    </div>
                </form>
                <ToastContainer /> 
            </div>
        </div>
    )
}
export default ProfileEdit