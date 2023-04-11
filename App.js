import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChoiceScreen from './screens/ChoiceScreen';
import PlaylistScreen from './screens/PlaylistScreen';
import SuggestionScreen from './screens/SuggestionScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';
 
        if (route.name === 'Playlist') {
          iconName = 'music';
        } else if (route.name === 'Suggestion') {
          iconName = 'list-music';
        }
 
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#9C1DE7',
      tabBarInactiveTintColor: '#000000',
      headerShown: false,
    })}>
      <Tab.Screen name="PLAYLIST" component={PlaylistScreen} />
 
       <Tab.Screen name="SUGGESTION" component={SuggestionScreen} />
    </Tab.Navigator>
  );
 }
 

 //tjr mettre <Stack.Screen name="Home" component={HomeScreen} /> pour afficher la page d'accueil suivi des autres liens si il y en a puis le <Stack.Screen name="TabNavigator" component={TabNavigator} /> pour afficher la tab
 export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Choice" component={ChoiceScreen} /> 
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
 }