import { useEffect } from 'react';
import axios from 'axios';
import AxiosMockAdapter from 'axios-mock-adapter';

interface UseMockOptions {
  endpoint: string;
  method: 'get' | 'post' | 'put' | 'delete';
  status: number;
  response: any;
  delay?: number; // 응답 지연 시간 (밀리초)
  data?: any; // 요청 파라미터 옵션
}

export const useMock = ({ endpoint, method, status, response, delay = 0, data }: UseMockOptions) => {
  useEffect(() => {
    const mock = new AxiosMockAdapter(axios, { delayResponse: delay });

    // 설정된 method와 endpoint에 따라 모킹 설정
    if (method === 'get') {
      mock.onGet(endpoint).reply(status, response);
    } else if (method === 'post') {
      mock.onPost(endpoint, data).reply(status, response); // data와 일치하는 POST 요청에 대해 응답 모킹
    } else if (method === 'put') {
      mock.onPut(endpoint, data).reply(status, response);
    } else if (method === 'delete') {
      mock.onDelete(endpoint).reply(status, response);
    }

    // 컴포넌트가 언마운트되거나 useEffect가 다시 실행될 때 모킹 해제
    return () => {
      mock.restore();
    };
  }, [endpoint, method, status, response, delay, data]);
};