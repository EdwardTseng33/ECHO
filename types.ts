
export interface EchoMessage {
  id: string;
  sender: string;
  role: 'elder' | 'youth';
  content: string;
  task: string;
  timestamp: Date;
}

export enum AppSection {
  HOW_IT_WORKS = 'how-it-works',
  VISION = 'vision',
  JOIN = 'join',
  DEMO = 'demo'
}
