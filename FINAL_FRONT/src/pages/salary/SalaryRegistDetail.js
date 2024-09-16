import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

function SalaryRegistDetail()
{
    const dispatch = useDispatch();
    const param = useParams();

    return(
        <div className="RegistDetail-div">
             <div className='salary-info'>
            <div className='member-Info'>
                <p className='mP-1'>사원</p>
                { <>
                    <p className='mP-2'></p>
                    <p className='mP-3'></p>
                </>
                }
            </div>
            <hr className='vv-line'/>
            <div className='selcet-salary'>
                <table className='select-tbSalary'>
                    <thead className='salary-thead'>
                        <th className='salary-th'>번호</th>
                        <th className='salary-th'>급여년월</th>
                        <th className='salary-th'>지급일자</th>
                        <th className='salary-th'>구분</th>
                    </thead>
                    <tbody className='select-tdSalary'>
                        { <>
                            <tr key={null}
                                onClick={null }
                            >
                                <td className='salary-td'></td>
                                <td className='salary-td'></td>
                                <td className='salary-td'></td>
                                <td className='salary-td'></td>
                            </tr>
                            </>
                        }
                    </tbody>
                </table>
            </div>
            <div className='salaryDetail'>

            </div>
        </div>
        </div>
    );
}

export default SalaryRegistDetail;