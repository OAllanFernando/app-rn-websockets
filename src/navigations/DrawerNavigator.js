import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';



import Routes from '../constants/Routes';
import ConteudoDrawer from '../screen/components/ConteudoDrawer';
import ContentNavigator from './ContentNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
    return (
        <Drawer.Navigator drawerContent={props => <ConteudoDrawer {...props} />} screenOptions={{headerShown: false}}>
            <Drawer.Screen name={"DRAWER"} component={ContentNavigator} />
        </Drawer.Navigator>
    ); } 
export default DrawerNavigator;
