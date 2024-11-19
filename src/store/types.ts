import { Views } from "react-big-calendar";
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import CustomSelector from "../compoent/compoentItem/CustomSelector";

export type Appointment = {
    id: number;
    status: string;
    location: string;
    resource: string;
    address: string;
  };
  
  export type Blockout = { id: number; name: string };
  
  export type EventItem = {
    start?: Date;
    end?: Date;
    data?: { appointment?: Appointment; blockout?: Blockout };
    isDraggable?: boolean;
    resourceId?: number;
  };

  export const VIEW_OPTIONS = [
    { id: Views.DAY, label: "Day" },
    { id: Views.WEEK, label: "Week" },
    { id: Views.MONTH, label: "Month" },
  ];

  export const customViews  = {
    MONTH: "month",
    WEEK: "week",
    DAY: "day",
}


export interface typeCheckBox {
  label:string;
  value:string;
}


export interface Category {
  categoryId: number;
  categoryColor: string;
  categoryName: string;
  isHover?:boolean;
  isChecked?:boolean;
}

export type Categories = Category[]|null;

export interface ExceptCategoryId {
  categoryId: number;
}


export type ExceptCategoryIds = ExceptCategoryId[];


export interface CalendarContextType {
  selectedDate: Date | null;
  viewType: 'day' | 'week' | 'month' | 'today';
  onSelectDay: (date: Date, type: 'day' | 'week' | 'month') => void;
}

export interface typeOfCalenderparams {
  viewType?: 'day'|'week'|'month';
  year?: string;  // use string because useParams returns values as strings
  month?: string; // use string because useParams returns values as strings
  day?: string;   // use string because useParams returns values as strings
}

export  interface EmailTag {
  id: string;
  text:string;
  role:'ATTENDER'|'MANAGER'|'GENERATOR';
}

export interface ErrorMessages {
  [key: string]: string;
}

export interface typeOfDefaultInviteValue {
attenderEmail: string,
role: "ATTENDER"|"MANAEGER"|"GENERATOR"
}

export interface typeOfValidate {
  error:boolean, message:string;
}


export interface NavButtonOption {
  isClose: boolean;
  isEdit: boolean;
  isDelete: boolean;
}

export interface ModalOptions {
  width?: string;
  height?: string;
  isCenterMessage?: boolean;
  navButtonOption: NavButtonOption;
  isFull:boolean;
  children: React.ReactNode;
  eventId?:number;
  eventTimeId?:number;
  category?:Categories;
}


export interface ModalValue {
  isPotal: boolean;
  isForce: boolean;
  modal?: ModalOptions;  // optional로 `modal`을 포함
  [key: string]: any;    // 추가 속성을 허용
}

export type ModalState = {
  type: string | null;
  value: ModalValue | null;
};

export type ModalStates = ModalState[]; // 여러 모달을 위한 배열 타입


export  interface typeVaildation {
  touched: boolean,
  error: boolean, 
  message: string,
  value:string
}

export interface SelectorValue {
  value: any;
  label: string;
  [key: string]: any;    // 추가 속성을 허용
}


export interface FetchedData {
  isSingleDate: boolean;
  title:string;
  eventId: number; 
  eventTimeId: number; 
  selectedDays: ('SUNDAY' | 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY')[];
  description: string;
  interval: number;
  startTime: string; // Format "YYYYMMDDHHmm"
  endTime: string;   // Format "YYYYMMDDHHmm"
  categoryId: number;
  alarm: Alarm[];
  attenderEmailDTOS: AttenderEmailDTOS;
}

export interface AttenderInfoAuth {
  attenderEmail: string; // 참석자 이메일
  role: 'GENERATOR' | 'ATTENDER' | 'MANAGER'; // 역할: GENERATOR, ATTENDER, MANAGER 중 하나
  state?: 'STANDBY' | 'ACCEPT' | 'REFUSE' | 'HOLD';
}

export interface AttenderEmailDTOS {
  attenderInfoAuth: AttenderInfoAuth[]; // 참석자 정보 배열
  isSendEmailToAttender: boolean; // true이면 참석자들에게 이메일 초대 메일 전달
  isInvitableAnyoneLink: boolean; // true이면 링크만 있으면 초대받지 않은 사람도 참석 가능
}

export interface UserType {
  email: string;
  nickName: string|null;
  profileImg?: string;
}


export interface AlarmOption {
  label: string;
  value: number;
}

export interface CustomAlarmOption {
  alarmNumberInput: number;
  option: {
    id: string;
    label: string;
    value: number;
  };
}

export interface Alarm {
  alarmId: number;
  alarmOption: AlarmOption;
  customAlarmOption: CustomAlarmOption;
  customAlarmState: boolean; // If true, use customAlarmOption, otherwise use alarmOption
  alarmDeleteShowed: boolean;
}


