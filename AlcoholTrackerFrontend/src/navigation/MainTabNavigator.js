import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PartiesStack from './PartiesStack';
import DrinksStack from './DrinksStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'white',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Parties') {
            iconName = 'calendar-star';
          } else if (route.name === 'Drinks') {
            iconName = 'beer';
          } else if (route.name === 'Profile') {
            iconName = 'account-circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Parties" component={PartiesStack} />
      <Tab.Screen name="Drinks" component={DrinksStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default MainTabNavigator;