<template>
  <div id="page-wrap" v-if="product">
    <div id="img-wrap">
      <img :src="product.image" />
    </div>
    <div id="product-details">
      <h1>{{ product.name }}</h1>
      <h3 id="price">${{ product.price }}</h3>
      <p>Average rating: {{ product.averageRating }}</p>
      <button id="add-to-cart" v-if="!itemIsInCart && !showSuccessMessage" @click="addToCart"
        :class="{ 'btn-animated': showSuccessMessage }">Add to Cart</button>
      <button id="add-to-cart" class="green-button" v-if="!itemIsInCart && showSuccessMessage"
        :class="{ 'btn-animated': showSuccessMessage }">Successfully added item to cart!</button>
      <button id="add-to-cart" class="grey-button" v-if="itemIsInCart"
        :class="{ 'btn-animated': showSuccessMessage }">Item is already in cart</button>
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </div>
  </div>
  <NotFoundPage v-else />
</template>

<script>
import { ref, onMounted } from 'vue';
import apiClient from '@/services/api';
import NotFoundPage from './NotFoundPage';

export default {
  name: 'ProductDetailPage',
  components: {
    NotFoundPage,
  },
  setup() {
    const product = ref({});
    const showSuccessMessage = ref(false);
    const itemIsInCart = ref(false);

    const addToCart = () => {
      if (product.value._id) {
        this.$emit('add-to-cart', product.value._id);
      }
    };

    const getProduct = async () => {
      try {
        const { data: fetchedProduct } = await apiClient.get(`/api/products/${this.$route.params.id}`);
        product.value = fetchedProduct;
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    onMounted(() => {
      getProduct();
    });

    return {
      product,
      showSuccessMessage,
      itemIsInCart,
      addToCart,
    };
  },
};
</script>


<style scoped>
#page-wrap {
  margin-top: 16px;
  padding: 16px;
  max-width: 600px;
}

#img-wrap {
  text-align: center;
}

img {
  width: 400px;
}

#product-details {
  padding: 16px;
  position: relative;
}

#add-to-cart {
  width: 100%;
  transition: background-color 0.3s ease;
}

#price {
  position: absolute;
  top: 24px;
  right: 16px;
}

.green-button {
  background-color: green;
}

.grey-button {
  background-color: #888;
}

.btn-animated {
  animation: pulse 0.5s ease;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
