import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import './global.css';

function App(): React.JSX.Element {
  return (
    <SafeAreaView className='flex-1 items-center justify-center'>
      <Text className='text-center'>Hello World</Text>
    </SafeAreaView>
  );
}

export default App;
