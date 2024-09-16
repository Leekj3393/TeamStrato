import { useEffect, useState } from "react";
import InsertModalCss from "../../components/calendar/InsertModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { callCalendarInsertAPI } from '../../apis/CalendarAPICalls';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function CalendarInsertModal({memberCode, setCalendarModalOpen}) {

  const [form, setForm] = useState({loggedInMember : { memberCode }});
  const dispatch = useDispatch();
  const { insert } = useSelector((state) => state.calendarReducer);
  const loggedInMember = useSelector(state => state.myPageReducer.membersData.memberCode);
  const loggedInMember2 = useSelector(state => state.myPageReducer.membersData.department.deptCode);
  const navigate = useNavigate();

  useEffect(() => {
    if(insert?.status === 200){
        
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

        setCalendarModalOpen(false);
        Toast.fire({
            icon: 'success',
            title: '일정 등록이 완료 되었습니다.'
          })
        window.location.reload("/calendar/companycal")
      
    } 
  }, [insert]);

  console.log("지금 멤버코드 : ",loggedInMember);

  const onChageHandler = (e) => {
    setForm({
      ...form,
      [e.target.name] : e.target.value,
      division : "부서",
      memberCode: loggedInMember,
      deptCode: loggedInMember2
    });
  };

  console.log("form : ", form);

  const onClickProductReviewHandler = () => {
    dispatch(callCalendarInsertAPI(form));
  };

  return (
    <div className={InsertModalCss.modal}>
      <div className={InsertModalCss.modalContainer}>
        <div className={InsertModalCss.productReviewModalDiv}>
        <div className={InsertModalCss.bluebox}>
          <h1 style={{color: "white"}}>일정 등록</h1>
          </div>
        <h5>일정 이름</h5>
          <input type="text"
          name="title"
          placeholder="일정 이름"
          onChange={onChageHandler}/>
        <h5>시작일</h5>
        <input type="date"
          name="start"
          placeholder="시작일"
          onChange={onChageHandler}/>
        <h5>종료일</h5>
        <input type="date"
          name="end"
          placeholder="종료일"
          onChange={onChageHandler}/>
        <h5>색상</h5>
        <select 
          name="color"
          placeholder="색상"
          onChange={onChageHandler}>
        <option value={"null"}>기본색상</option>
        <option value={"red"}>빨간색</option>
        <option value={"coral"}>주황색</option>    
        <option value={"yellow"}>노란색</option>
        <option value={"green"}>초록색</option>
        <option value={"skyblue"}>하늘색</option>
        <option value={"navy"}>남색</option>
        <option value={"purple"}>보라색</option>
        <option value={"gray"}>회색</option>
        </select>
        <h5>일정 내용</h5>
          <textarea placeholder="일정 내용"
                  name="content"
                  onChange={onChageHandler}></textarea>
            <br></br>
          <button onClick = { onClickProductReviewHandler }>등록하기</button>
          <button onClick = { () => setCalendarModalOpen(false) }>돌아가기</button>
          <button
            style={{
              border: "none",
              margin: 0,
              fontSize: "10px",
              height: "10px",
            }}
            onClick={ () => setCalendarModalOpen(false)}
          >
            
          </button>
        </div>
      </div>
    </div>
  );
}

export default CalendarInsertModal;
