import LoginCss from "../../components/login/Login.css";
import FindIdForm from "../../components/form/FindIdform";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetMember } from "../../modules/MemberModule";

function Login(){

    return(
        <div className="whiteBox">
            <div className="blueBox">
            <img className="stratoLogo" src="/image/SkyLift.png"></img>
            <img className="cloudImg" src="/image/cloud.png"></img>
            <img className="GroupwareImg" src="/image/GroupwareImg.png"></img>
            </div>
            <div className="loginForm">
                <FindIdForm/><br></br>
            </div>
        </div>
    );
};

export default Login;