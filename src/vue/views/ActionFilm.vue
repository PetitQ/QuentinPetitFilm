<template>
    <v-flex xs12 sm6 offset-sm3>
                    <v-card>
                        <v-card-text class="px-10">
                            <p v-if="add">Ajouter Film</p>   
                            <p v-else>Modifier Film</p> 
                            <v-text-field color="#b28a00" label="Titre" v-model="movie.title" ></v-text-field>
                            <v-text-field color="#b28a00" label="Année" v-model="movie.year" ></v-text-field>
                            <v-text-field color="#b28a00" label="Synopsis" v-model="movie.synopsis"></v-text-field>
                            <v-text-field color="#b28a00" label="Langage" v-model="movie.language"></v-text-field>
                            <v-text-field color="#b28a00" label="Genre" v-model="movie.genre"></v-text-field>
                            <v-text-field color="#b28a00" label="Réalisateur nom" v-model="movie.director.name"></v-text-field>
                            <v-text-field color="#b28a00" label="Réalisateur nationalité" v-model="movie.director.nationality"></v-text-field>
                            <v-text-field color="#b28a00" label="Réalisateur date de naissance" v-model="movie.director.birthdate"></v-text-field>
                            <div >
                              <p>Poster</p>
                              <input type="file" ref="posterInput" class="form-control-file" id="poster" accept=".png, .jpg, .jpeg" v-on:change="processFile($event)">
                            </div>
                            <div>
                              <v-img :src="movie.poster || 'no-poster.png'" height="125px" contain></v-img>
                            </div>
                            <v-btn v-if="add" color="success" v-on:click="createMovie()">Ajouter</v-btn>
                            <v-btn v-else color="success" v-on:click="updateMovie()">Sauvegarder</v-btn>
                            <v-btn color="success" v-on:click="$router.push({ name: 'home' })">retour</v-btn>
                                   
                        </v-card-text>
                    </v-card>
                </v-flex>
</template>

<script>
export default {
  data() {
    return{
      add:false,
      reader: new FileReader(),
      Newposter: {
            file: null
      },
    }
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },

    movies() {
      return this.$store.state.movies;
    },

    movie() {
      if (this.movies.find(movie => movie.id == this.id)){
        this.add = false;
        return this.movies.find(movie => movie.id == this.id);
      }
      else{
        this.add=true;
        return {
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
          ratings: [],
          
        }
      }
     
    }
  },
  methods: {
    processFile($event) {
      this.movie.poster = null;

      this.Newposter.file = $event.target.files[0];
      var self = this;
      this.reader.onload = function (e) {
        self.preview = e.target.result;
      };

      if (this.Newposter.file) {
        this.reader.readAsDataURL(this.Newposter.file);
      }
    },
    updateMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      this.$store.dispatch('UpdateMovieAPI', params).then(() => {
        this.$router.push({ name: 'home'})
      });
    },
    createMovie() {
      var params = { movie: this.movie, posterFile: this.Newposter.file };
      this.$store.dispatch('AddMovieAPI', params).then(id => {
        this.$router.push({ name: 'home'})
      });
      
    }
  }
}
</script>
