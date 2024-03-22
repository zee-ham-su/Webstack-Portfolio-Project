<template>
  <div class="product-item">
    <!-- Display product information -->
    <h3>{{ product.name }}</h3>
    <p>{{ product.description }}</p>
    <button @click="viewDetails">View Details</button>
  </div>
</template>

<script>
export default {
  name: 'ProductsGridItem',
  props: ['product'],
  methods: {
    viewDetails() {
      // Navigate to the ProductDetailPage with the product ID as a route parameter
      this.$router.push({ name: 'ProductDetailPage', params: { id: this.product._id } });
    }
  }
}
</script>

<style scoped>
.product-item {
    align-items: center;
    border-radius: 8px;
    box-shadow: 0px 2px 5px #888;
    display: flex;
    flex-direction: column;
    margin-bottom: 2%;
    padding: 20px;
    position: relative;
    width: 32%;
  }

  .product-name {
    margin-bottom: 0;
  }

  img {
    height: 200px;
    width: 200px;
  }

  a {
    width: 100%;
  }

  button {
    width: 100%;
  }
</style>