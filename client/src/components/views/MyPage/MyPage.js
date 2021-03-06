import React, { useState } from 'react';

import styled from 'styled-components';
import swal from 'sweetalert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

import { updateName } from '../../../apis/userApi';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: 50px calc(23%);
  background-color: #f5f5f5;
  height: calc(100vh - 71px - 48px - 100px);

  div.my-info {
    background-color: ${props => props.theme.colors.black};
    border: 1px solid ${props => props.theme.colors.lightGray};
    border-radius: 5px;
    width: 100%;
    height: fit-content;
    text-align: left;
    padding: 25px;
    display: flex;
    flex-direction: column;
    row-gap: 12px;

    div.my-email {
      width: fit-content;
      color: ${props => props.theme.colors.white};
    }

    div.my-name {
      display: ${props => props.isOpenEdit ? 'none' : 'flex'};
      align-items: center;
      font-size: 18px;
      font-weight: 600;
      color: ${props => props.theme.colors.white};
      padding: 4.5px 0;

      svg {
        margin-left: 7px;
        font-size: 18px;
        cursor: pointer;

        path {
          color: ${props => props.theme.colors.white};
        }
      }
    }

    div.my-edit {
      display: ${props => props.isOpenEdit ? 'flex' : 'none'};
      align-items: center;

      svg {
        margin-right: 7px;
        font-size: 18px;
        cursor: pointer;

        path {
          color: ${props => props.theme.colors.white};
        }
      }

      input[type="text"] {
        padding: 0.5em 0.8em;
        margin: 0 10px 0 0;
        width: 180px;
        border: none;
        border-bottom: 1px solid ${props => props.theme.colors.white};
        color: ${props => props.theme.colors.white};
        outline: none;
        background-color: transparent;

        &::placeholder {
          color: ${props => props.theme.colors.gray};
        }
      }

      button {
        width: 33px;
        height: 33px;
        border-radius: 50%;
        background-color: ${props => props.theme.colors.white};
        
        svg path {
          color: ${props => props.theme.colors.black};
        }
      }
    }
  }

  @media only screen and (max-width: 1400px) {
    padding: 50px calc(20%);
  }

  @media ${props => props.theme.device.labtop} {
    padding: 50px calc(15%);
  }
`;

function MyPage({ user }) {
  const [IsOpenEdit, setIsOpenEdit] = useState(false);
  const [EditMyName, setEditMyName] = useState('');

  const handleEditName = (event) => {
    setEditMyName(event.target.value)
  }

  const editMyName = () => {
    if (EditMyName === '' || !EditMyName) {
      return swal({ title: '변경할 이름을 입력하세요.' });
    }

    updateName({ name: EditMyName })
      .then(response => {
        setIsOpenEdit(false);

        setEditMyName('');

        window.location.replace('/mypage');
      })
      .catch(error => {
        console.error('error occured in MyPage - handleEditName() ', error);

        swal({
          title: '정보를 수정할 수 없습니다.',
          text: '잠시 후 다시 시도해주세요.',
          icon: 'error'
        });
      });
  }

  return (
    <Container isOpenEdit={IsOpenEdit}>
      <div className="my-info">
        <div className="my-name">
          {user && user.userData && user.userData.name}님{' '}
          <EditOutlinedIcon onClick={() => setIsOpenEdit(true)} />
        </div>
        <div className="my-edit">
          <ArrowBackOutlinedIcon onClick={() => setIsOpenEdit(false)} />
          <input type="text" onChange={handleEditName} defaultValue={EditMyName} placeholder="변경할 이름을 입력하세요" />
          <button type="button" onClick={editMyName}><EditOutlinedIcon /></button>
        </div>
        <div className="my-email">
          {user && user.userData && user.userData.email}
        </div>
      </div>
    </Container>
  );
}

export default MyPage;
