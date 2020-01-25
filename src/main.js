import Vue from 'vue';
import VueResource from 'vue-resource';
import VueRouter  from 'vue-router';
import './style.scss';
import genres from './util/genres';
import routes from './util/routes';
import moment from 'moment-timezone';
import {checkFilter,setDay} from './util/bus';
import Tooltip from './util/tooltip';

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Tooltip);
const router = new VueRouter({routes })
moment.tz.setDefault("UTC");
Object.defineProperty(Vue.prototype,'$moment',{ get() { return this.$root.moment} });
const bus = new Vue();
Object.defineProperty(Vue.prototype,'$bus',{ get() {return this.$root.bus}});
new Vue({
    el: '#app',
    data: {
        genre: [],
        time: [],
        movies: [],
        moment,
        day: moment(),
        bus
    },
    
    created() {
         this.$http.get('/api')
         .then( res => {
             this.movies = res.data;
         });
         this.$bus.$on('check-filter', checkFilter.bind(this));
         this.$bus.$on('set-day', setDay.bind(this));

     },
     router

});


