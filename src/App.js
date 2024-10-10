import React, {useState} from 'react';
import './App.css';
import HomePage from './HomePage';
import StatisticsPage from './StatisticsPage';
//import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  //메뉴 관리
  const [selectedMenu, setSelectedMenu] = useState('home');
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleHomeClick = () => {
    setSelectedVideo(null);  
    setSelectedMenu('home'); 
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className = "menu">
          <button onClick={handleHomeClick}>홈</button>
          <button onClick={() => setSelectedMenu('statistics')}>통계</button>
        </div>
      </header>

      {selectedMenu === 'home' ? (
        <HomePage selectedVideo={selectedVideo} setSelectedVideo={setSelectedVideo}/>
      ) : (
        <StatisticsPage/>
      )}

    </div>
  );
}

export default App;
