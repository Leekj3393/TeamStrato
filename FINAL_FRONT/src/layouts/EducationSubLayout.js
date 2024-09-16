import { Outlet } from "react-router-dom";
import EducationNavbar from "../components/common/EducationNavbar";

function EducationSubLayout() {

    return (
        <>
            <EducationNavbar/>
            <Outlet/>
        </>
    );
}

export default EducationSubLayout;