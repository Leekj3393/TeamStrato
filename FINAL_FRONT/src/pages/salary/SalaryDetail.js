import SalaryDetailCss from './SalaryDetailCss.css';


function SalaryDetail({info})
{

    return(
        <div className="detail-info">
            <div className='year-month'>
                <p className='datetext'>기간</p>
                <p className='dateData'>{info && info.salaryDay }</p>
            </div>
            <hr className='v-line'/>
            <div className="salTitle">
                <h2>급여 명세서{info &&  '( ' + info.salaryClassification + ' )' }</h2>
                <hr className='v-line'/>
            </div>
            <div className="table1">
                <table className="detail-member-Info">
                    <tbody>
                        {info &&
                        <>
                            <tr>
                                <td><label>성명</label></td>
                                <td>{info.member.memberName + '( ' + info.member.memberCode + ' )'}</td>
                                <td><label>생년월일</label></td>
                                <td>{maskingNo(info.member.residentNo)}</td>
                            </tr>
                            <tr>
                              <td><label>직급</label></td>
                              <td>{info.member.memberRole.roleDes + '( ' + info.member.job.jobCode + ' )' }</td>
                              <td><label>부서</label></td>
                              <td>{info.member.department.deptName}</td>
                            </tr>
                            <tr>
                                <td><label>은행/계좌번호</label></td>
                                <td>{info.member.bankName + ' / ' + info.member.bankNo}</td>
                                <td><label>지급일</label></td>
                                <td>{info.salaleDate}</td>
                            </tr>
                        </>
                        }
                    </tbody>
                </table>
                <table className="detail-salary-Info">
                    <tbody>
                        {info &&
                        <>
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
                                <td>{info.salary}</td>
                                <td><label>소득세</label></td>
                                <td>{info.incomeTax}</td>
                            </tr>
                            <tr>
                                {info.allowance > 0 &&
                                    <>
                                    <td><label>특별수당</label></td>
                                    <td>{info.allowance}</td>
                                    </>
                                }
                                {info.allowance <= 0  &&
                                    <>
                                        <td></td>
                                        <td></td>
                                    </>
                                }
                                <td><label>고용보험</label></td>
                                <td>{info.employmentInsurance}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><label>국민연금</label></td>
                                <td>{info.nationalPesion}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><label>요양보험료</label></td>
                                <td>{info.medicalInsurance}</td>
                            </tr>
                            <tr>
                                <td><label>총지급액</label></td>
                                <td>{info.totalAmount}</td>
                                <td><label>공제총액</label></td>
                                <td>{info.totalDeducted}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td><label>실지급액</label></td>
                                <td>{info.paymentAmount}</td>
                            </tr>
                        </>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

function maskingNo(n)
{
    return n.substring(0, n.length - 6) + "******";
}

export default SalaryDetail;