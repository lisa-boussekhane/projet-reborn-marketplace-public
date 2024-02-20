
# 01/02/2024 - Sprint 0 
Hier, nous avons rédigé le cahier des charges toutes les trois. Nous avons défini le MVP, les évolutions potentielles la liste des technologies, la cible, les rôles individuels, la liste des routes, les user stories ainsi que l'arborescence de l'application. 
Concernant les difficultés, nous ne nous étions pas rendues compte du nombre de pages que notre site allait nécessiter. 

Aujourd'hui nous avons prévu de rédiger le MCD, le MLD ainsi que le dico des données. Nous devons également nous renseigner concernant les obligations légales. 


# 02/02/2024 - Sprint 0 
Hier, nous avons réalisé le recueil des données, le dico des données le MCD & le MLD. Nous avons travaillé chacune de notre côté puis nous avons mis notre travail en commun. 

Aujourd'hui nous avons prévu de réaliser une partie des wireframes.

## Infos individuelles 
- Rita : Ajout des routes API. Se charge des wireframes : Homepage, About us, Payment, Product page, Sell my Reborn, Terms of sale, Privacy policy & Cookies policy.

- Sarah : Se charge des wireframes : Login, SignUp, Cart, User account, Delete my account, Reset my password, Private chat & Message to a private chat.

- Lisa : Réalisation de l'arborescence utilisateur (sous forme d'arbre). Se charge des wireframes : Search results, Products page, How it works, 404, My store, Create my store & Faq.


# 05/02/2024 - Sprint 0 
Vendredi, nous avons réalisé les wireframes de toutes nos routes.
Aujourd'hui nous devons les légender.

## Infos individuelles 
- Rita : Légende des wireframes : Homepage, About us, Payment, Product page, Sell my Reborn, Terms of sale, Privacy policy & Cookies policy
  
- Sarah : Légende des wireframes : Delete, Reset password et Chat 
  
- Lisa : Légende des wireframes : Search results, Products page, How it works, 404, My store, Create my store & Faq


# 06/02/2024 - Sprint 0
Hier, ajout des légendes sur les wireframes + call avec Etienne à 15h. Changement du MCD. 
Aujourd'hui on doit revoir les wireframes, changer le dico des données, le recueil des données et les user stories, arborescence utilisateur.

### Infos individuelles 
- Rita : Dico des données, wireframes : Homepage, Product, Sell my reborn  
- Sarah : Recueil des données, wireframes : Account, Chat
- Lisa : Arborescence utilisateur, user stories, wireframes : Reborns, header + footer commentaires.


# 07/02/2024 - Sprint 1
Hier, nous avons terminé le cahier des charges. Nous avons revu les wireframes, changer le dico des données, le recueil des données, les user stories et l'arborescence utilisateur. 
Aujourd'hui côté back nous voulons créer la bdd, commencer la création des tables. Côté front création du react-modele, app.jsx, des différents composants sans les interactions.
Chacune crée sa proche branche par feature. 

### Infos individuelles 
- Rita : Création de la bdd et création d'une partie des tables.
- Sarah : Création composants se connecter + sign up + reset password + payment + my account + my store + delete account
- Lisa : Création composants header + footer + homepage + 404 + create my store

# 08/02/2024 - Sprint 1
Hier, Rita a crée la BDD ainsi que les tables qui la compose. Elle a rencontré 2 soucis : le nom de l'utilisateur étaient en majuscule, cependant celle-ci ne prennent pas en compte les majuscules. Egalement, le type UUID n'existe pas avec postgresql donc elle l'a remplacé par INTEGER.
Côté front, Lisa a crée les dossiers des composants, le react modèle ainsi que le header + le footer. 
Sarah a créer les dossiers des composants, rédiger les pages reset my password, my account, delete account,  

### Infos individuelles
- Rita : modifier le wireframe sell my reborn, création des routes.
  
- Lisa : création des pages : 404, homepage, create my store, creation terms of sale, création privacy policy, cookies policy, faq, about us, contact us, 
  
