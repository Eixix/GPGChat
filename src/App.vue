<template>
  <textarea cols="30" rows="10"></textarea>
  <textarea readonly cols="30" rows="10" :value="encryptedMessage"></textarea>
  <textarea placeholder="Private key" cols="30" rows="10"></textarea>
</template>

<script>
import axios from "axios";
import * as openpgp from "openpgp";

export default {
  data() {
    return {
      pubKey: {},
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      let armoredKey = await axios
        .get("pubkey")
        .then((response) => response.data);
      this.pubKey = await openpgp.readKey({ armoredKey: armoredKey });
    },
  },
};
</script>

<style></style>
