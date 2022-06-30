<template>
  <v-textarea
    cols="30"
    rows="10"
    v-model="message"
    @keyup="encrypt"
  ></v-textarea>
  <v-textarea
    readonly
    cols="30"
    rows="10"
    :value="encryptedMessage"
  ></v-textarea>
  <v-textarea placeholder="Private key" cols="30" rows="10"></v-textarea>
</template>

<script>
import axios from "axios";
import * as openpgp from "openpgp";

export default {
  data() {
    return {
      pubKey: {},
      message: "",
      encryptedMessage: "",
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

    async encrypt() {
      if (this.message.length) {
        const encryptedMessage = await openpgp.encrypt({
          message: await openpgp.createMessage({ text: this.message }),
          encryptionKeys: this.pubKey,
        });

        this.encryptedMessage = encryptedMessage;
      } else {
        this.encryptedMessage = "";
      }
    },
  },
};
</script>

<style></style>
