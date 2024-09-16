import { Outlet, useLocation } from "react-router-dom";
import EquNavbar from "../components/common/EquNavbar";
import { useEffect, useState } from "react";

function EquipmentSubLayout() 
{

    const location = useLocation();
    
    return (
        <>
        {
            location &&
            <>
            <EquNavbar url={location.pathname}/>
            <Outlet/>
            </>
        }
        </>
    );
}

export default EquipmentSubLayout;