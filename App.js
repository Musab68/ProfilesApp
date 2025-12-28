import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfilesListScreen from './screens/ProfilesListScreen';
import ProfileDetailScreen from './screens/ProfileDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Profiles" component={ProfilesListScreen} options={{ title: 'Profiller' }} />
        <Stack.Screen name="ProfileDetail" component={ProfileDetailScreen} options={{ title: 'Profil Detayi' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}