import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect ,useState} from 'react';
import { AsyncStorage } from 'react-native';
import { StyleSheet, View, Text, Image, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';


const Welcompage = () => {
  const {height}=Dimensions.get("window");
  // useEffect(async ()=>{
  //   const keys = await AsyncStorage.getAllKeys();
  //   if(keys.length!=0){
  //     navigation.navigate('Home')
        
  //      }else{
  //        console.log("Storage is ")
  //      }
  //  },[navigation])

  const navigation=useNavigation();

    return (
      <View>
            <StatusBar/>
        
         
          <ImageBackground style={{
            height:height/2.2,
            margin:16
          }} resizeMode="contain" source={require('./../../assets/welcome.jpg')}/>
  
           <View style={{
              alignItems:'center',
              margin:16
           }}>
  
            <Text style={{
              fontSize:24,
              fontWeight:'700',
              letterSpacing:2,
              margin:8
            }}>welcome in your home </Text>
  
            
            <Text style={{
              fontSize:14,
              fontWeight:'400',
              letterSpacing:1,
              margin:16,
              lineHeight:24
            }}>We are dedicated to making your stay with 
            us a great experience. Please don't hesitate
             to reach out to us if there's anything we can 
             do to help. We hope you have a wonderful time !</Text>
  
           </View>
           <View style={{
            padding:16,
            flexDirection:'row',
            justifyContent:'center',
            marginTop:16,
           }}>
            <TouchableOpacity style={{
              backgroundColor:'#52C0B4',
              borderRadius:10,
              paddingHorizontal:5,
              margin:8
              
            }} onPress={() => navigation.navigate('Login')}>
              <Text style={{
                marginHorizontal:24,
                marginVertical:10,
                borderRadius:10,
                fontSize:22,
                fontWeight:'bold',
                color:'#fff'
              }}>Login</Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={{
            backgroundColor:'#00507D',
              borderRadius:10,
              paddingHorizontal:5,
              margin:8
              
              
            }}
            onPress={()=>navigation.navigate('register')}
            
            >
              <Text style={{ 
                marginHorizontal:24,
                marginVertical:10,
                borderRadius:10,
                fontSize:22,
                fontWeight:'bold',
                color:'#52C0B4'
              }}>Register</Text>
            </TouchableOpacity>
           </View>
  
      </View>
    );





 
};


export default Welcompage;

