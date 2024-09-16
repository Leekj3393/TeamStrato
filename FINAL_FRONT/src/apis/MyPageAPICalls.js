import { getMyNotice } from "../modules/MyPageNoticeModule";
import axios from 'axios';
import Swal from 'sweetalert2';


// MyPageAPICalls.js
const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
export const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}/skylift/myPage`;

//카운
export const callMyPageAPI = () => {
  const requestURL = `${PRE_URL}/membersAll`;


  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL);
      const result = await response.json();

      if (response.status === 200) {
        // 요부분 타입은 만든 액션으로 바꾸기 
        dispatch({type: 'MyPage/GET_MEMBERS_ALL', payload: {totalMemberCount: result.data.totalMemberCount}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

// 마이페이지 기본 정보 조회
export const callMyPageMemberAPI = () => {
  const reqeustURL = `${PRE_URL}/membersInfo`;

  return async (dispatch, getState) => {

    const response = await fetch(reqeustURL,{
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
      }
    });
    const result = await response.json();

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_MEMBERS', payload: { membersData: result.data } });
    }
  };
};

export const callDocuMember = () => {
  const requestURL = `${PRE_URL}/request`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL);
      const result = await response.json();

      if (response.status === 200) {
        console.log('memberRequest:', result); // 로그 추가
        dispatch({ type: 'request/GET_DOCU_REQUEST_MEMBER', payload: { memberRequest: result } });
      }
      return Promise.resolve();
    } catch (error) {
      console.error('Failed to fetch member list:', error);
      return Promise.reject(error);
    }
  };
};



//로그인 된 사람의 정보로 출근하기
export const callGoToWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/POST_GO_TO_WORK', payload: {time: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


//로그인 된 사람의 정보로 퇴근하기
export const callEndWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/endTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/END_WORK', payload: {endTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


//외출
export const callOutWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/outTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/OUT_WORK', payload: {outTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

//복귀
export const callReturnWorkAPI = () => {
  const requestURL = `${PRE_URL}/attendance/returnTime`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/RETURN_WORK', payload: {returnTime: (new Date().toISOString())}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

//정보수정
export const updateMemberAPI = (updatedData) => {
  const modifyURL = `${PRE_URL}/members/modify`;

  return async (dispatch, getState) => {
    try {
      console.log(modifyURL);

      const response = await fetch(modifyURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify({
          phone: updatedData.phone,
          address: updatedData.address,
          bankName: updatedData.bankName,
          bankNo: updatedData.bankNo,
        }),        
      });

      if (response.status === 200) {
        console.log('response', response);
        dispatch({ type: 'MyPage/PUT_MODIFY_MYMEMBER', payload: { 
          phone: updatedData.phone, address: updatedData.address,
          bankName: updatedData.bankName,bankNo: updatedData.bankNo } }); // 리듀서에 수정된 휴대폰 번호 전달
      }
    } catch (error) {
      console.log(error);
      console.error('Failed to update member:', error);
    }
  };
};

// 리퀘스트 전체 조회
export const callMyPageAllRequestAPI = () => {
  const requestURL = `${PRE_URL}/request`;

  return async (dispatch, getState) => {

    const response = await fetch(requestURL, {
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
        "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
      }
    });

    const result = await response.json();
    console.log(result);  // result 값을 확인합니다.

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_ALL_REQUEST', payload: { getAllRequest: result } });
    }
  };
};



export const callInsertRequestAPI = ({requestReason, requestStart, requestEnd, requestType}) => {
  const requestURL = `${PRE_URL}/request/insert`;
  const selectedDates1 = new Date().toISOString();

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

  return async (dispatch, getState) => {
    try {
      console.log(requestURL)

      const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        },
        body: JSON.stringify({ 
          requestReason,
          requestStart,
          requestEnd,
          requsetType: requestType
        }),
      });

      if (response.ok) {  
        console.log('response', response)
        dispatch({type: 'MyPage/INSERT_REQUEST', payload: {selectedDates1}});  
        // alert(requestType + ' 완료되었습니다');
        Toast.fire({
          icon: 'success',
          title: requestType + ' 완료되었습니다.'
        });
      } else {  
        const message = await response.text();
        // alert(message);
        Toast.fire({
          icon: 'error',
          title: message
        });
      }

      console.log(response)
    } catch (error) {
      console.log(error)
      console.error('Failed to fetch member list:', error);
      Toast.fire({
        icon: 'error',
        title: 'Failed to fetch member list: ' + error.message
      });
    }
  };
};


//오늘 회원이 출근한 정보 얻어오기
export const callWorkInfoAPI = () => {
  const requestURL = `${PRE_URL}/workToday`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // result는 fetch 호출에서 반환된 응답의 내용을 담는 변수입니다.
        const result = await response.json();

        // workInfo는 result를 파싱한 결과를 담는 변수입니다.
        const workInfo = result; //이 부분은 실제 응답 형식에 맞게 수정해야 합니다.

        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/GET_INFO_WORK', payload: {workInfo}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};

// 모든 회원의 출근 정보 불러오기
export const callWorkInfoAllAPI = () => {
  const requestURL = `${PRE_URL}/workInfo`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      });

      if (response.status === 200) {
        // result는 fetch 호출에서 반환된 응답의 내용을 담는 변수입니다.
        const result = await response.json();

        // workInfo는 result를 파싱한 결과를 담는 변수입니다.
        const workInfoAll = result; //이 부분은 실제 응답 형식에 맞게 수정해야 합니다.

        // 넘어온 시간값 넘기기
        dispatch({type: 'MyPage/GET_INFO_WORK_ALL', payload: {workInfoAll}});
      }
    } catch (error) {
      console.error('Failed to fetch member list:', error);
    }
  };
};


//게시판
export const callMyPageNoticeAPI = ({ currentPage = 1}) => {

  const requestURL = `${PRE_URL}/notice/part?page=${currentPage}`;

  return async (dispatch, getState) => {
      const result = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-Type" : "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem('accessToken')
        }
      }).then(response => response.json());

      if(result.status === 200) {
          console.log('[MyPageNoticeAPICalls] : callNoticeListAPI result : ', result);
          dispatch(getMyNotice(result));
      }
  }
}

//리퀘스트 삭제하기
export const callMyPageRequestDeleteAPI = (requestCode) => {
  const requestURL = `${PRE_URL}/request/delete/${requestCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'DELETE',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[리퀘스트코드로 삭제] : callMyPageRequestDeleteAPI result : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/DELETE_REQUEST_CODE', payload: { deletRequestCode: result } });
      return result;
    }
  };
}



