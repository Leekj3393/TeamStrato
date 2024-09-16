import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { callMemberDetailAPI, callMemberRequestUpdateAPI, calljobDeptListAPI } from "../../apis/MemberAPICalls";
import MemberRequsetCSS from './MemberRequest.module.css';
import Swal from 'sweetalert2';

function MemberRequest({memberCode, setRequestModalOpen}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState({});
    const { jobDept } = useSelector(state => state.memberRoleReducer);
    const { memberDt, Mbrequest } = useSelector(state => state.memberReducer);

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
            dispatch(calljobDeptListAPI());
            dispatch(callMemberDetailAPI({memberCode}));
        },
        []
    );

    useEffect(
        () => {
            if(Mbrequest?.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: '직원 인사 이동이 완료 되었습니다.'
                });
                navigate('/', { replace : true });
            }
        },
        [Mbrequest]
    )

    const closeRequestModal = () => {
        setRequestModalOpen(false);
    };

    /* 부서 값 변경 이벤트 */
    const onChangeDeptHandler = (e) => {
        setForm({
            ...form,
            department : { deptCode : e.target.value}
        })     
    }

    /* 직급 값 변경 이벤트 */
    const onChangeJobHandler = (e) => {
        setForm({
            ...form,
            job : { jobCode : e.target.value}
        })     
      };
    
    const onClickMemberUpdateHandler = () => {
        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberCode", memberCode);
        formData.append("department.deptCode", form.department?.deptCode);
        formData.append("job.jobCode", form.job.jobCode)
      
        dispatch(callMemberRequestUpdateAPI(formData));
      };

    return (
        <div className={MemberRequsetCSS.roleModal}>
            <div className={MemberRequsetCSS.roleModalContainer}>
                <div className={MemberRequsetCSS.roleModalDiv}>
                    <div>
                    <span>직원 인사이동</span>
                    </div>
                    <div className={MemberRequsetCSS.modalInDiv}>
                    <div>
                        <label>현재 부서</label>
                        <input type="text" value={memberDt && memberDt.department.deptName} readOnly={true}/>
                    </div>
                    <div>
                        <label>현재 직급</label>
                        <input type="text" value={memberDt && memberDt.job?.jobName} readOnly={true}/>
                    </div>
                    </div>
                    <div className={MemberRequsetCSS.deptDiv}>
                        <label>변경 부서</label>
                        <select name="deptCode" onChange={onChangeDeptHandler}>
                                        <option value="selection">선택</option>
                                        {jobDept?.dept &&
                                            jobDept.dept.map((dept) => (
                                                <option 
                                                    key={dept.deptCode} 
                                                    value={dept.deptCode}
                                                    
                                                >
                                                    {dept.deptCode}.{dept.deptName}
                                                </option>
                                        ))}
                                    </select>
                    </div>
                    <div className={MemberRequsetCSS.jobDiv}>
                        <label>변경 직급</label>
                        <select name="jobCode" onChange={onChangeJobHandler}>
                                    <option value="selection">선택</option>
                                    {jobDept?.job &&
                                        jobDept.job.map((job) => (
                                            <option 
                                                key={job.jobCode} 
                                                value={job.jobCode}
                                                
                                             >
                                                {job.jobCode}.{job.jobName}
                                            </option>
                                    ))}
                                </select>
                    </div>
                    <div>
                        <button onClick={onClickMemberUpdateHandler}>확인</button>
                        <button onClick={closeRequestModal}>취소</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MemberRequest;