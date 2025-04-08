import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MainPage from './src/screens/MainPage';
import MissionPage from './src/screens/MissionPage';

type RootTabParamList = {
  主页: undefined;
  任务: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === '主页') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === '任务') {
              iconName = focused ? 'list' : 'list-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen 
          name="主页" 
          component={MainPage}
          options={{
            headerShown: false
          }}
        />
        <Tab.Screen 
          name="任务" 
          component={MissionPage}
          options={{
            headerShown: false
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