export const callMyPageNoticeDetailAPI = (noticeCode) => {
  const requestURL = `${PRE_URL}/notice/part/${noticeCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[코드로 받아오는 공지사항 코드] : callMyPageNoticeDetailAPI result : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_NOTICE_CODE', payload: { MyNoticeDetail: result } });
      return result;
    }
  };
}


//공지사항 첨부파일
export const callMyPageNoticeFileAPI = (noticeCode) => {
  const requestURL = `${PRE_URL}/notice/files/${noticeCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[첨부파일 확인] : callMyPageNoticeFileAPI result : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_FILE', payload: { getMyNoticeFile: result } });

            // 파일 다운로드
            for (let file of result) {
              const downloadResponse = await axios.get(`${PRE_URL}/download/${file.fileName}`, { responseType: 'blob' });
              
              // Blob to File and Download Logic...
            }
      return result;
    }
  };
}


// 공지사항 첨부파일
export const callMyPageNoticeFileDownAPI = (fileName) => {
  
  const requestURL = `${PRE_URL}/download/${fileName}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'GET',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[첨부파일 다운 확인] : callMyPageNoticeFileDownAPI result : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_FILE_NAME', payload: { getMyNoticeFileName: result } });

      // 파일 다운로드
      for (let file of result) {
        const downloadResponse = await axios.get(`${PRE_URL}/download/${file.fileName}`, { responseType: 'blob' });
        
        // Blob to File and Download Logic...
      }

      return result;
    }
  };
}


//멤버이름으로 이메일 찾기
// export const callMemberEmailAPI = (memberName) => {
//   const requestURL = `${PRE_URL}/member/${memberName}/email`;

//   return async (dispatch, getState) => {
//     const response = await fetch(requestURL, {
//       method : 'GET',
//       headers : {
//         "Content-Type" : "application/json",
//       }
//     });

//     const result = await response.json();
//     console.log('[회원 이메일 찾기] : callMemberEmailAPI result : ',result);

//     if (response.status === 200) {
//       dispatch({ type: 'MyPage/GET_MEMBER_EMAIL_MY', payload: { getMemberEmailMy: result } });
//       return result;
//     }
//   };
// }
export const callMemberEmailAPI = (name) => {
  const requestURL = `${PRE_URL}/member/${name}/email`;

  return async (dispatch, getState) => {
    try {
      const response = await fetch(requestURL, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (response.ok && response.headers.get('Content-Type').includes('application/json')) {
        const result = await response.text();
        console.log('[회원 이메일 찾기] : callMemberEmailAPI result: ', result);

        if (result && result.trim().length > 0) { // check if result is not empty
          const parsedResult = JSON.parse(result);
          dispatch({ type: 'MyPage/GET_MEMBER_EMAIL_MY', payload: { getMemberEmailMy: parsedResult } });
          return parsedResult;
        } else {
          throw new Error("API returned empty result");
        }
      } else {
        throw new Error(`Error while calling the API. Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
};








