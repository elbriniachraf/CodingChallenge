import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { API_IMAGE, API_URL } from '../utils/api';
import { FAB } from 'react-native-paper';
import BottomSheet from 'react-native-bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import ProductService from '../services/ProductService';


const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');


    // search
    const handleSearch = () => {
        ProductService.searchProducts(searchQuery)
            .then(products => {
                // Handle the fetched products
                console.log('Fetched products:', products);
                setProducts(products)
            })
            .catch(error => {
                console.error('Error searching products', error);
            });
    }



    // hide show modla
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    // add product
    const handleAddProduct = () => {
        const productData = {
            name: title,
            description:description,
            price: price,
        };

        ProductService.searchProducts(searchQuery)
            .then(products => {
                // Handle the fetched products
                console.log('Fetched products:', products);
            })
            .catch(error => {
                console.error('Error searching products', error);
            });
    };
   

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        ProductService.getAllProducts()
            .then(products => setProducts(products))
            .catch(error => {
                console.error('Error fetching products', error);
            });
    };


    const navigation2=useNavigation();
    
    const handleProductPress = (product) => {
        navigation2.navigate('Product', {
            title: product.name,
            description: product.description,
            id: product.id,
            image: product.image,
            price:product.price
        });
    };


    const renderProductCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.cont}>
                <View style={styles.productCard}>
                    <Image source={{ uri: API_IMAGE + item.image }} style={styles.productImage} />
                    <Text style={styles.tag}>aaaaa</Text>
                    <Text style={styles.titleProduct}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>


            <View style={styles.header}>
                <Text style={styles.title}>Discover the News Products</Text>
                <Ionicons name="filter" size={24} color="black" />
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Enter product name"
                value={searchQuery}
                onChangeText={text => setSearchQuery(text)}
            />

            <FlatList
                data={products}
                renderItem={renderProductCard}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={handleAddProduct} 
            
            />

           {isModalVisible && (
        <Modal isVisible={true} onBackdropPress={toggleModal}>
          <View style={styles.modalContainer}>
            {/* Add your input fields (e.g., title, description, price) here */}
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              style={styles.input}
              placeholder="Price"
              value={price}
              onChangeText={setPrice}
            />

            <Button title="Add" onPress={handleAddProduct} />
          </View>
        </Modal>
           )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
  
        paddingHorizontal: 16,
        paddingTop: 24,
     
    },

    cont:{
        width:"50%",
        marginEnd:20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color:"black"
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 3,
        margin: 10,
        width:"100%",
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    tag: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    titleproduct: {
        fontSize: 14,
        color: 'gray',
    },

    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },


    modalContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
    },
    input: {
        marginBottom: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },

    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },

});

export default HomeScreen;
