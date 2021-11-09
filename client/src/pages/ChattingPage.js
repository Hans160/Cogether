import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import DetailChatContainer from '../components/DetailChatContainer';

const ChattingPage = ({}) => {
  const postId = useParams();
  const [currentSocket, setCurrentSocket] = useState();
  const [detailId, setDetailId] = useState(postId);
  const LoginInfo = useSelector((state) => state.userReducer);
  const { userInfo } = LoginInfo;
  console.log('postId', postId);
  useEffect(() => {
    setCurrentSocket(socketIOClient(`${process.env.REACT_APP_API_URL}`));
  }, []);

  if (currentSocket) {
    currentSocket.on('connect', () => {
      currentSocket.emit('join', { roomId: detailId.id, userInfo });
    });
  }
  console.log('채팅페이지');
  return (
    <>
      {currentSocket ? (
        <DetailChatContainer socket={currentSocket} roomId={detailId.id} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default ChattingPage;
