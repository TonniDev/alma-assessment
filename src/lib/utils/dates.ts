import { UTCDate } from '@date-fns/utc';
import { formatDate, parseISO } from 'date-fns';
import { formatInTimeZone } from 'date-fns-tz';
import { enUS, ptBR } from 'date-fns/locale';
import { TDate, TDateISODate } from './types';

const DATE_FORMAT_SYSTEM = 'yyyy-MM-dd';
const DATE_FORMAT_SYSTEM_TIME = 'yyyy-MM-dd HH:mm:ss';
// const DATE_FORMAT_BR = "dd 'de' MMMM 'de' yyyy";
const DATE_FORMAT_BR = 'dd/MM/yyyy';
const DATE_FORMAT_US = 'MMM d, yyyy';
const DATE_FORMAT_US_TIME = "MMM d, yyyy 'at' h:mm aaa";
const DATE_FORMAT_US_TIME_WITH_TIMEZONE = "MMM d, yyyy 'at' h:mm aaa z";
const DATE_FORMAT_US_FULL = 'MMMM d, yyyy';
const DATE_FORMAT_US_COMPACT = 'MM/dd/yyyy';
const DATE_FORMAT_ONLY_DAY_MONTH = 'MMMM d';
const DATE_FORMAT_ONLY_DAY = 'd';
const DATE_FORMAT_ONLY_MONTH = 'MMMM';
const DATE_FORMAT_ONLY_YEAR = 'yyyy';
const DATE_FORMAT_ONLY_MONTH_YEAR = 'MMM yyyy';

export enum DefaultDateFormats {
  Default = DATE_FORMAT_US,
  // System is used to send dates to the backend API
  System = DATE_FORMAT_SYSTEM,
  // SystemTime is used to send dates with time to the backend API
  SystemTime = DATE_FORMAT_SYSTEM_TIME,
  BR = DATE_FORMAT_BR,
  US = DATE_FORMAT_US,
  USTime = DATE_FORMAT_US_TIME,
  USTimeWithTimezone = DATE_FORMAT_US_TIME_WITH_TIMEZONE,
  USFull = DATE_FORMAT_US_FULL,
  USCompact = DATE_FORMAT_US_COMPACT,
  OnlyDayMonth = DATE_FORMAT_ONLY_DAY_MONTH,
  OnlyDay = DATE_FORMAT_ONLY_DAY,
  OnlyMonth = DATE_FORMAT_ONLY_MONTH,
  OnlyYear = DATE_FORMAT_ONLY_YEAR,
  OnlyMonthYear = DATE_FORMAT_ONLY_MONTH_YEAR,
}

export function getDateFromISOString(date: string): Date {
  return parseISO(date);
}

export function formatDateInTimeZone({
  date,
  timeZone,
  format = DefaultDateFormats.Default,
}: {
  date: Date;
  format?: DefaultDateFormats;
  timeZone?: string;
}) {
  const tz = timeZone || Intl.DateTimeFormat().resolvedOptions().timeZone;
  let locale = enUS;
  if (format === DefaultDateFormats.BR) {
    locale = ptBR;
  }
  return formatInTimeZone(date, tz, format, { locale });
}

export function formatDateInUTC(date: Date, format: DefaultDateFormats = DefaultDateFormats.Default) {
  return formatDateInTimeZone({ date, format, timeZone: 'UTC' });
}

export function formatDateToSystemFormat(date: Date): TDateISODate {
  return formatDateInUTC(date, DefaultDateFormats.System) as TDateISODate;
}

export function formatDateInLocalDate(
  date: TDate,
  format: DefaultDateFormats = DefaultDateFormats.Default,
): TDateISODate {
  const newDate = new UTCDate(date);
  let locale = enUS;
  if (format === DefaultDateFormats.BR) {
    locale = ptBR;
  }
  return formatDate(newDate, format, { locale }) as TDateISODate;
}
