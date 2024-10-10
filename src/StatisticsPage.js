import React, {useState} from 'react';
import axios from 'axios';
import videoList from './common/videoList';
import eventList from './common/eventList';

/* 통계 페이지 */

function StatisticsPage() {
    // 체크박스 
    const [cctvChecked, setCctvChecked] = useState(false);
    const [dateChecked, setDateChecked] = useState(false);
    const [eventChecked, setEventChecked] = useState(false);

    // 선택된 검색조건 
    const [selectedCctv, setSelectedCctv] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState('');
    const [selectedEndDate, setSelectedEndDate] = useState('');
    const [selectedEventName, setSelectedEventName] = useState('');
    
    // 조건에 따라 서버에 검색요청보내는 함수
    const handleSearch = async () => {
        const searchParams = {
            selectdCctv: cctvChecked ? selectedCctv : null,
            selectdStartDate: dateChecked ? selectedStartDate : null,
            selectdEndDate: dateChecked ? selectedEndDate : null,
            selectdEventName: eventChecked ? selectedEventName : null,
        };

        try {
            const response = await axios.post('/api/statistics', searchParams);  //경로 맞게 수정필요함
            console.log('검색 결과:', response.data);
            // showStatistics();


        } catch (error) {
            console.error('데이터 조회 오류:', error);
        }
    };

    // // 통계 그리는 함수 (작성예정)
    // const showStatistics = async() => {

    // }



    return (
        <div className="empty-section">
            <div className="search-parameter">

                    <input type="checkbox" checked={cctvChecked} onChange={() => setCctvChecked(!cctvChecked)} />
                    <label> CCTV 목록 </label>
                    <select value={selectedCctv} onChange={(e) => setSelectedCctv(e.target.value)}>
                    <option value=""/>
                        {videoList.map((video, index) => (
                            <option key={index} value={video.name}>
                                {video.name}
                            </option>
                            ))}
                    </select>

                    <input type="checkbox" checked={dateChecked} onChange={() => setDateChecked(!dateChecked)} />
                    <label>날짜</label>
                        <input type="date" value={selectedStartDate} onChange={(e) => setSelectedStartDate(e.target.value)} />
                        <input type="date" value={selectedEndDate} onChange={(e) => setSelectedEndDate(e.target.value)} />

                    
                    <input type="checkbox" checked={eventChecked} onChange={() => setEventChecked(!eventChecked)} />
                    <label>이벤트 이름</label>
                    <select value={selectedEventName} onChange={(e) => setSelectedEventName(e.target.value)}>
                    <option value=""/>
                            {eventList.map((event, index) => (
                                <option key={index} value={event}>
                                    {event}
                                </option>
                            ))}
                    </select>

                    <button onClick={handleSearch}>조회</button>
            </div>
        </div>
    );
}

export default StatisticsPage;