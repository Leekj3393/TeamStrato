import LoginCss from "../../components/login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { resetMember } from "../../modules/MemberModule";
import FindPwdForm from "../../components/form/FindPwdform";

function FindPwd(){

    return(
        <div className="whiteBox">
            <div className="blueBox">
            <img className="stratoLogo" src="/image/SkyLift.png"></img>
            <img className="cloudImg" src="/image/cloud.png"></img>
            <img className="GroupwareImg" src="/image/GroupwareImg.png"></img>
            </div>
            <div className="loginForm">
                <FindPwdForm/><br></br>
            </div>
        </div>
    );
};

export default FindPwd;