import { useEffect, useState } from "react";

// 콜백 함수 타입 정의
type UseBackButtonCallback = () => void;

const useBackButton = (callback: UseBackButtonCallback) => {
  const [isBack, setIsBack] = useState(false);

  // 뒤로 가기 이벤트 처리 함수
  const handleEvent = () => {
    setIsBack(true); // 뒤로 가기 상태를 true로 설정
    callback(); // 콜백 함수 실행
    window.history.go(1); // 뒤로 가기 취소
  };

  useEffect(() => {
    // popstate 이벤트 등록
    window.addEventListener("popstate", handleEvent);

    // 컴포넌트 언마운트 시 popstate 이벤트 제거
    return () => {
      window.removeEventListener("popstate", handleEvent);
    };
  }, [callback]); // 콜백 함수가 변경될 때만 이벤트 리스너를 등록/제거

  return isBack; // 뒤로 가기 상태 반환
};

export default useBackButton;