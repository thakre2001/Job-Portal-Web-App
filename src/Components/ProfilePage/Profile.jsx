import React, { useContext, useEffect, useRef, useState } from 'react';
import './Profile.css';
import { UserContext } from '../UserContext';
import ImageCropper from '../CropperComponents/ImageCropper';
import { Services } from '../../BackendAPIs/Services';
import { useNavigate } from 'react-router-dom';
import defaultProfileImage from '../../Assests/defaultprofile.jpg'

const Profile = () => {
  const { user, setUser, token } = useContext(UserContext)
  const navigate = useNavigate()

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState(user);

  const [resume, setResume] = useState(user?.resume);
  const [resumeURL, setResumeURL] = useState(null);
  const fileType=resume?.name?.split('.').pop().toLowerCase();

  const fileInputRef = useRef(null)
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || null);
  const [profilePhotoURL, setProfilePhotoURL] = useState(user?.profilePhoto || null)
  const [cropMode, setCropMode] = useState(false);
  const [tempPhotoURl, setTempPhotoURL] = useState(null)

  useEffect(() => {
    if (user?.profilePhoto) {
      const base64URL = `data:image/jpeg;base64,${user?.profilePhoto}`;
      setProfilePhotoURL(base64URL)

    }

    if (user?.resume && typeof user.resume === 'string') {
      try {
        const base64 = user.resume;

        const byteCharacters = atob(base64);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        setResumeURL(url);
      } catch (err) {
        console.error("Invalid resume format:", err);
      }
    }

  }, [user])

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const photoURL = URL.createObjectURL(file);
      setTempPhotoURL(photoURL)
      setCropMode(true)
    }
  }
  const handleCropDone = async (croppedURL, croppedBlob) => {
    setProfilePhotoURL(croppedURL);
    setProfilePhoto(croppedBlob)
    setCropMode(false)
    setTempPhotoURL(null)

    const formData = new FormData();
    formData.append('file', croppedBlob)

    try {
      const response = await Services.uploadPhoto(formData, token);
      console.log('response of photo upload', response.data);
      const updatedUser = response.data;
      setUser(updatedUser)
      // console.log('updated user after image upload', user);

      localStorage.setItem('user', JSON.stringify(updatedUser))
    } catch (error) {

    }
  }

  const handleCropCancel = () => {
    setCropMode(false)
    setTempPhotoURL(null)
  }

  const handleEditClick = () => {
    setFormValues(user)
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormValues(user);
  };

  const handleSaveClick = async () => {
    setEditMode(false);

    try {
      const response = await Services.updateUser(formValues, token);
      if (response.status == 200) {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }

    } catch (error) {

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setResumeURL(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file)

    try {
      const response = Services.uploadResume(formData, token)
      if (response.status == 200) {
        console.log('resume', response);
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      }
    } catch (error) {

    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-card shadow-lg">
        <div className="profile-header d-flex align-items-center gap-3">
          {/* Optional Avatar */}
          <div className="photo-container" >
            <img
              src={`${user?.profilePhoto ? profilePhotoURL : defaultProfileImage}`}
              className='profile-photo'
              alt="profile"
              // onClick={() => fileInputRef.current.click()}
              onClick={() => {
                if (user?.profilePhoto) {
                  setTempPhotoURL(`data:image/jpeg;base64,${user?.profilePhoto}`)
                  setCropMode(true)
                }
              }}
            />
            <label htmlFor="profile-upload" className='edit-photo-label'>
              <i className='fa fa-camera'></i>
              <input type="file"
                name={profilePhoto}
                accept='image/*'
                ref={fileInputRef}
                onChange={handleProfilePhotoChange}

                style={{ display: 'none' }}
                id="profile-upload" />
            </label>
          </div>
          <div>
            <h3 className="mb-0">{user?.name}</h3>
            <p className="text-muted">{user?.role}</p>
          </div>
        </div>

        <div className="profile-body">
          <div className="info-row">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                name="name"
                value={formValues?.name}
                onChange={handleChange}
              // className="form-control"
              />
            ) : (
              <span>{user?.name}</span>
            )}
          </div>

          <div className="info-row">
            <label>Email:</label>
            {editMode ? (
              <input
                type="email"
                name="email"
                value={formValues?.email}
                onChange={handleChange}
              // className="form-control"
              />
            ) : (
              <span>{user?.email}</span>
            )}
          </div>

          <div className="info-row">
            <label>Mobile:</label>
            {editMode ? (
              <input
                type="tel"
                name="mobile"
                value={formValues?.mobile}
                onChange={handleChange}
              // className="form-control"
              />
            ) : (
              <span>{user?.mobile}</span>
            )}
          </div>

          <div className="info-row">
            <label>Work Status:</label>
            {editMode ? (
              <select
                name="workStatus"
                value={formValues?.workStatus}
                onChange={handleChange}
              // className="form-select"
              >
                <option value="FRESHER">Fresher</option>
                <option value="EXPERIENCED">Experienced</option>
              </select>
            ) : (
              <span>{user?.workStatus}</span>
            )}
          </div>
        </div>

        <div className="action-buttons mt-3 text-end">
          {editMode ? (
            <>
              <button className="btn btn-secondary me-2" onClick={handleCancelClick}>
                Cancel
              </button>
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleEditClick}>
              Edit Profile
            </button>
          )}
        </div>

        <hr />

        <div className="resume-section mt-4">
          <label className="mb-2 fw-semibold">Upload Resume</label>
          <input
            type="file"
            accept=".pdf"
            className="form-control"
            onChange={handleFileChange}
          placeholder='Only pdf file is allowed'
          />
          {user?.resume && (
            <div className="mt-3 d-flex justify-content-between align-items-center">
              <span className="text-truncate">Resume.pdf</span>
              <a
                href={resumeURL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-primary"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {
        cropMode && (
          <div className='crop-overlay'>
            <ImageCropper imageSrc={tempPhotoURl} onCropDone={handleCropDone} onCancel={handleCropCancel} />
          </div>
        )
      }
    </div>


  );
};

export default Profile;
