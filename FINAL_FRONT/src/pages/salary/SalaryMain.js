import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callMemberSalaryList } from '../../apis/SalaryAPICalls';
import SalaryMainCSS from './SalaryMainCSS.css';
import SalaryDetail from './SalaryDetail';


function SalaryMain()
{
    const dispatch = useDispatch();
    const [currentPage , setCurrentPage] = useState(1);
    const { list } = useSelector((state) => state.SalaryReducer);
    const [info , setInfo] = useState();
    const salary = list?.content;


    useEffect(
        () =>
        {
            dispatch(callMemberSalaryList(currentPage));
        },
        []
    );

    useEffect(
        () =>
        {
            setInfo(list?.content[0]);
        },
        [list]
    )


    const onClickDetailHandler = (sal) =>
    {
        setInfo(sal);
    }


    return(
        <div className='salary-info'>
            <div className='member-Info'>
                <p className='mP-1'>사원</p>
                { list?.content && <>
                    <p className='mP-2'>{salary[0]?.member.memberCode}</p>
                    <p className='mP-3'>{salary[0]?.member.memberName}</p>
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
                        { list?.content && salary.map((sal) =>(
                            <tr key={sal.salaryCode}
                                onClick={() => onClickDetailHandler(sal) }
                            >
                                <td className='salary-td'>{sal.salaryCode}</td>
                                <td className='salary-td'>{sal.salaryDay}</td>
                                <td className='salary-td'>{sal.salaleDate}</td>
                                <td className='salary-td'>{sal.salaryClassification}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='salaryDetail'>
                 { info && <SalaryDetail key={info.salaryCode} info={info} />}
            </div>
        </div>
    );
}

export default SalaryMain;