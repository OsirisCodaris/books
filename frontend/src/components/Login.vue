<template>
	<b-container>
		<div  class="d-flex justify-content-center">
			<b-card
        border-variant="primary"
        header="Connexion"
        header-bg-variant="primary"
        header-text-variant="white"
        align="left"
				class="col-lg-6 col-md-6"
      >
        <b-card-body>
					<b-form
					@submit="onSubmit"
					class="col-12"
					>
						<b-form-group
							id="input-group-1"
							label="Adresse mail:"
							label-for="input-1"
						>
							<b-form-input
								id="input-1"
								type="email"
								v-model="form.email"
								required
								placeholder="Entrez votre email"
							></b-form-input>
						</b-form-group>
						<b-form-group
							id="input-group-2"
							label="Mot de passe:"
							label-for="input-2"
						>
							<b-form-input
								id="input-2"
								type="password"
								v-model="form.password"
								required
								placeholder="Entrez votre mot de passe"
							></b-form-input>
						</b-form-group>
						<b-alert 
							show 
							dismissible 
							v-if="message"
						>
							{{message}}
						</b-alert>
						<b-alert
							variant="danger"
							show 
							dismissible 
							v-if="error"
						>
							{{error}}
						</b-alert>
						<div class="text-center">
							<b-button
							type ="submit" 
							pill 
							variant="primary"
							align="center"
							>Enregister</b-button>
						</div>
					</b-form>
				</b-card-body>
      </b-card>
			
		</div>
	</b-container>
</template>

<script>
import AuthentificationServices from "@/services/AuthentificationServices"
export default {
	name: 'Connexion',
	data () {
		return {
			form : {
				email : "",
        password :""
			},
			error :"",
			message : false
		}
	},
	methods :{
		async onSubmit (e){
			e.preventDefault()
			this.message = false
			this.error = false
      try{
        const resp = (await AuthentificationServices.login(this.form)).data
        this.$store.dispatch('setToken', resp.token)
        this.$store.dispatch('setUser', resp.user)
        this.$router.push({
          name: "book"
        })
      }catch(error){
        this.error = error.response.data.message
      }
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
