import "./write.css";
import { Add } from "@material-ui/icons";
import { useState, useCallback } from "react";
import storage from "./../../firebase.js";
import * as postActions from "./../../redux/actions/postActions.js";
import { useDispatch, useSelector } from "react-redux";
import { userState$ } from "./../../redux/selectors/index.js";
import { useHistory } from "react-router-dom";
export default function Write() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(userState$);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [percent, setPercent] = useState(0);
  const [fileFromFirebase, setFileFromFirebase] = useState(null);
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const data = {
        title: title,
        desc: desc,
        photo: fileFromFirebase,
        username: user.username,
      };
      
      dispatch(postActions.createPost.createPostRequest(data));     
      history.push("/");
    },
    [title, desc, dispatch, fileFromFirebase, user, history]
  );
  const handleUpload = (e) => {
    e.preventDefault();
    uploadFile(file);
  };
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
  return (
    <div className="write">
      {file && (
        <img src={URL.createObjectURL(file)} className="writeImg" alt="" />
      )}
      <form className="writeForm">
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <Add className="writeIcon" />
          </label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            id="fileInput"
            style={{ display: "none" }}
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="writeInput"
            placeholder="Title"
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            onChange={(e) => setDesc(e.target.value)}
            className="writeInput writeText"
          ></textarea>
        </div>

        {fileFromFirebase ? (
          <button className="writeSubmit" onClick={handleSubmit}>
            Publish
          </button>
        ) : (
          <>
            {percent && (
              <span className="percentUpload" style={{ color: "black" }}>
                Uploading : {percent} % done
              </span>
            )}
            <button className="writeSubmit" onClick={handleUpload}>
              Upload Image
            </button>
          </>
        )}
      </form>
    </div>
  );
}
