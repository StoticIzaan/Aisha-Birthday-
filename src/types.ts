export type ScreenType = 'screen1' | 'screen2' | 'desktop';

export type AppId =
  | 'cute'
  | 'hibiscus'
  | 'drinks'
  | 'food'
  | 'medicine'
  | 'weather'
  | 'dimples'
  | 'travel'
  | 'mirror'
  | 'seventwenty';

export interface AppMetadata {
  id: AppId;
  label: string;
  iconName: string;
  windowTitle: string;
}
