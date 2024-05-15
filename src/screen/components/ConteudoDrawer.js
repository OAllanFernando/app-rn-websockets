
import React, { useContext, useEffect } from 'react';
import { AuthContext, LoggedContext } from '../../constants/Context';
import { StyleSheet, Text, View } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Title } from 'react-native-paper';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Theme from '../../constants/Theme';
import { useNavigation } from '@react-navigation/native';
import Routes from '../../constants/Routes';

const ConteudoDrawer = (props) => {

    const navigation = useNavigation();
    const { signOut } = React.useContext(AuthContext);
    const contextState = useContext(LoggedContext);
     const { profileId, userId, token, admin, gerente_id } = contextState;


    useEffect(() => {
        // console.log("ProfileId: ", profileId);
        // console.log("UserId: ", userId);
        // console.log("Token: ", token);
        // console.log("Admin: ", admin);
        // console.log("GerenteId: ", gerente_id);
    });

    const handlePress = (rota) => {
        if(rota === 'CLIENTES'){
            navigation.navigate(Routes.CLIENTES);
        }
        else if(rota === 'VIGIAS'){
            navigation.navigate(Routes.VIGIAS);
        }
        else if(rota === 'RELATORIO'){
            navigation.navigate(Routes.RELATORIO);
        }
        else if(rota === 'PRECOS'){
            navigation.navigate(Routes.PRECOS);
        }
        else if(rota === 'PERFIL'){
            navigation.navigate(Routes.PERFIL);
        }
        // navigation.navigate(Routes.rota);// Replace 'HOME' with the name of your target screen
      };


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => handlePress('PERFIL')} style={styles.item}>
                        <Icon name="assignment-ind" size={45} color={Theme.blue} style={styles.icon} />
                        <Text style={styles.itemText}>Meus dados</Text>
                    </TouchableOpacity>
                    

                    {/* {admin && (
                        <>
                         <View style={styles.separator} />
                            <TouchableOpacity onPress={() => handlePress('CLIENTES')} style={styles.item}>
                                <Icon name="recent-actors" size={40} color={Theme.blue} style={styles.icon} />
                                <Text style={styles.itemText}>Clientes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handlePress('RELATORIO')} style={styles.item}>
                                <Icon name="assessment" size={40} color={Theme.blue} style={{ marginRight: 10 }} />
                                <Text style={styles.itemText}>Relatórios</Text>
                            </TouchableOpacity>

                            <View style={styles.separator} />

                            <TouchableOpacity onPress={() => handlePress('VIGIAS')} style={styles.item}>
                                <Icon name="two-wheeler" size={40} color={Theme.blue} style={styles.icon} />
                                <Text style={styles.itemText}>Cadastro de Vigia</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => handlePress('PRECOS')} style={styles.item}>
                                <Icon name="local-offer" size={40} color={Theme.blue} style={styles.icon} />
                                <Text style={styles.itemText}>Cadastro de preços</Text>
                            </TouchableOpacity>
                        </>

                    )} */}
                </View>
            </DrawerContentScrollView>
            <View>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon name="exit-to-app" size={size} color={color} style={{ transform: [{ rotate: '180deg' }] }} />
                    )}
                    label="Sair"
                    onPress={() => signOut()}
                />
            </View>
        </View>
    );
};

export default ConteudoDrawer;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: '8%',
        marginTop: '5%',
    },
    icon: {
        marginRight: 10,
    },
    itemText: {
        alignSelf: 'center',
        color: Theme.black,
        fontSize: 16, // Adjust the font size as needed
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        marginVertical: 10,
        marginLeft: '8%',
    },
});