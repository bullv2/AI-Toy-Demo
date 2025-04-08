import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  主页: undefined;
  任务: undefined;
  提醒: undefined;
  奖励: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<RootTabParamList>;
  VirtualAssetStore: undefined;
  GachaStore: undefined;
}; 