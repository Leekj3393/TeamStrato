import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";


function SalaryNavBar()
{
    const [activeMenu, setActiveMenu] = useState("salary"); // Set initial value to "myPage"
    const membersData = useSelector((state) => state.myPageReducer.membersData);
    const handleClick = (menuName) => {
      setActiveMenu(menuName);
    };
  
    
    return (
      <div>
        <div className="title1">
          <div className="title2">
            <b>마이페이지</b>
          </div>
          <div className="navbar2-wrapper">
            <NavLink to="/salary">
              <div className={`navbar2 ${activeMenu === "salary" ? "active" : ""}`} onClick={() => handleClick("salary")}>급여 명세서</div>
            </NavLink>
            { membersData?.memberRole?.roleName === "ROLE_PAYROLL" &&
            <NavLink to="/salary/regist">
              <div className={`navbar2 ${activeMenu === "regist" ? "active" : ""}`} onClick={() => handleClick("regist")}>급여명세서 추가</div>
            </NavLink>
            }
          </div>
          <hr />
        </div>
      </div>
    );
}

export default SalaryNavBar;
