import { useEffect, useRef, useState } from 'react';
import SalaryRegistCSS from './SalaryRegistCSS.css';
import { useDispatch, useSelector } from 'react-redux';
import { callEmpSaveSal, callEmpSchDay, callEmpSearch, callReIncomeTex } from '../../apis/SalaryAPICalls';
import SalaryRegistDetail from './SalaryRegistDetail';
import SalaryFindEmpModal from './Modal/SalaryFindEmpModal';
import { useNavigate } from 'react-router-dom';
import PagingBar from '../../components/common/PagingBar';
import Swal from 'sweetalert2';

function SalaryRegist()
{
    const [day , setDay] = useState();
    const [isModal , setIsModal] = useState(false);
    const [isClick , setIsClick] = useState(false);
    const [isModify , setIsModify] = useState(false);
    const navigate = useNavigate();
    const { member } = useSelector((state) => state.SalaryReducer);
    const { sch } = useSelector((state) => state.SalaryReducer);
    const { reIncome } = useSelector((state) => state.SalaryReducer);
    const { save } = useSelector((state) => state.SalaryReducer);
    const [form , setForm] = useState({});
    const [reSalary , setReSalary] = useState({});
    const [currntPage , setCurrentPage] = useState(1);
    const disptch = useDispatch();
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

    console.log("reSalary : {}", reSalary);
    console.log("reIncome : {}" , reIncome);
    useEffect(
        () =>
        {
           { sch && disptch(callEmpSchDay(day,sch.member.memberCode,{currntPage})); }
        },
        [currntPage]
    );

    useEffect(
        () =>
        {
            setReSalary(reIncome?.data);
        },
        [reIncome]
    )

    useEffect(
        () =>
        {
            if(save?.status === 200)
            {
                Toast.fire({
                    icon: 'success',
                    title: '급여 명세서 추가 완료'
                });
                navigate("/salary");
            }
        },
        [save]
    )

    const onChangeSalary = (e) =>
    {
        setForm({
            ...form,
            [e.target.name] : [e.target.value],
        });
    }

    const onEnterKeyHanler = (e) =>
    {

        if(e.key === 'Enter')
        {
            disptch(callReIncomeTex(form.salary , sch.overTime));
        }
    }

    const onClickHandler = () =>
    {
        setIsModal(true);
    }

    const onClickModify = () =>
    {
        if(!isModify)
            setIsModify(true);
        else
            setIsModify(false);
    }

    const onChangeHandler = (e) =>
    {
       setDay(e.target.value);
    }

    const onClickSearch = () =>
    {
        if(day != null && member)
        {
                disptch(callEmpSchDay(day,member.memberCode,{currntPage}));
        }
        else
        {
            Toast.fire({
                icon: 'error',
                title: `day : ${day ? day : '정보없음'} \nmember : ${member ? member : '정보없음'} \n 모든 정보를 입력해주세요`
            });
        }
    }

    const onClickSave = () =>
    {
        if(!reSalary?.salary)
        {
            setForm({
                memberCode : sch.member.memberCode,
                salaryClassification : '월정급여',
                salary : sch.member.memberSalary,
                allowance : sch.allowance,
                incomeTax : sch.incomeTax,
                employmentInsurance : sch.employmentInsurance,
                nationalPesion : sch.nationalPesion,
                medicalInsurance : sch.medicalInsurance,
                totalAmount : sch.totalAmount,
                totalDeducted : sch.totalDeducted,
                paymentAmount : sch.paymentAmount,
            });
        }
        else
        {
            setForm({
                memberCode : sch.member.memberCode,
                salaryClassification : '월정급여',
                salary : reSalary.salary,
                allowance : reSalary.allowance,
                incomeTax : reSalary.incomeTax,
                employmentInsurance : reSalary.employmentInsurance,
                nationalPesion : reSalary.nationalPesion,
                medicalInsurance : reSalary.medicalInsurance,
                totalAmount : reSalary.totalAmount,
                totalDeducted : reSalary.totalDeducted,
                paymentAmount : reSalary.paymentAmount,
            });
        }
        setIsClick(true);
    }

    useEffect(
        () =>
        {
            if(isClick === true)
            {   
                disptch(callEmpSaveSal(form));
                setIsClick(false);
            }
        },
        [isClick]
    )

    console.log("form : {}", form);
    return(
        <div className='Ref-sal-att'>
                {isModal && <SalaryFindEmpModal 
                    setIsModal={setIsModal} />}
            <div className='sal-att-Ref'>
                <div className='member-Info'>
                    <p className='mP-1'>사원</p>
                    {
                        !member && !sch &&
                        <>
                        <p className='mP-2'></p>
                        <p className='mP-3'></p>
                        </>
                    }
                    {member && !sch &&
                        <>
                            <p className='mP-2'>{member && member?.memberCode}</p>
                            <p className='mP-3'>{member?.memberName}</p>
                        </>
                    }
                    {
                        sch &&
                        <>
                            <p className='mP-2'>{sch.member?.memberCode}</p>
                            <p className='mP-3'>{sch.member?.memberName}</p>
                        </>
                    }
                    <button className='member-select' 
                        onClick={onClickHandler}>사원 조회</button>
                </div>
                <hr className='vv-line'/>
                <div className='select-day'>
                    <p className='datetext'>기간</p>
                    <input className='day-date' type='date' name='day' onChange={(e) => onChangeHandler(e) }/>
                    <button className='seclet-btn' onClick={ onClickSearch }>조회</button>
                </div>
                <hr className='vv-line'/>
                <div className='save-div'>
                    <button className='save-btn' onClick={onClickSave}>저장</button>
                </div>
            </div>
            <div className='att-sal-Info'>
            <div className='search-salary'>
                    <table className='select-tbSalary'>
                        <thead className='salary-thead'>
                            <th className='salary-th'>날짜</th>
                            <th className='salary-th'>출근시간</th>
                            <th className='salary-th'>퇴근시간</th>
                            <th className='salary-th'>상태</th>
                        </thead>
                        <tbody className='select-tdSalary'>
                            { sch && sch.attendance.map((s) =>(
                                <tr key={s.attendanceCode}>
                                    <td className='salary-td'>{s.attendanceDate}</td>
                                    <td className='salary-td'>{s.startTime}</td>
                                    <td className='salary-td'>{s.endTime}</td>
                                    <td className='salary-td'>{s.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagebarSal">
                        { sch && <PagingBar pageInfo={sch.pageInfo} setCurrentPage={setCurrentPage}/> }
                    </div>
                </div>
                <div className='valueBox'>
                    <table className='att-Info'>
                        <tbody>
                            {sch &&
                            <>
                                <p>근무 내역</p>
                                <tr>
                                    <td><label>총 근무 시간</label></td>
                                    <td>{sch.totalTime}</td>
                                    <td><label>총 연장근무 시간</label></td>
                                    <td>{sch.overTime}</td>
                                </tr>
                                <tr>
                                <td><label>지각</label></td>
                                <td>{sch.late}</td>
                                <td><label>외출</label></td>
                                <td>{sch.out}</td>
                                </tr>
                                <tr>
                                    <td><label>조퇴</label></td>
                                    <td>{sch.earlyLeave}</td>
                                    <td><label>결근</label></td>
                                    <td>{sch.absence}</td>
                                </tr>
                            </>
                            }
                        </tbody>
                    </table>
                    <table className="sal-Info">
                        <tbody>
                            {sch &&
                            <>
                                <p>급여</p>
                                <button 
                                            className="sal-modify"
                                            onClick={onClickModify}
                                    >{isModify === true ? '저장' : '수정' }</button>
                                <tr>
                                    <td>
                                        <p>지급내역</p> 
                                    </td>
                                    <td></td>
                                    <td>
                                        <p>공제내역</p>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td><label>기본급</label></td>
                                    {
                                        isModify === false ?
                                        <td>{reSalary?.salary ? reSalary.salary  : sch.member.memberSalary}</td>
                                        :
                                        <input 
                                            name='salary'
                                            className='modify-salary'
                                            onChange={(e) => onChangeSalary(e)}
                                            onKeyUp={onEnterKeyHanler}
                                            placeholder='변경할 금액 입력'
                                        />
                                    }
                                    <td><label>소득세</label></td>
                                    <td>{reSalary?.incomeTax ? reSalary.incomeTax : sch.incomeTax}</td>
                                </tr>
                                <tr>
                                    {sch.allowance > 0 &&
                                        <>
                                        <td><label>초과수당</label></td>
                                        <td>{reSalary?.allowance ? reSalary.allowance : sch.allowance}</td>
                                        </>
                                    }
                                    {sch.allowance <= 0  &&
                                        <>
                                            <td></td>
                                            <td></td>
                                        </>
                                    }
                                    <td><label>고용보험</label></td>
                                    <td>{reSalary?.employmentInsurance ? reSalary.employmentInsurance : sch.employmentInsurance}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>국민연금</label></td>
                                    <td>{reSalary?.nationalPesion ? reSalary.nationalPesion : sch.nationalPesion}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>요양보험료</label></td>
                                    <td>{reSalary?.medicalInsurance ? reSalary.medicalInsurance : sch.medicalInsurance}</td>
                                </tr>
                                <tr>
                                    <td><label>총지급액</label></td>
                                    <td>{reSalary?.totalAmount ? reSalary.totalAmount : sch.totalAmount}</td>
                                    <td><label>공제총액</label></td>
                                    <td>{reSalary?.totalDeducted ? reSalary.totalDeducted : sch.totalDeducted}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><label>실지급액</label></td>
                                    <td>{reSalary?.paymentAmount ? reSalary.paymentAmount : sch.paymentAmount}</td>
                                </tr>
                            </>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
    
}



export default SalaryRegist;