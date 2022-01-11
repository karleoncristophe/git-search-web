import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";

interface Users {
  login: string;
  avatar_url?: string;
  id: number;
}

type UsersContextValue = {
  users: Users[] | undefined;
  setUsers: (data: Users[]) => void;
  setPage: (currentvalue: any) => void;
  page: number;
};

interface Props {
  children: ReactNode;
}

export const UsersContext = createContext({} as UsersContextValue);

const UsersProvider = (props: Props) => {
  const [users, setUsers] = useState<Users[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const baseURL: string = "https://api.github.com";
        const perPage: number = 10;

        if (loading) {
          return;
        }
        setLoading(true);
        const { data } = await axios.get(
          `${baseURL}/users/mojombo/followers?page=${page}&per_page=${perPage}`
        );
        setUsers([...users, ...data]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const intersectionObserver: any = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setPage((currentValue: any) => currentValue + 1);
      }
    });
    intersectionObserver.observe(document.querySelector("#id"));
    return () => intersectionObserver.disconnect();
  }, []);

  return (
    <UsersContext.Provider value={{ users, setUsers, setPage, page }}>
      {props.children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
