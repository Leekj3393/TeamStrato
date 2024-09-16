import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import MemberDetailCSS from './MemberDetail.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callMemberDetailAPI } from '../../apis/MemberAPICalls';
import { callMemberImageAPI } from '../../apis/MemberFileAPICalls';
import MemberRole from './MemberRole';
import MemberRequest from './MemberRequest';
import { callMyPageMemberAPI } from '../../apis/MyPageAPICalls';
import MemberDelete from './MemberDelete';


function MemberDetail () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { memberDt } = useSelector(state => state.memberReducer);
    const { memberImg } = useSelector(state => state.memberFileReducer);
    const params = useParams();
    const memberCode = params.memberCode;
    const serverUrl = "http://localhost:8001/images/member/"
    const [RolemodalOpen, setRoleModalOpen] = useState(false);
    const [reqeustModalOpen, setRequestModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    /* 로그인한 직원 정보 조회 */
    const { membersData } = useSelector(state => state.myPageReducer);

    useEffect(
        () => {
            dispatch(callMemberDetailAPI({memberCode}));
            dispatch(callMemberImageAPI({memberCode}));
        },
        []
    );

    /* 로그인한 직원 정보 조회 */
    useEffect(() => {
        dispatch(callMyPageMemberAPI());
    }, []);

    const onClickMemberModify = () => {
        navigate(`/member/modify/${memberCode}`);
    };

    const onClickOpenRoleModal = () => {
        setRoleModalOpen(true);
    };

    const onClickOpenRequestModal = () => {
        setRequestModalOpen(true);
    };

    const onClickOpenDeleteModal = () => {
        setDeleteModalOpen(true);
    };

    return (
        <>  
            <div className="memberDtTitle">
                직원 상세조회
            </div>
            <div className='memberHr'>
                <hr/>
            </div>
            <div className='memberDiv'>
            <div className="memberDtBack">
            <div className="memberImageDiv">
                <img className="memberImagePreview" src={ serverUrl + memberImg?.filePath } alt="preview"></img>
            </div>
            <div className="memberDtTop">
                <span className='memberDtName'>
                    { memberDt && memberDt.memberName }
                </span>
                { membersData?.memberRole?.roleDes === '인사관리자' && <button className='memberDtBt1' onClick={onClickOpenRoleModal}>권한</button> }
                {RolemodalOpen && <MemberRole memberCode={memberCode} setRoleModalOpen={setRoleModalOpen}/>}
                { membersData?.memberRole?.roleDes === '인사관리자' && <button className='memberDtBt2' onClick={onClickOpenRequestModal}>인사이동</button> }
                {reqeustModalOpen && <MemberRequest memberCode={memberCode} setRequestModalOpen={setRequestModalOpen}/>}
                { membersData?.memberRole?.roleDes === '인사관리자' && <button className='memberDtBt3' onClick={onClickMemberModify}>수정하기</button> }
                { membersData?.memberRole?.roleDes === '인사관리자' && <button className="memberDtBt4" onClick={onClickOpenDeleteModal}>삭제</button>}
                { deleteModalOpen && <MemberDelete membercode={memberCode} setDeleteModalOpen={setDeleteModalOpen}/>}
            </div>
            <div className='memberDtDpt'>
                <span className="memberDptName">부서</span>
                <span className="memberDptDes">
                    { memberDt && memberDt.department?.deptName }
                </span>
            </div>
            <div className='memberDtJob'>
                <span className='memberJobName'>직책</span>
                <span className='memberJobDes'>
                    { memberDt && memberDt.job?.jobName }
                </span>
            </div>
            <div className="memberDtHr1">
                <hr/>
            </div>
            <div className="memberDtEmp">
                <div className='memberEmpTitle'>인사정보</div>
                <div className="memberEmpDiv">
                    <span >사번</span>
                    <span className='memberEmpDiv2'>
                        { memberDt && memberDt.memberCode }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>입사일</span>
                    <span className='memberEmpDiv3'>
                        { memberDt && new Date(memberDt.memberHireDate).toLocaleDateString().slice(0, -1)}
                    </span>
                </div>
            </div>
            <div className="memberDtHr2">
                <hr/>
            </div>
            <div className="memberDtPer">
                <div className='memberEmpTitle'>개인정보</div>
                <div className='memberDtPhone'>
                    <span >전화번호</span>
                    <span className='memberEmpDiv4'>
                        { memberDt && memberDt.phone }
                    </span>
                </div>
                <div className="memberDtEmail">
                <span>이메일</span>
                <span className='memberEmpDiv5'>
                    { memberDt && memberDt.memberId }
                </span>
                </div>
                <div className="memberEmpDiv">
                    <span>성별</span>
                    <span className='memberEmpDiv6'>
                        { memberDt && memberDt.gender === 'M' ? '남자' : '여자' }
                    </span>
                </div>
                <div className="memberEmpDiv">
                    <span>주소</span>
                    <span className='memberEmpDiv7'>
                        { memberDt && memberDt.address }
                    </span>
                </div>
            </div>
            </div>
            </div>
        </>
    );
}

export default MemberDetail;