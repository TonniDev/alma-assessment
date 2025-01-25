import type { DateArg } from 'date-fns';

type TYear = `${1 | 2}${number}${number}${number}`;
type TMonth = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12';
type TDay =
  | '01'
  | '02'
  | '03'
  | '04'
  | '05'
  | '06'
  | '07'
  | '08'
  | '09'
  | '10'
  | '11'
  | '12'
  | '13'
  | '14'
  | '15'
  | '16'
  | '17'
  | '18'
  | '19'
  | '20'
  | '21'
  | '22'
  | '23'
  | '24'
  | '25'
  | '26'
  | '27'
  | '28'
  | '29'
  | '30'
  | '31';

/**
 * Represent a string like `2021-01-08`
 */
export type TDateISODate = `${TYear}-${TMonth}-${TDay}`;

export type TDate = DateArg<Date> & {};

export enum Packages {
  PACKAGE1 = 'package1',
  PACKAGE2 = 'package2',
  PACKAGE3 = 'package3',
  PACKAGE4 = 'package4',
  PACKAGE5 = 'package5',
  PACKAGE6 = 'package6',
}

export interface PackageConfig {
  priceId: string;
  maxItems: number;
}

export type PackagesPrices = Record<Packages, PackageConfig>;
