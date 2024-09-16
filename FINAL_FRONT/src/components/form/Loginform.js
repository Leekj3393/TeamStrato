import { useState } from "react";
import { useDispatch } from "react-redux";
import LoginFormCss from "./Loginform.css";
import { callLoginAPI } from "../../apis/LoginAPICalls";

function LoginForm() {

    const dispatch = useDispatch();

    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        memberId: '',
        memberPassword: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 로그인 버튼 클릭 이벤트 */
    const onClickHandler = () => {
        dispatch(callLoginAPI(form));
    }

    return (
        <>
            
            <input
                type="text"
                name="memberId"
                className="memberId"
                placeholder="아이디"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <input
                type="password"
                name="memberPwd"
                className="memberPwd"
                placeholder="패스워드"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <button className="loginFormBtn"
                onClick={ onClickHandler } 
            >
                Login
            </button>
        </>
            );
}

export default LoginForm;
