import { toJalaali } from 'jalaali-js';


function getMonths(key: number) {
    switch (key) {
        case 1: return "فروردین";
        case 2: return "اردیبهشت";
        case 3: return "خرداد";
        case 4: return "تیر";
        case 5: return "مرداد";
        case 6: return "شهریور";
        case 7: return "مهر";
        case 8: return "آبان";
        case 9: return "آذر";
        case 10: return "دی";
        case 11: return "بهمن";
        case 12: return "اسفند";
    }
}


function ToPersianDate(dateStr?: string) {
    if (dateStr == null)
        return null;
    const isoDate = new Date(dateStr);
    const gYear = isoDate.getFullYear();
    const gMonth = isoDate.getMonth() + 1;
    const gDay = isoDate.getDate();
    const jDate = toJalaali(gYear, gMonth, gDay);
    return jDate;
}

export function ToPersianDateFmt1(dateStr?: string) {
    let jDate = ToPersianDate(dateStr);
    if (jDate == null) return;
    let m = getMonths((jDate.jm as number))
    return `${jDate.jd} - ${m} - ${jDate.jy}`;
}

export function priceToRial(price: number) {
    const tomanPrice = price / 10;
    const formatted = new Intl.NumberFormat('fa-IR').format(tomanPrice) + ' تومان ';
    return formatted;
}