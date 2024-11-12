import React, { ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';
import { UserType } from './types';

// 상태 값과 상태 변경 함수를 관리할 Context 생성
type LoginInfoContextType = [UserType | null, Dispatch<SetStateAction<UserType | null>>];

export const LoginInfoContext = createContext<LoginInfoContextType | undefined>(undefined);

type LoginInfoProviderProps = {
  children: ReactNode;
};

function LoginInfoProvider({ children }: LoginInfoProviderProps) {
  const [loginInfo, setLoginInfo] = useState<UserType | null>(null);

  return (
    <LoginInfoContext.Provider value={[loginInfo, setLoginInfo]}>
      {children}
    </LoginInfoContext.Provider>
  );
}

export default LoginInfoProvider;
