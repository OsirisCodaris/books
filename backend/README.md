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
```
{
  fullname: obligatoire une chaine de caractère contenant le nom complet de l'utilisateur (la casse n'etant pas respecter aucune difference n'est faite entre majuscule et miniscule)
  password: obligatoire chaine de caractère
}
```
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


## Les Documents

>Le système CRUD est utilisé ici l'ensemble des requete en cas d'echec auront la même structure 

###### Reponse standard d'une requête avec un message d'erreur
```json
{
    "message": "Le message d'erreur"
}
```

### Créer un document
> Pour ajouter un document une requete POST est effectuer a l'adresse v1/book
> Les informations nécessaires sont:
```
{
  "title": requis de type string
  "cover": optionnel de type file (si le fichier cover n'est pas envoyé une image par default sera insérer)
  "file": requis de type file
  "price" optionnel de type number
}
```
###### Exemple de réponse 
POST http://localhost:8081/v1/book
```json
{
  "id": 1,
  "title": "mon nouveau document",
  "price": "200",
  "cover": "cover-1592329310103.png",
  "file": "file-1592329310106.pdf",
  "updatedAt": "2020-06-16T17:41:50.118Z",
  "createdAt": "2020-06-16T17:41:50.118Z"
}
```
### Affichage des documents 

##### Tous les documents
> La requête est GET est effectuer à l'adresse v1/book

###### Exemple de réponse 
GET http://localhost:8081/v1/book
```json
{
  "books": [
      {
          "id": 20,
          "title": "moi4",
          "cover": "cover-1592326626471.jpg",
          "file": "file-1592326587061.pdf",
          "price": 200,
          "createdAt": "2020-06-16T16:56:27.000Z",
          "updatedAt": "2020-06-16T16:57:06.000Z"
      },
      {
          "id": 22,
          "title": "mon nouveau document",
          "cover": "cover-1592329310103.png",
          "file": "file-1592329310106.pdf",
          "price": 200,
          "createdAt": "2020-06-16T17:41:50.000Z",
          "updatedAt": "2020-06-16T17:41:50.000Z"
      }
  ]
}
```
##### Un document spécifique

> Tous comme pour afficher tous les document verbe GET est utilisé pour la requête
> cependant il faudra ajouté a l'adresse l'id du document voulu a l'adresse v1/book/:id

###### Exemple de requête
GET http://localhost:8081/v1/book/22
```json
{
  "id": 22,
  "title": "mon nouveau document",
  "cover": "cover-1592329310103.png",
  "file": "file-1592329310106.pdf",
  "price": 200,
  "createdAt": "2020-06-16T17:41:50.000Z",
  "updatedAt": "2020-06-16T17:41:50.000Z"
}
```
### Update ou mise à jour d'un document

> La mise à jour d'un document se fait comme a la création du document sauf que dans ce cas
> les information requises sont toute optionnelles et comme pour voir un document spécifique il faut ajouter l'id du document à l'adrres v1/book/:id, le verbe d'action est PUT

###### Exemple de requête 
PUT http://localhost:8081/v1/book/22
```json
{
  "title": "je change de text",
  "price": "200"
}
```
###### Reponse à la précedente requête
```json
{
    "book": 1 
}
```

la valeur 1 indique que la requête a été effectuer avec succès en cas d'échec la reponse sera toujours comme celle mentionné plus haut

### Supprimer un document
> Comme précedemment la requete est envoyé a l'adresse v1/book/:id en spécifiant l'id avec le verbe DELETE

###### Exemple de requete de suppression de document
DELETE http://localhost:8081/v1/book/22
###### Reponse à la précedente requête
```json
{
    "book": 1 
}
```
1 pour confirmé la suppression