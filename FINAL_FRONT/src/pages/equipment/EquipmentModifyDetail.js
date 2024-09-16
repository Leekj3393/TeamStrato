import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModifyModal from "./Modal/ModifyModal";
import { callApprovalEquipment, callModifyEquipment } from "../../apis/EquipmentAPICalls";
import EquipmentModifyDetailCSS from './EquipmentModifyDetailCSS.css';


function EquipmentModifyDetail({equ : {  file , equipmentCode , equipmentName , equCategory , equipmentStatus } , category})
{
    const dispatch = useDispatch();
    const [modifyMode , setModifyMode] = useState(false);
    const imageInput = useRef();
    const [image , setImage] = useState(null);
    const [imageUrl , setImageUrl] = useState();
    const [form , setForm] = useState({});
    const [modalForm , setModalForm] = useState({});

    const [isStatusClick , setIsStatusClick] = useState(false);
    const [modalOpen , setModalOpen] = useState(false);
    const [appType , setAppType] = useState(" ");
    
    useEffect(
        () =>
        {
            if(image)
            {
                const fileReader = new FileReader();
                fileReader.onload = (e) =>
                {
                    const {result} = e.target;
                    if(result)
                    setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }
        },
        [image]
    );

    const onChangeImageHandler = (e) =>
    {
        setImage(e.target.files[0]);
    }

    const onClickImageBtnHandler = () =>
    {
        imageInput.current.click();
    }

    const onClickModifyBtnHandler = () =>
    {
        if(modifyMode)
        {
            setModifyMode(false);
            setIsStatusClick(false);
        }
        else
        {
            setModifyMode(true);
            setIsStatusClick(true);
        }
    }

    const onChageHandler = (e) =>
    {
        setForm({
            ...form,
            [e.target.name] : [e.target.value]
        });
    }

    const onChageStatusHandler = (e) =>
    {
        if(e.target.value === 'wait' && equipmentStatus != e.target.value)
        {
            setAppType(e.target.value);
            setModalOpen(true);
            setForm({
                ...form,
                [e.target.name] : [e.target.value]
            });
        }
        else
        {
            setForm({
                ...form,
                [e.target.name] : [e.target.value]
            });
        }

    }

    const onClickCancellationHandler = () =>
    {
        setForm({});
        setModalForm({});
        setIsStatusClick(false);
        setModifyMode(false);
    }

    const onClickSaveHandler = () =>
    {
        const modifyEquipment = new FormData();
        if(!form.equipmentName)
            modifyEquipment.append("equipmentName",equipmentName);
        else
            modifyEquipment.append("equipmentName",form.equipmentName);       
        if(!form.categoryCode)
            modifyEquipment.append("equCategory.categoryCode",equCategory.categoryCode);
        else
            modifyEquipment.append("equCategory.categoryCode",form.categoryCode);
        if(!form.equipmentStatus)
            modifyEquipment.append("equipmentStatus",equipmentStatus);
        else
            modifyEquipment.append("equipmentStatus",form.equipmentStatus);

        if(image)
        {
            modifyEquipment.append("equipmentImage",image);
        }

        console.log("form : {} " , form );

        modifyEquipment.append("equipmentCode",equipmentCode);
        dispatch(callModifyEquipment(modifyEquipment));

        if(modalForm.appTitle)
        {
            const approvalFormData = new FormData();
            approvalFormData.append("appContent",modalForm.appContent);
            approvalFormData.append("appTitle",modalForm.appTitle);
            approvalFormData.append("appType",modalForm.appType);
            approvalFormData.append("equipmentCode",modalForm.equipmentCode);
            dispatch(callApprovalEquipment(approvalFormData));
        }
    }
    
    console.log("equipmentStatus : {} " , equipmentStatus);
    console.log("form.equipmentStatus : {} " , form.equipmentStatus);
    console.log("modalForm : {}" , modalForm);
    console.log("form" , form);
    console.log("file : " , file);
    return(
        <div className="itemDiv">
            { modalOpen &&
                <div className="ModifyModal">
                    <ModifyModal equipmentCode={equipmentCode}
                                 equipmentName={equipmentName}
                                 setModalOpen={setModalOpen}
                                 appType={appType}
                                 setModalForm={setModalForm}
                                 setIsStatusClick={setIsStatusClick}
                    />
                </div>
            }
            <div className="button-box">
                {!modifyMode && <button onClick={ onClickModifyBtnHandler } className="modifyBtn">수정하기</button>}
                {modifyMode && <button onClick={ onClickSaveHandler } className="saveBtn">저장하기</button>}
                {modifyMode && <button onClick={ onClickCancellationHandler } className="cancelBtn">취소</button>}
            </div>
            <div className="image-box">
                <img  
                    src={ !imageUrl ? file.filePath : imageUrl}
                    alt="미리보기"
                />
                <input 
                    className="imageInput"
                    type="file"
                    accept='image/jpg,image/png,image/jpeg,image/gif'
                    ref={ imageInput }
                    onChange={ onChangeImageHandler }
                />
                <button
                    className="imgBtn"
                    onClick={ onClickImageBtnHandler }
                    disabled={ !modifyMode }
                >이미지 업로드</button>
            </div>
            <div className="TextInfo">
                <table>
                    <tbody>
                        <tr>
                            <td><label>장비 코드</label></td>
                            <td>
                                <span>{equipmentCode}</span>
                            </td>
                            <td><label>장비 명</label></td>
                            <td>
                                <input
                                    name="equipmentName"
                                    placeholder="장비 명"
                                    className="equipmentInput-Info"
                                    value={ !modifyMode ? equipmentName : form.equipmentName}
                                    readOnly={ !modifyMode }
                                    onChange={ onChageHandler }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 분류</label></td>
                            <td>
                                { !modifyMode &&
                                   <span>{equCategory.equCategory.categoryName} - {equCategory.categoryName}</span> 
                                }
                                { modifyMode &&
                                    <select
                                        name="categoryCode"
                                        className="categorySelect-box"
                                        onChange={ onChageHandler}
                                        value={form.categoryCode ? form.categoryCode : equCategory.categoryCode }>
                                            <option value={equCategory.categoryCode}>{equCategory.equCategory.categoryName} - {equCategory.categoryName}</option>
                                            {category && category.map((c) => (
                                                <option key={c.categoryCode} value={ c.categoryCode }>{c.equCategory.categoryName} - {c.categoryName}</option>
                                            ))}
                                    </select>
                                }
                            </td>
                            <td><label>장비 상태</label></td>
                            <td>
                                { !isStatusClick &&
                                    <span>{form?.equipmentStatus ? form.equipmentStatus : equipmentStatus}</span>
                                }
                                { isStatusClick && equipmentStatus !== '운영가능' &&
                                    <span>{form?.equipmentStatus ? form.equipmentStatus : equipmentStatus}</span>
                                }
                                { isStatusClick && equipmentStatus === '운영가능'  &&
                                    <select
                                        name="equipmentStatus"
                                        className="Mselect-box"
                                        onChange={ onChageStatusHandler  }
                                        value={ form?.equipmentStatus ? form.equipmentStatus : equipmentStatus }>
                                            <option value="운영가능">운영가능</option>
                                            <option value="wait">수리요청</option>
                                            <option value="wait">폐기요청</option>
                                    </select>
                                }
                            </td>                 
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default EquipmentModifyDetail;