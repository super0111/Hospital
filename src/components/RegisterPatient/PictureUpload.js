import React, { useState } from 'react';
import classes from './RegisterPatient.module.css'

const PictureUpload = (props) => {
    const { image, setImage } = props
    const handleFileChange = (e) => {
        const img = {
          preview: URL.createObjectURL(e.target.files[0]),
          data: e.target.files[0],
        }
        setImage(img)
      }
    const handleRemove = () => {
        setImage({preview: ""})
    }
    return (
        <>
            <div className={classes.addPicture_body}>
                <label className={classes.imageUpload_field}>
                    <input type="file" style={{display:'none'}} onChange={handleFileChange}  />
                    <img className={classes.imageUpload_icon} src='images/image uploading.png' />
                </label>
                <div className={classes.preview}>
                    <img className={classes.preview_img} src={image.preview} alt="" />
                </div>
            </div >
            <div className={classes.uploadRemove} onClick={handleRemove}>Remove</div>
        </>
    )
}
export default PictureUpload