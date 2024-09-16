import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { callMemberDetailAPI, callMemberUpdateAPI } from "../../apis/MemberAPICalls";
import { callMemberImageAPI } from "../../apis/MemberFileAPICalls";
import MemberModifyCSS from './MemberModify.css';
import Swal from 'sweetalert2';

function MemberModify () {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ImageInput = useRef();
    const { memberImg } = useSelector(state => state.memberFileReducer);
    const { modify, memberDt } = useSelector(state => state.memberReducer);
    const { memberCode } = useParams(); 
    const [ image, setImage ] = useState(null);
    const [ imageUrl, setImageUrl ] = useState('');
    // const { preForm, setPreForm } = useState(memberDt);
    const [ form, setForm ] = useState(memberDt);
    const serverUrl = "http://localhost:8001/images/member/"

    /* 오류 메세지 전달을 위한 상태값 세팅 */
    const [ nameMessage, setNameMessage ] = useState('');
    const [ resMessage, setResMessage ] = useState('');
    const [ phoneMessage, setPhoneMessage ] = useState('');

    /* 유효성 검사를 위한 세팅 */
    const [ isName, setIsName ] = useState(false);
    const [ isRes, setIsRes ] = useState(false);
    const [ isPhone, setIsPhone ] = useState(false);

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
            dispatch(callMemberDetailAPI({memberCode}));
            dispatch(callMemberImageAPI({memberCode}));
        },
        []
    );

    useEffect(() => {
        if(image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if(result) {
                    setImageUrl(result);
                }
            }
            fileReader.readAsDataURL(image);
        }
    }, 
    [image]
    );

    useEffect(
        () => {
            if(modify?.status === 200) {
                // alert('직원 정보 수정이 완료 되었습니다.');
                Toast.fire({
                    icon: 'success',
                    title: '직원 정보 수정이 완료 되었습니다.'
                });
                navigate('/', { replace : true });
            } 
        },
        [modify]
    )

    /* 이미지 업로드 버튼 클릭 이벤트 */
    const onClickImgageUpload = () => {
        ImageInput.current.click();
    }

    /* 파일 첨부시 동작하는 이벤트 */
    const onChangeImageUpload = (e) => {
        setImage(e.target.files[0]);
    }

    /* 입력 양식의 값이 변경 될 때 */
    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name] : e.target.value
        });
    }

    /* 이름 유효성 검사 */
    const onChangeName = (e) => {
        const currentName = e.target.value;
        const nameRegExp = /^[가-힣]+$/;
        
        if(!nameRegExp.test(currentName)) {
            setNameMessage("사용 불가능한 이름입니다.")
            setIsName(false);
        } else {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
            setNameMessage("사용 가능한 이름입니다.")
            setIsName(true);
        }
    }

    /* 주민번호 유효성 검사 */

    const onChangeResident = (e) => {
        const currentRes = e.target.value;
        const ResRegExp = /^\d{13}$/;
        
        if(!ResRegExp.test(currentRes)) {
            setResMessage("사용 불가능한 번호입니다.")
            setIsRes(false);
        } else {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
            setResMessage("사용 가능한 번호입니다.")
            setIsRes(true);
        }
    }

    /* 전화번호 유효성 검사 */
    const onChangePhone = (e) => {
        const currentPhone = e.target.value;
        const PhoneRegExp = /^\d{11}$/;
        
        if(!PhoneRegExp.test(currentPhone)) {
            setPhoneMessage("사용 불가능한 번호입니다.")
            setIsPhone(false);
        } else {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
            setPhoneMessage("사용 가능한 번호입니다.")
            setIsPhone(true);
        }
    }

    const onClickMemberUpdateHandler = () => {
        
       

        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberCode", form.memberCode);
        formData.append("memberName", form.memberName);
        formData.append("residentNo", form.residentNo);
        formData.append("gender", form.gender);
        formData.append("phone", form.phone);
        formData.append("address", form.address);
        formData.append("bankName", form.bankName);
        formData.append("bankNo", form.bankNo);
        formData.append("memberSalary", form.memberSalary);
        formData.append("memberAnnual", form.memberAnnual);
        
        if(image) {
            formData.append("memberImage", image);
        }

        dispatch(callMemberUpdateAPI(formData));
        } 
     
    return (
        <>
            <>
            <div class="memberRgTitle">
                직원 수정
            </div>
            <div class="memberMdHr">
                <hr/>
            </div>
            <div class="MemberBackground2">
                <div className='MemberRgImg'>
                    
                    <img 
                        src={ !imageUrl ? serverUrl + memberImg?.filePath : imageUrl } 
                        alt="preview"
                        className="MemberRgPreview"
                    />
                      
                    <input 
                        style={{display : 'none'}}
                        type="file"
                        name="memberImage"
                        accept='image/jpg,image/png,image/jpeg,image/gif'
                        ref={ImageInput}
                        onChange={onChangeImageUpload}
                    />
                    <button 
                        className='memberRgBt3'
                        onClick={onClickImgageUpload}
                    > 
                        이미지 업로드
                    </button>
                </div>
                <div className="memberMdTable">
                    <table>
                        <tbody>
                            <tr>
                                <td className="memberMdTd"><label>이름</label></td>
                                <td>
                                    <input 
                                        name="memberName" 
                                        placeholder={ memberDt && memberDt.memberName } 
                                        onChange={onChangeName}
                                        class="memberRgInput"    
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{ color : isName ? 'green' : 'red'}}
                                    >
                                        {nameMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주민번호</label></td>
                                <td>
                                    <input 
                                    name="residentNo"
                                    onChange={onChangeResident}
                                    placeholder={ memberDt && memberDt.residentNo } 
                                    class="memberMdInput"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{ color : isRes ? 'green' : 'red'}}
                                    >
                                        {resMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>성별</label></td>
                                <td class="memberMdRadio">
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="M" 
                                            onChange={onChangeHandler} 
                                            defaultChecked={ memberDt && memberDt.gender === 'M'}
                                        />
                                            남자
                                    </label>
                                    <label>
                                        <input 
                                            type="radio" 
                                            name="gender" 
                                            value="W" 
                                            onChange={onChangeHandler}
                                            defaultChecked={ memberDt && memberDt.gender === 'W'}
                                        />
                                            여자
                                    </label>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>전화번호</label></td>
                                <td>
                                <input 
                                    name="phone" 
                                    placeholder={ memberDt && memberDt.phone } 
                                    onChange={onChangePhone} 
                                    class="memberMdInput"
                                />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{ color : isPhone ? 'green' : 'red'}}
                                    >
                                        {phoneMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>주소</label></td>
                                <td>
                                <input 
                                    name="address" 
                                    placeholder={ memberDt && memberDt.address } 
                                    onChange={onChangeHandler}
                                    class="memberMdInput"
                                />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여계좌</label></td>
                                <td>
                                <select class="memberMdSelect" name="bankName" defaultValue={ memberDt && memberDt.bankName } onChange={onChangeHandler}>
                                    <option value="">선택</option>
                                    <option value="농협">농협</option>
                                    <option value="국민">국민</option>
                                    <option value="신한">신한</option>
                                    <option value="기업">기업</option>
                                    <option value="카카오">카카오</option>
                                </select>
                                <input 
                                    name="bankNo" 
                                    placeholder={ memberDt && memberDt.bankNo } 
                                    onChange={onChangeHandler}
                                    class="memberMdInput"
                                />
                                </td>                           
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label>급여</label></td>
                                <td>
                                    <input 
                                        name="memberSalary" 
                                        placeholder={ memberDt && memberDt.memberSalary} 
                                        onChange={onChangeHandler} 
                                        class="memberMdInput"
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd" ><label>잔여연차</label></td>
                                <td>
                                    <input 
                                        name="memberAnnual" 
                                        placeholder={ memberDt && memberDt.memberAnnual } 
                                        type="number" onChange={onChangeHandler}
                                        class="memberMdInput"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="memberMdBt">
                    <button className="memberRgBt1" onClick={onClickMemberUpdateHandler}>수정</button>
                    <button className="memberRgBt2" onClick={ () => navigate(-1)}>취소</button>
                </div>
            </div>
        </>
        </>
    );
}

export default MemberModify;