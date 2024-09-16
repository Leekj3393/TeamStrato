import { useNavigate } from 'react-router-dom';
import EduPhotoCSS from './EducationPhoto.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callEducationPhotoListAPI } from '../../apis/EducationAPICalls';
import EducationPhotoRegist from './EducationPhotoRegist';
import PagingBar from '../../components/common/EducationPagingBar';
import { callMyPageMemberAPI } from '../../apis/MyPageAPICalls';

function EducationPhoto() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [photoModalOpen, setPhotoModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { eduPhoto } = useSelector((state) => state.educationReducer);
    const serverUrl = "http://localhost:8001/images/education/";

    /* 로그인한 직원 정보 조회 */
    const { membersData } = useSelector(state => state.myPageReducer);

    useEffect(
        () => {
            dispatch(callEducationPhotoListAPI({currentPage}));
        },
        [currentPage]
    )

    /* 로그인한 직원 정보 조회 */
    useEffect(() => {
        dispatch(callMyPageMemberAPI());
    }, []);
    
    /* 사진 등록 모달창  */
    const onClickOpenPhotoModal = () => {
        setPhotoModalOpen(true);
    };

    /* 파일 이름 수정 함수 */
    function getFileName(fileName) {
        const fixFileName = fileName.split('^');
        return fixFileName[0];
    }

    return (
        <div className={EduPhotoCSS.back}>      
            <div className={EduPhotoCSS.title}>
                교육사진
            </div>
            <div className={EduPhotoCSS.registBt}>
                { membersData?.memberRole?.roleDes === '안전관리자' && <a onClick={onClickOpenPhotoModal}>사진 등록</a> }
                {photoModalOpen && <EducationPhotoRegist setPhotoModalOpen={setPhotoModalOpen}/>}
            </div>
            <div className={EduPhotoCSS.flexDiv}>
            {Array.isArray(eduPhoto?.data) && eduPhoto.data.map(photo => (
            <div 
                className={EduPhotoCSS.div}
                key={photo.fileCode}
            >
                <div className={EduPhotoCSS.felx}>
                    <div className={EduPhotoCSS.ImgDiv}>
                        <div className={EduPhotoCSS.Image}>
                            <img src={serverUrl + photo.filePath}/>
                        </div>
                        <span className={EduPhotoCSS.spanDiv}>{getFileName(photo.fileName)}</span>
                    </div>
                </div>
            </div>
            ))}
            </div>
            <div className={EduPhotoCSS.pagingBar}>  
                {eduPhoto?.pageInfo && (
                    <PagingBar pageInfo={ eduPhoto?.pageInfo } setCurrentPage={setCurrentPage}/>
                )}           
            </div>       
        </div>
    );
}

export default EducationPhoto;