import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainPage from './src/screens/MainPage';
import MissionPage from './src/screens/MissionPage';
import TipsPage from './src/screens/TipsPage';
import RewardPage from './src/screens/RewardPage';
import VirtualAssetStore from './src/screens/VirtualAssetStore';
import GachaStore from './src/screens/GachaStore';
import { RootTabParamList, RootStackParamList } from './src/types/navigation';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<RootStackParamList>();

function MainTabs() {
  return (
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
          } else if (route.name === '奖励') {
            iconName = focused ? 'gift' : 'gift-outline';
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
      <Tab.Screen name="奖励" component={RewardPage} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabs} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="VirtualAssetStore" 
          component={VirtualAssetStore} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GachaStore" 
          component={GachaStore} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
