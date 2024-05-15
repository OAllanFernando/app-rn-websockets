
import { View, Text,ActivityIndicator } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function SalvarSplash() {
    
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: hp("40%") }}>
        <Text style={{ fontStyle: 'italic', color: 'black' }}>Salvando, por favor, aguarde finalizar...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }