import { postMember, postLogin, postUpdatepwd } from "../modules/MemberModule";
import Swal from 'sweetalert2';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


/* 로그인 API 호출 */
export const callLoginAPI = (form) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 700,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })

    const requestURL = `${PRE_URL}/auth/login`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callLoginAPI result : ', result);

        if(result.status === 200){
            /* 로그인 성공 시 발급 받은 accessToken을 클라이언트 측의 localStorage에 저장한다.
            이후 토큰이 필요한 요청에는 저장 된 토큰을 넣어 요청하도록 한다. */
            window.localStorage.setItem('accessToken', result.data.accessToken);
        } else {
            Toast.fire({
                icon: 'error',
                title: '입력하신 정보가 잘못되었습니다.'
              }) }

        dispatch(postLogin(result));
        
    }
}

export const callGetMemberAPI = (form) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 700,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })

    const requestURL = `${PRE_URL}/auth/findid`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }).then((response) => response.json());

        console.log('[MemberAPICalls] callGetMemberAPI result : ', result);

        if(result.status === 200){
            Toast.fire({
                icon: 'success',
                title: '아이디 조회 성공'
              })
            dispatch(postMember(result));
        } else {
            Toast.fire({
                icon: 'error',
                title: '이메일과 주민번호를 확인해주세요.'
              }) }
    }
}


export const callUpdatePwdAPI = (form) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 700,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })

    console.log('callUpdatePwdAPI form : ', form);

    const requestURL = `${PRE_URL}/auth/updatePwd`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[MemberAPICalls] callupdatePwdAPI result : ', result);

        if(result.status === 200){
            dispatch(postUpdatepwd(result));
        } else {
            Toast.fire({
                icon: 'error',
                title: '발송된 임시 비밀번호를 다시 확인해주세요.'
              }) }
    
    }
}
