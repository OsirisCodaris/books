# Backend Api

## Requête pour l'authentification

### Enregistrement d'un Utilisateur

##### Requête
> Pour enregistrer un Utilisateur un requête POST doit être effectuer sur à l'adresse v1/register
> les informations requis sont
```
{
  fullname: obligatoire un string
  phone1: obligatoire un string
  phone2: optionnel mais doit figure a l'envoie une valeur de "" peut lui etre associer
  email: obligatoire string de type email
  password: obligatoire un string
}
```
###### exemple de requete
POST http://localhost:8081/v1/register
```json
{
  "fullname": "Brunel ngbwa",
  "phone1": "074723468",
  "phone2": "+241066127548",
  "email" : "engoro3@gmail.com",
  "password" : "12345678"
}
```


##### Reponse
> un json est envoyé comme reponse
> en cas de succès il ressemblera a 
```json
{
  "user": 1 // id de l'utilisateur enregistrer
}
```
en cas d'echec:
```json
{
  "message" : "le message d'erreur"
}
```


### Connexion d'un utilisateur

##### Requête

> Pour permettre la connexion d'un utilisateur un requete POST doit être envoyé vers la v1/login
> les informations doit être contenu dans un json ayant cette architecture

{
  fullname: obligatoire une chaine de caractère contenant le nom complet de l'utilisateur (la casse n'etant pas respecter aucune difference n'est faite entre majuscule et miniscule)
  password: obligatoire chaine de caractère
}
###### exemple de requete
POST http://localhost:8081/v1/login
```json
{
  "fullname": "my fullname",
  "password": "password"
}
```

##### Reponse 
> un token est renvoyé. ce token doit être stoké et renvoyé lors des requête nécessitant l'authentification de l'utilisateur

###### exemple de reponse correct
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZnVsbG5hbWUiOiJCcnVuZWwgbmdid2EiLCJlbWFpbCI6ImVuZ29ybzNAZ21haWwuY29tIiwicGhvbmUxIjoiMDc0NzIzNDY4IiwicGhvbmUyIjoiMDc0NzIzNDY4IigfhfsisiwicGFzc3dvcmQiOiIkMmIkMTAkNW1qR0Z2b2wxcUVUMW1WNUhsdEcvdVlEVjh6SFBUd2ZtVUhReFl2QXczY1AxdGQudXUxdHUiLCJjcmVhdGVkQXQiOiIyMDIwLTA2LTE1VDE2OjEwOjMxLjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIwLTA2LTE1VDE2OjEwOjMxLjAwMFoiLCJpYXQiOjE1OTIyMzc0NTUsImV4cCI6MTU5Mjg0MjI1NX0.O-l3K66xs02gxwlve1FDr5sGXt9L-nUt7fWHq-9qDkM"
}
```

En cas d'échec d'authentification un message d'erreur est renvoyé au format json
```json
{
    "message": "Les informations envoyées sont incorrects"
}
```