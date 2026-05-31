export interface UserPreferences {
  examType: string;
  notificationTime: string;
  isOnboarded: boolean;
}

export interface Article {
  id: string;
  title: string;
  originalContent: string;
  aiSummary: string;
  simpleExplanation: string;
  part: string;
  subject: string;
  keywords: string[];
  relevanceInfo: string;
  relatedIssues?: string;
  examples?: string;
  isCompleted: boolean;
}
