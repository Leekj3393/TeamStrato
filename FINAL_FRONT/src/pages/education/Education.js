import { useNavigate } from 'react-router-dom';
import EducationCSS from './Education.css';
import { useEffect, useState } from 'react';
import EducationRegist from './EducationRegist';
import { useDispatch, useSelector } from 'react-redux';
import { callClassListAPI, callClassViewAPI } from '../../apis/EducationAPICalls';
import EducationListPagingBar from '../../components/common/EducationListPagingBar';
import { callMyPageMemberAPI } from '../../apis/MyPageAPICalls';

function Education () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { classList } = useSelector((state) => state.classReducer);
    const [EdumodalOpen, setEduModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    /* 로그인한 직원 정보 조회 */
    const { membersData } = useSelector(state => state.myPageReducer);

    useEffect(
        () => {
            dispatch(callClassListAPI({currentPage}));
        },
        [currentPage]
    )

    /* 로그인한 직원 정보 조회 */
    useEffect(() => {
        dispatch(callMyPageMemberAPI());
    }, []);

    /* 교육 등록 핸들러 */
    const onClickEduRegistHandler = (e) => {
        navigate(`/education/regist`);
    };

    /* 교육 등록 모달창  */
    const onClickOpenEduModal = () => {
        setEduModalOpen(true);
    };

    /* 안전 교육 리스트 이동 핸들러 */
    const onClickEduListSafeHandler = (e) => {
        navigate('/education/safety');
    };

    /* 직무 교육 리스트 이동 핸들러 */
    const onClickEduListDutyHandler = (e) => {
        navigate('/education/duty');
    };

    /* 기타 교육 리스트 이동 핸들러 */
    const onClickEduListOtherHandler = (e) => {
        navigate('/education/other');
    };

    return (
        <div className='eduBack'>
            <div className='eduList'>
                수강 교육 목록
            </div>
            <div className="eduListBox">
            {Array.isArray(classList?.data) && classList.data.map(Item => (
                <div className="eduListFlex" key={Item.classCode}>
                    <div className='eduTitle'>
                        <div>{Item.education.edName}</div>
                        <button 
                            className='eduStatus'
                            style={{ backgroundColor: Item.classStatus === "Y" ? "#FFD6D6" : "#D6EEFF" }}
                        >
                            {Item.classStatus === "Y" ? "완료" : "수강중"}
                        </button>
                    </div>
                    <div className='eduPer'>
                        <div >진도율(%) : 
                            <span style={{ color: Item.classPercent < 90 ? 'red' : 'green' }}>
                                {Item.classPercent}
                            </span>%
                        </div>
                        <div className='eduDate'>수강날짜 : {Item?.classEnd.split("T")[0]}</div>
                    </div>
                    <hr className='eduListHr'/>
                </div>
                ))} 
                <div>
                    {classList?.pageInfo && (
                        <EducationListPagingBar pageInfo={classList.pageInfo} setCurrentPage={setCurrentPage}/>
                    )}
                </div>  
            </div> 
            <div className='edListBt1'>
                <button onClick={onClickEduListSafeHandler}>안 전</button>
            </div>
            <div className='edListBt2'>
                <button onClick={onClickEduListDutyHandler}>직 무</button>
            </div>
            <div className='edListBt3'>
                <button onClick={onClickEduListOtherHandler}>기 타</button>
            </div>
            <div className="eduListRg">
                { membersData?.memberRole?.roleDes === '안전관리자' && <button onClick={onClickOpenEduModal}>교육 등록</button>}
                {EdumodalOpen && <EducationRegist setEduModalOpen={setEduModalOpen}/>}
            </div>
        </div>
    );
}

export default Education;