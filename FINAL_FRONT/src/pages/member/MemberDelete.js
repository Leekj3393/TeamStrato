import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MemberDelCSS from "./MemberDelete.module.css";
import { useEffect } from "react";
import { callMemberDeleteAPI } from "../../apis/MemberAPICalls";
import Swal from 'sweetalert2';

function MemberDelete (memberCode, setDeleteModalOpen) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { memberDelete } = useSelector(state => state.memberReducer);
    const {memberCodes} = memberCode;

    const closeModal =() => {
        setDeleteModalOpen(false);
    };

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

    const onClickDeleteHandler = () => {
        dispatch(callMemberDeleteAPI(memberCode));
    };

    useEffect(
        () => {
            if(memberDelete?.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: '직원 정보 삭제가 완료 되었습니다.'
                });
                navigate('/', { replace : true });
            }
        },
        [memberDelete]
    );

    return (
        <div className={MemberDelCSS.roleModal}>
            <div className={MemberDelCSS.roleModalContainer}>
                <div className={MemberDelCSS.roleModalDiv}>
                    <img className={MemberDelCSS.dangerous}src="/image/dangerous.png"/>
                    <span className={MemberDelCSS.span1}>직원 정보 삭제</span>
                    <span className={MemberDelCSS.span2}>주의!! 정말 직원 정보를 삭제하겠습니까?</span>
                    <span className={MemberDelCSS.span3}>※ 삭제된 직원정보는 복구되지 않습니다. ※</span>
                        <div className={MemberDelCSS.rolModalBtDiv}>
                            <button onClick={onClickDeleteHandler}>삭제</button>
                            <button onClick={closeModal}>취소</button>
                        </div>
                </div>
            </div>
        </div>
    );
}

export default MemberDelete;