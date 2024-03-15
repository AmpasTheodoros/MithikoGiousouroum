import React, { useEffect, useState } from 'react';

function Home() {
  const [videos, setVideos] = useState([]);


  useEffect(() => {
    fetch('/db.json') // Adjust the path if your db.json is located elsewhere
      .then(response => response.json())
      .then(data => setVideos(data.videos)); // Make sure 'videos' matches the key in your db.json
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {videos.map(video => (
        <div key={video.id} style={{ marginBottom: '20px', width: '60%' }}>
          <video width="100%" controls>
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          {/* You can add more video details like views, likes, etc. here */}
        </div>
      ))}
    </div>
  );
}

export default Home;
