"use client";
import React, { createContext, useState, useMemo, useEffect } from "react";
import type { UserProfile } from "@/types/global";
import { ROLES_OBJECT } from "@/config/index";

interface User {
  sub: string;
  name: string;
  role: typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER;
}

interface AuthData {
  name: string;
  sub: string;
  hash: string;
  expiresAt: number;
  user: User;
  profile: UserProfile;
  roles: Array<typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER>;
}

export interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  roles: Array<typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER>;
  setRoles: (roles: Array<typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER>) => void;
  sub: string
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);



export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [roles, setRoles] = useState<Array<typeof ROLES_OBJECT.ADMIN | typeof ROLES_OBJECT.USER>>([]);

  const [sub, setSub] = useState("") 

  console.log(isClient)

  useEffect(() => {
    setIsClient(true);
    try {
      const authData = localStorage.getItem('auth_data');
      if (authData) {
        const parsedData: AuthData = JSON.parse(authData);
        setUser(parsedData.user);
        setSub(parsedData.sub)
        setProfile(parsedData.profile);
        const roles = localStorage.getItem('roles');
        if (roles) {
          setRoles(JSON.parse(roles));
        }
      }
    } catch {
      setUser(null);
      setProfile(null);
      setRoles([]);
    }
  }, []);

  const value = useMemo(
    () => ({ user, setUser, profile, setProfile, roles, setRoles, sub }),
    [user, profile, roles, sub]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};