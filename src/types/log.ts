export interface LogEntry {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  message: string;
  ip: string;
  deviceInfo?: string;
  browserInfo?: string;
  details?: Record<string, any>;
}

export interface LogQueryParams {
  page: number;
  pageSize: number;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  userType?: string;
  actionType?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface LogPagination {
  total: number;
  current: number;
  pageSize: number;
  totalPages: number;
}