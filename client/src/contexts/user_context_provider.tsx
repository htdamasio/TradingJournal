import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { IUserState } from "@/data_types";
import env from "@/constants";

interface UserContextType {
  userState: IUserState;
  setUserState: React.Dispatch<React.SetStateAction<IUserState>>;
  loading: boolean;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [userState, setUserState] = useState<IUserState>({
    loggedInStatus: "NOT_LOGGED_IN",
    user: {
      id: -1,
      email: "",
      password_digest: "",
      created_at: "",
      updated_at: "",
    },
  });

  useEffect(() => {
    fetch(`${env.API_URL}/logged_in`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.logged_in && data.user) {
          setUserState({
            loggedInStatus: "LOGGED_IN",
            user: data.user,
          });
        } else {
          setUserState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {
              id: -1,
              email: "",
              password_digest: "",
              created_at: "",
              updated_at: "",
            },
          });
          // TODO: This redirect should be done only if the user was logged  navigate("/login");
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        // TODO: add a popup or other component displaying error
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array means it runs once on mount

  const logout = async () => {
    try {
      await fetch(`${env.API_URL}/logout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then(() => {
          setUserState({
            loggedInStatus: "NOT_LOGGED_IN",
            user: {
              id: -1,
              email: "",
              password_digest: "",
              created_at: "",
              updated_at: "",
            },
          });
          navigate("/");
        })
        .catch((error) => {
          console.error('Error:', error);
          // TODO: add a popup or other component displaying error
        });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <UserContext.Provider value={{ userState, setUserState, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
