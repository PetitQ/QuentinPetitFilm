<template>
<div>
  <v-toolbar class="white--text" color="#d1a202">   
      <v-toolbar-title v-on:click="$router.push({ name: 'home' })">{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn class="white--text" flat :to="{ name: 'add_movie'}">
          Ajout
          <v-icon right dark>local_movies</v-icon>
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
   
  <main>
    <router-view></router-view>
  </main>
</div>
</template>

<script>
export default {
  data() {
    return {
      title: 'QuentinPetitFilms',
      search: "",
    }
  },
  computed: {
        movies_search: function() {
            return this.movies.filter(m => m.title.toLowerCase().indexOf(this.search.toLowerCase())!=-1);
        }
    }
}
</script>