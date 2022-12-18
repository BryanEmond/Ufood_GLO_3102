<template>
  <div class="shrink-0 flex-row">
    <input
      placeholder="Search restaurants or reviewers"
      type="search"
      class="rounded border-solid border-2 w-3/4 placeholder:py-16 placeholder:p-2"
      @keyup.enter="search"
      v-model="searchQuery"
    />
    <span class="rounded border-solid border-2 p-1" @click="search">
      Search
    </span>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
    };
  },
  methods: {
    search() {
      console.log("searching for " + this.searchQuery);
      this.$router.push({
        path: "/search",
        query: { query: this.searchQuery },
      });
    },
  },
};
</script>

<style></style>
