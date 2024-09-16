import { useNavigate, useParams } from 'react-router-dom';
import ApprovalCSS from './Approval.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { callApprovalRegistAPI, callApprovalMemberInfoAPI } from '../../apis/ApprovalAPICalls';
import Swal from 'sweetalert2';

function ApprovalRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {memberCode} = useParams();
    const [form, setForm] = useState({member: memberCode});
    const {regist, appMember} = useSelector(state => state.approvalReducer);

    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

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
        () => {
            dispatch(callApprovalMemberInfoAPI());
        }, []
    );

    useEffect(
        () => {
            if(regist?.status === 200) {
            Toast.fire({
                icon: 'success',
                title: '결재선 선택 페이지로 이동합니다.'
            })
                navigate("/approval/appline", {replace: true});
            }
        },
        [regist]
    );

    const onChangeHandler = (e) => {
        if(e.target.name === 'appStatus' || e.target.name === 'appType' && e.target.checked) {
            setForm({
                ...form,
                appStatus: 'wait',
                appType: '기안문'
            });
        } else {setForm({
            ...form,
            [e.target.name]: e.target.value,
          });
        }
    };

    const onClickRegistHandler = () => {
        if(
            !form.appTitle || !form.appContent || !form.appType || !form.appStatus
        ) {
            if(!form.appTitle) {
                Toast.fire({
                    icon: 'error',
                    title: '제목을 작성해주세요.'
                })
                return;
            } else if(!form.appContent) {
                Toast.fire({
                    icon: 'error',
                    title: '내용을 작성해주세요.'
                })
                return;
            }  else if(!form.appType) {
                Toast.fire({
                    icon: 'error',
                    title: '구분 및 기안상태 항목을 체크해주세요'
                })
                return;
            } else {
                Toast.fire({
                    icon: 'error',
                    title: '구분 및 기안상태 항목을 체크해주세요'
                })
                return;
            }
        }
         dispatch(callApprovalRegistAPI(form));
    };
    const onClickResetHandler = () => {
        Toast.fire({
            icon: 'info',
            title: '기안 작성을 취소합니다. 결재 메인페이지로 이동합니다.'
        })
        navigate("/approval", {replace: true})
    };

    return (
        <div className={ApprovalCSS}>
            <div className={ApprovalCSS.square}></div>
            <div className={ApprovalCSS.appContentDiv}>
                <div className={ApprovalCSS.flowInfo}>
                    <b>기안문 작성</b> &gt; 결재선 선택 &gt; 결재 요청
                </div>
                <div className={ApprovalCSS.appFormDiv}>
                    <table>
                        <tbody>
                            <tr>
                                <th>기안자</th>
                                <td name='memberCode' onChange={onChangeHandler}>{appMember && appMember.memberName}</td>
                                <th>부서</th>
                                <td name='deptCode'>{appMember && appMember.department.deptName}</td>
                            </tr>
                            <tr>
                                <th>구분</th>
                                <td><label htmlFor='appType'>
                                        <input 
                                            id='appType' 
                                            name='appType' 
                                            type="radio" 
                                            onChange={onChangeHandler}
                                            checked={form.appType === '기안문'}
                                        /> 기안문
                                    </label>
                                </td>
                                <th>등록일</th>
                                <td>{formatDate(Date())}</td>
                            </tr>
                            <tr>
                                <th>제목</th>
                                <td>
                                    <input
                                        id='textInput'
                                        name='appTitle'
                                        type='text'
                                        placeholder='기안문의 제목을 입력해주세요.'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                                <th>기안상태</th>
                                <td>
                                    <label htmlFor='appStatus'>
                                        <input 
                                            id='appStatus' 
                                            type="radio" 
                                            name='appStatus'  
                                            onChange={onChangeHandler}
                                            checked={form.appStatus === 'wait'}
                                        />
                                    대기
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td colSpan={3}>
                                    <textarea
                                        placeholder='기안문의 내용을 입력해주세요.'
                                        name='appContent'
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={ApprovalCSS.nextBtnDiv}>
                <button onClick={onClickRegistHandler}><img src='../image/next-btn.png' alt='Next' /></button>
                <button onClick={onClickResetHandler}><img src='../image/cancel-btn.png' alt='Cancel' /></button>
            </div>
        </div>
    );
}

export default ApprovalRegist;
