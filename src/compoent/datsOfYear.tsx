// calendarUtils.ts

export type MonthData = {
    month: string;
    days: number;
}

export function getDaysInMonth(year: number, month: number): number {
    // JavaScript months are zero-based, so January is 0, February is 1, etc.
    // Hence, we subtract 1 from the provided month value.
    return new Date(year, month, 0).getDate();
}

export function getDaysInYear(year: number): MonthData[] {
    const months: string[] = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return months.map((month: string, index: number) => {
        const daysInMonth: number = getDaysInMonth(year, index + 1); // Adding 1 to index to match the month numbering (1-12)
        return { month, days: daysInMonth };
    });
}


// import { getDaysInYear, MonthData } from './calendarUtils';

// const year: number = 2024;
// const daysInYear: MonthData[] = getDaysInYear(year);

// console.log(daysInYear);
