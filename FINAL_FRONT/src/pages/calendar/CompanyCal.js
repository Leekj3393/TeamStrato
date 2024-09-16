import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import CalendarCss from '../../components/calendar/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { callCalendarAPI, callCompanyCalAPI } from '../../apis/CalendarAPICalls';
import DeptInsertModal from "./DeptInsertModal";
import CalendarUpdateModal from './UpdateModal';
import interactionPlugin from '@fullcalendar/interaction';
import CalendarDeptUpdateModal from './DeptUpdateModal';

function CompanyCal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInMemberRole = useSelector(state => state.myPageReducer.membersData && state.myPageReducer.membersData.memberRole);
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode);
  const department = useSelector(state => state.myPageReducer.membersData.department);
  const { companycal } = useSelector((state) => state.calendarReducer);
  const [calUpdateModalOpen, setUpdateCalendarModalOpen] = useState(false);
  const [calModalOpen, setCalendarModalOpen] = useState(false);
  const [calendarCode, setCalendarCode] = useState(null);
  const [isMaster, setIsMaster] = useState(false);

  useEffect(() => {
    const isMaster = loggedInMemberRole && loggedInMemberRole.roleName === 'ROLE_MASTER';
    setIsMaster(isMaster);
  }, [loggedInMemberRole]);

  const [state, setState] = useState(() => {
    return {
      memberCode: loggedInMember,
      division: "부서",
      deptCode: department ? department.deptCode : undefined,
    };
  });

  console.log("state에는 뭐가 있나: ", state);
  console.log("department에는 뭐가 있나: ", department);
  if (department) {
    console.log("현재 로그인 유저의 부서 deptCode: ", department.deptCode);
    console.log("현재 로그인 유저의 부서 이름: ", department.deptName);
  }
  console.log("현재 로그인 유저의 코드: ", loggedInMember);

  console.log("현재 로그인 유저의 권한 이름은 뭔가요: ", loggedInMemberRole && loggedInMemberRole.roleName);

  useEffect(() => {
    setState(prevState => ({
      ...prevState,
      deptCode: department ? department.deptCode : undefined,
    }));
  }, [department]);

  const personalCalClick = () => {
    navigate("/calendar");
  };

  useEffect(() => {
    dispatch(callCompanyCalAPI(state));
  }, [dispatch, state]);

  console.log("state: ", state);

  const companyCalClick = () => {
    dispatch(callCompanyCalAPI(state));
  };
  console.log("캘린더 정보 calendarReducer: ", companycal);

  const InsertCalClick = () => {
    if (isMaster) {
      setCalendarModalOpen(true);
    }
  };

  const eventClickHandler = (e) => {
    const calendarCode = e.event.id;
    console.log("event: ", e.event);
    console.log("calendarCode: ", calendarCode);
    setCalendarCode(calendarCode); // calendarCode 상태 업데이트
    setUpdateCalendarModalOpen(true); // 모달창 열기
  };

  return (
    <>
      <div>
        {calModalOpen &&
          <div>
            <DeptInsertModal
              department={department}
              setCalendarModalOpen={setCalendarModalOpen}
            />
          </div>}
      </div>
      <div>
        {calUpdateModalOpen &&
          <div>
            <CalendarDeptUpdateModal
              department={department}
              setUpdateCalendarModalOpen={setUpdateCalendarModalOpen}
              calendarCode={calendarCode}
            />
          </div>}
      </div>

      <div className={CalendarCss}>
        <div className='personalCal' onClick={personalCalClick}>개인</div>
        <div className='companyCal' onClick={companyCalClick} style={{ backgroundColor: '#2A4090', color: 'white' }}>부서</div>
        {/* 'MASTER' 권한이 있는 경우에 대한 처리 */}
        {isMaster && <div className='insertSch' onClick={InsertCalClick}>일정등록</div>}
        <div id='Calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            height={770}
            events={companycal && companycal.map((department) => ({
              id: department.calendarCode,
              title: department.title,
              start: department.start,
              end: department.end,
              color: department.color
            }))}
            eventClick={isMaster ? eventClickHandler : null}
          />
        </div>
      </div>
    </>
  );
}

export default CompanyCal;