<template>
  <div id="page-wrap">
    <ProductsGrid :products="products" />
  </div>
</template>

<script>
import apiClient from '@/services/api';
import ProductsGrid from '../components/ProductsGrid.vue';

export default {
    name: 'ProductsPage',
    components: {
      ProductsGrid,
    },
    data() {
      return {
        products: [],
        backendBaseUrl: 'http://localhost:3000', // Replace with your backend base URL
      };
    },
    async created() {
      try {
        const response = await apiClient.get('/api/products');
        const products = response.data;
        // Update the image URLs for each product
        products.forEach(product => {
          product.image = `${this.backendBaseUrl}/images/${product.image}`;
        });
        this.products = products;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
};
</script>

