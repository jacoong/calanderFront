import React, { ReactNode, useState, createContext, Dispatch, SetStateAction } from 'react';
import {CalendarContextType} from './types';

// 상태 값과 상태 변경 함수를 관리할 Context 생성

type ViewType = CalendarContextType['viewType'];

type ViewTypeContextType = [ViewType , Dispatch<SetStateAction<ViewType>>];

export const ViewTypeContext = createContext<ViewTypeContextType | undefined>(undefined);

type ViewTypeProviderProps = {
  children: ReactNode;
};

function ViewTypeProvider({ children }: ViewTypeProviderProps) {
  const [viewType, setViewType] = useState<ViewType>('month');

  return (
    <ViewTypeContext.Provider value={[viewType, setViewType]}>
      {children}
    </ViewTypeContext.Provider>
  );
}

export default ViewTypeProvider;
