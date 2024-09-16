import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callAllEquiments, callCategory, callDelete, callsearch } from "../../apis/EquipmentAPICalls";
import PagingBar from "../../components/common/PagingBar";
import EquipmentModifyDetail from "./EquipmentModifyDetail";
import EquipmentModifyCSS from './EquipmentModifyCSS.css';
import { useSearchParams } from "react-router-dom";
import Swal from 'sweetalert2';

function EquipmentModify()
{
    const dispatch = useDispatch();
    const [currentPage , setCurrentPage] = useState(1);
    const [equ , setEqu] = useState();
    const [checkedItems , setCheckedItems] = useState(new Array());
    const { equipments } = useSelector((state) => state.equipmentReducer);
    const { categorys } = useSelector((state) => state.equipmentReducer);
    const { modify } = useSelector((state) => state.equipmentReducer);
    const { Edelete } = useSelector((state) => state.equipmentReducer);
    const data = equipments?.data;
    const pageInfo = equipments?.pageInfo;

    const [searchParams] = useSearchParams();
    const type = searchParams.get('type');
    const value = searchParams.get('value');
    const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', () => Swal.stopTimer())
            toast.addEventListener('mouseleave', () => Swal.resumeTimer())
        }
      });


      useEffect(
        () =>
        {
            dispatch(callAllEquiments({currentPage}));
        },
        []
      )

    useEffect(
        () =>
        {
            if(type)
            {
                dispatch(callsearch({type , value , currentPage}))
            }
            else
            {
                dispatch(callAllEquiments({currentPage}));
            }
        },
        [currentPage , type , value]
    );

    useEffect(
        () =>
        {
            setEqu(data && data[0]);
        },
        [data]
    );

    useEffect(
        () =>
        {
            if(modify?.status === 200)
            {
                Toast.fire({
                    icon: 'success',
                    title: '수정 완료'
                });
                window.location.reload();
            }
            else if(Edelete?.status === 200)
            {
                Toast.fire({
                    icon: 'success',
                    title: '삭제 완료'
                });
                window.location.reload();
            }
        },
        [modify , Edelete]
    );

    const onClickEquipmentHandler = (equipment) =>
    {
        setEqu(equipment);
        dispatch(callCategory(equipment.equCategory.categoryCode));
    }

    const singleCheckHandler = (checked , code) =>
    {
        if(checked)
        {
            setCheckedItems(item => [...item , code]);
        }
        else
            setCheckedItems(checkedItems.filter((item) => item !== code));
    }

    const selectAllHandler = (checked) =>
    {
        if(checked)
        {
            const items = [];
            data.map((item) => items.push(item.equipmentCode));
            setCheckedItems(items);
        }
        else
            setCheckedItems([]);
    }

    const onDleteClickHandler = () =>
    {
        dispatch(callDelete(checkedItems))
    }

    console.log("CheckedItems : {} " , checkedItems);
    console.log("equipments : " , equipments);
    console.log("data : " , data?.length);
    console.log("equ : " , equ);
    console.log("categorys : " , categorys);

    return(
        <div className="MRef-div">
            <div className="ModifyInfo">
                { equ && <EquipmentModifyDetail key={equ.equipmentCode} equ={equ} category={categorys}/> }
            </div>
            <div className="div-talbe">
                <div className="btn">
                    <button className="deleteBtn" onClick={onDleteClickHandler} >삭제하기</button>
                </div>
                <table>
                    <thead>
                        <th><input type="checkbox" 
                                   className="all-selct"
                                   onChange={(e) => selectAllHandler(e.target.checked)}
                                   checked={checkedItems.length === data?.length ? true : false}></input></th>
                        <th>장비 코드</th>
                        <th>장비 분류</th>
                        <th>장비 명</th>
                        <th>장비 상태</th>
                        <th>장비 등록 일</th>
                        <th>장비 상태 수정일</th>
                    </thead>
                    <tbody>
                        {data &&
                            data.map((equipment) =>
                                <tr key={equipment.equipmentCode}
                                    onClick={ () => onClickEquipmentHandler(equipment) }>
                                    <td><input type="checkBox"
                                                className="equipment-selectBox"
                                                name={equipment.equipmentCode}
                                                onChange={(e) => singleCheckHandler(e.target.checked ,equipment.equipmentCode)}
                                                checked={checkedItems.includes(equipment.equipmentCode) ? true : false}/></td>
                                    <td>{equipment.equipmentCode}</td>
                                    <td>{equipment.equCategory.equCategory.categoryName} <br/> { equipment.equCategory.categoryName }</td>
                                    <td>{equipment.equipmentName}</td>
                                    <td>{equipment.equipmentStatus}</td>
                                    <td>{equipment.equipmentCreateDate}</td>
                                    <td>{equipment.equipmentModifyDate ? equipment.equipmentModifyDate :'수정 시간이 존재 하지 않음'}</td>
                                </tr>
                            )}
                    </tbody>
                </table>
            </div>
            <div className="pagInfo">
                { pageInfo && <PagingBar pageInfo={pageInfo} setCurrentPage={setCurrentPage}/> }
            </div>
        </div>
    );
}

export default EquipmentModify;