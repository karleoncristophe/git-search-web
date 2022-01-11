import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import List from "../common/List";
import { UsersContext } from "../context/UsersContext";

const Wrapper = styled.div<any>`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100%;
  overflow: scroll;
  overflow-x: hidden;
`;

const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 70%;
  padding-top: 20px;

  @media (max-width: 980px) {
    width: 93%;
  }
`;

const TitleAndAvatarContent = styled.div<any>`
  margin-top: 10px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const Avatar = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 10px;

  @media (max-width: 400px) {
    width: 80px;
    height: 80px;
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 600;
  color: white;
  width: 80%;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  @media (max-width: 400px) {
    font-size: 1.4rem;
    width: 65%;
  }
`;

const TextAndSearchContent = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  height: 50px;
  overflow: hidden;
  background: red;
  border-radius: 10px;
  margin-top: 40px;
  width: 100%;
`;

const Input = styled.input`
  font-size: 17px;
  display: flex;
  color: black;
  outline: none;
  border: none;
  width: 100%;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border: none;

  height: 100%;
  width: 70px;
`;

const Navigation = styled.button``;

const ImageButton = styled.img`
  width: 25px;
  height: 25px;
`;

const ListViewContent = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filteredUSers, setFilteredUsers] = useState<any>([]);
  const { users, loading, getUserRepos } = useContext(UsersContext);

  useEffect(() => {
    setFilteredUsers(
      // @ts-ignore
      users.filter((get: any) => {
        return get.login.toLowerCase().includes(search.toLocaleLowerCase());
      })
    );
  }, [search, users]);

  return (
    <Wrapper>
      <Container search={search}>
        <TitleAndAvatarContent search={search}>
          <Div>
            <Title>Hello, Karleon👋</Title>
            <Avatar src="https://pbs.twimg.com/profile_images/1440826619988307972/N7Jmx4qv_400x400.jpg" />
          </Div>
          <TextAndSearchContent>
            <Button>
              <ImageButton src="https://cdn-icons-png.flaticon.com/512/64/64673.png" />
            </Button>
            <Input
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Find your friends on GitHub"
            />
          </TextAndSearchContent>
        </TitleAndAvatarContent>
        <ListViewContent>
          {users?.map((item, key) => (
            <List key={item.id + key.toString()} data={item} />
          ))}
        </ListViewContent>
      </Container>
    </Wrapper>
  );
};

export default Home;
