<template>
    <div id="detail" v-if="movie">
        <movie-item :movie="movie" class="movie">
            <div class="movie-details">
                <p class="movie-genre">{{movie.Genre}}</p>
                <p class="movie-plot">{{movie.Plot}}</p>
                <table>
                    <tr><td>Released Date: </td><td>{{movie.Released}}</td></tr>
                    <tr><td>Running time: </td><td>{{movie.Runtime}}</td></tr>
                    <tr><td>Director: </td><td>{{movie.Director}}</td></tr>
                    <tr><td>Cast: </td><td>{{movie.Actors}}</td></tr>
                </table>
            </div>
        </movie-item>
        <div class="home">
            <router-link :to="{name: 'home'}">Back to Home Page</router-link>
        </div>
    </div>
  
</template>

<script>
import MovieItem from './MovieItem.vue';
export default {
   props: ['movies'],
   computed: {
       movie() {
           let movie=this.movies.find(movie => movie.id === this.$route.params.id);
           return movie ? movie.movie : null;
       }
   },
   components: {
       MovieItem
   }
}
</script>

<style>

</style>