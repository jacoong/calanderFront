import { DateRangePicker, createStaticRanges } from 'react-date-range';
import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  addDays,
  startOfDay,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfWeek,
  endOfWeek,
  startOfYear,
  endOfYear,
  addYears,
} from 'date-fns';

const defineds = {
  startOfWeek: startOfWeek(new Date()),
  endOfWeek: endOfWeek(new Date()),
  startOfLastWeek: startOfWeek(addDays(new Date(), -7)),
  endOfLastWeek: endOfWeek(addDays(new Date(), -7)),
  startOfToday: startOfDay(new Date()),
  startOfLastSevenDay: startOfDay(addDays(new Date(), -7)),
  startOfLastThirtyDay: startOfDay(addDays(new Date(), -30)),
  startOfLastNintyDay: startOfDay(addDays(new Date(), -90)),
  startOfNintyDay: startOfDay(addDays(new Date(), 90)),
  endOfToday: new Date(), // endOfDay를 사용하지 않음
  startOfYesterday: startOfDay(addDays(new Date(), -1)),
  endOfYesterday: new Date(), // endOfDay를 사용하지 않음
  startOfMonth: startOfMonth(new Date()),
  endOfMonth: endOfMonth(new Date()),
  startOfLastMonth: startOfMonth(addMonths(new Date(), -1)),
  endOfLastMonth: endOfMonth(addMonths(new Date(), -1)),
  startOfYear: startOfYear(new Date()),
  endOfYear: endOfYear(new Date()),
  startOflastYear: startOfYear(addYears(new Date(), -1)),
  endOflastYear: endOfYear(addYears(new Date(), -1)),
};

const sideBarOptions = () => {
  const customDateObjects = [
    {
      label: 'Today',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'Last 7 Days',
      range: () => ({
        startDate: defineds.startOfLastSevenDay,
        endDate: defineds.endOfToday,
      }),
    },
    {
      label: 'This Week',
      range: () => ({
        startDate: defineds.startOfWeek,
        endDate: defineds.endOfWeek,
      }),
    },
    {
      label: 'This Month',
      range: () => ({
        startDate: defineds.startOfMonth,
        endDate: defineds.endOfMonth,
      }),
    },
    {
      label: 'This three Month',
      range: () => ({
        startDate: defineds.startOfToday,
        endDate: defineds.startOfNintyDay,
      }),
    },
  ];

  return customDateObjects;
};

const ReactRange = ({ handleRangeStart, handleRangeEnd }) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection',
    },
  ]);

  const sideBar = sideBarOptions();

  const staticRanges = [...createStaticRanges(sideBar)];

  useEffect(() => {
    if (state) {
      handleRangeStart(state[0].startDate.toDateString());
      handleRangeEnd(state[0].endDate.toDateString());
    }
  }, [state, handleRangeStart, handleRangeEnd]);

  return (
    <div>
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={1}
        ranges={state}
        direction="horizontal"
        staticRanges={staticRanges}
      />
    </div>
  );
};

export default ReactRange;
