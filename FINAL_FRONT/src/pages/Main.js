import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import MainCSS from "../components/main/Main.css";
import {  callGoToWorkAPI, callEndWorkAPI, callOutWorkAPI, callReturnWorkAPI, callWorkInfoAPI } from '../apis/MyPageAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { callNoticeListAPI, callNoticeSearchListAPI } from '../apis/NoticeAPICalls';
import { callAllSchAPI } from '../apis/CalendarAPICalls';
import { callMemberSalaryList } from '../apis/SalaryAPICalls';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { callEducationPhotoListAPI } from '../apis/EducationAPICalls';

const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}

function Main(props) {
  //교육 사진
//교육 사진
const [photoModalOpen, setPhotoModalOpen] = useState(false);

const { eduPhoto } = useSelector((state) => state.educationReducer);

const serverUrl = "http://localhost:8001/images/education/";
console.log("사진 불러오기:",eduPhoto);
useEffect(() => {
    // `currentPage`를 대체하는 값을 넣어줘야 합니다.
    dispatch(callEducationPhotoListAPI({}));
}, []);

// 수정
const imagesToShow = eduPhoto?.data?.slice(1, 7) || [];

console.log(imagesToShow); // 이 부분 추가
  //일정

  const {data} = useSelector(state => state.noticeReducer);
  const notices = useSelector(state => state.noticeReducer);
  const noticeList = notices.data;
  const pageInfo = notices.pageInfo;
  const [currentPage, setCurrentPage] = useState(1);

  /* 검색어 요청시 사용할 값 */
  const [searchParams] = useSearchParams();
  const search = searchParams.get('value');


  useEffect(
      () => {
          if(search) {
              /* 검색어에 해당하는 게시글에 대한 요청 */
              // dispatch(callNoticeSearchListAPI({ search, currentPage }));
          } else {
              /* 모든 게시들에 대한 요청 */
              dispatch(callNoticeListAPI
                ({ currentPage }));
          }
          
      },
      [currentPage, search]
  );

  const dispatch = useDispatch();

  const { time, endTime,outTime,returnTime} = useSelector(state => state.myPageReducer);

  const [weatherData, setWeatherData] = useState(null);
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const date = new Date(time)
  const goToWorkDate = getDate(date)
  const goToWorkTime = `${date.getHours()}:${date.getMinutes()}`

  const endDate = new Date(endTime)
  const endWorkDate = getDate(endDate)
  const endWorkTime = `${endDate.getHours()}:${endDate.getMinutes()}`

  const outDate = new Date(outTime)
  const outWorkDate = getDate(outDate)
  const outWorkTime = `${outDate.getHours()}:${outDate.getMinutes()}`

  const returnDate = new Date(returnTime)
  const returnWorkDate = getDate(returnDate)
  const returnWorkTime = `${returnDate.getHours()}:${returnDate.getMinutes()}`


  const handleWorknClick = () => {
    dispatch(callGoToWorkAPI({id: 6}))
  }

  const handleEndOnClick = () => {
    dispatch(callEndWorkAPI({id: 6}))
  }

  const handleOutOnClick = () => {
    dispatch(callOutWorkAPI({id: 6}))
  }

  const handleReturnOnClick = () => {
    dispatch(callReturnWorkAPI({id: 6}))
  }

  useEffect(() => {  
    const fetchWeatherData = async () => {
      const lat = 37.5665; // 위도ㅇㅇㅇ
      const lon = 126.9780; // 경도
      const apiKey = 'b97fbbf82b4825a7a84c60e92fa201b6'; // OpenWeatherMap API 키

      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&lang=kr`);
        setWeatherData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchNewsData = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'kr', // 검색할 국가 코드 (한국: kr)
            category: 'sports', // 검색할 기사 카테고리 (스포츠: sports)
            apiKey: '8e9a4d3df9d24d199a8a89fc8c0db7b6', // 자신의 NewsAPI API 키로 대체해야 함
          },
        });
        setNewsData(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchWeatherData();
    fetchNewsData();
  }, []);


  //날씨
  const Weather = () => {
    if (!weatherData) {
      return <div className="loading-text">날씨를 불러오는 중이에요 😚</div>;
    }
    const temperatureCelsius = (weatherData.main.temp - 273.15).toFixed(2); // 섭씨로 변환 후 소수점 둘째 자리까지 표시
    return (
      <div className='next'>
        <div className="weather-text">
          <span role="img" aria-label="weather-icon">🌤</span> 오늘의 날씨는 <b>{weatherData.weather[0].description}</b>이에요~
          <span role="img" aria-label="temperature-icon">✨</span> 온도는 <b>{temperatureCelsius}℃</b>입니다.
        </div>
      </div>
    );
  };
  //도넛차트
  Chart.register(...registerables);
  const dataTwo = {
    labels: ['출근', '결근', '지각', '퇴근'],
    datasets: [
      {
        label: '출근율',
        data: [10, 2, 1, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        borderWidth: 1,
      },
    ],
};

  //
  const navigate = useNavigate();
  const { allsch }  = useSelector(state => state.calendarReducer);

  useEffect(
    () =>
    {
      dispatch(callAllSchAPI({ currentPage: 1 }));
    },
    [dispatch]
  );

//급여
const [currentMonthSalary, setCurrentMonthSalary] = useState(null);

const salaryList = useSelector((state) => state.SalaryReducer.list?.content);

useEffect(() => {
  dispatch(callMemberSalaryList({ currentPage: 1 }));
}, [dispatch]);

useEffect(() => {
  console.log("현재 급여 정보: ", salaryList);
  // 가장 최근의 급여 정보를 가져옵니다
  if (salaryList && salaryList.length > 0) {
    setCurrentMonthSalary(salaryList[0]);
  } else {
    setCurrentMonthSalary(null);
  }
}, [salaryList]);

//근태확인
const workInfo = useSelector(state => state.myPageReducer.workInfo);
useEffect(() => {
  dispatch(callWorkInfoAPI());
}, []);

useEffect(() => {
  console.log("메인 근태 확인: ",workInfo);
}, [workInfo]);

const formatDateTime = (isoDateTime) => {
  const dateObj = new Date(isoDateTime);
  const date = dateObj.toLocaleDateString();
  const time = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${date}, ${time}`;
};
//링크

const handleClickMore = () => {
  navigate('/calendar/allSch');
}

const handleClickMoreNotice = () => {
  navigate('/notice');
}


  return (
    <div className={MainCSS}>
      <div style={{ display: "flex" }}>
        <Weather /> {/* Weather 컴포넌트 사용 */}
      </div>
      <div className="todo2" style={{ flex: 1 }}>
      <div className="todoText2">타이틀</div>
      <div className="todoMinibar1">진행중</div>
      <div className="todoMinibar2">장치관리</div>
      <div className="todoMinibar3">물청소</div>
    </div>
      <div className="todo1" style={{ flex: 1 }}>
        <div className="todoText1">🗓 일정</div>
        
        <div className="todoText0" onClick={handleClickMore}>더보기 <img className="more" src="/image/더보기.png"/></div>
      
      </div>
      <div className="All">
      {allsch?.data?.slice(0, 2).map((calendar, index) => (
  <div key={index} className="todo2" style={{ flex: 1 }}>
    <div className="todoText2">{calendar.title}</div>
    <div className="todoMinibar1">{calendar.division}</div>
    <div className="todoMinibar2">{calendar.start}</div>
    <div className="todoMinibar3">{calendar.end}</div>
  </div>
))}

{allsch?.data?.slice(0, 1).map((calendar, index) => (
  <div className="todo3" style={{ flex: 1 }}>
    <div className="todoText3">{calendar.title}</div>
    <div className="todoMinibar4">{calendar.division}</div>
    <div className="todoMinibar5">{calendar.start}</div>
    <div className="todoMinibar6">{calendar.end}</div>
  </div>
))}

      </div>
      <div className="board" style={{ display: "flex", flex: 1 }}>
        <div className="notic" style={{ flex: 1 }}>공지사항</div>
       
       
       
        <div className="todoTextNotice" onClick={handleClickMoreNotice}>
      더보기<img className="more2" src="/image/더보기.png"/>
    </div>
       
        <div className="noticNemo"></div>
        <div className="boardMinibar1">
          <div className="notic1">

          
          <div className="notic2">
  {data && data.slice(0, 10).map((notice) => (  
    <tr key={notice.noticeCode}>
      <th><li>▪ {notice.noticeTitle}</li></th>
      <div className={`circle${notice.noticeCode}`}></div>
      <th></th>
    </tr>
  ))}
</div>



                                
          </div>
        </div>
      </div>
      <div className="boardMinibar2">
        <div className="circle10">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
              <li>{newsData[0].title.substring(0, 30) + (newsData[0].title.length > 30 ? '...' : '')}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic3">

        </div>
        <div className="circle11">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
             <li>{newsData[1].title.substring(0, 30) + (newsData[0].title.length > 30 ? '...' : '')}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic4">


        </div>

        <div className="circle12">        {loading ? (
          <div>뉴스를 불러오는 중입니다...</div>
        ) : newsData.length > 0 ? (
          <ul>
             <li>{newsData[4].title.substring(0, 30) + (newsData[0].title.length > 30 ? '...' : '')}</li>
          </ul>
        ) : (
          <div>뉴스를 불러올 수 없습니다.</div>
        )}</div>
        <div className="notic5">


        </div>
        <img className="BoradImg" src="/image/image 434.png" alt="Board Image" />
      </div>
      <div className="partBoard" style={{ flex: 1 }}>Strato News<div class="animated-news">💡</div></div>
      <div className="att">
            </div>

              
            <div className="charMain">
                <div class="edutitle1">우리 회사 </div>
                <div className="chart-container">
    <Doughnut data={dataTwo} />
    
</div>

            </div>

               <div className="card itemMain1">
  <div class="card-face front">
  <img className="cartFront" src="/image/heartca.png"/>
  <div className='cardName1'>내 급여 확인</div>
  </div>
  <div className="card-face backMain">
  {currentMonthSalary ? (
    <div className='salaryMain1'>
      <div className='memberMain'><u>{currentMonthSalary.member.memberName}</u>님의 급여</div>
      <span class="name-salry">급여 년 월 :</span> {currentMonthSalary.salaryDay}<br/>
      <span class="name-salry">지급날짜 : </span>{currentMonthSalary.salaleDate}<br/>
      <span class="name-salry">지급액 :</span> {currentMonthSalary.amount}<br/>
      <span class="name-salry">실지급액 :</span> {currentMonthSalary.paymentAmount}
    </div>
  ) : (
    "이번 달에 조회되는 급여가 없습니다."
  )}
  <div className='salaryMain2'>
  자세한 급여 확인
  <img className="more4" src="/image/더보기.png"/> 
  </div>
</div>
</div>

<div className="card itemMain2">
  <div class="card-face front">
  <img className="cartFront" src="/image/astronaut.png"/>
  <div className='cardName2'>스키장 장비 확인</div>
  </div>
  <div className="card-face backMain1" style={{overflowY: 'scroll'}}>
  스키장 장비 이름: 스키 판톤<br/>
  상태: 사용 가능<br/>
  재고: 10개<br/><br/>

  스키장 장비 이름: 스키 바인딩<br/>
  상태: 사용 가능<br/>
  재고: 15개<br/><br/>

  스키장 장비 이름: 스키 부츠<br/>
  상태: 사용 중<br/>
  재고: 8개<br/><br/>

  스키장 장비 이름: 스키 헬멧<br/>
  상태: 사용 가능<br/>
  재고: 20개<br/><br/>

  스키장 장비 이름: 스키 장갑<br/>
  상태: 사용 중<br/>
  재고: 12개<br/><br/>
  <div className='salaryMain2'>
  자세한 장비 확인
  <img className="more4" src="/image/더보기.png"/> 
  </div>
</div>


</div>

<div className="card itemMain3">
  <div class="card-face front">
  <img className="cartFront" src="/image/shape.png"/>
  <div className='cardName3'>서류 진행 사항</div>
  </div>
  <div class="card-face backMain2">
  결재 이름: 휴가<br/>
날짜: 2023년 6월 10일부터 <br/>2023년 6월 15일까지<br/>
상태: 대기중<br/><br/>

결재 이름: 업무 지원비 신청<br/>
날짜: 2023년 7월 1일<br/>
상태: 대기중<br/><br/>

결재 이름: 프로젝트 예산 승인<br/>
날짜: ~<br/>
상태: 대기중<br/>
  </div>
</div>

<div className="card itemMain4">
  <div class="card-face front">
  <img className="cartFront" src="/image/phantom.png"/>
  <div className='cardName4'>내 근태 확인</div>

  </div>
  <div class="card-face backMain3">
  근태 상태: {workInfo[0]?.status || "오늘 근태 정보가 없습니다."}<br/>
  <span class="name-salry">출근 : </span> {workInfo[0]?.startTime ? formatDateTime(workInfo[0].startTime) : "출근 정보를 등록하세요"}<br/>
  <span class="name-salry">퇴근: </span> {workInfo[0]?.endTime ? formatDateTime(workInfo[0].endTime) : "퇴근 정보를 등록하세요"}<br/>
  <span class="name-salry">외출: </span>{workInfo[0]?.outTime ? formatDateTime(workInfo[0].outTime) : "외출 정보가 없습니다."}<br/>
  <span class="name-salry">복귀:</span> {workInfo[0]?.returnTime ? formatDateTime(workInfo[0].returnTime) : "복귀 정보가 없습니다."}

  <div className='salaryMain2'>
  자세한 근태 확인
  <img className="more4" src="/image/더보기.png"/> 
  </div>
  </div>

</div>

<div className='edu'>
<div class="edutitle3">내가 받을  </div>
<div className="image-container">
  {imagesToShow.map((photo, index) => {
    const fileName = photo.fileName.split('^')[0]; // ^ 이후의 문자를 제거
    return (
      <div key={photo.fileCode} className="image-item">
        <img src={`${serverUrl}${photo.filePath}`} alt={fileName} />
        <div className="eduName">{fileName}</div>
      </div>
    );
  })}
</div>
</div>
    </div>
    );

  }
export default Main;