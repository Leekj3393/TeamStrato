import { useEffect, useRef, useState } from "react";
import { callEmpSearch } from "../../../apis/SalaryAPICalls";
import { useDispatch, useSelector } from "react-redux";
import SalaryModal from "./SalaryModalCSS.css";
import { Navigate, useNavigate } from "react-router-dom";
import { getMember } from "../../../modules/SalaryModule";

function SalaryFindEmpModal({setIsModal , setForm})
{
    const disptch = useDispatch();
    const search = useRef();
    const {searchEmp} = useSelector((state) => state.SalaryReducer);
    const emp = searchEmp?.data;
    const regex = /[가-힣]/;

    let timer;
    const searchMember = () =>
    {
            if(timer)
                clearTimeout(timer);
            timer = setTimeout(function()
            {
                if(search.current)
                {
                    disptch(callEmpSearch(search.current.value))
                }
            },500);
    }

    useEffect(
        () =>
        {
            if(searchEmp?.status === 200)
            {
                search.current.value = null;
            }            
        },
        [searchEmp]
    )

    const onClikMemberHandler = (member) =>
    {
        disptch(getMember(member));
        setIsModal(false);
    }

    const onClickCancelHandler = () =>
    {
        setIsModal(false);
        search.current.value = null;
    }

    console.log("emp" , emp);
    return(
        <div className="salary-modal-back">
            <button onClick={onClickCancelHandler}>X</button>
            <div className='salary-modal-div'>
                <p className='modal-searchType'>이름</p>
                <input 
                    className='modal-searchValue'
                    type='text' placeholder='직원명'
                    ref={search}
                    onChange={(e) => {
                        if(regex.test(search.current.value))
                        {
                            searchMember();
                        }
                    }}
                />
            <table className='modal-saMember-Info'>
                <thead>
                    <th className='modal-saThCell'>사진</th>
                    <th className='modal-saThCell'>사번</th>
                    <th className='modal-saThCell'>이름</th>
                </thead>
                <tbody>
                    {emp && emp?.map((member) => (
                        <tr 
                            className='modal-member-Info' 
                            key={member.memberCode} 
                            onClick={() => onClikMemberHandler(member) }>
                            <td className='modal-saTdCell-image'><img
                                                                    className="modal-img" 
                                                                    src={member.files[0].filePath } 
                                                                    alt='당신의 얼굴입니다'/></td>
                            <td className='modal-saTdCell'><label>{member.memberCode}</label></td>
                            <td className='modal-saTdCell'><label>{member.memberName}</label></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default SalaryFindEmpModal;