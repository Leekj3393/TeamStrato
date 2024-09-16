import MyPageCSS from '../../components/main/MyPage.css';
import React, { useState, useEffect, useRef } from 'react';
import { callMyPageAPI, callGoToWorkAPI, callEndWorkAPI, callOutWorkAPI, callReturnWorkAPI, callMyPageMemberAPI, updateMemberAPI, callWorkInfoAPI, callWorkInfoAllAPI, callMyPageAttendanceAbsenteeismAPI, callMyPageAttendanceLazyAPI, callMyPagemanagerEndTimeAPI, callMyPagDeleteTimeAPI } from '../../apis/MyPageAPICalls';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, differenceInMonths } from 'date-fns';
import Swal from 'sweetalert2';
import { updateAttendanceStatus } from '../../modules/AttendanceReducerModule';
import { Doughnut } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';




const getDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = ("0" + (newDate.getMonth() + 1)).slice(-2);
  const day = ("0" + newDate.getDate()).slice(-2);
  return `${year}-${month}-${day}`
}

function MyPage() {
  const dispatch = useDispatch();
  const membersData = useSelector(state => state.myPageReducer.membersData);
  const workInfo = useSelector(state => state.myPageReducer.workInfo);
  const workInfoAll = useSelector(state => state.myPageReducer.workInfoAll);
  console.log(workInfo);
  console.log("모든회원근태조회완료:",workInfoAll);

  // 기본 값을 세팅하는 부분을 useEffect 내부로 이동
  const [phone, setPhone] = useState(membersData ? membersData.phone : '');
  const [address, setAddress] = useState(membersData ? membersData.address : '');
  const [bankName, setBankName] = useState(membersData ? membersData.bankName : '');
  const [bankNo, setBankNo] = useState(membersData ? membersData.bankNo : '');
  
  useEffect(() => {
    dispatch(callMyPageAPI());
    dispatch(callMyPageMemberAPI());
    dispatch(callWorkInfoAPI());
    dispatch(callWorkInfoAllAPI());
  }, []);

  //도넛차트
  Chart.register(...registerables);
  const data = {
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


  // 개별 항목의 편집 모드를 관리
  const [editMode, setEditMode] = useState({
    address: false,
    bankName: false,
    bankNo: false,
    phone: false,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpdateClick = () => {
    const updatedData = {
      phone,
      address,
      bankName,
      bankNo
    };
  
    dispatch(updateMemberAPI(updatedData));
    Toast.fire({
      icon: 'success',
      title: '수정완료!'
    })
    setActiveModal(0);  // 모달 창 닫기
  };
  
  const handleEditModeChange = (item, status) => {
    setEditMode({ ...editMode, [item]: status });
  };
  // 각 항목별 변경 핸들러
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleBankNameChange = (e) => {
    setBankName(e.target.value);
  };
  
  const handleBankNoChange = (e) => {
    setBankNo(e.target.value);
  };

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

  //useSelector를 사용해서 화면에 데이터를 보여주기 
  // 추가적으로 지금 여러 리듀서가 있어서 만든 리듀서만 가져오도록 한 로직
  const {totalMemberCount} = useSelector(state => state.myPageReducer);
  const [activeModal, setActiveModal] = useState(null);
  const date = workInfo && workInfo[0] && workInfo[0].startTime ? new Date(workInfo[0].startTime) : null;
  const goToWorkDate = date ? getDate(date) : '';
  const goToWorkTime = date ? `${date.getHours()}:${date.getMinutes()}` : '';
  const endDate = workInfo && workInfo[0] && workInfo[0].endTime ? new Date(workInfo[0].endTime) : null;
  const endWorkDate = endDate ? getDate(endDate) : '';
  const endWorkTime = endDate ? `${endDate.getHours()}:${endDate.getMinutes()}` : '';
  const returnDate = workInfo && workInfo[0] && workInfo[0].returnTime ? new Date(workInfo[0].returnTime) : null;
  const returnWorkDate = returnDate ? getDate(returnDate) : '';
  const returnWorkTime = returnDate ? `${returnDate.getHours()}:${returnDate.getMinutes()}` : '';
  const outDate = workInfo && workInfo[0] && workInfo[0].outTime ? new Date(workInfo[0].outTime) : null;
  const outWorkDate = outDate ? getDate(outDate) : '';
  const outWorkTime = outDate ? `${outDate.getHours()}:${outDate.getMinutes()}` : '';
  
  //근속 시간 계산
  const hireDate = membersData ? parseISO(membersData.memberHireDate) : null;
  const currentDate = new Date();
  const duration = hireDate ? differenceInMonths(currentDate, hireDate) : null;
  
  const years = Math.floor(duration / 12);
const months = duration % 12;

console.log("Duration:", duration);
console.log("Years:", years);
console.log("Months:", months);

  
  const openModal = (modalIndex) => {
    setActiveModal(modalIndex);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const handleOutOnClick = () => {
    let currentDateTime = new Date();
    
    Swal.fire({
      title: '정말 외출하시겠습니까?',
      text: "현재 시간: " + currentDateTime,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        if (workInfo && workInfo[0] && workInfo[0].endTime) {
          // 이미 퇴근한 경우 외출 불가능
          Toast.fire({
            icon: 'error',
            title: '퇴근한 상태에서는 외출할 수 없습니다!'
          });
          return;
        }
        Toast.fire({
          icon: 'success',
          title: '외출이 완료되었습니다!'
        });
        dispatch(callOutWorkAPI());
    
        // 2초 후에 페이지 자동 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }
  
  const handleWorknClick = () => {
    let currentDateTime = new Date();
    
    Swal.fire({
      title: '정말 출근하시겠습니까?',
      text: "현재 시간: " + currentDateTime,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        // 출근하기 API 호출
        dispatch(callGoToWorkAPI());
    
        // 출근 날짜 선택 확인
        if (workInfo && workInfo[0] && workInfo[0].startTime) {
          Toast.fire({
            icon: 'error',
            title: '이미 출근하셨습니다!'
          });
          return;
        }
        Toast.fire({
          icon: 'success',
          title: '출근이 완료되었습니다!'
        });
    
        // 2초 후에 페이지 자동 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }
  
  const handleEndOnClick = () => {
    let currentDateTime = new Date();
    
    Swal.fire({
      title: '정말 퇴근하시겠습니까?',
      text: "현재 시간: " + currentDateTime,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '예',
      cancelButtonText: '아니오'
    }).then((result) => {
      if (result.isConfirmed) {
        if (workInfo && workInfo[0] && workInfo[0].endTime) {
          Toast.fire({
            icon: 'error',
            title: '이미 퇴근하셨습니다!'
          });
          return;
        }
        Toast.fire({
          icon: 'success',
          title: '퇴근이 완료되었습니다 ᕕ༼✿•̀︿•́༽ᕗ!'
        });
        dispatch(callEndWorkAPI());
  
        // 2초 후에 페이지 자동 새로고침
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }

const handleReturnOnClick = () => {
  let currentDateTime = new Date();
  
  Swal.fire({
    title: '정말 복귀하시겠습니까?',
    text: "현재 시간: " + currentDateTime,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      if (!workInfo || workInfo.length === 0 || !workInfo[0].startTime || workInfo[0].endTime) {
        // 출근하지 않았거나 퇴근한 경우 복귀 불가능
        Toast.fire({
          icon: 'error',
          title: '출근 또는 외출한 상태에서만 복귀할 수 있습니다!'
        })
        return;
      }
      Toast.fire({
        icon: 'success',
        title: '복귀가 완료되었습니다!'
      })
      dispatch(callReturnWorkAPI());

      // 2초 후에 페이지 자동 새로고침
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  });
}

//모달
const [activeCloudModal, setActiveCloudModal] = useState(false);

const handleCloudClick = () => {
  setActiveCloudModal(true);
};

const closeCloudModal = () => {
  setActiveCloudModal(false);
};

//
let groupedWorkInfoAll = {};

if (Array.isArray(workInfoAll)) {
  groupedWorkInfoAll = workInfoAll.reduce((acc, cur) => {
    if (!acc[cur.member.memberName]) {
      acc[cur.member.memberName] = [];
    }
    acc[cur.member.memberName].push(cur);
    return acc;
  }, {});
}


//결근
const handleAbsenteeism = async (attendanceCode) => {
  Swal.fire({
    title: '정말 결근으로 상태를 바꾸시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(callMyPageAttendanceAbsenteeismAPI(attendanceCode));
      dispatch(callWorkInfoAllAPI());
      Swal.fire({
        icon: 'success',
        title: '근태 상태가 결근으로 변경되었습니다!'
      })
    }
  });
}

//차트



//지각 
const handleLazyTime = async (attendanceCode) => {
  Swal.fire({
    title: '정말 지각으로 상태를 바꾸시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(callMyPageAttendanceLazyAPI(attendanceCode));
      dispatch(callWorkInfoAllAPI());
      Swal.fire({
        icon: 'success',
        title: '근태 상태가 지각으로 변경되었습니다!'
      })
    }
  });
}

// 

//관리자 권한 퇴근
const handleManagerTime = async (attendanceCode) => {
  Swal.fire({
    title: '관리자 권한으로 퇴근시키시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(callMyPagemanagerEndTimeAPI(attendanceCode));
      dispatch(callWorkInfoAllAPI());
      Swal.fire({
        icon: 'success',
        title: '근태 상태가 관리자 권한으로 퇴근으로 변경되었습니다!'
      })
    }
  });
}

//삭제
const handleDeleteTime = async (attendanceCode) => {
  Swal.fire({
    title: '정말 근태 기록을 삭제하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '예',
    cancelButtonText: '아니오'
  }).then((result) => {
    if (result.isConfirmed) {
      dispatch(callMyPagDeleteTimeAPI(attendanceCode));
      dispatch(callWorkInfoAllAPI());
      Swal.fire({
        icon: 'success',
        title: '근태 기록이 삭제되었습니다!'
      })
    }
  });
}

//
function formatPhoneNumber(phone) {
  // '-'을 포함한 형식으로 변경
  const formattedPhone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  return formattedPhone;
}

function getBirthdate(residentNo) {
  const yearPrefix = residentNo[6] <= "2" ? "19" : "20";
  const year = yearPrefix + residentNo.slice(0, 2);
  const month = residentNo.slice(2, 4);
  const day = residentNo.slice(4, 6);
  return `${year}년 ${month}월 ${day}일`;
}


  return (
    <div className={MyPageCSS}>
        <div className="employeetitle">
  
            <div class="employeeStatus">
            Strato 직원 현황
            </div>
            <div class="employeeAll">
            전체 직원: {totalMemberCount}명
            </div>

            <div class="Explanation">
            자신의 업무에 맞게 필요한 직원을 검색하고 확인해 보세요!<br/>
            스카이리프트는 빠르게 직원을 검색하고 찾을 수 있습니다.
            </div>
            <div class="work">
            <div class="workTitle" onClick={handleWorknClick}>
                출근하기
            </div>
            <img className="workImg" src="/image/image 416.png"/>
            <div class="workNemo">
            <div class="workNemoTitle1">{goToWorkDate}</div> 
            <div class="workNemoTitle2">{goToWorkTime}</div>
            </div>
        </div>

        <div class="getoffwork">
            <div class="getoffworkTitle" onClick={handleEndOnClick}>
                퇴근하기
            </div>
            <img className="getoffworkImg" src="/image/image 418.png"/>
            <div class="getoffworkNemo">
            <div class="workNemoTitle1">{endWorkDate  || '' }</div> 
               <div class="workNemoTitle2">{endWorkTime || '' }</div> 
            </div>
        </div>
        <div class="going">
            <div class="outTitle" onClick={handleOutOnClick}>
                외출  /
            </div>
            <div class="comeTitle" onClick={handleReturnOnClick}>
                복귀
            </div>
            <img className="goingImg" src="/image/image 419.png"/>
            <div class="goingNemo">
               <div class="returnTitle1">{outWorkDate || ''  }</div> 
               <div class="returnTitle2">{outWorkTime || ''  }<br/><br/><br/> ~</div> 
            <div class="outTitle1">{returnWorkDate || ''  }</div> 
               <div class="outTitle2">{returnWorkTime || '' }</div> 
            </div>
        </div>
        </div>
        <div class="employeeMyPage">
            <div class="info">
                기본 정보
            </div>
            <div class="modi modal-button" onClick={() => openModal(1)}>
                수정
            </div>
            <img className="MyPageSetting" src="/image/구름.jpg" onClick={handleCloudClick} />

{activeCloudModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={closeCloudModal}>&times;</button>
      <div className='AllmemberAdd'>전체 직원의 근태 관리</div>
      <p>관리자만 근태 관리가 가능합니다.</p>

      {Object.entries(groupedWorkInfoAll).map(([memberName, workInfoList]) => (
  <div key={memberName}>
    <h2>{memberName}</h2>
    <table>
      <thead>
        <tr>
          <th>전체 근태 조회</th>
          <th>상태</th>
          <th>출근시간</th>
          <th>퇴근시간</th>
          <th>외출시간</th>
          <th>복귀시간</th>
          <th class="change-width">변경</th>
        </tr>
      </thead>
      <tbody>
        {workInfoList.length > 0 ? (
          workInfoList.map((info, index) => (
            <tr key={index}>
              <td>{new Date(info.attendanceDate).toLocaleDateString()}</td>
              <td>{info.status}</td>
              <td>{info.startTime ? new Date(info.startTime).toLocaleTimeString() : ''}</td>
              <td>{info.endTime ? new Date(info.endTime).toLocaleTimeString() : ''}</td>
              <td>{info.outTime ? new Date(info.outTime).toLocaleTimeString() : ''}</td>
              <td>{info.returnTime ? new Date(info.returnTime).toLocaleTimeString() : ''}</td>
              <td class="change-width">
              <button class="custom-button" onClick={() => handleAbsenteeism(info.attendanceCode)}>결근</button>
              <button class="custom-button" onClick={() => handleLazyTime(info.attendanceCode)}>지각</button>
              <button class="custom-button" onClick={() => handleManagerTime(info.attendanceCode)}>퇴근</button>
              <button class="custom-button" onClick={() => handleDeleteTime(info.attendanceCode)}>삭제</button>
            </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7">조회된 근태 내역이 없습니다.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
))}






    </div>
  </div>
)}
           
            <div class="vy">
            
            <div class="table">

<table>
<tr>
<th>이름 </th>
<td> {membersData ? membersData.memberName : '직원 정보를 가져오는 중입니다.'}</td>
<th>성별</th>
<td>{membersData ? (membersData.gender === 'M' ? '남자' : '여자') : '직원 정보를 가져오는 중입니다.'}</td>

</tr>
<tr>
<th>생년월일</th>
<td>
  {membersData ? getBirthdate(membersData.residentNo) : '직원 정보를 가져오는 중입니다.'}
</td>




<th>급여 계좌</th>
<td> {membersData ? membersData.bankName : '직원 정보를 가져오는 중입니다.'} {membersData ? membersData.bankNo : '직원 정보를 가져오는 중입니다.'}</td>
</tr>
<tr>
<th>휴대폰 번호</th>
<td> {membersData ? formatPhoneNumber(membersData.phone) : '직원 정보를 가져오는 중입니다.'}</td>

<th>부서</th>
<td> {membersData ? membersData.department.deptName : '직원 정보를 가져오는 중입니다.'}</td>

</tr>
<tr>
<th>입사년월일</th>
<td>
{membersData ? `${membersData.memberHireDate.slice(0, 4)}년 ${membersData.memberHireDate.slice(5, 7)}월 ${membersData.memberHireDate.slice(8, 10)}일` : '직원 정보를 가져오는 중입니다.'}


</td>


<th>직급</th>
<td>{membersData ? membersData.job.jobName : '직원 정보를 가져오는 중입니다.'}</td>
</tr>
<tr>
<th rowspan="2">주소</th>
<td rowspan="2">{membersData ? membersData.address : '직원 정보를 가져오는 중입니다.'}</td>
<th>상태</th>
<td>{membersData ? membersData.memberStatus : '직원 정보를 가져오는 중입니다.'}</td>
</tr>
<tr>
<th>출결 상태</th>
<td>
{(workInfo && workInfo.length > 0) ? workInfo[0].status : '사유를 가져오는중입니다.'}


</td>
</tr>
</table>
            </div>

            </div>
        </div>

        <div className="modalButton">

  <div className="modal-button">
    {activeModal === 1 && (
      
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="modal-close" onClick={closeModal}>&times;</button>
          <h2>기본 정보 수정하기</h2>
          <h5>수정 할 정보를 클릭하세요. 수정이 안되는 정보는 인사관리자를 통해서 수정 가능합니다.</h5>
                         
            <div class="table2">

            <table>
            <tr>
                <th>이름</th>
                <td> {membersData ? membersData.memberName : '직원 정보를 가져오는 중입니다.'}</td>
                <th>성별</th>
                <td>{membersData ? (membersData.gender === 'M' ? '남자' : '여자') : '직원 정보를 가져오는 중입니다.'}</td>
            </tr>
            <tr>
                <th>생년월일</th>
                <td>  {membersData ? getBirthdate(membersData.residentNo) : '직원 정보를 가져오는 중입니다.'}</td>
                
                
                <th>급여 계좌</th>
    {editMode.bank ? (
        <td>
            <input type="text" value={bankName} onChange={handleBankNameChange} />
            <input type="text" value={bankNo} onChange={handleBankNoChange} />
          
        </td>
    ) : (
        <td onClick={() => handleEditModeChange('bank', true)}>
            {membersData ? membersData.bankName : '직원 정보를 가져오는 중입니다.'}
            {membersData ? membersData.bankNo : '직원 정보를 가져오는 중입니다.'}
        </td>
    )}
            
            
            </tr>
            <tr>

            <th>휴대폰 번호</th>
              {editMode.phone ? (
                <td>
                  <input type="text" value={phone} onChange={handlePhoneChange} />
              
                </td>
              ) : (
                <td onClick={() => handleEditModeChange('phone', true)}>
                  {membersData ? membersData.phone : '직원 정보를 가져오는 중입니다.'}
                </td>
              )}


                <th>부서</th>
                <td> {membersData ? membersData.department.deptName : '직원 정보를 가져오는 중입니다.'}</td>
            </tr>
            <tr>
                <th>입사년월일</th>
                <td>
{membersData ? `${membersData.residentNo.slice(0, 4)}년 ${membersData.residentNo.slice(4, 6)}월 ${membersData.residentNo.slice(6, 8)}일` : '직원 정보를 가져오는 중입니다.'}
</td>
                <th>직급</th>
                <td>{membersData ? membersData.job.jobName : '직원 정보를 가져오는 중입니다.'}</td>
            </tr>
            <tr>
            <th>주소</th>
    {editMode.address ? (
    <td colspan="2">
    <input type="text" value={address} onChange={handleAddressChange} class="wide-textbox" />
  </td>
    ) : (
        <td onClick={() => handleEditModeChange('address', true)}>
            {membersData ? membersData.address : '직원 정보를 가져오는 중입니다.'}
        </td>
    )}
            
            </tr>
            <tr>
                <th>근속 기간</th>
                <td>{membersData ? `${years}년 ${months}개월` : '직원 정보를 가져오는 중입니다.'}</td>
            </tr>
            </table>
            </div>
            {editMode.phone || editMode.address || editMode.bank ? (
  <div class="modiFianlModi" onClick={handleUpdateClick}>
    수정완료
  </div>
) : null}

        </div>
      </div>
    )}



    </div>




</div>
        </div>

);
}

export default MyPage;