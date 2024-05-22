<template>
  <div>
    <h1>Customer</h1>

    <form @submit.prevent="placeOrder">
      <div>
        <div>Shipping address</div>
        <input type="text" v-model="shippingAddress" />
      </div>

      <div>
        <div>Name</div>
        <input type="text" v-model="customerName" />
      </div>

      <div>
        <div>Email</div>
        <input type="email" v-model="customerEmail" />
      </div>

      <div>
        <h2>Select items</h2>
        <div
          class="item"
          v-for="item in lineItems"
          :key="item.uuid"
          @click="() => toggleItemSelection(item)"
          :class="{ selected: item.selected }"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>

      <button>Submit</button>
    </form>
  </div>
</template>

<script>
// TODO: add a loader during data fetching

export default {
  data() {
    return {
      lineItems: [],

      shippingAddress: "",
      customerName: "",
      customerEmail: "",
    };
  },

  async mounted() {
    const result = await $fetch("http://localhost:3000/customer/line-items");

    this.lineItems = result.map((item) => {
      return { ...item, selected: false };
    });
  },

  methods: {
    toggleItemSelection(item) {
      item.selected = !item.selected;
    },

    async placeOrder() {
      const body = {
        shippingAddress: this.shippingAddress,
        customerName: this.customerName,
        customerEmail: this.customerEmail,
        lineItems: this.lineItems
          .filter(({ selected }) => selected === true)
          .map(({ uuid }) => uuid),
      };

      await $fetch("http://localhost:3000/customer/order", {
        method: "POST",
        body: body,
      });

      location.reload();
    },
  },
};
</script>

<style>
.item {
  padding: 10px;
  border: solid 1px grey;
}

.item.selected {
  border: solid 2px red;
}
</style>
