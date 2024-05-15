// Navigation.js

import React, { useEffect, useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import LoginNavigator from './src/navigations/LoginNavigator';
import DrawerNavigator from './src/navigations/DrawerNavigator';

import verifyToken from './src/api/authentication/Token_validation';

import CarregamentoSplash from './src/screen/components/loaders/CarregamentoSplash';
import { AuthContext, LoggedContext } from './src/constants/Context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, PermissionsAndroid } from 'react-native';

//WEBSOCKET
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { TextEncoder } from 'text-encoding';
import Geolocation from '@react-native-community/geolocation';
//

function App() {

  /// defina aqui a url do seu servidor websocket
  const socketUrl = 'http://192.168.YOUR.IP:8080/websocket/tracker';

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const [stompClient, setStompClient] = useState(null);

  const [tokenStatico, setTokenStatico] = useState("");
  const [intervalRef, setIntervalRef] = useState(null);

  const [contextState, setContextState] = useState({
    userId: null,
    token: "",
    connected: false,
    altitudes: [],
    latitudes: [],
    // contadorStatico: 0,
  });

  const authContext = useMemo(() => ({
    signIn: async () => {
      setIsAuthenticated(true);
      setTimeout(async () => {
        await defineContextState();
      }, 500);
      setLoading(false);
    },
    signOut: async () => {
      setIsAuthenticated(false);
      await clearContextState();
      closeActivity();
      await AsyncStorage.setItem('token', "unlogged");
      setContextState({
        ...contextState,
        connected: false
      });
      setTokenStatico(null);
      setLoading(false);
    },
    signUp: () => {// não usado
      setIsAuthenticated(true);
      setLoading(false);
    },
    somaContador: () => {
      setContextState({
        ...contextState,
        contadorStatico: contextState.contadorStatico + 1
      });
    },
    closeActivity: () => {
      console.log('Disconnecting WebSocket');
      stompClient.disconnect();
      setContextState({
        ...contextState,
        connected: false
      });
      clearInterval(intervalRef);
    },
    initWebsocketActivity: () => {
      setTimeout(() => {
        connectToWebSocket();
      }, 1000);
    }
  }));

  useEffect(() => {
    setTimeout(() => {
      validationAuth();
    }, 2000);
  }, []);


  const defineContextState = async () => {
    try {
      const userId = await AsyncStorage.getItem("userid");
      const token = await AsyncStorage.getItem("token");

      setTokenStatico(token);
      setContextState({
        userId: userId,
        token: token,
        connected: false,
      });

    } catch (error) {
      Alert.alert("Não foi possível realizar login", "Entre novamente, por favor");
    }
  }

  const clearContextState = async () => {
    await AsyncStorage.clear();
    setContextState({
      userId: null,
      token: "",
      connected: false,
    });


  }

  // useEffect(() => {
  //   console.log(contextState);
  //   console.log("estou aqui, esse de cima");
  // }, [contextState]);


  async function validationAuth() {
    try {
      const response = await verifyToken(); // Call the verifyToken function correctly

      if (response === 401) {
        console.log("Primeiro Acesso", response);
        setIsAuthenticated(false);
        setLoading(false);
        setContextState({
          ...contextState,
          connected: false
        });
        setTokenStatico(null);
      }
      if (response === 200) { // Access the status property of the response object
        setIsAuthenticated(true);
        await defineContextState();
        setLoading(false);
      } else if (response === 403) {
        Alert.alert("Não foi possível realizar login", "Entre novamente, por favor");
        setIsAuthenticated(false);
        setContextState({
          ...contextState,
          connected: false
        });
        setTokenStatico(null);
        setLoading(false);
      }
    } catch (error) {
      console.log("Não foi possível verificar a sessão", error);
    } finally {
      setLoading(false); 
    }
  }


  //websocket


  async function connectToWebSocket() {

    if (isAuthenticated) {
      const socket = new SockJS(`${socketUrl}?access_token=${tokenStatico}`);
      const client = Stomp.over(socket);
      // client.configure({
      //   reconnectDelay: 5000,
      // });

      client.onWebSocketClose(() => {
        console.log('WebSocket disconnected, attempting to reconnect...');
        connectToWebSocket();
      });

      return new Promise((resolve, reject) => {
        client.connect({}, () => {
          setStompClient(client);
          setContextState({
            ...contextState,
            connected: true
          });
          resolve(client); 
          startInterval(client); 

        }, (error) => {
          console.error('WebSocket connection failed:', error);
          reject(error);
        });
      });
    } else {
      setContextState({
        ...contextState,
        connected: false
      });
    }
  };

  async function startInterval(client) {
    let cont = 0;
    const max = 15;
    let interval;

    interval = setInterval(async () => {
      if (!isAuthenticated || !client) {
        clearInterval(interval);
        return;
      }
      try {
        if (client && client.connected) {
          console.log('Location permission granted');

          // Obtenha a localização atual
          let location;
          try {
            const position = await new Promise((resolve, reject) => {
              Geolocation.getCurrentPosition(
                position => resolve(position),
                error => reject(error),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
            });
            location = { latitude: position.coords.latitude, longitude: position.coords.longitude };
            
          } catch (error) {
            console.error('Error getting location:', error);
            return;
          }
          let page = "app/Home";
          client.send('/topic/activity', {}, JSON.stringify({ page, latitude: location.latitude, longitude: location.longitude }));
        } else {
          console.log('WebSocket não está conectado ou não inicializado.');
          clearInterval(interval); 
          setContextState({
            ...contextState,
            connected: false
          });
        }
      } catch (error) {
        if (cont < max) {
          console.log('Sending activity');
          let page = "app/Home";
          client.send('/topic/activity', {}, JSON.stringify({ page }));
          cont++;
        } else {
          console.log('Máximo de tentativas de reconexão atingido. Parando o intervalo.');
          clearInterval(interval); 
        }
      }
    }, 5000);
    setIntervalRef(interval);

    return interval;
  }


  const closeActivity = () => {
    // Desconecte-se do WebSocket ao desmontar o componente
    console.log('Disconnecting WebSocket');
    stompClient.disconnect();

    setContextState({
      ...contextState,
      connected: false
    });
  };
  //



  return (
    <AuthContext.Provider value={authContext}>
      <LoggedContext.Provider value={contextState}>
        <NavigationContainer>
          {isAuthenticated ? <DrawerNavigator /> : <LoginNavigator />}
        </NavigationContainer>
      </LoggedContext.Provider>
    </ AuthContext.Provider >
  );

}

export default App;