
import { useEffect } from 'react';
import { View, Text,ActivityIndicator } from 'react-native';

export default function CarregamentoSplash() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontStyle: 'italic', color: 'black' }}>Entrando...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }