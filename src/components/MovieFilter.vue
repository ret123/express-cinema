<template>
  <div id="movie-filter">
    <h2>Filter results</h2>
    <h3>By time of day</h3>
    <div class="filter-group">
      <check-filter v-for="time in times" :key="time" :title="time" category="time" ></check-filter>
    </div>
    <h3>By genre</h3>
    <div class="filter-group">
      <check-filter v-for="genre in genres" :key="genre" :title="genre" category="genre"></check-filter>
    </div>
  </div>
</template>

<script>
import genres from "../util/genres";
import times from "../util/times";
import checkFilter from "./CheckFilter.vue";
export default {
  components: {
    checkFilter
  },
  data() {
    return {
      genres,
      times
    };
  },
  
};
</script>

<style>
</style>