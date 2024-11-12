import React, { ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';
import { ModalStates } from './types';


// 기본값을 사용해 컨텍스트 생성 (기본값을 undefined로 설정)

const initialState: ModalStates = [];

export const ModalStateContext = createContext<ModalStates>(initialState);
export const ModalSetterContext = createContext<Dispatch<SetStateAction<ModalStates>> | undefined>(undefined);

type ModalProviderProps = {
  children: ReactNode;
};

function ModalProvider({ children }: ModalProviderProps) {
  const [state, setState] = useState<ModalStates>(initialState);

  return (
    <ModalSetterContext.Provider value={setState}>
      <ModalStateContext.Provider value={state}>
        {children}
      </ModalStateContext.Provider>
    </ModalSetterContext.Provider>
  );
}

export default ModalProvider;