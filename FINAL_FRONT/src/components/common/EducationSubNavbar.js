import { useState } from "react";
import { NavLink } from "react-router-dom";
import EduListCSS from './EducationSubNavbar.css';

function EducationSubNavbar() {

    const [activeMenu, setActiveMenu] = useState("");
    const [selectedMenu, setSelectedMenu] = useState('calendar');
    const handleClick = (menuName) => {
        setActiveMenu(menuName);
    };

    return (
        <div className="eduListDiv">
        <div className="eduListNavbar">
            <div className="eduListTitle">
                <div className="eduListNavbar-wrapper">
                <NavLink to="/education/safety">
                    <div className={`eduListNavbar ${activeMenu === "safety" ? "active" : ""}`} onClick={() => handleClick("safety")}>안전</div>
                </NavLink>
                <NavLink to="/education/duty">
                    <div className={`eduListNavbar ${activeMenu === "duty" ? "active" : ""}`} onClick={() => handleClick("duty")}>직무</div>
                </NavLink>
                <NavLink to="/education/other">
                    <div className={`eduListNavbar ${activeMenu === "other" ? "active" : ""}`} onClick={() => handleClick("other")}>기타</div>
                </NavLink>
                </div>
            </div>
        </div>
        </div>
    );
}

export default EducationSubNavbar;