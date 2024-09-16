import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoginFormCss from "./Loginform.css";
import { callGetMemberAPI } from "../../apis/LoginAPICalls";
import { useNavigate, useParams } from "react-router-dom";

function FindIdForm() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { member } = useSelector(state => state.memberReducer);

    // 폼 데이터를 한 번에 변경 및 state 저장
    const[form, setForm] = useState({
        memberName: '',
        memberId: ''
    });
    console.log("form : ",form);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    /* 로그인 버튼 클릭 이벤트 */
    const onClickHandler = () => {
        dispatch(callGetMemberAPI(form));
    }

    const onClickGoBackHandler = () => {
        navigate('/login');
    }

    return (
        <>
            
            <input
                type="text"
                name="memberName"
                className="memberName"
                placeholder="이름"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <input
                type="text"
                name="residentNo"
                className="residentNo"
                placeholder="주민번호(-포함하여 입력)"
                autoComplete='off'
                onChange={ onChangeHandler }
            /><br></br>
            <br></br>
            <div className="idResult">입력하신 정보의 아이디는 <h3>{ member && <div>{ member.memberId }</div>}</h3> 입니다.</div>
            <button className="findIdFormBtn"
                onClick={ onClickHandler } 
            >
                Id 찾기
            </button>

            <button className="goBackBtn"
                onClick={ onClickGoBackHandler } 
            >
                뒤로가기
            </button>
        </>
            );
}

export default FindIdForm;
