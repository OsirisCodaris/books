<template>
	<b-container>
		<div  class="d-flex justify-content-center">
			<b-card
        border-variant="primary"
        header="Enregistrement"
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
							:invalid-feedback="invalidFeedbackPassword"
							:state="statePassword"
						>
							<b-form-input
								id="input-2"
								type="password"
								:state="statePassword"
								v-model="form.password"
								required
								placeholder="Entrez votre mot de passe"
							></b-form-input>
						</b-form-group>
						<b-form-group
							id="input-group-3"
							label="Confirmer le mot de passe:"
							label-for="input-3"
							:invalid-feedback="invalidFeedbackConfirm"
							:state="stateConfirm"
						>
							<b-form-input
								id="input-3"
								type="password"
								v-model="confirm"
								:state="stateConfirm"
								required
								placeholder="Entrez à nouveau le mot de passe"
							></b-form-input>
						</b-form-group>
            <b-form-inline
              id="input-4"
            >
              <b-form-checkbox
                switch
                v-model="form.isadmin">
                est un admin ?
                </b-form-checkbox>
            </b-form-inline>
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
	name: 'Register',
	data () {
		return {
			form : {
				email : "",
        password :"",
        isadmin : false
			},
			confirm : "",
			error :"",
			message : false
		}
	},
	computed:{
		statePassword (){
			return (this.form.password.length >=8 && this.form.password.length <=32) ? true : false
		},
		invalidFeedbackPassword() {
			if (this.form.password.length > 0) {
				return 'Le mot de passe doit contenir entre 8 et 32 caractères'
			} else {
				return 'Rentrez quelques choses...'
			}
		},
		stateConfirm (){
			return (this.form.password.localeCompare(this.confirm) == 0 && this.statePassword) ? true : false
		},
		invalidFeedbackConfirm() {
			if(!this.stateConfirm && this.confirm){
				return 'Les mot de passe doivent etre identique'
			}
		}
	},
	methods :{
		async onSubmit (e){
			e.preventDefault()
			this.message = false
			this.error = false
			if(this.statePassword && this.stateConfirm){
				try{
          const resp = (await AuthentificationServices.register(this.form)).data
          this.message = "Utilisateur enregistré avec succès!"
          this.$store.dispatch('setToken', resp.token)
          this.$store.dispatch('setUser', resp.user)
				}catch(error){
					this.error = error.response.data.message
				}
			}else{
				this.error = "Les champs requis ne sont pas valides"
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
