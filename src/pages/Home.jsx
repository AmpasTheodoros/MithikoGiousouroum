import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Adjust this import path to where your firebase config and initialization is

function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Create an async function that fetches the videos
    const fetchVideos = async () => {
      // Reference the collection where videos are stored
      const videosCol = collection(db, "videos");
      // Get the snapshot of the collection
      const videoSnapshot = await getDocs(videosCol);
      // Map through the documents and setVideos
      const videoList = videoSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVideos(videoList);
    };

    fetchVideos().catch(console.error); // Fetch videos when component mounts
  }, []);

  return (
    <div>
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id} style={{ marginBottom: '20px' }}>
            <video width="100%" controls>
              <source src={video.videoUrl} type="video/mp4" />
              Sorry, your browser doesn't support embedded videos.
            </video>
            <h3>{video.title}</h3>
            <p>{video.description}</p>
          </div>
        ))
      ) : (
        <p>No videos to display</p>
      )}
    </div>
  );
}

export default Home;
