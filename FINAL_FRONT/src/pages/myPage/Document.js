import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DocumentCSS from '../../components/main/Document.css';
import { callDocuMember, callInsertRequestAPI, callMyPageAllRequestAPI, callWorkInfoAPI } from "../../apis/MyPageAPICalls";
import Swal from 'sweetalert2';


const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}

function Document() {
    const dispatch = useDispatch();
    const [attendanceInfo, setAttendanceInfo] = useState(null); // 출근 정보 상태 추가
    const state = useSelector(state => state);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const membersData = useSelector(state => state.myPageReducer.membersData);
    const getAllRequest  = useSelector(state => state.myPageReducer.getAllRequest);
    console.log("membersData",membersData); //여기로 조회해오게
    console.log("getAllRequest:",getAllRequest); //여기로 조회해오게
  
    useEffect(() => {
      dispatch(callWorkInfoAPI());
      dispatch(callMyPageAllRequestAPI());
    }, []);
    

    //모달열기
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
    
  
    const requestSearch = () => {
      dispatch(callMyPageAllRequestAPI());
    };
  
    //두개를 한번에 호출하기
    const handleButtonClick = () => {
      openModal();
      requestSearch();
    };

  //

  useEffect(() => {
    const menuItems = document.querySelectorAll(".menu-item");
    const contents = document.querySelectorAll(".content");

    const handleClick = (index) => {
      menuItems.forEach(function (menuItem) {
        menuItem.classList.remove("active");
      });
      menuItems[index].classList.add("active");

      contents.forEach(function (content) {
        content.classList.remove("active");
      });
      contents[index].classList.add("active");
    };

    menuItems.forEach(function (item, index) {
      item.addEventListener("click", function () {
        handleClick(index);
      });
    });

    // Default: Show the first menu and content
    menuItems[0].classList.add("active");
    contents[0].classList.add("active");

    // Cleanup: Remove event listeners when the component is unmounted
    return () => {
      menuItems.forEach(function (item) {
        item.removeEventListener("click", handleClick);
      });
    };
  }, []);

  //캘린더
  const calendarRef1 = useRef(null);
  const calendarRef2 = useRef(null);
  const calendarRef3 = useRef(null);
  const [selectedDates1, setSelectedDates1] = useState([]); 
  const [selectedDates2, setSelectedDates2] = useState([]); 
  const [selectedDates3, setSelectedDates3] = useState([]);

  const [textareaValue, setTextareaValue] = useState('');

  useEffect(() => {
    const calendarApi1 = calendarRef1.current.getApi();
    const calendarApi2 = calendarRef2.current.getApi();
    const calendarApi3 = calendarRef3.current.getApi();

    calendarApi1.on("dateClick", handleDateClick1);
    calendarApi2.on("dateClick", handleDateClick2);
    calendarApi3.on("dateClick", handleDateClick3);

    return () => {
      calendarApi1.off("dateClick", handleDateClick1);
      calendarApi2.off("dateClick", handleDateClick2);
      calendarApi3.off("dateClick", handleDateClick3);
    };
  }, []);

   //알러트창
const Toast = Swal.mixin({
  toast: true,
  position: 'center',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
      toast.addEventListener('mouseenter', () => Swal.stopTimer())
      toast.addEventListener('mouseleave', () => Swal.resumeTimer())
  }
})

  //여기 한개
  const handleRequestVacation = () => {
    const today = new Date();  // 오늘 날짜를 가져옵니다. 시간은 무시하기 위해 시, 분, 초, 밀리초를 0으로 설정합니다.
    today.setHours(0, 0, 0, 0);
  
    if (!selectedDates1[0] || !selectedDates1[1]) {  // 날짜 선택 확인
      Toast.fire({
        icon: 'error',
        title: '휴가 신청을 위해 시작일과 종료일을 선택해주세요.'
      })
      
      return;
    }
  
    if (selectedDates1[0] < today || selectedDates1[1] < today) {  // 선택한 날짜가 오늘 이후인지 확인
      Toast.fire({
        icon: 'error',
        title: '휴가 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.'
      })
      
      return;
    }
  
    
    dispatch(callInsertRequestAPI({
      requestReason: textareaValue,
      requestStart: getDate(selectedDates1[0]),
      requestEnd: getDate(selectedDates1[1]),
      requestType: "휴가 신청"
    }));
  };
  


  const handleRequestLeave = () => {
    const today = new Date();  // 오늘 날짜를 가져옵니다. 시간은 무시하기 위해 시, 분, 초, 밀리초를 0으로 설정합니다.
    today.setHours(0, 0, 0, 0);
  
    if (!selectedDates2[0] || !selectedDates2[1]) {  // 날짜 선택 확인
      alert('휴가 신청을 위해 시작일과 종료일을 선택해주세요.');
      return;
    }
  
    if (selectedDates2[0] < today || selectedDates2[1] < today) {  // 선택한 날짜가 오늘 이후인지 확인
      alert('휴가 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.');
      return;
    }
    
    console.log(textareaValue)
  
    dispatch(callInsertRequestAPI({
      requestReason: textareaValue,
      requestStart: getDate(selectedDates2[0]),
      requestEnd: getDate(selectedDates2[1]),
      requestType: "휴직 신청"
    }))
  }


    const handleWorkOutRequest = () => {
      const today = new Date();  // 오늘 날짜를 가져옵니다. 시간은 무시하기 위해 시, 분, 초, 밀리초를 0으로 설정합니다.
      today.setHours(0, 0, 0, 0);
    
    
      if (selectedDates1[0] < today || selectedDates1[1] < today) {  // 선택한 날짜가 오늘 이후인지 확인
        alert('퇴직 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.',
        '아닐 시에 결재관리자가 알아서 회수하겠습니다. ');
        return;
      }
    
      console.log(textareaValue);
      
      dispatch(callInsertRequestAPI({
        requestReason: textareaValue,
        requestStart: getDate(selectedDates3[0]),
        requestEnd: getDate(selectedDates3[1]),
        requestType: "퇴직 신청"
      }));
    };
  

    //삭제 버튼
    // const handleDelete = async (request) => {
    //   // 요청을 삭제하는 API를 호출합니다.
    //   // API 호출에 실패하면 에러 메시지를 표시하고 함수를 종료합니다.
    //   try {
    //     await callDeleteRequestAPI(request);
    //   } catch (error) {
    //     alert('삭제 실패: ' + error.message);
    //     return;
    //   }
    
    //   // 상태를 업데이트해서 요청 목록을 다시 렌더링합니다.
    //   setAllRequest(allRequest.filter(r => r !== request));
    // };
    


  const handleDateClick1 = (info) => {
    handleDateClick(info, setSelectedDates1);
  };

  const handleDateClick2 = (info) => {
    handleDateClick(info, setSelectedDates2);
  };

  const handleDateClick3 = (info) => {
    handleDateClick(info, setSelectedDates3);
  };

  //여기
  const handleDateClick = (info, setSelectedDates) => {
    const { date } = info;

    setSelectedDates((prevDates) => {
      console.log('prevDates', prevDates)
      console.log('prevDates next index', prevDates.length%2)

      if (prevDates.includes(date)) {
        return prevDates.filter((d) => d !== date);
      } else {
        if (prevDates.length >= 2) {
          return [date];
        } else {
          return [...prevDates, date];
        }
      }
    });
  };

  return (
    <div className={DocumentCSS}>
      <body>
        <div class="document-container">
          <div class="btnDocu" onClick={handleButtonClick}>내가 쓴 <b>신청</b> 보기</div>
          <div class="menu-wrapper">
            <div class="menu-item active"><b>휴가</b> 신청</div>
            <div class="menu-item"><b>휴직</b> 신청</div>
            <div class="menu-item"><b>퇴직</b> 신청</div>
          </div>


          <div class="content">
            <form>
            <div class="title"><b>휴가 신청</b></div>
            <div class="modi0" onClick={handleRequestVacation}>
                    신청하기
                </div>
              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름:  <b>{membersData ? membersData.memberName : ''} </b> </label><br/><br/>
    

        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유:</label><br/><br/>
        <textarea id="reason1" name="reason" rows="32" cols="85" onChange={(e) => setTextareaValue(e.target.value)} required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea>

      </form>  
      <div class="cal">
      선택한 날짜 :
        {selectedDates1.length === 1 && (
          <span>{selectedDates1[0].toLocaleDateString()}</span>
        )}
        {selectedDates1.length === 2 && (
          <span>
            {selectedDates1[0].toLocaleDateString()} -{" "}
            {selectedDates1[1].toLocaleDateString()}
          </span>
        )}
      </div>
      <div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
  <FullCalendar
    ref={calendarRef1}
    plugins={[dayGridPlugin, interactionPlugin]}
    selectable={false}
    height="100%"
    initialView="dayGridMonth"
  />
</div>
          </div>



          <div class="content">
          <form>
            <div class="title"><b>휴직 신청</b></div>
            <div class="modi0" onClick={handleRequestLeave}>
                    신청하기
                </div>
              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름: <b>{membersData ? membersData.memberName : ''} </b></label><br/><br/>
        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유:</label><br/><br/>
        <textarea id="reason1" name="reason" rows="32" cols="85" onChange={(e) => setTextareaValue(e.target.value)} required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea>

      </form> 
      <div class="cal">
             선택한 날짜 :
        {selectedDates2.length === 1 && (
          <span>{selectedDates2[0].toLocaleDateString()}</span>
        )}
        {selectedDates2.length === 2 && (
          <span>
            {selectedDates2[0].toLocaleDateString()} -{" "}
            {selectedDates2[1].toLocaleDateString()}
          </span>
        )}
      </div>

      <div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
      <FullCalendar
        ref={calendarRef2}
        plugins={[dayGridPlugin, interactionPlugin]}
        selectable={false}
        height="100%"
        initialView="dayGridMonth"
      /></div>

      <div>
          </div>
          </div>


          <div class="content">
          <form>
          <div class="title"><b>퇴직 신청</b></div>
<div class="modi0" onClick={handleWorkOutRequest}>
  신청하기
</div>

              
        <label htmlFor="name" style={{ marginLeft: "40px",padding: "10px", fontSize: "20px" }}>신청인 이름: <b>{membersData ? membersData.memberName : ''}</b> </label><br/><br/>
    

        <label htmlFor="reason" style={{ marginLeft: "50px", fontSize: "20px" }}>신청사유: 퇴직 신청 선택 날짜는 해당 날짜를 두번 똑같이 눌러주세요</label><br/><br/>

        <textarea id="reason1" name="reason" rows="32" cols="85" onChange={(e) => setTextareaValue(e.target.value)} required style={{ backgroundColor: "lightgray", border: "none",marginLeft: "40px" }}></textarea>

      </form>   
             <div class="cal">

             선택한 날짜 :
{selectedDates3.length === 1 && (
  <span>{selectedDates3[0].toLocaleDateString()}</span>
)}
{selectedDates3.length === 2 && (
  <span>
    {selectedDates3[0].toLocaleDateString()} -{" "}
    {selectedDates3[1].toLocaleDateString()}
  </span>
)}
</div>
<div style={{ width: "400px", height: "500px", position: "relative", left: "800px", top: "-500px" }}>
<FullCalendar
ref={calendarRef3}
plugins={[dayGridPlugin, interactionPlugin]}
selectable={false}
height="500px"
initialView="dayGridMonth"
/>
</div>
          </div>
        </div>
        <div>
        {isModalOpen && (
  <div className="modal-overlay">
    <div className="modal">
      <div className="modal-content">
        <h2>
          '<b>{membersData ? membersData.memberName : ''}</b>'
          님의 신청 서류 신청 내역 📂
        </h2>
        <div className="modal-scrollable-content">
          <table className="center-table">
            {getAllRequest &&
              getAllRequest.map((request, index) => (
                <div className="request" key={index}>
                  <button>삭제</button>
                  <tr>
                    <th>결재 서류 번호</th>
                    <td>{request.approvals.map((approval, index) => <p key={index}>{approval.appStatus}</p>)}</td>
                  </tr>
                  <tr>
                    <th>결재 내용</th>
                    <td>{request.requestReason}</td>
                  </tr>
                  <tr>
                    <th>결제 타입</th>
                    <td>{request.requsetType}</td>
                  </tr>
                  <tr>
                    <th>시작일</th>
                    <td>{request.requestStart}</td>
                  </tr>
                  <tr>
                    <th>종료일</th>
                    <td>{request.requestEnd},</td>
                  </tr>
                  {/* Add more fields as needed */}
                  <br />
                </div>
              ))}
          </table>
        </div>
        <button className="docuBtn" onClick={closeModal}>신청 내역 닫기</button>
      </div>
    </div>
  </div>
)}

</div>

      </body>
    </div>
);
}

export default Document;