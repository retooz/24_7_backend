import React, { useContext, useEffect, useRef } from 'react';
import History from '../components/History';
import { Data } from '../App';
import './Index.css';
import EditProfile from '../components/EditProfile';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Index = ({ edit }) => {
  const {
    trainerInfo,
    memberList,
    filteredMemberList,
    setFilteredMemberList,
    selectedMember,
    setSelectedMember,
    memberHistory,
    setMemberHistory,
    selectedConnCode,
    setSelectedConnCode,
    setDetailData,
    getMemberList,
    getHistory,
    getMemberInfo,
    getDetail,
    reset,
  } = useContext(Data);

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const filterMemberQuery = useRef();

  const conectionChangeHandle = (connection_code) => {
    setSelectedConnCode(connection_code);
  };

  const filterMember = () => {
    reset();
    const query = filterMemberQuery.current.value;
    const filtered = memberList.filter((user) => {
      return user.nickname.includes(query);
    });
    setFilteredMemberList(filtered);
  };

  const listClickHandle = (user_code) => {
    reset();
    setSelectedMember(user_code);
    if (currentPath.length>1) {
      navigate('/')
    }
  };

  useEffect(() => {
    getMemberList();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedConnCode !== 0 && selectedConnCode !== undefined) {
      getDetail(selectedConnCode);
    } else {
      setDetailData({});
    }
    // eslint-disable-next-line
  }, [selectedConnCode]);

  useEffect(() => {
    if (selectedMember !== 0 && selectedMember !== undefined) {
      getHistory(selectedMember);
      getMemberInfo(selectedMember);
    } else {
      setMemberHistory([]);
    }
    // eslint-disable-next-line
  }, [selectedMember]);

  return (
    <div className='main'>
      <div className='menu-list'>
        <img
          src='./pageLogo.png'
          alt=''
          id='main-logo'
          onClick={() => reset()}
        />
        <div id='trainer-info'>
          <div id='profile-img'>
            <img src={'./' + trainerInfo.profile_pic} alt='' />
          </div>
          <p>{trainerInfo.trainer_name} 트레이너님</p>
          <div id='hamburger-icon'>
            <Link to='/editProfile'>
              <img src='./hamburger.png' alt='' />
            </Link>
          </div>
        </div>
        <div id='member-list-container'>
          <p>가입 회원 리스트</p>
          <div id='member-search-form'>
            <input
              type='text'
              name=''
              id='member-search-input'
              ref={filterMemberQuery}
            />
            <input
              type='button'
              id='member-search-button'
              value='검색'
              onClick={() => filterMember()}
            />
          </div>
          <div id='member-list'>
            <ul>
              {filteredMemberList.map((item, index) => {
                return item.checked === 0 &&
                  item.user_code === selectedMember ? (
                  <li
                    key={index}
                    className='selected-li'
                    onClick={() => listClickHandle(item.user_code)}
                  >
                    <div className='member-li'>{item.nickname} 회원</div>
                    <div className='red-dot' />
                  </li>
                ) : item.user_code === selectedMember ? (
                  <li
                    key={index}
                    className='selected-li'
                    onClick={() => listClickHandle(item.user_code)}
                  >
                    <div className='member-li'>{item.nickname} 회원</div>
                  </li>
                ) : item.checked === 0 ? (
                  <li
                    key={index}
                    onClick={() => listClickHandle(item.user_code)}
                  >
                    <div className='member-li'>{item.nickname} 회원</div>
                    <div className='red-dot' />
                  </li>
                ) : (
                  <li
                    key={index}
                    onClick={() => listClickHandle(item.user_code)}
                  >
                    <div className='member-li'>{item.nickname} 회원</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className='data-container'>
        {edit ? (
          <EditProfile />
        ) : memberHistory.length > 0 ? (
          <History
            history={memberHistory}
            selectConnection={conectionChangeHandle}
          />
        ) : (
          <div id='before-select'>
            <span>열람할 회원을 클릭하세요.</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
