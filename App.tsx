import { StatusBar, View, Platform } from 'react-native';
import {
  useFonts,
  Recursive_400Regular,
  Recursive_500Medium,
  Recursive_600SemiBold,
  Recursive_700Bold
} from '@expo-google-fonts/recursive';

import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';
import { UserContextProvider } from './src/context/UserContext';

export default function App() {

  const [fontsLoaded] = useFonts({
    Recursive_400Regular,
    Recursive_500Medium,
    Recursive_600SemiBold,
    Recursive_700Bold
  })

  return (
    <View style={[{ flex: 1 }, Platform.OS === "android" ? { paddingTop: StatusBar.currentHeight } : null ]}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent"
        translucent
      />

      { fontsLoaded ? 
        <UserContextProvider>
          <Routes /> 
        </UserContextProvider>
        : 
        <Loading />
      }
    </View>
  );
}

