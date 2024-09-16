import { Navigate } from "react-router-dom";
import { isAdmin, isFacilty, isFaciltyCheck, isHr, isLogin, isNotice, isPay, isSafety } from "../../utils/TokenUtils";

function ProtectedRoute({ loginCheck, authCheck, children, hrCheck, safetyCheck , faciltyCheck , payCheck , noticeCheck}) {

    /* 직원 등록 */
    if(hrCheck) {
        return isHr() ? children : <Navigate to ="/member"/>
    }

    /* 직원 수정 */
    if(hrCheck) {
        return isHr() ? children : <Navigate to ="/member"/>
    }

    /* 직원 권한 수정 */
    if(hrCheck) {
        return isHr() ? children : <Navigate to ="/member/updaterole"/>
    }

    /* 직원 인사이동 */
    if(hrCheck) {
        return isHr() ? children : <Navigate to ="/member/updateRequest"/>
    }

    /* 교육 등록 */
    if(safetyCheck) {
        return isSafety() ? children : <Navigate to ="/education/add"/>
    }

    /* 교육 사진 등록 */
    if(safetyCheck) {
        return isSafety() ? children : <Navigate to ="/education/photoRegist"/>
    }

    if(faciltyCheck)
    {
        return isFacilty() ? children : <Navigate to="/equipment"/>
    }

    if(payCheck)
    {
        return isPay() ? children : <Navigate to="/salary"/>
    }

    if(noticeCheck)
    {
        return isNotice() ? children : <Navigate to="/notice"/>
    }

    if(authCheck) {
        // 권한 없이 접근 불가 기능 -> props로 authCheck 값을 true로 전달
        return isAdmin() ? children : <Navigate to="/"/>
    }

    if(loginCheck) {
        // 로그인 해야만 볼 수 있는 기능 -> props로 loginCheck값을 true로 전달
        return isLogin() ? children : <Navigate to="/login"/>
    } else {
        // 로그인 시 접근 불가 기능 (ex. 로그인, 회원가입) -> props로 loginCheck값을 false로 전달
        return !isLogin() ? children : <Navigate to="/"/>
    }

}

export default ProtectedRoute;