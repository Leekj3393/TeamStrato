import { useNavigate } from "react-router-dom";
import { postMail } from "../modules/MailModule";
import Swal from 'sweetalert2';

const SERVER_IP = `${process.env.REACT_APP_RESTAPI_SERVER_IP}`;
const SERVER_PORT = `${process.env.REACT_APP_RESTAPI_SERVER_PORT}`;
const PRE_URL = `http://${SERVER_IP}:${SERVER_PORT}`;


export const callMailAPI = (form) => {

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

    console.log('callMailAPI form', form);

    const requestURL = `${PRE_URL}/auth/send`;

    return async (dispatch, getState) => {

        const result = await fetch(requestURL, {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(form)
        })
        .then(response => response.json());

        console.log('[MaillAPICalls] callMAilAPI result : ', result);

        if(result.status === 200){
            dispatch(postMail(result));
            
        } else {
            Toast.fire({
                icon: 'error',
                title: '입력하신 정보가 잘못되었습니다.'
              }) }
    }
}
