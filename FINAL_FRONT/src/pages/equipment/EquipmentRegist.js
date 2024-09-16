import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { callEquipmentCategory, callEquipmentRegist } from "../../apis/EquipmentAPICalls";
import { useNavigate } from "react-router-dom";
import EquipmentRegsitCSS from "./EquipmentRegistCSS.css";
import Swal from 'sweetalert2';
function EquipmentRegist()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const imageInput = useRef();
    const [imgUrl , setImageUrl] = useState();
    const [image , setImage] = useState();
    const data = useSelector(state => state.equipmentReducer);
    const category = data.category;
    const { regist } = useSelector(state => state.equipmentReducer);
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

    const [equipment , setEquipment] = useState({});

    useEffect(
        () =>
        {
            dispatch(callEquipmentCategory());
        },
        []
    );

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

    useEffect(
        () =>
        {
            if(regist?.status === 200)
            {
                Toast.fire({
                    icon: 'success',
                    title: '장비 추가요청 완료'
                });
                navigate('/equipment' , {replace : true});
            }
        },
        [regist]
    );

    console.log("regist " , regist);
    
    const onClickImageUpload = () =>
    {
        imageInput.current.click();
    }


    const onChangeImageUpload = (e) =>
    {
        console.log("이미지 : ", e.target.files);
        setImage(e.target.files[0]);
    }

    const onChangeHandler = (e) =>
    {
        console.log(`${e.target.name} : `, e.target.value );
        setEquipment({
            ...equipment,
            [e.target.name] : [e.target.value]
        });
        console.log("equipment : " , equipment);
    }

    const onClickEquipmentRegistHandler = () =>
    {

        if(!equipment.equipmentName || !equipment.categoryCode || !equipment.appTitle || !equipment.appContent || !image )
        {
            Toast.fire({
                icon: 'error',
                title: '모든 정보를 입력해주세요'
            });
            return;
        }
        const formData = new FormData();
        formData.append("equipmentName",equipment.equipmentName);
        formData.append("equCategory.categoryCode",equipment.categoryCode);
        formData.append("appTitle",equipment.appTitle);
        formData.append("appContent",equipment.appContent);
        formData.append("appType","장비추가");
        formData.append("image",image);

        dispatch(callEquipmentRegist(formData));
    }

    console.log("category :", category);
    
    return(
        <div className="Ref-div">
               <div className="image-div">
                    <div className="imageBox">
                        { imgUrl && <img alt="미리보기입니당" src={ imgUrl } className="image"/>}
                    </div>
                    <input 
                        className="inputImg"
                        type="file" 
                        name="equipmentImage" 
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={ imageInput }
                        onChange={ onChangeImageUpload }
                    />
                    <button
                        className="filebtn"
                        onClick={onClickImageUpload}
                        >
                            이미지 업로드
                        </button>
                 </div>
            <div className="inputText">
                <table>
                    <tbody>
                        <tr>
                            <td><label>결제 구분</label></td>
                            <td>
                                <span>장비</span>
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 명</label></td>
                            <td>
                                <input
                                    name='equipmentName'
                                    placeholder='추가할 장비의 이름 입력'
                                    className="equipmentName"
                                    onChange={ onChangeHandler }/>
                            </td>
                        </tr>
                        <tr>
                            <td><label>장비 분류</label></td>
                            <select
                                className="select-box"
                                name="categoryCode"
                                onChange={ onChangeHandler }
                                >
                                    {category && category.map((c) =>( 
                                        <option value={ c.categoryCode }>{c.equCategory.categoryName} - {c.categoryName}</option>)
                                    )}
                                </select>
                        </tr>
                        <tr>
                            <td><label>결제 제목</label></td>
                            <input
                                type="text"
                                name="appTitle"
                                className="appTitle"
                                onChange={ onChangeHandler }
                            />
                        </tr>
                        <tr className="appContent">
                            <td><label>결제 내용</label></td>
                            <textarea 
                                name="appContent"
                                className="appContent-text"
                                onChange={ onChangeHandler }
                            />
                        </tr>
                    </tbody>
                </table>
                <div className="buttons">
                <button className="form" onClick={ onClickEquipmentRegistHandler }>
                    저장하기
                </button>
                <button className="back" onClick={ () => navigate(-1)}>
                    돌아가기
                </button>
                </div>                           
            </div>

        
        </div>
    );
}

export default EquipmentRegist;