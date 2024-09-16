import MemberRegisCSS from './MemberRegist.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberRegistAPI, calljobDeptListAPI, calljobListAPI } from '../../apis/MemberAPICalls';
import Swal from 'sweetalert2';

function MemberReigst () {

    const navigate = useNavigate();
    const ImageInput = useRef();
    const { regist } = useSelector(state => state.memberReducer);
    const { jobDept } = useSelector(state => state.memberRoleReducer);
    const dispatch = useDispatch();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [form, setForm] = useState({});
    
    /* 오류 메세지 전달을 위한 상태값 세팅 */
    const [ idMessage, setIdMessage ] = useState('');
    const [ pwdMessage, setPwdMessage ] = useState('');
    const [ nameMessage, setNameMessage ] = useState('');
    const [ resMessage, setResMessage ] = useState('');
    const [ phoneMessage, setPhoneMessage ] = useState('');

    /* 유효성 검사를 위한 세팅 */
    const [ isId, setIsId ] = useState(false);
    const [ isPwd, setIsPwd ] = useState(false);
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

    useEffect (
        () => {
            dispatch(calljobDeptListAPI());
        }
        ,
        []
    );

    useEffect(
        () => {
            if(image) {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    const {result} = e.target;
                    if(result) setImageUrl(result);
                }
                fileReader.readAsDataURL(image);
            }
        },
        [image]
    );

    useEffect(
        () => {
            if(regist?.status === 200) {
                Toast.fire({
                    icon: 'success',
                    title: '직원 등록이 완료 되었습니다.'
                });
                navigate('/', {replace : true});
            } 
        },
        [regist]
    );

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

    /* 아이디 유효성 검사 */
    const onChangeId = (e) => {
        const currentId = e.target.value;
        const idRegExp = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        
        if(!idRegExp.test(currentId)) {
            setIdMessage("사용 불가능한 아이디입니다.")
            setIsId(false);
        } else {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
            setIdMessage("사용 가능한 아이디입니다.")
            setIsId(true);
            console.log("IsId", isId);
            console.log("form", form);
        }
    }

    /* 비밀번호 유효성 검사 */
    const onChangePwd = (e) => {
        const currentPwd = e.target.value;
        const pwdRegExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
        
        if(!pwdRegExp.test(currentPwd)) {
            setPwdMessage("사용 불가능한 비밀번호입니다.")
            setIsPwd(false);
        } else {
            setForm({
                ...form,
                [e.target.name] : e.target.value
            });
            setPwdMessage("사용 가능한 비밀번호입니다.")
            setIsPwd(true);
        }
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


    const onClickMemberRegistrationHandler = () => {
        
        if( isId === true && isPwd === true && isName === true
            && isRes === true && isPhone === true) {

        /* 서버로 전달할 FormData 형태의 객체 설정 */
        const formData = new FormData();
        formData.append("memberId", form.memberId);
        formData.append("memberPwd", form.memberPwd);
        formData.append("memberName", form.memberName);
        formData.append("residentNo", form.residentNo);
        formData.append("department.deptCode", form.department.deptCode);
        formData.append("job.jobCode", form.job.jobCode);
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

        dispatch(callMemberRegistAPI(formData));
        } else {
            Toast.fire({
                icon: 'error',
                title: '직원 등록에 실패했습니다.'
            });
            navigate('/', {replace : true});
        }
    }

    return (
        <>
            <div class="memberRgTitle">
                직원 등록
            </div>
            <div class="memberRgHr">
                <hr/>
            </div>
            <div class="MemberBackground">
                <div className='MemberRgImg'>
                    <img 
                        src={imageUrl && imageUrl} 
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
                <div className="memberRgTable">
                    <table className="memberRgTables">
                        <tbody>
                            <tr>
                                <td><label class="memberRgLabel">아이디(이메일)</label></td>
                                <td>
                                <input 
                                    name="memberId"
                                    onChange={onChangeId}
                                    placeholder='이메일을 입력해주세요'
                                    class="memberRgInput"
                                />                                                                                           
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{ color : isId ? 'green' : 'red'}}
                                    >
                                        {idMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="memberRgLabel">비밀번호</label></td>
                                <td>
                                <input
                                    name="memberPwd"
                                    type="password"
                                    onChange={onChangePwd}
                                    class="memberRgInput"
                                    placeholder='영문자+숫자+특수문자 조합 8자리로 입력해주세요'
                                />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{color : isPwd ? 'green' : 'red'}}
                                    >
                                        {pwdMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">이름</label></td>
                                <td>
                                    <input 
                                        name="memberName" 
                                        class="memberRgInput" 
                                        onChange={onChangeName}
                                        placeholder='이름을 한글로 입력해주세요.'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{color : isName ? 'green' : 'red'}}
                                    >
                                        {nameMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">주민번호</label></td>
                                <td>
                                    <input 
                                    name="residentNo"
                                    onChange={onChangeResident} 
                                    class="memberRgInput"
                                    placeholder="'-' 를 제외한 13자리 숫자를 입력해주세요."
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{color : isRes ? 'green' : 'red'}}
                                    >
                                        {resMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td><label class="memberRgLabel">부서</label></td>
                                <td >
                                    <select  class="memberRgSelect1" name="deptCode" onChange={onChangeDeptHandler}>
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
                                </td>
                            </tr>
                            <tr>
                                <td><label class="memberRgLabel">직급</label></td>
                                <td>
                                <select class="memberRgSelect1" name="jobCode" onChange={onChangeJobHandler}>
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
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">성별</label></td>
                                <td class="memberRgRadio">
                                    <label><input type="radio" name="gender" value="M"  onChange={onChangeHandler} />남자</label>
                                    <label><input type="radio" class="Rgradio2" name="gender" value="W"  onChange={onChangeHandler}/>여자</label>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">전화번호</label></td>
                                <td className="memberRgUp2">
                                <input 
                                    name="phone" 
                                    onChange={onChangePhone} 
                                    class="memberRgInput"
                                    placeholder="'-' 를 제외한 11자리 번호를 입력해주세요."
                                />
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td className="memberTest">
                                    <span 
                                        className="memberVali"
                                        style={{color : isPhone ? 'green' : 'red'}}
                                    >
                                        {phoneMessage}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">주소</label></td>
                                <td className="memberRgUp">
                                <input 
                                    name="address" 
                                    onChange={onChangeHandler}
                                    class="memberRgInput"
                                    placeholder='주소를 입력해주세요'        
                                />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">급여계좌</label></td>
                                <td>
                                <div>
                                <select class="memberRgSelect2" name="bankName" onChange={onChangeHandler}>
                                    <option>선택</option>
                                    <option>농협</option>
                                    <option>국민</option>
                                    <option>신한</option>
                                    <option>기업</option>
                                    <option>카카오</option>
                                </select>
                                </div>
                                <div>
                                <input 
                                    name="bankNo" 
                                    onChange={onChangeHandler}
                                    class="memberRgInput"
                                    placeholder='계좌번호를 적어주세요'
                                />
                                </div>
                                </td>                           
                            </tr>
                            <tr>
                                <td className="memberRgTd"><label class="memberRgLabel">급여</label></td>
                                <td className="memberRgUp">
                                    <input 
                                        name="memberSalary" 
                                        onChange={onChangeHandler} 
                                        class="memberRgInput"
                                        placeholder='급여를 적어주세요'
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td className="memberRgTd" ><label class="memberRgLabel">잔여연차</label></td>
                                <td className="memberRgUp">
                                    <input 
                                        name="memberAnnual" 
                                        type="number" 
                                        onChange={onChangeHandler}
                                        class="memberRgInput"
                                        placeholder='잔여 연차를 적어주세요'
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="memberRgBt">
                    <button className="memberRgBt1" onClick={onClickMemberRegistrationHandler}>등록</button>
                    <button className="memberRgBt2" onClick={ () => navigate(-1)}>취소</button>
                </div>
            </div>
        </>
    );
}

export default MemberReigst;