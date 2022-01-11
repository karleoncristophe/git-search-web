import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeftArrow from "../assets/icons/left-arrow.png";
import Load from "./Load";
const Modal = styled.div<any>`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  background: #101111;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const Container = styled.div<any>`
  display: flex;
  flex-direction: column;
  width: 80%;
  background: #101111;
  position: absolute;

  @media (max-width: 980px) {
    width: 93%;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;
const Avatar = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 140px;
  margin: 10px;
  margin-bottom: 30px;
  margin-top: 40px;
`;

const AvatarAndNameContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 90%;
`;

const InformationsContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
  width: 95%;
  border-radius: 10px;
`;

const FollowsContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 20px;
  margin: 10px;
  width: 90%;
  border-radius: 10px;
`;

const Span = styled.span`
  color: white;
`;

const TitleName = styled.h3`
  font-size: 25px;
  color: white;
  text-transform: capitalize;
  margin-bottom: 20px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: white;
  text-transform: capitalize;
`;

const Navigation = styled.button`
  display: flex;
  align-items: center;
  height: 80px;
  width: 100%;
  flex-direction: row;
  padding-left: 15px;
  background: none;
  border: none;
`;

const Image = styled.img`
  height: 30px;
  width: 30px;
  margin-right: 10px;
`;

interface User {
  login?: string;
  id: number;
  avatar_url: string;
  name: string;
  company: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}

interface Props {
  username: string;
  close: () => void;
}

const Profile: React.FC<Props> = ({ close, username }: Props) => {
  const [user, setUser] = useState({} as User);
  const [loading, setLoading] = useState(false);
  const baseURL: string = `https://api.github.com/users/${username}`;

  useEffect(() => {
    const getUser = async () => {
      if (loading) {
        return;
      }
      setLoading(true);

      const { data } = await axios.get(`${baseURL}`);
      setUser(data);
      setLoading(false);
    };
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal>
      {loading === true ? (
        <Load load={loading} />
      ) : (
        <Container>
          <Navigation onClick={close}>
            <Image src={LeftArrow} />
            <Text style={{ fontSize: "1.5rem", fontWeight: "600" }}>
              Go Back
            </Text>
          </Navigation>

          <Content>
            <AvatarAndNameContent>
              <Avatar
                src={
                  user?.avatar_url === "text/html"
                    ? "https://cdn-icons-png.flaticon.com/512/5873/5873009.png"
                    : `${user?.avatar_url}`
                }
              />

              <TitleName>{user?.name ? user?.name : "No Name"}</TitleName>
            </AvatarAndNameContent>

            <FollowsContent>
              <div>
                <Span>Followers</Span>
                <Text style={{ textAlign: "center" }}>{user?.followers}</Text>
              </div>
              <div>
                <Span>Following</Span>
                <Text style={{ textAlign: "center" }}>{user?.following}</Text>
              </div>
            </FollowsContent>
            <InformationsContent>
              <Span>Bio</Span>
              <Text>{user?.bio ? user?.bio : "No Bio"}</Text>
            </InformationsContent>
            <InformationsContent>
              <Span>Twitter</Span>
              <Text
                style={{
                  textTransform: user?.twitter_username
                    ? "lowercase"
                    : "capitalize",
                }}
              >
                {user?.twitter_username
                  ? `@${user?.twitter_username}`
                  : "No Twitter"}
              </Text>
            </InformationsContent>

            <InformationsContent>
              <Span>Location</Span>
              <Text>{user?.location ? user?.location : "No Location"}</Text>
            </InformationsContent>

            <InformationsContent>
              <Span>Email</Span>
              <Text>{user?.email ? user?.email : "No Email"}</Text>
            </InformationsContent>
            <InformationsContent>
              <Span>Company</Span>
              <Text>{user?.company ? user?.company : "No Company"}</Text>
            </InformationsContent>

            <InformationsContent>
              <Span>Public Gists</Span>
              <Text> {user?.public_gists ? user?.public_gists : 0}</Text>
            </InformationsContent>
            <InformationsContent>
              <Span>Public Repos</Span>
              <Text> {user.public_repos ? user?.public_repos : 0}</Text>
            </InformationsContent>
            <InformationsContent>
              <Span>Id</Span>
              <Text>{user?.id ? user?.id : "No Id"}</Text>
            </InformationsContent>
          </Content>
        </Container>
      )}
    </Modal>
  );
};

export default Profile;
