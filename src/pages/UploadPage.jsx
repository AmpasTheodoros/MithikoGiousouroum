import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage, db } from '../firebase'; // Make sure this path is correct
import { collection, addDoc } from 'firebase/firestore';

function UploadPage() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [progress, setProgress] = useState(0);


  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file || !title || !description) {
      alert('Please fill in all fields and select a video');
      return;
    }

    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          
          // Add video metadata to Firestore
          addDoc(collection(db, "videos"), {
            title,
            description,
            videoUrl: downloadURL
          }).then(() => {
            alert('Video uploaded successfully!');
            setProgress(0);
          }).catch((error) => {
            console.error("Error adding document: ", error);
          });
        });
      }
    );
  };

  return (
    <div>
      <h2>Upload Video</h2>
      <progress value={progress} max="100" />
      <input type="file" accept="video/*,.mkv" onChange={handleFileChange} />
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={handleUpload}>
        Upload Video
      </button>
    </div>
  );
}

export default UploadPage;
