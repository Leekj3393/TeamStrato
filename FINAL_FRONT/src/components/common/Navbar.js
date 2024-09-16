import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import NavbarCSS from './Navbar.css';
import Main from '../../pages/Main';
import Calendar from "../../pages/calendar/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { callMyMemberImageAPI, callMyPageMemberAPI } from "../../apis/MyPageAPICalls";
function Navbar() {
  const [activeMenu, setActiveMenu] = useState("");

  const handleClick = (menuName) => {
    setActiveMenu(menuName);
  };

  const IMAGE_SERVER_URL = "http://localhost:8001/images/member/";

// ...
 
  const dispatch = useDispatch();
  const membersData = useSelector(state => state.myPageReducer.membersData);
  const getMemberImage = useSelector(state => state.myPageReducer.getMemberImage);
  console.log("회원 이미지:", getMemberImage);
  console.log("membersData", membersData);

  useEffect(() => {
    dispatch(callMyPageMemberAPI());
    dispatch(callMyMemberImageAPI());
  }, []);

  //
  function formatPhoneNumber(phone) {
    // '-'을 포함한 형식으로 변경
    const formattedPhone = phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    return formattedPhone;
  }
  

  return (
    <body>
      <div className={NavbarCSS}>
        <div className="mainProfil">
          <img className="logo1" src="/image/profileLogo.png" alt="로고" />
          {/* <div className="loginLogo">로그아웃</div> */}
          <div className="circle1"></div>
          <div className="circle2"></div>
          <div className="circle3"></div>
          <div className="nemo">

          <img className="memberNemo" src={`${IMAGE_SERVER_URL}${getMemberImage?.filePath}`} alt="멤버 이미지" />

 

          </div>
          <div className="memberName1">{membersData ? membersData.memberName : '직원 정보를 가져오는 중입니다.'}</div>
          <div className="memberName2">
            
          {membersData ? formatPhoneNumber(membersData.phone) : '직원 정보를 가져오는 중입니다.'}
            
            </div>
        </div>
          <div className="menu" style={{ marginTop: "-20px" }}>
          <NavLink to="/MyPage" activeClassName="active">
            <div className="myPage nav ">
              <img className="menuIcon navImg" src="/image/MyPage.png" alt="마이페이지 아이콘" />
              마이페이지
            </div>
        </NavLink>


        <NavLink to="/salary" activeClassName="active">
          <div className="salary nav"><img className="menuIcon navImg" src="/image/salary.png"></img>급여 내역</div>
        </NavLink>
        <NavLink to="/calendar" activeClassName="active">
          <div className="home nav"><img className="menuIcon navImg" src="/image/Cal.png"></img>일정</div>
        </NavLink>
        <NavLink to="/notice" activeClassName="active">
          <div className="home nav"><img className="menuIcon navImg" src="/image/Board.png"></img>공지사항</div>
        </NavLink>
        <NavLink to="/member" activeClassName="active">
          <div className="home nav"><img className="menuIcon navImg" src="/image/Member.png"></img>직원</div>
        </NavLink>
        <NavLink to="/equipment" activeClassName="active">
          <div className="manager nav"><img className="menuIcon navImg" src="/image/Management.png"></img>장비 & 리프트 관리</div>
        </NavLink>
        <NavLink to="/approval" activeClassName="active">
          <div className="home nav" ><img className="menuIcon navImg" src="/image/Auto.png"></img>전자 결재</div>
        </NavLink>
        <NavLink to="/education"  activeClassName="active" >
          <div className="home nav"><img className="menuIcon navImg" src="/image/Edu.png"></img>직원 교육</div>
        </NavLink>
      </div>
    </div>

    <div className="menu2">
      <div class="line"></div>
      <NavLink to="/">
        <img className="circle4" src="/image/circle.png"></img>
      </NavLink>
    </div>

    </body>
  );
}

export default Navbar;
