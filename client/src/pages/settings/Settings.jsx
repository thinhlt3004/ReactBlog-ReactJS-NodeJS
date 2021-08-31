import './settings.css';
import Sidebar from './../../components/sidebar/Sidebar';
import {AccountCircleOutlined} from '@material-ui/icons';
import {useDispatch, useSelector } from 'react-redux';
import {userState$} from './../../redux/selectors/index.js';
import {useState, useCallback} from 'react';
import storage from './../../firebase.js';
import * as authActions from './../../redux/actions/authActions.js';
export default function Settings() {
    const user = useSelector(userState$);
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState('');
    const [percent, setPercent] = useState(0);
    const [fileFromFirebase, setFileFromFirebase] = useState(null);
    const [success, setSuccess] = useState(false)
    const uploadFile = (file) => {
        const fileName = new Date().getTime() + file.name;
        console.log(fileName);
        const uploadTask = storage.ref(`/item/${fileName}`).put(file);
        uploadTask.on(
          "stage_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            // console.log("Upload is " + progress + "% done");
            setPercent(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              // console.log(downloadURL);
              setFileFromFirebase(downloadURL);
            });
          }
        );
    };
    const handleUpload = (e) => {
        e.preventDefault();
        uploadFile(file);
    }
    const handleUpdate = useCallback((e) => {
        try {
          e.preventDefault();
          const payload = {
              id: user._id,
              data: {
                  username: username,
                  email: email,
                  password: password,
                  profilePicture: fileFromFirebase
              }
          }
          dispatch(authActions.updateProcess.updateProcessRequest(payload));
          setSuccess(true);
        } catch (error) {
          console.log(error);
        }
    },[dispatch, email, password, fileFromFirebase, username, user._id])
    console.log(user);
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form className="settingsForm">
                    <label >Profile Picture</label>
                    <div className="settingsPP">
                        {file 
                        ?<img src={URL.createObjectURL(file)} alt="" />
                        :<img src={user.profilePicture ? user.profilePicture : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"} alt="" />}
                        <label htmlFor="fileInput"><AccountCircleOutlined className="settingsIcon"/></label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} id="fileInput" style={{ display: 'none' }} />
                    </div>
                        <label>Username</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={user.username} />
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={user.email} />
                        <label>Password</label>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Place your password"  />
                       {fileFromFirebase 
                       ? <>
                          <button className="settingsSubmit" onClick={handleUpdate}>Update</button>
                          {success && <span className="percentSettings">
                            Profile has been updated successfully !
                        </span>}
                        </>
                       : <>
                        <button className="settingsSubmit" onClick={handleUpload}>Upload Image</button>
                        {percent > 0 && <span className="percentSettings">
                          Uploading : {percent} % done
                        </span>   }             
                       </>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}
