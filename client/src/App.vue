<template>
  <router-view />
</template>
<script>
import jwt_decode from "jwt-decode";
import { useStore } from "vuex";
export default {
  name: "app",

  created() {
    const store = useStore();
    if (localStorage.eleToken) {
      const decoded = jwt_decode(localStorage.eleToken);
      store.dispatch("setAuthenticatde", this.isEmpth(decoded));
      store.dispatch("setUser", decoded);
    }
  },

  methods: {
    isEmpth(value) {
      value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0);
    },
  },
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
