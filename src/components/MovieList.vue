<template>
  <div id="movie-list">
    <div v-if="filteredMovies.length">
      <movie-item
        v-for="movie in filteredMovies"
        class="movie"
        :key="movie.id"
        :movie="movie.movie"
       
      >
        <div class="movie-sessions">
          <div
            v-for="session in filteredSessions(movie.sessions)"
            :key="session.id"
            class="session-time-wrapper tooltip-wrapper"
            v-tooltip="{seats: session.seats}"
          >
            <div class="session-time">{{formatSessionTime(session.time)}}</div>
          </div>
        </div>
      </movie-item>
    </div>
    <div v-else-if="movies.length" class="no-results">{{noResults}}</div>
    <div v-else class="no-results">Loading...</div>
  </div>
</template>

<script>
import MovieItem from "./MovieItem.vue";
import times from "../util/times";
export default {
  components: {
    MovieItem
  },
  props: ["genre", "time", "movies", "day"],
  data() {
    return {};
  },
  methods: {
    formatSessionTime(raw) {
      return this.$moment(raw).format('h:mm A');
    },
    filteredSessions(sessions) {
      return sessions.filter(this.sessionPassesTimeFilter);
    },
    sessionPassesTimeFilter(session) {
     
      if(!this.day.isSame(this.$moment(session.time),'day')) {
        return false;
      } else if(this.time.length === 0 || this.time.length === 2) {
        return true;
      } else if(this.time[0] === times.AFTER_6PM) {
        return this.$moment(session.time).hour() >= 18;
      } else {
        return this.$moment(session.time).hour() < 18;
      }
    }
    
  },
  computed: {
    filteredMovies() {
      return this.movies
        .filter(movie => {
          if (!this.genre.length) {
            return true;
          } else {
            const genreMovies = movie.movie.Genre.split(", ");
            let matched = true;
            this.genre.forEach(genre => {
              if (genreMovies.indexOf(genre) === -1) {
                matched = false;
              }
            });
            return matched;
          }
        })
        .filter(movie => movie.sessions.find(this.sessionPassesTimeFilter));
    },
    noResults() {
      let times = this.time.join(", ");
      let genres = this.genre.join(", ");
      return `No results for ${times}, ${genres}`;
    }
  }
};
</script>

<style>
</style>