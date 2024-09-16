import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import DocumentCSS from '../../components/main/Document.css';
import { callDocuMember, callInsertRequestAPI, callMyPageAllRequestAPI, callMyPageRequestDeleteAPI, callWorkInfoAPI } from "../../apis/MyPageAPICalls";
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

    const deletRequestCode = useSelector(state => state.myPageReducer.deletRequestCode);
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
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (!selectedDates1[0] || !selectedDates1[1]) {
      Toast.fire({
        icon: 'error',
        title: '휴가 신청을 위해 시작일과 종료일을 선택해주세요.'
      })
      
      return;
    }
  
    if (selectedDates1[0] < today || selectedDates1[1] < today) {
      Toast.fire({
        icon: 'error',
        title: '휴가 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.'
      })
      
      return;
    }
  
    Swal.fire({
      title: '정말 휴가를 신청하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callInsertRequestAPI({
          requestReason: textareaValue,
          requestStart: getDate(selectedDates1[0]),
          requestEnd: getDate(selectedDates1[1]),
          requestType: "휴가 신청"
        }));
      }
      window.location.href = 'http://localhost:3000/approval/appline';
    });
  };
  
  const handleRequestLeave = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (!selectedDates2[0] || !selectedDates2[1]) {
      Toast.fire({
        icon: 'error',
        title: '휴직 신청을 위해 시작일과 종료일을 선택해주세요.'
      })
      
      return;
    }
  
    if (selectedDates2[0] < today || selectedDates2[1] < today) {
      Toast.fire({
        icon: 'error',
        title: '휴직 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.'
      })
      
      return;
    }
  
    Swal.fire({
      title: '정말 휴직을 신청하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callInsertRequestAPI({
          requestReason: textareaValue,
          requestStart: getDate(selectedDates2[0]),
          requestEnd: getDate(selectedDates2[1]),
          requestType: "휴직 신청"
        }));
      }
      window.location.href = 'http://localhost:3000/approval/appline';
    });
  };
  


  const handleWorkOutRequest = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
  
    if (!selectedDates3[0] || !selectedDates3[1]) {
      Toast.fire({
        icon: 'error',
        title: '퇴직 신청을 위해 시작일과 종료일을 선택해주세요.'
      })
      
      return;
    }
  
    if (selectedDates3[0] < today || selectedDates3[1] < today) {
      Toast.fire({
        icon: 'error',
        title: '퇴직 신청 시작일과 종료일은 오늘 날짜 이후여야 합니다.'
      })
      
      return;
    }
  
    Swal.fire({
      title: '정말 퇴직을 신청하시겠습니까?',
      text: " 퇴직을 신청하셨다면 중복으로 신청이 어렵습니다. ",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(callInsertRequestAPI({
          requestReason: textareaValue,
          requestStart: getDate(selectedDates3[0]),
          requestEnd: getDate(selectedDates3[1]),
          requestType: "퇴직 신청"
        }));
      }
      window.location.href = 'http://localhost:3000/approval/appline';
    });
  };

  const handleDelete = async (requestCode) => {
    // 모달을 먼저 닫기
    closeModal();
  
    // 그리고 삭제 확인 알럿 띄우기
    Swal.fire({
      title: '정말 삭제하시겠습니까?',
      showDenyButton: true,
      confirmButtonText: '예',
      denyButtonText: '아니오',
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        await dispatch(callMyPageRequestDeleteAPI(requestCode));
        dispatch(callMyPageAllRequestAPI());
        Swal.fire('삭제되었습니다!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('삭제가 취소되었습니다!', '', 'info')
      }
    })
  };

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
                <tr className="request" key={index}>
                  <td>



                  </td>
                  <td>
                    <p><b>결재 서류 상태</b><br/>(대기 상태만 삭제 가능)</p>
                    <p>{request.approvals.map((approval, index) => <span key={index}>{approval.appStatus}</span>)}</p>
                  </td>
                  <td>
                    <p><b>결재 번호</b></p>
                    <p>{request.requestCode}</p>
                  </td>
                  <td>
                    <p><b>결재 내용</b></p>
                    <p>{request.requestReason}</p>
                  </td>
                  <td>
                    <p><b>결제 타입</b></p>
                    <p>{request.requsetType}</p>
                  </td>
                  <td>
                    <p><b>시작일</b></p>
                    <p>{new Date(request.requestStart).toISOString().split('T')[0]}</p>
                  </td>
                  <td>
                    <p><b>종료일</b></p>
                    <p>{new Date(request.requestEnd).toISOString().split('T')[0]}</p>
                  </td>
                  <div
  className="deleteRequestBtn"
  onClick={() => handleDelete(request.requestCode)}
  style={{ cursor: 'pointer' }}
>
  삭제
</div>
                  {/* Add more fields as needed */}
                </tr>
              ))}
          </table>
        </div>
        <button className="docuBtn" onClick={closeModal}>
          신청 내역 닫기
        </button>
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