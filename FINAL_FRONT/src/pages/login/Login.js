import LoginCss from "../../components/login/Login.css";
import LoginForm from "../../components/form/Loginform";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetMember } from "../../modules/MemberModule";

function Login(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* API 요청을 통해 반환 된 로그인 결과 값 */
    const { login } = useSelector(state => state.memberReducer);

    useEffect(
        () => {
            if(login?.status === 200){
                navigate("/", { replace : true });
                dispatch(resetMember());
            } else if(login?.state === 400){
                alert(login.message);
                dispatch(resetMember());
            }
        },
        [login]
    )

    const onClickFindIdHandler = () => {
        navigate('/login/findid');
    }

    const onClickFindPwdHandler = () => {
        navigate('/login/findpwd');
    }


    return(
        <div className="whiteBox">
            <div className="blueBox">
            <img className="stratoLogo" src="/image/SkyLift.png"></img>
            <img className="cloudImg" src="/image/cloud.png"></img>
            <img className="GroupwareImg" src="/image/GroupwareImg.png"></img>
            </div>
            <div className="loginForm">
                <LoginForm/><br></br>
                <button 
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '20px', marginLeft: '33%',
                                marginTop: '5%', width: '15%', backgroundColor: "white"} }
                    onClick={ onClickFindIdHandler }
                >
                    Id 찾기
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '20px', width: '15%',marginLeft: '5%',
                                backgroundColor: "white"} }
                    onClick={ onClickFindPwdHandler }
                >
                    Pwd 찾기
                </button>
            </div>
        </div>
    );
};

export default Login;