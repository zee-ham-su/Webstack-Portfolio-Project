<template>
  <div id="page-wrap">
    <h1>Shopping Cart</h1>
    <ProductsList :products="cartItems" v-on:remove-from-cart="removeFromCart($event)" />
    <h3 id="total-price">Total: ${{ totalPrice }}</h3>
    <button id="checkout-button">Proceed to Checkout</button>
  </div>
</template>

<script>
import apiClient from '@/services/api';
import ProductsList from '../components/ProductsList.vue';

export default {
  name: 'CartPage',
  components: {
    ProductsList,
  },
  data() {
    return {
      cartItems: [],
    }
  },
  computed: {
    totalPrice() {
      return this.cartItems.reduce(
        (sum, item) => sum + Number(item.price),
        0,
      );
    }
  },
  methods: {
    async removeFromCart(productId) {
      try {
        await apiClient.delete(`/api/carts/${productId}`);
        // Refresh cart items after removal
        this.refreshCart();
      } catch (error) {
        console.error('Error removing from cart:', error);
      }
    },
    async refreshCart() {
      try {
        const response = await apiClient.get('/api/carts');
        this.cartItems = response.data;
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    }
  },
  async created() {
    // Fetch initial cart items
    try {
      const response = await apiClient.get('/api/carts');
      this.cartItems = response.data;
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  },
};
</script>


<style scoped>
  h1 {
    border-bottom: 1px solid black;
    margin: 0;
    margin-top: 16px;
    padding: 16px;
  }

  #total-price {
    padding: 16px;
    text-align: right;
  }

  #checkout-button {
    width: 100%;
  }

  .product-container {
    align-content: 'center';
    border-bottom: 1px solid #ddd;
    display: flex;
    padding: 16px;
    width: 100%;
  }

  .product-image {
    flex: 1;
    height: 100px;
    max-width: 100px;
  }

  .details-wrap {
    padding: 0 16px;
    flex: 3;
  }

  .remove-button {
    flex: 1;
    margin: auto;
  }
</style>
