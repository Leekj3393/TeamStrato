import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormCss from "./Loginform.css";
import { useNavigate, useParams } from "react-router-dom";
import { callUpdatePwdAPI } from "../../apis/LoginAPICalls";
import Swal from 'sweetalert2'; 

function UpdatePwdForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { updateOk } = useSelector(state => state.memberReducer);

    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        memberId: '',
        memberPwd: '',
        updatePwd: ''
    });

    useEffect(
        () => {

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

            if(updateOk?.status === 200) {
                            Toast.fire({
                icon: 'success',
                title: '비밀번호 수정이 완료되었습니다.'
              })
                navigate('/login', { replace : true });
            }
        },
        [updateOk]
    )


    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 버튼 클릭 이벤트 */
    const onClickChangePwdHandler = () => {
        dispatch(callUpdatePwdAPI(form));
    }

    const onClickGoBackHandler = () => {
        navigate('/login');
    }

    return (
        <>
            
            <input
                type="text"
                name="memberId"
                className="memberId"
                placeholder="Id(e-mail)"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <input
                type="text"
                name="memberPwd"
                className="memberPwd"
                placeholder="비밀번호"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <input
                type="text"
                name="updatePwd"
                className="updatePwd"
                placeholder="변경할 비밀번호"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <br></br>
            
            <button className="findIdFormBtn"
                onClick={ onClickChangePwdHandler } 
            >
                비밀번호 변경
            </button>
            

            <button className="goBackBtn"
                onClick={ onClickGoBackHandler } 
            >
                로그인 창으로
            </button>
        </>

            );
}
export default UpdatePwdForm;
