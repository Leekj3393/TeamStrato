import { useNavigate } from 'react-router-dom';
import EduCSS from './EducationPhotoRegist.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { callEducationPhotoInsertAPI } from '../../apis/EducationAPICalls';
import Swal from 'sweetalert2';

function EducationPhotoRegist({setPhotoModalOpen}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const { eduPhotoAdd } = useSelector(state => state.educationReducer);
    const [form, setForm] = useState({});

    /* 알러트창 세팅 */
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
      })

    useEffect(
        () => {
            if(eduPhotoAdd?.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: '사진 등록이 완료 되었습니다.'
                });
                navigate('/', {replace : true});
            }
        },
        [eduPhotoAdd]
    );

    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 파일 첨부시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    /* 서버로 전달할 FormData 형태의 객체 설정 */
    const onClickEducationPhotoRegistHandler = () => {
        const formData = new FormData();
            formData.append("fileTitle", form.fileTitle)
            if(image) {
                formData.append("educationImage", image);
            }  
            
            dispatch(callEducationPhotoInsertAPI(formData)); 
    }

    return (
        <div className={EduCSS.roleModal}>
            <div className={EduCSS.roleModalContainer}>
                <div className={EduCSS.roleModalDiv}>
                    <span>사진 등록</span>
                    <div className={EduCSS.Title}>
                        <label>사진 제목</label>
                        <input
                            type="text"
                            name="fileTitle"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className={EduCSS.file}>
                        <label>파일 첨부</label>
                        <input
                            type="file"
                            name="educationImage"
                            accept='image/jpg,image/png,image/jpeg,image/gif'
                            onChange={onChangeImageUpload}
                        />
                    </div>
                    <div className={EduCSS.modalPhotoBt}>
                        <button onClick={ onClickEducationPhotoRegistHandler }>등록</button>
                        <button onClick={() => navigate(0)}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationPhotoRegist;