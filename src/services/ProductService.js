import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Replace with your API URL

const ProductService = {
    getAllProducts: () => {
        return axios.get(`${API_URL}/products`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching products', error);
                throw error;
            });
    },

    addProduct: (productData) => {
        return axios.post(`${API_URL}/products`, productData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding product', error);
                throw error;
            });
    },

    deleteProduct: (productId) => {
        return axios.delete(`${API_URL}/products/${productId}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting product', error);
                throw error;
            });
    },

    searchProducts: (searchQuery) => {
        return axios.get(`${API_URL}/products/search?query=${searchQuery}`)
            .then(response => response.data)
            .catch(error => {
                console.error('Error searching products', error);
                throw error;
            });
    },
};

export default ProductService;
