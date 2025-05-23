export interface Feedback {
  id: number;
  username: string;
  content: string;
  rating: number;
  tags: string[];
  date: string;
  avatar: string;
  deviceInfo?: string;
  browserInfo?: string;
  replyStatus?: 'replied' | 'pending';
  replyContent?: string;
  replyDate?: string;
}

export interface FeedbackQueryParams {
  page: number;
  pageSize: number;
  filter?: 'all' | 'good' | 'medium' | 'bad';
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}