//근태 결근으로 하기
export const callMyPageAttendanceAbsenteeismAPI = (attendanceCode) => {
  const requestURL = `${PRE_URL}/workInfo/Absenteeism/${attendanceCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[회원 근태 결근] : callMyPageAttendanceAbsenteeismAPI : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/POST_ABSENTEEISM', payload: { AbsenteeismCode: result } });
      return result;
    }
  };
}


//근태 지각으로 하기
export const callMyPageAttendanceLazyAPI = (attendanceCode) => {
  const requestURL = `${PRE_URL}/workInfo/lazyTime/${attendanceCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[회원 근태 지각] : callMyPageAttendanceLazyAPI : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/POST_LAZYTIME', payload: { attendanceCode: result } });
      return result;
    }
    
  };
}

//근태 관리자 퇴근으로 하기
export const callMyPagemanagerEndTimeAPI = (attendanceCode) => {
  const requestURL = `${PRE_URL}/workInfo/managerEndTime/${attendanceCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'POST',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[회원 관리자 권한 퇴근] : callMyPagemanagerEndTimeAPI : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/POST_MANAGERENDTIME', payload: { attendanceCode: result } });
      return result;
    }
    
  };
}

//근태 관리자 퇴근으로 하기
export const callMyPagDeleteTimeAPI = (attendanceCode) => {
  const requestURL = `${PRE_URL}/workInfo/deleteTime/${attendanceCode}`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method : 'DELETE',
      headers : {
        "Content-Type" : "application/json",
      }
    });

    const result = await response.json();
    console.log('[회원 삭제] : callMyPagDeleteTimeAPI : ',result);

    if (response.status === 200) {
      dispatch({ type: 'MyPage/DELETE_DELETE', payload: { attendanceCode: result } });
      return result;
    }
    
  };
}




export const callMyMemberImageAPI = () => {
  // Replace with your actual server URL and route
  const requestURL = `${PRE_URL}/memberImage`;

  return async (dispatch, getState) => {
    const response = await fetch(requestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + window.localStorage.getItem('accessToken') // 로컬 스토리지에 저장된 액세스 토큰을 사용합니다.
      }
    });

    const result = await response.json();
    console.log('[멤버이미지] : callMemberImageAPI result : ', result);

    if(response.status === 200) {
      dispatch({ type: 'MyPage/GET_MY_MEMBER_IMAGE', payload: { getMemberImage: result.data } }); // 받은 결과를 저장합니다.
    }
  }
}

