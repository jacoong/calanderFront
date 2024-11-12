import { useContext, useEffect } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

/**
 * useBlocker: 페이지 이동을 차단하는 훅
 * @param blocker - 페이지 이동을 차단하는 콜백 함수
 * @param when - 페이지 이동을 차단할 조건 (true이면 차단)
 */
export function useBlocker(blocker: (tx: any) => void, when: boolean = true) {
  const { navigator } = useContext(NavigationContext) as any;

  useEffect(() => {
    if (!when) return;

    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });

    return unblock;
  }, [navigator, blocker, when]);
}