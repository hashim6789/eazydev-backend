export interface UserStatusData {
  status: "blocked" | "unblocked";
  count: number;
}

export interface CoursePerformanceData {
  course: string;
  performance: number;
}
export interface MonthlyRevenueData {
  month: string;
  revenue: number;
}

export interface SystemHealthData {
  metric: string;
  value: number;
}

export interface RevenueData {
  totalRevenue: number;
  monthlyRevenue: MonthlyRevenue[];
  revenueStreams: RevenueStream[];
}

export interface MonthlyRevenue {
  month: string;
  year: number;
  revenue: number;
}

export interface RevenueStream {
  type: "purchase" | "platform_fee";
  total: number;
}
