import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { callMyPageMemberAPI } from '../../apis/MyPageAPICalls';

function MemberSubNavbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeItem, setActiveItem] = useState(null);
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const logOutHandler = useCallback(() => {
        Swal.fire({
            title: '정말 로그아웃하시겠습니까?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '예',
            cancelButtonText: '아니오'
        }).then((result) => {
            if (result.isConfirmed) {
                window.localStorage.removeItem('accessToken');
                navigate("/login");
            }
        });
    }, [navigate]);

    return (
        <>
            <div className='logSub' onClick={logOutHandler}>
                <b>Logout</b> 
            </div>
            <div className='mainTime'>
             {currentTime}</div>
        </>
    );
}

export default MemberSubNavbar;
