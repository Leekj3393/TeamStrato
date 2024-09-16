import { useEffect, useState } from "react";
import ModifyModalCSS from "./ModifyModalCSS.css";

function RepairModal({equipmentCode , equipmentName , setModalOpen , appType , setModalForm , setIsStatusClick})
{

    const [form , setFrom] = useState({equipmentCode , equipmentName});

    const onChangeHandler = (e) =>
    {
        setFrom({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }
    
    const onModelClick = () =>
    {
        setModalOpen(false);
    }

    const onClickSaveClickHandler = () =>
    {
        if(!form.appTitle || !form.appContent)
        {
            alert("정보를 모두 입력 해주세요 ");
            return;
        }
        alert(`${appType}이 완료되었습니다`);
        setModalForm({
            equipmentCode : equipmentCode,
            appTitle : form.appTitle,
            appContent : form.appContent,
            appType : appType
        });
        setIsStatusClick(false);
        setModalOpen(false);
    } 

    return(
        <div className="REF-div">
            <button className="ModelBtn" onClick={ onModelClick }>X</button>
            <table className="table-modal">
                <tbody className="tbody">
                    <tr className="text1">
                        <td><label>결제 구분</label></td>
                        <td><label>{appType}</label></td>
                    </tr>
                    <tr className="text2">
                        <td><label>장비 코드</label></td>
                        <td>
                            <label>{equipmentCode}</label>
                        </td>
                    </tr>
                    <tr className="text3">
                        <td><label>장비 명</label></td>
                        <td><label>{equipmentName}</label></td>
                    </tr>
                    <tr className="text4">
                        <td><label>결제 제목</label></td>
                        <td>
                            <input
                                type="text"
                                name="appTitle"
                                className="ModelappTitle"
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>
                    <tr className="text5">
                        <td><label>신청 사유</label></td>
                        <td>
                            <textarea 
                                name="appContent"
                                className="ModelappContent-text"
                                onChange={ onChangeHandler }
                            />
                        </td>
                    </tr>
                </tbody>
                <div className="BtnBox">
                    <button 
                        className="save"
                        onClick={ onClickSaveClickHandler }>저장하기</button>
                    <button 
                        className="back"
                        onClick={ onModelClick }>뒤로가기</button>
                </div>
            </table>
        </div>
    );
}

export default RepairModal;