import { Outlet } from "react-router";
import EducationSubNavbar from "../components/common/EducationSubNavbar";

function EducationListSubLayout() {

    return (
        <div>
            <EducationSubNavbar/> 
            <Outlet/>
        </div>
    );
}

export default EducationListSubLayout;