<template>
  <v-app>
    <v-flex xs12 sm6 offset-sm3>     
      <v-flex xs12>
        <v-select v-model="selected" :items="items" label="Select" menu-props="auto" single-line ></v-select>
        <v-text-field color="#b28a00" label="Search" required v-model="search"></v-text-field>
        <v-card class="white--text">
          <ItemFilm v-for="(movie, index) in movies_search" v-bind:key="movie.title" v-bind:movie="movie"  v-on:edit="edit(movie)" v-on:remove="remove(index)"></ItemFilm>
        </v-card>
      </v-flex>
    </v-flex>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      items: ['title', 'director name', 'genre'],
      selected: 'title',
      search: '',
      newMovie: {
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        synopsis:'',
        genre: '',
        rating: []
      }
    }
  },
  methods: {
    resetNewMovie() {
      this.newMovie = {
        id: undefined,
        title: '',
        year: null,
        language: '',
        director: {
            name: '',
            nationality: '',
            birthdate: ''
        },
        genre: '',
        rating: [],
        newPoster: {
          file: null
        },
      };
    },

    createMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      this.$store.dispatch('AddMovieAPI', params).then(id => {
        this.$router.push({ name: 'home'})
      });
    }
  },
  computed: {
    movies() {
      return this.$store.state.movies;
    },
    movies_search: function() {
            
            switch (this.selected) {
              case "title":
                return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
                break;
              case "director name":
                return this.movies.filter(m => m.director.name.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
                break;
              case "genre":
                return this.movies.filter(m => m.genre.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
                break;
              default:
                break;
            }           
    }
  }
}
</script>