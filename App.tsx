import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { useState } from 'react';
import Device from './pages/Home';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const themeMode = useColorScheme();
  const isDarkMode = themeMode === 'dark';

  let countdown = 5; // Second Limit
  // Better send code to back server to verify
  const [code, setCode] = useState('1024');

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Device code={code} countdown={countdown} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: '#121212',
    padding: 8,
    flex: 1,
  },
});

export default App;
