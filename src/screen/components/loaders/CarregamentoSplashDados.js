
import { useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

export default function CarregamentoSplashDados() {

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontStyle: 'italic', color: 'black' }}>Buscando seus dados...</Text>
      <ActivityIndicator size="large" />
    </View>
  );
}