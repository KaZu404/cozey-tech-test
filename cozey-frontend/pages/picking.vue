<template>
  <div>
    <h1>Picking team</h1>

    <div v-for="product in products">
      <div>"{{ product.product.name }}" -> x{{ product.count }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [],
    };
  },

  async mounted() {
    this.products = await $fetch(
      "http://localhost:3000/product-picking-team/orders-products"
    );
  },
};
</script>
