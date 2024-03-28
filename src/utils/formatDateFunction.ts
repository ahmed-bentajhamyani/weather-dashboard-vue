export default function formatDateFunction(dateToFormat: string) {
    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const WeekDays = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ];

    const date = new Date(dateToFormat);

    return { day: WeekDays[date.getDay()], date: date.getDate(), month: months[date.getMonth()] };
}