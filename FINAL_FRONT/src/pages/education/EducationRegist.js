import { useEffect, useRef, useState } from "react";
import edCSS from"./EducationRegist.module.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { callEducationRegistAPI } from "../../apis/EducationAPICalls";
import Swal from 'sweetalert2';

function EducationRegist({setEduModalOpen}) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const VideoInput = useRef();
    const [video, setVideo] = useState(null);
    const [videoUrl, setVideoUrl] = useState('');
    const [form, setForm] = useState({});
    const { eduAdd } = useSelector(state => state.educationReducer);

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

    /* 교육 등록  */
    useEffect(
        () => {
            if(eduAdd?.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: '교육 등록이 완료 되었습니다.'
                });
                navigate('/', {replace : true});
            } 
        },
        [eduAdd]
    )

    /* 동영상 등록 */
    useEffect(
        () => {
            if(video) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const {result} = e.target;
                    if(result) setVideoUrl(result);
                }
                fileReader.readAsDataURL(video);
            }
        },
        [video]
    )

    /* 모달창 끄기 */
    const onClickCloseEduModal = () => {
        setEduModalOpen(false);
    };

    /* 동영상 업로드 버튼 클릭 이벤트 */
    const onClickVideoUpload = () => {
        VideoInput.current.click();
    }

    /* 파일 첨부시 동작하는 이벤트 */
    const onChangeVideoUpload = (e) => {
        setVideo(e.target.files[0]);
    }

    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    const onClickEducationRegistHandler = () => {

        const formData = new FormData();
        formData.append("edName", form.edName);
        formData.append("edStatus", form.edStatus);
        formData.append("edType", form.edType);

        if(video) {
            formData.append("educationVideos", video);
        }

        dispatch(callEducationRegistAPI(formData));
    }

    return (
        <div className={edCSS.roleModal}>
            <div className={edCSS.roleModalContainer}>
                <div className={edCSS.roleModalDiv}>
                    <span>교육 등록</span>
                    <div className={edCSS.modalEduTitle}>
                        <label>교육 제목</label>
                        <input 
                            type="text" 
                            name="edName"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div>
                        <label>필수 여부</label>
                        <select value="" name="edStatus" onChange={onChangeHandler}>
                            <option vlaue="">선택해주세요</option>
                            <option value="Y">필수</option>
                            <option value="N">선택</option>
                        </select>
                    </div>
                    <div>
                        <label>교육 카테고리</label>
                        <select value="" name="edType" onChange={onChangeHandler}>
                            <option vlaue="">선택해주세요</option>
                            <option value="안전">안전</option>
                            <option value="직무">직무</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>
                    <div className={edCSS.modalEduVideo}>
                        {/* <label>영상첨부</label> */}
                        <input 
                            type="file" 
                            accept="video/mp4, video/mkv, video/x-m4v, video/*"
                            name="educationVideos"
                            ref={VideoInput}
                            onChange={onChangeVideoUpload}                           
                        />
                        <button
                            className={edCSS.modalVideoBt}
                            onClick={onClickVideoUpload}
                        >
                            동영상 첨부
                        </button>
                    </div>
                    <div className={edCSS.modalEduBt}>
                        <button onClick={onClickEducationRegistHandler}>등록</button>
                        <button onClick={onClickCloseEduModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EducationRegist;