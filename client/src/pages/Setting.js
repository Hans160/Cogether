import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { setConfirmModal } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { setQuarterModal, setUserDelete, setIsReplace } from '../actions';
import '../scss/Setting.scss';

const Setting = () => {
  const dispatch = useDispatch();
  const [userProfileImg, setUserProfileImg] = useState(null);
  const [file, setFile] = useState('');
  const [loginType, setLoginType] = useState(false);
  const [deletImg, setDeleteImg] = useState(false);
  const history = useHistory();

  const [update, setUpdate] = useState({
    nickname: null,
    password: '',
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/userinfo`, {
        headers: {
          authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        const data = res.data.data;
        setUserProfileImg(data.image);
        setUpdate({ ...update, nickname: data.nickname });
        dispatch(setConfirmModal(false, ''));
        if (data.login_type !== 'local') {
          setLoginType(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const insertImg = (e) => {
    setFile(e.target.files[0]);
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const previewImgUrl = reader.result;

      if (previewImgUrl) {
        setUserProfileImg(previewImgUrl);
      }
    };
  };

  const deleteImg = () => {
    setUserProfileImg(null);
    setFile(null);
    setDeleteImg(true);
  };

  const handleInputValue = (key) => (e) => {
    setUpdate({ ...update, [key]: e.target.value });
  };

  const userInfoUpdate = () => {
    const formData = new FormData();

    if (update.nickname) {
      formData.append('nickname', update.nickname);
    }
    if (file) {
      formData.append('userProfileImg', file);
    }
    if (update.password) {
      formData.append('password', update.password);
    }

    if (deletImg) {
      formData.append('deleteImg', deletImg);
    }

    axios
      .patch(`${process.env.REACT_APP_API_URL}/users/userinfo/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${localStorage.accessToken}`,
        },
      })
      .then((res) => {
        localStorage.setItem('accessToken', res.data.data.accessToken);
        dispatch(setConfirmModal(true, '회원 정보가 변경되었습니다.'));
        history.push('/');
      })
      .catch((err) => {
        if (err.response.data.message === 'nickname is already exist') {
          dispatch(setIsReplace(true));
          dispatch(setConfirmModal(true, '이미 존재하는 닉네임 입니다.'));
        }
        console.log(err);
      });
  };

  const withDrawal = () => {
    dispatch(
      setQuarterModal(
        true,
        '회원과 관련된 모든 데이터가 삭제됩니다. 탈퇴하시겠습니까?'
      )
    );
    dispatch(setUserDelete(true));
  };

  return (
    <div className='setting'>
      <div className='setting-header'>
        <h2>회원 정보 수정</h2>
      </div>
      <div className='setting-img'>
        <img
          className='profile'
          src={userProfileImg ? userProfileImg : './images/default-profile.jpg'}
        ></img>
      </div>
      <div className='settig-profile'>
        <label>
          프로필 사진 변경
          <input
            className='hide'
            type='file'
            accept='image/jpg, image/jpeg, image/png'
            onChange={(e) => insertImg(e)}
          ></input>
        </label>
        <button className='settting-profile-del-btn' onClick={deleteImg}>
          프로필 사진 제거
        </button>
      </div>
      <div className='settig-nickname'>
        <p>닉네임 : </p>
        <input
          onChange={handleInputValue('nickname')}
          value={update.nickname || ''}
        ></input>
      </div>
      <div className={loginType ? 'settig-passwordBlock' : 'settig-password'}>
        <p>비밀번호 : </p>
        <input onChange={handleInputValue('password')}></input>
      </div>
      <div className='setting-userInfo'>
        <button onClick={userInfoUpdate}>변경 완료</button>
        <button onClick={withDrawal}>회원 탈퇴</button>
      </div>
    </div>
  );
};

export default Setting;
