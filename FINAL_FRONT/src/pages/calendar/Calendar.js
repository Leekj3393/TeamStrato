import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarCss from '../../components/calendar/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callCalendarAPI } from '../../apis/CalendarAPICalls';
import InsertModal from "./InsertModal";
import CalendarUpdateModal from './UpdateModal';


function Calendar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode); // 로그인 정보에서 memberCode를 가져옴
  const {calendar} = useSelector((state) => state.calendarReducer);
  const [ calModalOpen, setCalendarModalOpen ] = useState(false);
  const [ calUpdateModalOpen, setUpdateCalendarModalOpen ] = useState(false);
  const [ calendarCode, setCalendarCode ] = useState(null);

  const [state, setState] = useState({
    memberCode: loggedInMember, // 현재 로그인된 객체의 memberCode로 설정
    division: "개인"
  });

  console.log("현재 로그인 memberCode : ",loggedInMember);

  useEffect(() => {
    if (loggedInMember) { // loggedInMember가 정의되어 있는지 확인
      setState(prevState => ({
        ...prevState,
        memberCode: loggedInMember, // 로그인 정보가 변경되면 memberCode를 업데이트
      }));
    }
  }, [loggedInMember]);

  


  const personalCalClick = () => {
    dispatch(callCalendarAPI(state));
  };

  useEffect(() => {
    dispatch(callCalendarAPI(state));
  }, [state]);

  console.log("state : ",state);

  const companyCalClick = () => {
    navigate('/calendar/companycal');
  };
  console.log("캘린더 정보 calendarReducer : ", calendar);

  const InsertCalClick = () => {
    setCalendarModalOpen(true);
  };

  const eventClickHandler = (e) => {
    const calendarCode = e.event.id;
    console.log("event = ", e.event);
    console.log("calendarCode = ", calendarCode);
    setCalendarCode(calendarCode); // calendarCode 상태 업데이트
    setUpdateCalendarModalOpen(true); // 모달창 열기
  };
  

    return(
      <>
      <div>
        {calModalOpen && 
        <div><InsertModal
                  memberCode={loggedInMember}
                  setCalendarModalOpen={setCalendarModalOpen}/></div>}
      </div>
      <div>
        {calUpdateModalOpen && 
        <div><CalendarUpdateModal
                  memberCode={loggedInMember}
                  setUpdateCalendarModalOpen={setUpdateCalendarModalOpen}
                  calendarCode={calendarCode}/></div>}
      </div>
    <div className={CalendarCss} >
        <div className='personalCal' onClick={ personalCalClick } style={ {backgroundColor: '#2A4090', color:'white'} }>개인</div>
        <div className='companyCal' onClick={ companyCalClick }>부서</div>
        <div className='insertSch' onClick={ InsertCalClick }>일정등록</div>
        <div id='Calendar'>
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin,interactionPlugin]}
        height={770}
        editable={true}
        events={calendar && calendar.map((memberCode) => ({
          id: memberCode.calendarCode,
          title: memberCode.title,
          start: memberCode.start,
          end: memberCode.end,
          color: memberCode.color,
       }))}
        eventClick={(e) =>  eventClickHandler(e) }
        
      />
      </div>
    </div>
    </>
  );
}

export default Calendar;