- Sarah : réalisation du scss, + terminer my store et payment + reborns + page pdt + cart + how it works + search results

  # 09/02/2024 - Sprint 1
  Hier
  - Côté back :
  Rita a crée les routes, les modèles et a modifié les tables. Soucis rencontré : erreur lors de l'ajout des clés étrangères la relation "nom-de-la-table" n'existe pas -> solution : ajouter les clés   étrangères + fois que toutes les tables ont été créée. Impossible pour le front de se connecter à la bdd.
  - Côté front :
  Sarah, avec semantic ui, page how it works, payment, my store.
  Lisa, créations pages 404, homepage, create my store, obligations légales, about us, contact us + du scss version desktop. 
  
  
  ### Infos individuelles
- Rita : paramètrage user controller.
- Sarah : création composant reborns + page produit.
- Lisa : ajout des routes, page faq + version mobile.

 # 12/02/2024 - Sprint 1
 Vendredi 
 - Côté back :
   Tables, scinder userController + AuthController + 3 fonctions
- Côté front :
  Sarah : css composants cart sign up login product products + sell my reborn
  Lisa : ajout des routes + page faq

### Infos individuelles
- Rita : paramètrage routes userController + authenController + test routes Insomnnia
- Sarah : finir le css des composants account, my store, delete, reset 
- Lisa : css mobile + aide Rita

# 13/02/2024 - Sprint 1
Hier, côté back : exécuter la bdd + authController + productController + continuer userController + commencer seeding 
côté front : Sarah : css my account, my store, delete + reset 
             Lisa : css mobile de toutes les pages + menu burger 

### Infos individuelles
- Rita : finir seeding + paramètrage shopController
- Sarah : scss mobile pas tous + authentification front
- Lisa : userController + searchController +  test routes insomnnia + produits
  
# 14/02/2024 - Sprint 2  

Hier, côté back : Rita, seeding, authController, shopController, userController, jointure productController 
Lisa : searchController, getOrdersReturn, signUp front + back, products front 

Journée compliquée, recherche infructueuses pour régler notre problème d'authentification /login.

Coté front : Sarah : authentification front, quelques problèmes
- Rita : finir 2 jointures, paramètrage shopController + lister catégories et sous-catégorie.
- Sarah : searchResult front, se renseigner sur multer.
- Lisa : product:id front, vérifier controller getUserInfos + ajout des jointures, login

  # 15/02/2024 - Sprint 2
  Hier, côté back : Rita :  finir 2 jointures, paramètrage shopController + lister catégories et sous-catégorie + régler soucis
  Lisa : tenter de faire le login back + ajouts jointures + tenter de faire product:id front
  coté front : Sarah : login front

   ### Infos individuelles
  - Rita : chatController, password validator et validator js
  - Sarah : authentification front, searchResult, multer, catégories et sous-catégories
  - Lisa : authentification back, searchResult, product/:id front, getUserInfos
 
   # 16/02/2024 - Sprint 2
    Hier, côté back : Rita : rajout de seeding, paramètrage, chatController, méthode updatePasswword, validatorJs + passwordValidator, shortUniqueId
                      Lisa : authentification back, searchResult, product/:id front 
  côté front Sarah : login, multer, searchResult

  ### Infos individuelles 
- Rita : finir add seeding, stripe, paramètrage paiementController, route pour le chat
- Sarah : régler le problème du login, searchResult, multer, étoiles vendeur + page sellMyReborn, category 
- Lisa : panier, passwordValidator + validatorJs + shortUniqueIdpourlefront + page paiement

  # 19/02/2024 - Sprint 2
  Vendredi, côté back : Rita : stripe back, rajout de données de seeding + modifs base de données, routes pour le chat
  coté front :
  Sarah : multer front, logout, evaluation vendeur, liste catégories et sous-categories
  Lisa : panier, password validator et validatorJs, page paiement

   ### Infos individuelles
  - Rita : multer, implémenter socket io back, trouver package rating back+front
  - Lisa : voir page paiement, short uniqueId + sellmyreborn, seller username, supprimer compte et contact us 
  - Sarah : my account, regler page reborns, faire la page result, catégories et sous-categories

    # 20/02/2024 - Sprint 2
    Hier, Rita multer, implémenter socket io back.
    Sarah : voir categories et my account
    Lisa : seller username, supprimer compte, contact us, my shop, supprimer un article, conditianal rendering

     ### Infos individuelles
    - Rita : réparer le seeding, cleaner productController + majuscules models et index, rating si le temps le permet
    - Sarah : logout, categories, myaccount, result
    - Lisa : create shop, sellmyreborn, edit an article, ne plus se déconnecter lors du refresh + paiement si y a le temps 

    
