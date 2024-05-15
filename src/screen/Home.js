import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Button, PermissionsAndroid, Platform, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { LoggedContext, AuthContext } from '../constants/Context';

import Theme from '../constants/Theme';


import { TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder;

const Home = () => {
  const contextState = useContext(LoggedContext);
  const { token, connected } = contextState || {};
  const [loading, setLoading] = useState(false);


  const { closeActivity, initWebsocketActivity } = useContext(AuthContext);


  return (
    <>
      {loading ? (
        <Text>Opening Web Socket...</Text>
      ) : (
        <View style={styles.mainContainer}>

          <SafeAreaView>
            <ScrollView>
              <View style={styles.card}>
                <View style={styles.imageContainer}>
                  <Image source={require('../resorces/assets/software-engineerr.png')} style={styles.logoImage} />
                  <Text style={styles.imageText}>WebSocket é um protocolo de comunicação bidirecional, full-duplex e baseado em TCP, que permite a comunicação interativa entre um navegador (ou outro cliente, como esse app) e um servidor web. Em contraste com o HTTP, que é predominantemente baseado em solicitação-resposta, os WebSockets permitem que os dados fluam livremente em ambas as direções, em tempo real.</Text>
                </View>
                <View>
                  {
                    connected ? (
                      <Button title="Desconectar" onPress={closeActivity} />
                    ) : (
                      <Button
                        title="Conectar"
                        onPress={async () => {
                          if (Platform.OS === 'android') {
                            try {
                              const granted = await PermissionsAndroid.request(
                                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                                {
                                  title: 'Location Permission',
                                  message: 'App needs access to your location.',
                                  buttonNeutral: 'Ask Me Later',
                                  buttonNegative: 'Cancel',
                                  buttonPositive: 'OK',
                                },
                              );
                              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                                initWebsocketActivity();
                              } else {
                                Alert.alert('Para utilizar o aplicativo, é necessário permitir o acesso à localização.');
                              }
                            } catch (err) {
                              console.warn(err);
                            }
                          } else {
                            console.log('Location permission granted (iOS)');
                          }
                        }}
                      />
                    )
                  }


                </View>


              </View>
            </ScrollView>
          </SafeAreaView>

        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({

  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: Theme.gray,

    
  },
  logoImage: {
    resizeMode: 'cover',
    width: 100,
    height: 100,
  },
  imageContainer: {
    alignItems: 'center', 
  },
  imageText: {
    
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
},
  card: {
    display: 'flex',
    height: RFPercentage(100),
    justifyContent: 'space-around',
    flexDirection: 'column',
    width: RFPercentage(40),

  },
  cardText: {
    fontSize: RFPercentage(3),
    fontWeight: 'normal',
    marginLeft: RFPercentage(3),
    marginBottom: RFPercentage(1),
    color: 'black',
  },
  text: {
    fontWeight: 'bold',
    color: Theme.black,
  },
  editIcon: {
    marginRight: RFPercentage(4),
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 80,
    backgroundColor: Theme.blue,
    borderRadius: 50,
    width: RFPercentage(8),
    height: RFPercentage(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default Home;
