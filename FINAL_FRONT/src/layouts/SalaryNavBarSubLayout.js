import { Outlet } from "react-router-dom";
import SalaryNavBar from "../components/common/SalaryNavBar";


function SalaryNavBarSubLayout() 
{

    return (
        <>  
            <SalaryNavBar/>
            <Outlet/>
        </>
    );
}

export default SalaryNavBarSubLayout;