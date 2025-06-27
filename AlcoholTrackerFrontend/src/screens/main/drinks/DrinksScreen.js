import { View, StyleSheet, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BasicDrinksScreen from './basicDrink/BasicDrinksScreen';
import CustomDrinksScreen from './customDrink/CustomDrinksScreen';

const TopTab = createMaterialTopTabNavigator();

export default function DrinksScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'orange',
          tabBarInactiveTintColor: 'gray',
          tabBarIndicatorStyle: { backgroundColor: 'orange' },
          tabBarLabelStyle: { fontWeight: 'bold' },
          tabBarStyle: { backgroundColor: 'black' },
        }}
      >
        <TopTab.Screen 
          name="BasicDrinks" 
          component={BasicDrinksScreen} 
          options={{ title: 'Общие' }} 
        />
        <TopTab.Screen 
          name="CustomDrinks" 
          component={CustomDrinksScreen} 
          options={{ title: 'Ваши' }} 
        />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 40,
  },
});