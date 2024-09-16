import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callEquipmentDetailAPI } from "../../apis/EquipmentAPICalls";
import EquipmentDetailItem from "./EquipmentDetailItem";
import EquipmentDetailCSS from "./EquipmentDetailCSS.css";
import PagingBar from "../../components/common/PagingBar";


function EquipmentDetail()
{
    const params = useParams();
    const navigate = useNavigate();
    const [equ , setEqu] = useState();
    const [pageInfo,setPageInfo] = useState({});
    const [currentPage , setCurrentPage] = useState(1);
    const dispatch = useDispatch();
    const data = useSelector((state) => state.equipmentReducer);
    const membersData = useSelector((state) => state.myPageReducer.membersData);
    const categoryCode = params.categoryCode;
    const equipment = data.detail;

    console.log('data :' , data)
    console.log("equipment",equipment)
    console.log("membersData", membersData);
    useEffect(
        () =>
        {
            dispatch(callEquipmentDetailAPI({categoryCode , currentPage}));
        },
        [currentPage]
    );

    useEffect(
        () =>
        {
            { equipment && setEqu(equipment.data[0]); }
            { equipment && setPageInfo(equipment.pageInfo)}
        },
        [data]
    );
    
    const onClickRegist = () =>
    {
        navigate('/equipment/regist');
    }

    const onClickModify = () =>
    {
        navigate('/equipment/modify');
    }
    
    const onClickEquipmentHandler = (equ) =>{
        setEqu(equ);
    }

    return(
        <div className="eDetail-Ref">
            <div className="equipmentInfo">
                { equ && <EquipmentDetailItem key={equ.equipmentCode} equ={equ}/>}
            </div>
            { membersData?.memberRole?.roleName === "ROLE_FACILITY" &&
                <div className="buttonInfo">
                    <button className="regist" onClick={ onClickRegist }>장비 추가</button>
                    <button className="modify" onClick={ onClickModify }>장비 수정</button>
                </div>
            }
            <div className="equipmentList">
                <table>
                    <thead>
                        <th> 장비 코드 </th>
                        <th> 장비 분류 </th>
                        <th> 장비 명 </th>
                        <th> 장비 상태 </th>
                        <th> 장비 등록 일 </th>
                        <th> 장비 상태 수정 일 </th>
                    </thead>
                    <tbody>
                        {  equipment?.data.map((equ) => (
                            <tr key={equ.equipmentCode}
                                onClick={ () => onClickEquipmentHandler(equ) }
                            >
                                <td>{ equ.equipmentCode }</td>
                                <td>{ equ.equCategory.equCategory.categoryName} <br/> { equ.equCategory.categoryName }</td>
                                <td>{ equ.equipmentName }</td>
                                <td>{ equ.equipmentStatus }</td>
                                <td>{ equ.equipmentCreateDate }</td>
                                <td>{ equ.equipmentModifyDate ? equ.equipmentModifyDate : '수정 시간이 존재 하지 않음' }</td>
                        </tr>
                        )) }
                    </tbody>
                </table>
                <div className="pagebar">
                    { equipment && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
                </div>
            </div>
        </div>
    );
}

export default EquipmentDetail;