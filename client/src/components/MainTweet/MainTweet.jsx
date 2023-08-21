import React, { useEffect, useState } from "react";
import TimelineTweet from "../TimelineTweet/TimelineTweet";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import app from "../../firebase";

const MainTweet = () => {
  const [tweetText, setTweetText] = useState("");

  const { currentUser } = useSelector((state) => state.user);

  const [tweetPicture, setTweetPicture] = useState(null);
  const [img, setImg] = useState(null);

  const [imgUploadProgress, setImgUploadProgress] = useState(0);
  const dispatch = useDispatch();

  const uploadImg = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadProgress(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            setTweetPicture(downloadURL);
          } catch (error) {
            console.log(error);
          }
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitTweet = await axios.post("/tweets", {
        userId: currentUser._id,
        description: tweetText,
        tweetPicture: tweetPicture,
      });
      window.location.reload(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    img && uploadImg(img);
  }, [img]);

  return (
    <div>
      {currentUser && (
        <p className="font-bold pl-2 my-2">{currentUser.username}</p>
      )}

      <form className="border-b-2 pb-6">
        <textarea
          onChange={(e) => setTweetText(e.target.value)}
          type="text"
          placeholder="What's happening"
          maxLength={280}
          className="bg-gray-50 rounded-lg w-full p-2"
        ></textarea>
        <p>Choose a tweet picture</p>
        {imgUploadProgress > 0 ? (
          imgUploadProgress === 100 ? (
            "Upload completed"
          ) : (
            "Uploading " + imgUploadProgress + "%"
          )
        ) : (
          <input
            type="file"
            className="bg-transparent border border-gray-50 rounded p-2"
            accept="image/*"
            onChange={(e) => setImg(e.target.files[0])}
          />
        )}
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 ml-4 px-4 rounded-full ml-auto"
        >
          Tweet
        </button>
      </form>
      <TimelineTweet />
    </div>
  );
};

export default MainTweet;
