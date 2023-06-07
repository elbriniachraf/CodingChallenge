import { Dimensions, ScrollView, StyleSheet, Text, View, Image, FlatList, Modal, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Star from 'react-native-vector-icons/AntDesign';
import Icons from 'react-native-vector-icons/AntDesign';

import { AirbnbRating, Rating } from 'react-native-ratings';
import { API_IMAGE, API_URL } from '../utils/api';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ProductService from '../services/ProductService';

const images = [
    'https://cdn.pixabay.com/photo/2016/03/28/09/34/bedroom-1285156__340.jpg',
    'https://cdn.pixabay.com/photo/2018/02/24/17/17/window-3178666__340.jpg',
    'https://cdn.pixabay.com/photo/2018/01/06/16/32/window-3065340__340.jpg'
]

const WIDTH = Dimensions.get('window').width

const HEIGHT = Dimensions.get('window').height

const ProductScreen = ({ route }) => { 

   
    const { title, description, id, image,price } = route.params;

   const [isModalVisible, setIsModalVisible] = useState(false);    
        
    const [title2, setTitle2] = useState(title);
    const [description2, setDescription2] = useState(description);
    const [price2, setPrice2] = useState(price);

    const navigation = useNavigation();
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };


    const data = [
        { key: '1', text: 'free ship', image: '../assets/facebook.png' },
        { key: '2', text: 'high qualite', image: '../assets/facebook.png' },
        { key: '3', text: 'consultation', image: '../assets/facebook.png' },
        { key: '4', text: 'awesome designg', image: '../assets/facebook.png' },
    ];


    const handleDelete = () => {
        // Make an HTTP DELETE request to the API
        ProductService.deleteProduct(product.id)
            .then(() => {
                console.log('Product deleted successfully');
                // Handle the successful deletion
            })
            .catch(error => {
                console.error('Error deleting product', error);
                // Handle the error
            });
    };
  

    const handleEditProduct = () => {
        const updatedProduct = {
            title: title,
            description: description,
            price: price,
        };

        ProductService.editProduct(product.id, productData)
            .then(updatedProduct => {
                console.log('Product edited successfully:', updatedProduct);
                toggleModal()
                // Handle the successful edit
            })
            .catch(error => {
                console.error('Error editing product', error);
                // Handle the error
            });
    };

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView style={{
                flex: 1,
            }}>
                <View style={styles.wrap}>
                    <Image
                        
                        resizeMode="stretch"
                        style={styles.wrap}
                        source={{ uri: API_IMAGE +image}}
                    />
                   
                </View>
                <View style={{
                    margin: 16,
                }}>
                    <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) => {
                                const renderitem = () => (
                                    <View style={{
                                        marginHorizontal: 16,
                                        backgroundColor: '#e5e7ebcf',
                                        alignItems: 'center',
                                        paddingVertical: 8,
                                        borderRadius: 10,
                                        paddingHorizontal: 16

                                    }}>
                                        <Image source={require('../assets/facebook.png')} style={{
                                            width: 30,
                                            height: 30
                                        }} />
                                        <Text style={{
                                            color: '#00507D',
                                            fontWeight: 'bold'
                                        }}>{item.text}</Text>
                                    </View>
                                )
                                return renderitem();
                            }}
                            keyExtractor={item => item.key}
                            horizontal={true}

                        />
                    </ScrollView>
                </View>
                <View>
                    <Text style={styles.title}>title </Text>
                    <Text style={styles.description}>{title}</Text>
                    <Text style={[styles.description, {
                        marginTop: 2,
                        color: 'black',
                        opacity: 0.3
                    }]}>265 View</Text>

                </View>
                <View>
                    <Text style={styles.title}>Description</Text>
                    <Text style={styles.description}>{description}

                    </Text>
                </View>

            </ScrollView>

            <View style={{
                height: 80,
                padding: 8,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
                elevation: 1

            }}>

                <View style={styles.viewContainer}>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: '600',
                    }}>Price </Text>

                    <Text style={{
                        margin: 8,
                        fontSize: 24,
                        fontWeight: 'bold'
                    }}>2000 DH</Text>
                </View>

                {isModalVisible && (
                    <Modal isVisible={true} onBackdropPress={toggleModal}>
                        <View style={styles.modalContainer}>
                            {/* Add your input fields (e.g., title, description, price) here */}
                            <TextInput
                                style={styles.input}
                                placeholder="Title"
                                value={title2}
                                onChangeText={setTitle2}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={description2}
                                onChangeText={setDescription2}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Price"
                                value={price2}
                                onChangeText={setPrice2}
                            />


                            <TouchableOpacity style={styles.confirmbutton} onPress={handleEditProduct}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                           
                        </View>
                    </Modal>
                )}



                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.editButton} onPress={toggleModal}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                

            </View>
        </SafeAreaView>
    )
}

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    wrap: {
        width: WIDTH,
        height: HEIGHT * 0.40,
        borderRadius: 10,
    },
    wrapDot: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignSelf: 'center'
    },
  
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 16,
        marginVertical: 8,
        letterSpacing: 1
    },
    description: {
        marginHorizontal: 16,
        letterSpacing: 0.5
    },
    viewContainer: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
   
    barsConatiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reviewAnalys: {
        backgroundColor: '#EFEFEF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderRadius: 10,
        margin: 16,
        padding: 10
    },
   
    titlePopup: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333333'

    },
    textArea: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        width: '100%',
        height: 150,
        textAlignVertical: 'top',
        borderRadius: 10,
        marginVertical: 16
    },



    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    editButton: {
        backgroundColor: '#00507D',
     
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },

    confirmbutton: {
        backgroundColor: '#00507D',
        marginTop:30,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    deleteButton: {
        backgroundColor: '#FF0000',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    input:{
        borderColor: '#00507D',
        borderWidth:2,
    borderRadius: 5,
    height:50,
        marginBottom:10
    }


})
