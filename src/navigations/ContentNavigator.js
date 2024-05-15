// Navigation.js

import React, { useContext, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Routes from '../constants/Routes';
import Home from '../screen/Home';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Theme from '../constants/Theme';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

import { LoggedContext } from '../constants/Context';


const Stack = createStackNavigator();



function ContentNavigator() {

    const contextState = useContext(LoggedContext);
    const { connected } = contextState;





    const navigation = useNavigation();
    return (
        <Stack.Navigator screenOptions={{
            headerTitleAlign: 'center',
            headerStyle: {
                backgroundColor: Theme.blue,
            },
            headerTintColor: '#fff',
            statusBarColor: Theme.blue,
            headerLeftContainerStyle: {
                paddingLeft: 15,
            },

        }}>
            <Stack.Screen name={Routes.HOME} component={Home} options={{
                headerTitle: () => (
                    <React.Fragment>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={styles.title}>{Routes.HOME}</Text>

                            <Icon name="language" size={30} color={connected ? Theme.green : Theme.white} style={styles.icon} />

                        </View>

                    </React.Fragment>
                ),
                headerLeft: () => (
                    <Icon name="menu" size={30} color={Theme.white} style={styles.icon} onPress={() => { navigation.dispatch(DrawerActions.openDrawer()) }} />
                ),
            }} />



        </Stack.Navigator>
    );
}

const styles = {

    icon: {
        // marginRight: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Theme.white,
        marginLeft: 10,

    },

}

export default ContentNavigator;