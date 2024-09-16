import { useState, useCallback, useRef, useEffect } from 'react';
import './SubMainNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { callMemberEmailAPI, callMyPageMemberAPI } from '../../apis/MyPageAPICalls';
import Swal from 'sweetalert2';

function MemberSubNavbar() {
    //알러트 창
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
    //

    //멤버 정보
    const dispatch = useDispatch();
    const membersData = useSelector(state => state.myPageReducer.membersData); 
    useEffect(() => {
      dispatch(callMyPageMemberAPI());
    }, []);

    //
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = useState(null);

    const onHoverEmail = () => setActiveItem('email');
    const onHoverCard = () => setActiveItem('card');
    const onHoverLeave = () => setActiveItem(null);
    

    const titleAllMemberRef = useRef(null);  // Create a new reference

    const downloadTitleAllMember = () => {
        if (titleAllMemberRef.current) {
            html2canvas(titleAllMemberRef.current, {backgroundColor: null}).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = imgData;
                link.download = '명함.png';
                link.click();
            });
        }
    };

    const emailResult = useSelector(state => state.myPageReducer.getMemberEmailMy);
    const [searchEmail, setSearchEmail] = useState('');
  
    const searchEmailHandler = () => {
      if (!searchEmail) {
        console.error("No email entered for search");
        return;
      }
      dispatch(callMemberEmailAPI(searchEmail));  // 이메일 API 호출
    };
  
    
    
    
//

    return (
        <div className={`memberSubBar ${activeItem ? 'expanded' : ''}`} onMouseLeave={onHoverLeave}>
        <img className="message" src="/image/message.png" alt="로고" />
        <div 
            className='memberEmail' 
            onMouseEnter={onHoverEmail}
        >
            Member <br/>Email
            {activeItem === 'email' && 
            <div>
                <div className="myStyle">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                
                    <div className='searchNameMy'>
                        <input 
                    
                            type="text"
                            placeholder="이메일 보낼 회원 이름 입력"
                            value={searchEmail}
                            onChange={e => setSearchEmail(e.target.value)}
                        />
                        <button onClick={searchEmailHandler}>Search</button>
                   </div>
                    </div>

                </div>
                
                {emailResult && emailResult.map((result, index) => (
    <div key={index} className="MembersEmail">
        <div className='resultName'>Name: {result.name}</div>
       <br/> <div className='resultName2'>Email: {result.email}<a href={`mailto:${result.email}`}><button>📧</button></a></div>
        
    </div>
))}



            </div>}
        </div>



            <img className="mycard" src="/image/명함.png" alt="로고" />
            <div 
                className='cardMember' 
                onMouseEnter={onHoverCard}
            >
                My<br/>Card
                {activeItem === 'card' && (
                    <div>
                        <button className='submitMember' onClick={downloadTitleAllMember}>
                        🧑‍💻 My Card Download 
                        </button>


                        <div className='titleAllMember' ref={titleAllMemberRef}>
                                <img className="secondLogo" src="/image/카드로고.png" alt="로고" />
                            <div className='cardSkyLift'>
                                <div className='skyLift'></div>
                                <div><span class="name-ski"><b>Korea Best Ski Resort</b></span></div>
                                <div>회사 주소: 서울시 성동구<br/> 아차산로 28번길 1890호</div>
                                <div>회사 대표번호: 02-222-5678</div>
                            </div>
                            <div className='cardContent'>
                                <div className='photoFrame'></div>
                                <div><span class="name-label">Name:</span> {membersData.memberName}</div>

                                <div><span class="name-label">Title:</span> {membersData.department.deptName}{membersData.job.jobName}</div>
                                <div><span class="name-label">Email:</span> {membersData.memberId}</div>
                                <div><span class="name-label">Phone:</span> {membersData.phone}</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MemberSubNavbar;