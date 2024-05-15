
import { View, Text,ActivityIndicator } from 'react-native';

export default function CarregamentoClienteSplash() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{ fontStyle: 'italic', color: 'black' }}>Buscando dados do cliente...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }