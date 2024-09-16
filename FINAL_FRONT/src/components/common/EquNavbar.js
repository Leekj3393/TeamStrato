import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EquNavbarCss from "./EquNavbarCss.css";

function EquNavbar({url}) 
{
  const navigate = useNavigate();
  const [type , setType] = useState('equipmentName');
  const [value , setValue] = useState('');

  const onChangeTypeHandler = (e) =>
  {
      if(type != null)
      {
        setType('');
        setValue('');
      }
      setType(e.target.value);
      if(e.target.value == 'categoryName' )
        setValue(4);
  }

  const onChangeValueHandler = (e) =>
  {
    if(value != null)
      setValue('');

    setValue(e.target.value);
  }

  const onClickHandle = () =>
  {
    navigate(`modify/search?type=${type}&value=${value}`);
  }

  const onEnterKeyHanler = (e) =>
  {
    if(e.key === 'Enter')
    {
      navigate(`modify/search?type=${type}&value=${value}`);
    }
  }

  console.log("nav : {} " , type);
  console.log("value : {} " , value);


  console.log(url);
  return (
    <div className="EquNavBody">
      { url && 
        url == '/equipment' &&
          <div>
            <h2 className="EquTitle"> 장비 별 장비 조회</h2>
            <h2 className="EquSTitle"> 장비 목록 </h2>
          </div>
      }

        { url && 
          url.includes('/equipment/detail') &&
            <div>
              <h2 className="EquTitle"> 분류 별 장비 조회</h2>
              <h2 className="EquSTitle"> 장비 목록 </h2>
            </div>
        }

          { url && 
          url.includes('/equipment/regist') &&
            <div>
              <h2 className="EquTitle"> 장비 추가</h2>
              <h2 className="EquRSTitle"> 장비 정보 입력 </h2>
            </div>
          } 

        { url && 
          url.includes('/equipment/modify') &&
          <>
            <div>
              <h2 className="EquTitle"> 장비 수정 / 삭제</h2>
              <h2 className="EquSTitle"> 장비 목록 </h2>
            </div>
            <div className="search-input">
            <select className="type-selcet"
                    onChange={ onChangeTypeHandler }
            >
              <option value="equipmentName">장비 명</option>
              <option value="equipmentCode">장비 코드</option>
              <option value="categoryName">분류별</option>
            </select>
            { type == 'equipmentName' &&
              <input 
                  className="value"
                  type="text" placeholder="검색어"
                  onChange={ onChangeValueHandler }
                  onKeyUp={ onEnterKeyHanler }
                  value={value}
              />
            }
            { type == 'equipmentCode' &&
              <input 
                  className="value"
                  type="number" placeholder="검색어"
                  onChange={ onChangeValueHandler }
                  onKeyUp={ onEnterKeyHanler }
                  value={value}
              />
            }
            { type == 'categoryName' &&
              <select
                    className="value"
                    onChange={ onChangeValueHandler }
                    value={value}
              >
                <option value={4}>제설기</option>
                <option value={5}>리프트</option>
                <option value={6}>플레이트</option>
                <option value={7}>바인딩</option>
                <option value={8}>부츠</option>
                <option value={9}>폴</option>
                <option value={10}>보드</option>
              </select>
            }
            <button 
                  className="search-Btn"
                  onClick={ onClickHandle }
            >검색</button>
            </div>
          </>
        }
    </div>
  );
}

export default EquNavbar;
