import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesListScreen from './screens/ProfilesListScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Liste Ekranı */}
        <Stack.Screen 
          name="Profiles" 
          component={ProfilesListScreen} 
          options={{ title: 'Profiles Directory' }}
        />
        {/* Detay Ekranı */}
        <Stack.Screen 
          name="ProfileDetail" 
          component={ProfileDetailScreen} 
          options={{ title: 'Profile Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}