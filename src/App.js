import React, {useState} from 'react';
import './App.css';

function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videoList = [
    { name: "01_1층 전극동.mp4", src:"/path/to/video2"},
    { name: "02_1층 자재창고.mp4", src:"/path/to/video2"},
    { name: "03_출입구.mp4", src:"/path/to/video2"},
    { name: "04_비상계단.mp4", src:"/path/to/video2"},
    { name: "05_2층 전극동.mp4", src:"/path/to/video2"},
    { name: "06_2층 자재창고.mp4", src:"/path/to/video3"},
    { name: "07_3층 전극동.mp4", src:"/path/to/video1"},
    { name: "08_3층 자재창고.mp4", src:"/path/to/video2"},
    { name: "09_4층 비상구.mp4", src:"/path/to/video3"},
  ];

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };



  return (
    <div className="app-container">
      {/* 상단바 */}
      <header className="header">
        <h1>CCTV 모니터링 시스템</h1>
      </header>

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
          <div className="selected-video">
            <h2>{selectedVideo.name}</h2>
            <video src={selectedVideo.src} controls autoPlay />
          </div>
        ) : (
          <div className="grid-view">
            {videoList.slice(0,9).map((video, index) => (
              <div key={index} className="grid-item">
                <video src={video.src} controls/>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
