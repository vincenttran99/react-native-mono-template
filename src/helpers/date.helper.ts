import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "dayjs/locale/vi";
import { ETypeTime } from "constants/date.constant";
import quarterOfYear from "dayjs/plugin/quarterOfYear";
import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";

dayjs.locale("vi");
dayjs.extend(isoWeek);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(quarterOfYear);
dayjs.extend(customParseFormat);

/**
 * Converts seconds to a formatted string in the format HH:MM:SS.
 *
 * @param {number} totalSeconds - The total number of seconds to be converted.
 * @returns {string} - The formatted time string in HH:MM:SS format.
 *
 * Example:
 * toHHMMSS(3661) // Returns: '01:01:01'
 */
export function secondsToHHMMSSHelper(totalSeconds: number): string {
  // Calculate hours, minutes, and seconds
  const hours: number = Math.floor(totalSeconds / 3600);
  const minutes: number = Math.floor(totalSeconds / 60) % 60;
  const seconds: number = totalSeconds % 60;

  // Format hours, minutes, and seconds with leading zeros if necessary
  const formattedTime: string = [hours, minutes, seconds]
    .map((value) => (value < 10 ? "0" + value : value))
    // Hide leading zeros for hours if they are zero
    // .filter((value, index) => value !== "00" || index > 0)
    .join(":");

  return formattedTime;
}

export function convertIdCardDOBToUTCHelper(dateString: string) {
  // Tách chuỗi ngày tháng năm
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const year = dateString.slice(4, 8);

  // Tạo một đối tượng Date
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);

  // Chuyển đổi sang UTC
  const utcDate = date.toISOString();
  const dateFormat = `${day}/${month}/${year}`;

  return { utcDate, dateFormat };
}

export function getWeekDatesHelper() {
  const weekStart = dayjs().isoWeekday(1); // Lấy ngày đầu tuần (thứ 2)
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(weekStart.add(i, "day").toDate());
  }

  return weekDates;
}

export function formatDateToDisplayHelper(
  input: any,
  allowFuture: boolean = true
): string {
  const date = dayjs(input);

  // Kiểm tra nếu ngày không hợp lệ hoặc ở tương lai
  if (!date.isValid()) {
    return "";
  }
  if (!allowFuture && date.isAfter(dayjs())) {
    return "";
  }

  // Nếu là hôm nay, trả về định dạng HH:mm
  if (date.isToday()) {
    return date.format("HH:mm");
  }

  // Nếu là hôm qua, trả về "Hôm qua HH:mm"
  if (date.isYesterday()) {
    return `${i18n._(msg`Hôm qua`)} ${date.format("HH:mm")}`;
  }

  // Nếu là các ngày khác, trả về định dạng DD/MM
  return date.format("HH:mm DD-MM-YY");
}

export const formatBetweenTimeHelper = (
  time: string | Date | number
): string => {
  const now = dayjs();
  const date = dayjs(time);
  const diffMinutes = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");
  const diffDays = now.diff(date, "day");
  const diffMonth = now.diff(date, "month");

  switch (true) {
    case diffMinutes < 1:
      return i18n._(msg`Vừa xong`);
    case diffHours < 1:
      return `${diffMinutes} ${i18n._(msg`phút`)}`;
    case diffHours < 24:
      return `${diffHours} ${i18n._(msg`giờ`)}`;
    case diffDays < 3:
      return `${diffDays} ${i18n._(msg`ngày`)}`;
    case diffMonth < 12:
      return date.format("DD/MM");
    default:
      return date.format("DD/MM/YYYY");
  }
};

export function getDatesBetweenHelper(
  firstDateInput: number,
  secondDateInput: number,
  format: string = "YYYY/MM/DD"
) {
  const dateArray: string[] = [];
  const firstDate = dayjs(firstDateInput);
  const secondDate = dayjs(secondDateInput);

  if (firstDate.isSame(secondDate, "day")) {
    return [firstDate.format(format)];
  }

  let startDate = dayjs(
    firstDate.isBefore(secondDate) ? firstDate : secondDate
  );
  let endDate = dayjs(firstDate.isBefore(secondDate) ? secondDate : firstDate);

  let currentDate = dayjs(startDate);

  while (
    currentDate.isBefore(endDate, "day") ||
    currentDate.isSame(endDate, "day")
  ) {
    dateArray.push(currentDate.format(format));
    currentDate = currentDate.add(1, "day");
  }

  return dateArray;
}

export function getDateRangeHelper(option: ETypeTime) {
  let startDate: dayjs.Dayjs;
  let endDate: dayjs.Dayjs;

  switch (option) {
    case ETypeTime.Today:
      startDate = dayjs().startOf("day"); // bắt đầu hôm nay
      endDate = dayjs().endOf("day"); // kết thúc hôm nay
      break;

    case ETypeTime.Yesterday:
      startDate = dayjs().subtract(1, "day").startOf("day"); // bắt đầu hôm qua
      endDate = dayjs().subtract(1, "day").endOf("day"); // kết thúc hôm qua
      break;

    case ETypeTime.ThisWeek:
      startDate = dayjs().startOf("isoWeek"); // bắt đầu tuần này (thứ 2)
      endDate = dayjs().endOf("isoWeek"); // kết thúc tuần này (chủ nhật)
      break;

    case ETypeTime.LastWeek:
      startDate = dayjs().subtract(1, "week").startOf("isoWeek"); // bắt đầu tuần trước (thứ 2)
      endDate = dayjs().subtract(1, "week").endOf("isoWeek"); // kết thúc tuần trước (chủ nhật)
      break;

    case ETypeTime.ThisMonth:
      startDate = dayjs().startOf("month"); // bắt đầu tháng này
      endDate = dayjs().endOf("month"); // kết thúc tháng này
      break;

    case ETypeTime.LastMonth:
      startDate = dayjs().subtract(1, "month").startOf("month"); // bắt đầu tháng trước
      endDate = dayjs().subtract(1, "month").endOf("month"); // kết thúc tháng trước
      break;

    case ETypeTime.ThisQuarter:
      startDate = dayjs().startOf("quarter"); // bắt đầu quý này
      endDate = dayjs().endOf("quarter"); // kết thúc quý này
      break;

    case ETypeTime.LastQuarter:
      startDate = dayjs().subtract(1, "quarter").startOf("quarter"); // bắt đầu quý trước
      endDate = dayjs().subtract(1, "quarter").endOf("quarter"); // kết thúc quý trước
      break;

    case ETypeTime.ThisYear:
      startDate = dayjs().startOf("year"); // bắt đầu năm nay
      endDate = dayjs().endOf("year"); // kết thúc năm nay
      break;

    case ETypeTime.LastYear:
      startDate = dayjs().subtract(1, "year").startOf("year"); // bắt đầu năm trước
      endDate = dayjs().subtract(1, "year").endOf("year"); // kết thúc năm trước
      break;

    default:
      throw new Error("Invalid option");
  }
  return {
    startDate: startDate.toDate(), // định dạng ngày tháng
    endDate: endDate.toDate(),
  };
}
