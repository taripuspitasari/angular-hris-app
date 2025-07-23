export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error';
  duration?: number;
}
