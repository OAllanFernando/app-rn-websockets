import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, Switch, TouchableOpacity } from 'react-native';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Login } from '../api/authentication/Login';
import { AuthContext } from '../constants/Context';
import LinearGradient from 'react-native-linear-gradient';
import CarregamentoSplash from '../screen/components/loaders/CarregamentoSplash';
import { Alert } from 'react-native';


const Index = ({ navigation }) => {
    const [rememberMe, setRememberMe] = useState(false);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { signIn } = React.useContext(AuthContext);

    const handleLogin = () => {
        setIsLoading(true);

        setTimeout(() => {
            Login(email, senha, rememberMe)
                .then(response => {
                    if (response === 200) {
                        signIn();
                    } else {
                        if (response === 401) {
                            Alert.alert("Não foi possível realizar login", "Usuário ou senha incorretos");
                        } else {
                            Alert.alert("Não foi possível realizar login", "Verifique sua conexão com a internet e se persistir entre em contato com o suporte");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }, 2000);
    };

    return (
        <>
            {isLoading ? (
                <CarregamentoSplash />
            ) : (
                <View style={styles.container}>
                    <LinearGradient
                        colors={['#011121', '#011121']}
                        style={styles.gradientUp}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 5, y: 5 }}
                    >
                        <View style={styles.upPart}>
                           
                            <Text style={[styles.text, { color: 'white' }]}>Vigia</Text>
                            <TextInput
                                style={[styles.input, { color: 'black' }]}
                                placeholder="Login"
                                placeholderTextColor="black"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>
                    </LinearGradient>
                    <LinearGradient
                        colors={['#011121', '#61afff']}
                        style={styles.gradientBellow}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 8 }}
                    >
                        <View style={styles.bellowPart}>
                            <TextInput
                                style={[
                                    styles.inputSenha,
                                    { color: 'black', backgroundColor: 'lightgray' },
                                    passwordError && { borderColor: 'red' },
                                ]}
                                placeholder="Senha"
                                secureTextEntry
                                placeholderTextColor="black"
                                value={senha}
                                onChangeText={(text) => {
                                    setSenha(text);
                                    setPasswordError(false);
                                }}
                            />
                            {passwordError && (
                                <Text style={styles.errorText}>A senha deve ter pelo menos 4 caracteres</Text>
                            )}
                            <View style={styles.checkboxContainer}>
                                <Text style={styles.checkboxLabel}>Manter conectado</Text>
                                <Switch
                                    value={rememberMe}
                                    onValueChange={setRememberMe}
                                    accessibilityLabel="Manter conectado"
                                    thumbColor="#ffffff"
                                    trackColor="#ffffff"
                                />
                            </View>
                            <TouchableOpacity style={styles.buttons} onPress={handleLogin}>
                                <Text style={styles.buttonText}>Entrar</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.versionContainer}>
                            <Text style={styles.versionText}>V1.0.0</Text>
                        </View>
                    </LinearGradient>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    upPart: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: '50%',
    },
    bellowPart: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        paddingTop: heightPercentageToDP(3),
    },
    gradientUp: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    gradientBellow: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logoContainer: {
        marginBottom: '5%',
    },
    logoImage: {
        resizeMode: 'cover',
        width: 150,
        height: 160,
    },
    text: {
        fontSize: RFPercentage(3),
        marginBottom: '5%',
    },
    input: {
        width: widthPercentageToDP(70), // Alterado para ocupar 80% da largura do container
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
    },
    inputSenha: {
        width: widthPercentageToDP(70), // Alterado para ocupar 80% da largura do container
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: 'lightgray',
    },
    errorText: {
        color: 'red',
        fontSize: RFPercentage(2),
        marginTop: '1%',
        marginBottom: '2%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginBottom: '2%',
    },
    checkboxLabel: {
        marginLeft: 5,
        fontSize: RFPercentage(2),
        color: 'white',
    },
    buttons: {
        width: heightPercentageToDP(30), // Alterado para ocupar 80% da largura do container
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#034aa6',
        borderRadius: 25,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: RFPercentage(3),
    },
    versionContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        paddingRight: '5%',
        marginTop: '5%',
    },
    versionText: {
        color: 'white',
        fontWeight: '100',
    },
});

export default Index;