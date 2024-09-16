import { useNavigate } from "react-router-dom";
import { getCalendar, postCalendar, postCompanycal, postDeletecal, postInsertcal, postUpdatecal } from "../modules/CalendarModule";
import Swal from 'sweetalert2';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;

export const callCalendarAPI = (state) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })
      

    console.log('callCalendarAPI form', state);

    const requestURL = `${PRE_URL}/calendar/personal`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(state)
        })
        .then(response => response.json());

        console.log('[CalendarAPICalls] callCalendarAPI result : ', result);

        if(result.status === 200){
            dispatch(postCalendar(result));
            Toast.fire({
                icon: 'info',
                title: '개인 일정'
              })
          
        } else {
        alert("조회에 실패했습니다."); }
    }
}

export const callCompanyCalAPI = (state) => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      })

    console.log('callCompanyCalAPI form', state);

    const requestURL = `${PRE_URL}/calendar/dept`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(state)
        })
        .then(response => response.json());

        console.log('[CalendarAPICalls] callCompanyCalAPI result : ', result);

        if(result.status === 200){
            dispatch(postCompanycal(result));
            Toast.fire({
                icon: 'info',
                title: '부서 일정'
              })
        } else {
        alert("조회에 실패했습니다."); }
    }
}

export const callCalendarInsertAPI = (form) => {
    const requestURL = `${PRE_URL}/calendar/insert`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : JSON.stringify(form)
        }).then((response) => response.json());
        
        if(result.status === 200){
            console.log("[CalendarAPICalls] callCalendarInsertAPI result : ", result);
            dispatch(postInsertcal(result));
        }
    };
};

export const callCalendarUpdateAPI = (form) => {
    const requestURL = `${PRE_URL}/calendar/update`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : JSON.stringify(form)
        }).then((response) => response.json());
        
        if(result.status === 200){
            console.log("[CalendarAPICalls] callCalendarUpdateAPI result : ", result);
            dispatch(postUpdatecal(result));
        }
    };
};

export const callCalendarDeleteAPI = (form) => {
    const requestURL = `${PRE_URL}/calendar/delete`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body : JSON.stringify(form)
        }).then((response) => response.json());
        
        if(result.status === 200){
            console.log("[CalendarAPICalls] callCalendarteAPI result : ", result);
            dispatch(postDeletecal(result));
        }
    };
};

export const callAllSchAPI = ({ currentPage = 1 }) =>
{
    const requestURL = `${PRE_URL}/calendar/findall?page=${currentPage}`;

    return async (dispatch,getState) => {
        const result = await fetch(requestURL).then(resp => resp.json());
        
        if(result.status === 200)
        {
            console.log("[callAllSchAPI] result : ", result);
            dispatch(getCalendar(result));
        }

    };
}