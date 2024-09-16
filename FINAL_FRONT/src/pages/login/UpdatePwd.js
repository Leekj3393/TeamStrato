import LoginCss from "../../components/login/Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UpdatePwdForm from "../../components/form/UpdatePwdform";


function UpdatePwd(){

    return(
        <div className="whiteBox">
            <div className="blueBox">
            <img className="stratoLogo" src="/image/SkyLift.png"></img>
            <img className="cloudImg" src="/image/cloud.png"></img>
            <img className="GroupwareImg" src="/image/GroupwareImg.png"></img>
            </div>
            <div className="loginForm">
                <UpdatePwdForm/><br></br>
            </div>
        </div>
    );
};

export default UpdatePwd;