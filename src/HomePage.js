import React, { useState } from 'react';
import videoList from './common/videoList'; 



function HomePage ({selectedVideo, setSelectedVideo}) {
  
    const handleVideoClick = (video) => {
      setSelectedVideo(video);
    };

    return (
        <div className="content">
        {/* 좌측 비디오 목록 */}
        <aside className="video-list">
          <h2>CCTV 목록</h2>
          <ul>
            {videoList.map((video, index) => (
              <li key={index} onDoubleClick={() => handleVideoClick(video)}>
                {video.name}
              </li>
            ))}
          </ul>
        </aside>
  
        {/* 우측 CCTV 화면 */}
        <main className="video-display">
          {selectedVideo ? (
            <div className="select
            ed-video">
              <h2>{selectedVideo.name}</h2>
              <video src={selectedVideo.src} controls autoPlay />
            </div>
          ) : (
            <div className="grid-view">
              {videoList.slice(0, 9).map((video, index) => (
                <div key={index} className="grid-item">
                  <video src={video.src} controls />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>       
    );
}

export default HomePage;