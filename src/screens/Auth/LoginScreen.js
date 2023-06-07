import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { API_URL } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';


const Login = ({ navigation }) => {

 
    const navigate=useNavigation();
    const [username, setUsername] = useState("");

    const [passWord, setPassword] = useState("");

    const [error, seterror] = useState("")

    const handleUSername = (value) => {
        setUsername(value);
    };

    const handlePassword = (value) => {
        setPassword(value);
    };

    const HandleApi = () => {

        if (username && passWord) {
            
            
            axios.post(API_URL + '/login', {
                email: username,
                password: passWord
            }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
                .then(result => {
                    navigate.navigate('Home');
                    Alert.alert("aaaaaaaaa", "aaaaaaaaaaaaaaaa"+result.data.token);
                    console.log(result.data)
                    if (result.data.status == false) {
                        console.log(result.data);

                        if (result.data.message.email) {

                            seterror(result.data.message.email)
                            Toast.show({
                                type: 'error',
                                text1: 'Probleme',
                                text2: result.data.message.email,
                                visibilityTime: 2000,
                                autoHide: true,
                            })

                        } else if (result.data.message.password) {


                            seterror(result.data.message.password)
                            Toast.show({
                                type: 'error',
                                text1: 'Probleme',
                                text2: result.data.message.password,
                                visibilityTime: 2000,
                                autoHide: true,
                            })

                        }

                    } else if (result.data.status == true) {




                        Toast.show({
                            type: 'success',
                            text1: 'validate',
                            text2: 'niice',
                            visibilityTime: 2000,
                            autoHide: true,
                        })



                        AsyncStorage.setItem("jwt-token", result.data.token)
                        AsyncStorage.setItem("name", result.data.user.firstName)
                       
                        Alert.alert("titz","aaaaa "+result.data.token)

                    }
                })
                .catch(error => {
                    console.log(error);
                })
        } else {

            seterror("rempliere l email and password")

            Toast.show({
                type: 'error',
                text1: 'Probleme',
                text2: 'rempliere l email and password',
                visibilityTime: 2000,
                autoHide: true,
            })
        }
    }

    return (
        <View>
            <View style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16
            }}>
                <Text style={{
                    padding: 16,
                    fontSize: 24,
                    fontWeight: 'bold',
                    letterSpacing: 2
                }}>Hello Again</Text>
                <Toast />

                <Text style={{
                    padding: 16,
                    fontSize: 16,
                    fontWeight: '400'
                }}>welcome back you have been mised</Text>
            </View>

            <View style={{
                width: '100%',
                alignItems: 'center'
            }}>

                <TextInput placeholder='entre your  username' style={{
                    width: '80%',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 10,
                    marginVertical: 16,
                    borderColor: '#52C0B4',
                    borderWidth: 1
                }} onChangeText={handleUSername}
                />

                <TextInput placeholder='entre your  password' style={{
                    width: '80%',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 10,
                    marginVertical: 16,
                    borderColor: '#52C0B4',
                    borderWidth: 1
                }} onChangeText={handlePassword}
                    secureTextEntry={true}
                />
            </View>


            <View style={{
                width: '100%',
            }}>
                <Text style={{
                    color: 'red',
                    fontSize: 10,
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    textAlign: 'left',
                    marginLeft: '12%'
                }}>{error}</Text>
            </View>


            <Text style={{
                textAlign: 'right',
                marginRight: '10%'
            }}>forget password</Text>

            <View style={{
                width: '100%',
                alignItems: 'center'
            }}>
                <TouchableOpacity style={{
                    width: '60%',
                    margin: 16,
                    backgroundColor: '#52C0B4',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 10
                }}>
                    <Text style={{
                        textAlign: 'center',
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: '#fff'
                    }} onPress={HandleApi}>Login</Text>
                </TouchableOpacity>
            </View>
            <View style={{
                margin: 16,
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: 100,
                    margin: 16
                }}></View>
                <Text>or continue with</Text>
                <View style={{
                    height: 1,
                    backgroundColor: 'black',
                    width: 100,
                    margin: 16
                }}></View>
            </View>

            <View style={{
                flexDirection: 'row',
                width: '90%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 16
            }}>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderColor: 'black',
                    borderWidth: 0.8,
                    borderRadius: 5,
                    margin: 8
                }}>
                    <ImageBackground style={{
                        height: 24,
                        width: 24
                    }} source={require('../../assets/facebook.png')} />
                    <Text style={{
                        fontSize: 18,
                        marginLeft: 8
                    }}>Facebook</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderColor: 'black',
                    borderWidth: 0.8,
                    borderRadius: 5,
                    margin: 8
                }}>
                    <ImageBackground style={{
                        height: 24,
                        width: 24
                    }} source={require('../../assets/google.png')} />
                    <Text style={{
                        fontSize: 18,
                        marginLeft: 8
                    }}>Google</Text>
                </View>
            </View>

            <View style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 24
            }}>
                <Text>not a member , </Text>
                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#52C0B4'
                }}>Register</Text>
            </View>



        </View>
    )
}

export default Login

const styles = StyleSheet.create({})