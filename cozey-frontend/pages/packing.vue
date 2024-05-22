<template>
  <div>
    <h1>Packing team</h1>

    <div v-for="order in orders" class="order">
      <h2>Order #{{ order.uuid }}</h2>
      <h3>Order date #{{ order.date }}</h3>
      <div>
        <h3>Items</h3>
        <div v-for="item in order.lineItems">
          <div>
            <h4>{{ item.name }}</h4>
            <div v-for="product in item.products">
              <h5>{{ product.name }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3>Ships to</h3>
        <h4>{{ order.customerName }}</h4>
        <h4>{{ order.shippingAddress }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },

  async mounted() {
    this.orders = await $fetch("http://localhost:3000/packing-team/orders");
  },
};
</script>


<style>
.order {
    padding-bottom: 42px;
}
</style>