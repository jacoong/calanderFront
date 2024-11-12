import { useContext } from "react";
import { ViewTypeContext } from "../store/ViewTypeProvider";

export function useViewType() {
    const context = useContext(ViewTypeContext);
    // context가 없으면 에러를 던집니다. 이 에러는 해당 훅이 Provider 내부에서 사용되지 않았을 때 발생합니다.
    if (!context) {
      throw new Error('useLoginInfo must be used within a LoginInfoProvider');
    }
    return context; // [loginInfo, setLoginInfo]를 반환합니다.
}

