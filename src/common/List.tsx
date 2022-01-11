import React, { useState } from "react";
import styled from "styled-components";
import Profile from "./Profile";
// import { Container } from './styles';

const ListView = styled.div`
  display: flex;
  justify-content: space-between;
  background: #52b788;
  padding: 10px;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  cursor: pointer;
`;

const Text = styled.p`
  font-size: 1.8rem;
  font-weight: 500;
  color: white;
  text-overflow: ellipsis;
  text-transform: capitalize;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  margin: 0;

  @media (max-width: 400px) {
    font-size: 1.3rem;
  }
`;

const Informations = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 80%;

  @media (max-width: 400px) {
    width: 60%;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;

  @media (max-width: 400px) {
    width: 60px;
    height: 60px;
  }
`;

interface Props {
  data: {
    login: string;
    avatar_url?: string;
    id: number;
  };
}

const List: React.FC<Props> = ({ data }: Props) => {
  const [visible, setVisible] = useState(false);

  const close = () => {
    setVisible(false);
  };

  const open = () => {
    setVisible(true);
  };

  return (
    <>
      <ListView onClick={open}>
        <Informations>
          <Text>{data?.login}</Text>
          <Text>Id: {data?.id}</Text>
        </Informations>
        <div>
          <Avatar
            src={
              data?.avatar_url
                ? `${data?.avatar_url}`
                : "https://cdn-icons-png.flaticon.com/512/5873/5873009.png"
            }
          />
        </div>
      </ListView>
      {visible === true ? (
        <Profile username={data.login} close={close} />
      ) : null}
    </>
  );
};

export default List;
