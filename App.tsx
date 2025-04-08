import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainPage from './src/screens/MainPage';
import MissionPage from './src/screens/MissionPage';
import TipsPage from './src/screens/TipsPage';

type RootTabParamList = {
  主页: undefined;
  任务: undefined;
  提醒: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap;

            if (route.name === '主页') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '任务') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === '提醒') {
              iconName = focused ? 'notifications' : 'notifications-outline';
            } else {
              iconName = 'help';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="主页" component={MainPage} options={{ headerShown: false }} />
        <Tab.Screen name="任务" component={MissionPage} options={{ headerShown: false }} />
        <Tab.Screen name="提醒" component={TipsPage} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
