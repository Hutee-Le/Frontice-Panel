export type IGetStatisticMonthlyResponse = {
  year: number;
  month: number;
  total: string;
}[];

export type IGetStatisticDaysResponse = {
  date: string;
  total: string;
}[];

export type IGetStatisticOverviewResponse = {
  statistic: {
    total: string;
    dailyTotal: string;
    monthlyTotal: string;
    yearlyTotal: string;
  };
  premiumAccounts: number;
  totalTaskees: number;
  totalTaskers: number;
};
