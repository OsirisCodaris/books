<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" fixed="top">
      <b-navbar-brand class="home" @click="navigateTo({name: 'root'})">AcadéBooks</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
           <b-nav-item
            @click="navigateTo({name: 'book'})"
          >
            Bibliothèques
          </b-nav-item>

          <b-nav-item
            right
            v-if="!$store.state.isUserLoggedIn"
            @click="navigateTo({name: 'login'})"
          >
            Connexion
          </b-nav-item>
          <b-nav-item
            right
            v-if="!$store.state.isUserLoggedIn"
            @click="navigateTo({name: 'register'})"
          >
            Enregistrement
          </b-nav-item>
          <b-nav-item
            right
            v-if="$store.state.isUserLoggedIn"
            @click="loggout"
          >
            <b-icon icon="power"></b-icon>
            Déconnexion
          </b-nav-item>        
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    loggout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      // redirect to home page
      this.$router.push({
        name: "root"
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    cursor: pointer;
  }
</style>
