<template>
  <v-flex xs12 pb-4>
    <v-card color="#b28a00" class="white--text"> 
      <v-layout>
        <v-flex xs5>
          <v-img :src="movie.poster || 'no-poster.png'" height="125px" contain></v-img>
        </v-flex>
        <v-flex xs7>
          <v-card-title primary-title>
            <div>
              <div class="headline">{{ movie.title }} 
                <v-icon v-on:click="DetailFilm = !DetailFilm">info</v-icon>
              </div>
              <div>
                ({{ movie.year }})
                <div v-if="movie.ratings"> 
                  {{ movieRate }} / 5
                  <small class="text-muted">({{ movie.ratings.length }} notes)</small>
                </div>
              </div>
            </div>
          </v-card-title>
        </v-flex>
      </v-layout>

      <v-divider light></v-divider>

      <v-card-actions class="pa-3">
        <v-flex xs6>
          <p>Donnez votre note : </p>
        </v-flex>
        <v-flex xs7>
          <p>
            <star-rating :star-size="30" :increment="0.5" :show-rating="false" v-model="userRating"></star-rating>  
          </p>  
        </v-flex>
        <v-flex xs3>
          <v-btn color="success" v-on:click="sendRating(movie.id)">Valider</v-btn>
        </v-flex>
      </v-card-actions>

      <v-divider light></v-divider>
      
      <div class="movie-details pl-2" v-if="DetailFilm" >    
        <p>
          <i>Réalisé par {{ movie.director.name }}</i><br>
          <i>{{ movie.genre }}</i><br>
          Synopsis : {{ movie.synopsis }}</p>
        <p>
          <v-btn color="success" :to="{ name: 'edit_movie', params: { id: movie.id } }">Edit</v-btn>
          <v-btn color="error" v-on:click="deleteMovie(movie.id)" >Destroy</v-btn>
        </p>
      </div>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  props: ["movie"],
  data: function () {
    return {
      DetailFilm: false,
      userRating: 3
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },
    movieRate() {
      return Math.round(this.movie.ratings.reduce((a, b) => a + b, 0) / this.movie.ratings.length * 10) / 10;
    }
  },
  methods: {
    deleteMovie(id) {
      if (confirm("Voulez-vous vraiment supprimer ce film ?")) {
        this.$store.dispatch('DeleteMovieAPI', id).then(() => {
          this.$router.push({ name: 'home' })
        });
      }
    },

    sendRating(id) {
      this.$store.dispatch('RateMovieAPI', { id: id, rating: this.userRating }).then(() => {
        console.log("sucess");
      }).catch(() => {
        console.log("error");
      });
    }
  }
}
</script>