import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from rest_framework.authtoken.models import Token
import re

class UserManager(BaseUserManager):
    """
    Gestionnaire personnalisé pour le modèle User.
    
    Méthodes :
    - create_user(email, **extra_fields) : Crée un utilisateur avec l'email spécifié.
    - create_superuser(email, password=None, **extra_fields) : Crée un superutilisateur avec l'email et le mot de passe spécifiés.
    """
    def create_user(self, email, **extra_fields):
        if email is None:
            raise TypeError('Users should have an email')
        user = self.model(email=self.normalize_email(email), is_staff=False, is_active=True, is_superuser=False, date_joined=timezone.now(), last_login=timezone.now(), **extra_fields)
        user.save()
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if email is None:
         raise TypeError('Superusers must have an email')
         if password is None:
            raise TypeError('Superusers must have a password')

        user = self.model(email=self.normalize_email(email), is_staff=True, is_active=True, is_superuser=True, date_joined=timezone.now(), **extra_fields)
        user.set_password(password)
        user.save()
        return user
class Laboratoire(models.Model):
    """Modèle représentant un laboratoire de recherche.

    Attributs :
    - id_laboratoire : Identifiant unique du laboratoire (AutoField).
    - nom : Nom du laboratoire (CharField).
    - description : Description du laboratoire (TextField).
    """
    id_laboratoire = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    # # Chercheur=models.ManyToManyField('Chercheur', related_name='Labo_chercheur')
    # Partenaire=models.ManyToManyField(Partenaire_labo, related_name='Labo_partner')

    def __str__(self):
        return self.nom
class Equipe_Recherche(models.Model):
    """Modèle représentant une équipe de recherche.

    Attributs :
    - id_equipe_recherche : Identifiant unique de l'équipe (AutoField).
    - nom : Nom de l'équipe (CharField).
    - axe_recherche : Axe de recherche de l'équipe (TextField).
    - problematique : Problématique de l'équipe (TextField).
    - objectif : Objectif de l'équipe (TextField).
    - laboratoire : Référence au laboratoire auquel l'équipe est associée (ForeignKey).
    - theme : Thème de recherche de l'équipe (CharField).
    """
    id_equipe_recherche = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    axe_recherche=models.TextField(default='')
    problematique=models.TextField(default='')
    objectif=models.TextField(default='')
    laboratoire = models.ForeignKey(Laboratoire, related_name="Equipe_recherche", on_delete=models.CASCADE, default=None)
    theme=models.CharField(max_length=255, default='')
    def __str__(self):
        return self.nom

class Club(models.Model):
    """Modèle représentant un club.

    Attributs :
    - id_club : Identifiant unique du club (AutoField).
    - nom : Nom du club (CharField).
    - slogan : Slogan du club (CharField).
    - description : Description du club (TextField).
    - logo : Logo du club (ImageField).
    - president : Nom du président du club (CharField).
    """
    id_club = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    slogan = models.CharField(max_length=255)
    description = models.TextField()
    logo = models.ImageField(upload_to='club/', null=True, blank=True)
    president = models.CharField(max_length=255, null=True, blank=True)  
   
  
    
    def __str__(self):
        return self.nom

class event_inscription(models.Model):
    """Modèle représentant une inscription à un événement.

    Attributs :
    - titre : Titre de l'événement (CharField).
    - description : Description de l'événement (TextField).
    - link : Lien vers plus d'informations sur l'événement (URLField).
    - date_archivage : Date d'archivage de l'événement (DateTimeField).
    - club : Référence au club organisateur de l'événement (ForeignKey).
    - image : Image associée à l'événement (ImageField).
    """
    titre = models.CharField(max_length=255)
    description = models.TextField()
    link = models.URLField(max_length=255)
    date_archivage= models.DateTimeField(null=True, blank=True)
    club = models.ForeignKey(Club, related_name="Club", on_delete=models.CASCADE, default=None)
    image = models.ImageField(upload_to='publications/', null=True, blank=True)
    
    def __str__(self):
        return self.titre

     

# titre, contenu , id publication

class Categorie(models.Model):
    """Modèle représentant une catégorie.

    Attributs :
    - id_categorie : Identifiant unique de la catégorie (AutoField).
    - nom : Nom de la catégorie (CharField).
    """
    id_categorie = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class Utilisateur(AbstractBaseUser, PermissionsMixin):
    """Modèle représentant un utilisateur du système.

    Attributs :
    - email : L'email unique de l'utilisateur.
    - family_name : Le nom de famille de l'utilisateur.
    - first_name : Le prénom de l'utilisateur.
    - type : Type d'utilisateur (ex. chercheur, éditeur).
    - is_staff : Indique si l'utilisateur peut accéder à l'interface d'administration.
    - is_superuser : Indique si l'utilisateur a tous les droits.
    - is_active : Indique si le compte de l'utilisateur est actif.
    - date_joined : Date à laquelle l'utilisateur a été créé.
    - last_login : Date de la dernière connexion de l'utilisateur.
    - is_chercheur : Indique si l'utilisateur est un chercheur.
    - is_adminstrateur : Indique si l'utilisateur est un administrateur.
    - is_editeur : Indique si l'utilisateur est un éditeur.
    - is_responsable_fablab : Indique si l'utilisateur est responsable d'un fablab.
    - is_directeur_relex : Indique si l'utilisateur est directeur Relex.
    - equipeRecherche : Référence à l'équipe de recherche à laquelle l'utilisateur appartient.
    - Categorie : Référence à la catégorie de l'utilisateur.
    - is_club : Indique si l'utilisateur fait partie d'un club.
    - club : Référence au club auquel l'utilisateur appartient.
    """
    email = models.EmailField(max_length=254, default="", unique=True)
    family_name = models.CharField(max_length=254, null=True, blank=True)
    first_name = models.CharField(max_length=254, null=True, blank=True)
    # full_name = models.CharField(max_length=254, null=True, blank=True)
    type = models.CharField(max_length=254, null=False, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(null=True, blank=True)
    is_chercheur=models.BooleanField(default=False)
    is_adminstrateur=models.BooleanField(default=False)
    is_editeur=models.BooleanField(default=False)
   
    is_responsable_fablab=models.BooleanField(default=False)
    is_directeur_relex=models.BooleanField(default=False)
    equipeRecherche = models.ForeignKey(Equipe_Recherche, related_name='chercheurs', on_delete=models.CASCADE, null=True, blank=True)
    Categorie=models.ForeignKey(Categorie,  related_name="categorie", on_delete=models.SET_NULL, null=True)
    is_club = models.BooleanField(default=False)
    club = models.ForeignKey(Club, related_name="club", on_delete=models.CASCADE, null=True)
    




    #categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE, related_name='publications',default=1)
    contact = models.IntegerField(null=True, blank=True)
    objects = UserManager()  
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    def save(self, *args, **kwargs):
        # Check if the user is newly created
        if not self.pk:
            # Check if the email is valid
            is_valid_email = self.validate_email(self.email)
            if is_valid_email:
                # Create the user
                super().save(*args, **kwargs)
                # Generate the token
                token, _ = Token.objects.get_or_create(user=self)
                return token.key
            else:
                # Handle invalid email
                raise ValueError("Invalid email format")
        else:
            # For existing users, just save normally
            super().save(*args, **kwargs)
    @staticmethod
    def validate_email(email):
        """Valide l'email en vérifiant s'il correspond au domaine esi.dz."""
        if re.match(r'^[a-zA-Z0-9._%+-]+@esi\.dz$', email):
            return True
        else:
            return False


# class ChercheurManager(models.Manager):
#     def get_queryset(self,*arg,**kwargs):
#         return super().get_queryset(*arg,**kwargs).filter(is_chercheur=True)




   

#club









    

class MembreClub(models.Model):
    """Modèle représentant un membre d'un club.

    Attributs :
    - id_membre : Identifiant unique du membre (AutoField).
    - nom : Nom du membre (CharField).
    - prenom : Prénom du membre (CharField).
    - post : Poste ou rôle du membre dans le club (TextField).
    - club : Relation avec le modèle Club (ForeignKey). 
             Chaque membre appartient à un club spécifique.
    """
    id_membre=models.AutoField(primary_key=True)    
    nom = models.CharField(max_length=255)
    prenom= models.CharField(max_length=255)
    post= models.TextField()
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='membres')

    def __str__(self):
        return self.nom     
    
#publications    
class Publication(models.Model):
    """
    Modèle représentant une publication dans le système.

    Attributs :
    - id_publication (int) : Clé primaire, ID auto-incrémenté de la publication.
    - titre (str) : Titre de la publication.
    - description (str) : Description détaillée de la publication.
    - image (ImageField) : Image optionnelle associée à la publication, stockée dans le dossier 'publications/'.
    - etat (str) : État de la publication, par défaut 'en attente'. Peut aussi être 'valide' ou 'rejeté'.
    - type_publication (str) : Type de la publication, tel que 'event', 'actualité' ou 'article'.
    - date_debut (DateTime) : Date de début de l'événement ou de la publication, optionnelle.
    - date_fin (DateTime) : Date de fin de l'événement ou de la publication, optionnelle.
    - date_publication (DateTime) : Date à laquelle la publication devient publique, optionnelle.
    - date_creation (DateTime) : Date de création automatique de la publication.
    - publisher (ForeignKey) : L'utilisateur qui a créé ou possède la publication, lié au modèle `Utilisateur`.
    - visiteur (str) : Nom du visiteur associé à la publication, par défaut 'Pr Jalil BOUKHOBZA'.
    - lieu (str) : Lieu de la publication ou de l'événement, par défaut 'salle conférence'.
    
    """
    id_publication = models.AutoField(primary_key=True)
    titre = models.CharField(max_length=255)
    description = models.TextField()
   
    # image = CloudinaryField('image', null=True, blank=True)
    image = models.ImageField(upload_to='publications/', null=True, blank=True)
    etat = models.CharField(max_length=50,default="en attente")  # valide, en attente, rejeté
    type_publication = models.CharField(max_length=50)  # event/actualité/article
    date_debut = models.DateTimeField(null=True, blank=True)
    date_fin = models.DateTimeField(null=True, blank=True)
    date_publication = models.DateTimeField(null=True, blank=True)
    date_creation = models.DateTimeField(null=True,auto_now_add=True)
    #I don't think it should be a class by it's own if we won't change the class frequently
    # category=models.CharField(max_length=50)
    publisher = models.ForeignKey(Utilisateur, on_delete=models.CASCADE, related_name='publications')
    visiteur=models.CharField(max_length=50, default='Pr Jalil BOUKHOBZA')
    lieu=models.CharField(max_length=50, default='salle conférence')

    def __str__(self):
        return self.titre

class section(models.Model):
    """
    Modèle représentant une section au sein d'une publication.

    Attributs :
    - titre (str) : Titre de la section.
    - contenu (str) : Contenu de la section.
    - id_publication (ForeignKey) : Référence à la publication liée, utilisant le modèle `Publication`.
    
    """
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    id_publication = models.ForeignKey(Publication, related_name="publication", on_delete=models.CASCADE, default=None)
    def __str__(self):
        return self.titre   

#recherche




class Partenaire_labo(models.Model):
    """
    Modèle représentant un partenaire associé à un laboratoire.

    Attributs :
    - `nom` : Nom du partenaire (CharField, longueur maximale 255).
    - `description` : Description du partenaire (TextField).
    - `contact` : Numéro de contact du partenaire (IntegerField, facultatif).
    - `email` : Adresse email du partenaire (EmailField).
    - `laboratoire` : Référence au laboratoire associé (ForeignKey vers le modèle `Laboratoire`, suppression en cascade possible).
    """
    nom = models.CharField(max_length=255)
    description = models.TextField()
    contact = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=255)
    laboratoire = models.ForeignKey(Laboratoire, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.nom


'''
class Chercheur(Utilisateur):
    
    equipe = models.ForeignKey(Equipe_Recherche, related_name='chercheurs', on_delete=models.CASCADE, default=None)
    def __str__(self):
        return f"{self.family_name} {self.first_name}"
'''
# class Chercheur(Utilisateur):
#     objects=ChercheurManager()
    
#     def save(self,*arg,**kwargs):
#         if not self.pk:
#             self.is_chercheur=True
#         return super().save(*arg,**kwargs)            

#     class Meta:
#         proxy = True

# class ChercheurEquipe(Chercheur):
#     equipe = models.ForeignKey(Equipe_Recherche, related_name='chercheurs', on_delete=models.CASCADE, default=None)
#     class Meta:
#         verbose_name = 'Chercheur'
#         verbose_name_plural = 'Chercheurs'

class Equipe_Projet(models.Model):
    """
    Modèle représentant une équipe de projet.

    Attributs :
    - `id_equipe_projet` : Identifiant unique de l'équipe de projet (AutoField).
    - `nom` : Nom de l'équipe de projet (CharField).
    - `Chercheur` : Relation Many-to-Many avec le modèle `Utilisateur`, représentant les chercheurs qui participent à cette équipe.
    - `laboratoire` : Référence au laboratoire associé (ForeignKey vers le modèle `Laboratoire`, suppression en cascade possible).
    """
    id_equipe_projet = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    Chercheur=models.ManyToManyField('Utilisateur', related_name='equipe_projet')
    laboratoire = models.ForeignKey(Laboratoire, related_name="Equipes_projet", on_delete=models.CASCADE, default=None)
  
    def __str__(self):
        return self.nom
    
class Theme_Recherche(models.Model):
    """
    Modèle représentant un thème de recherche.

    Attributs :
    - `id_theme` : Identifiant unique du thème (AutoField).
    - `nom` : Nom du thème de recherche (CharField).
    - `description` : Description détaillée du thème (TextField).
    """
    id_theme = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    # projets=models.ManyToManyField(Projet,related_name= "themes")

    def __str__(self):
        return self.nom


class Projet(models.Model):
    """
    Modèle représentant un projet de recherche.

    Attributs :
    - `id_projet` : Identifiant unique du projet (AutoField).
    - `nom` : Nom du projet (CharField).
    - `description` : Description du projet (TextField).
    - `equipe_projet` : Référence à l'équipe de projet associée (ForeignKey vers le modèle `Equipe_Projet`).
    - `themes` : Référence au thème de recherche associé (ForeignKey vers le modèle `Theme_Recherche`).
    - `type` : Type de projet (CharField).
    - `annee` : Année de lancement ou de réalisation du projet (IntegerField).
    """
    id_projet = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    equipe_projet = models.ForeignKey(Equipe_Projet, on_delete=models.CASCADE)
    themes=models.ForeignKey(Theme_Recherche,related_name= "themes", on_delete=models.CASCADE)
    type = models.CharField(max_length=255)
    # type=models.models.CharField( max_length=50)
    annee=models.IntegerField()
    def __str__(self):
        return self.nom










        



#from here it should be in another app not in this one
    

class Demande_Partenariat(models.Model):
    """
    Modèle représentant une demande de partenariat soumise à l'organisation.

    Attributs :
    - `nom` : Le nom de la personne faisant la demande.
    - `prenom` : Le prénom de la personne faisant la demande.
    - `profession` : La profession de la personne.
    - `country` : Le pays d'origine de la personne ou de l'organisation.
    - `organisme` : Le nom de l'organisation faisant la demande de partenariat.
    - `etat` : L'état actuel de la demande (e.g., 'Acceptée', 'Refusée').
    - `tailleOrganisme` : La taille de l'organisation (facultatif).
    - `phoneNumber` : Le numéro de téléphone associé à la demande (facultatif).
    - `email` : L'adresse email pour contacter la personne ou l'organisation.
    - `websiteUrl` : Le site web de l'organisation.
    """
    nom = models.CharField(max_length=255)
    prenom=models.CharField(max_length=255)
    profession=models.CharField(max_length=255)
    country=models.CharField(max_length=255)
    organisme=models.CharField(max_length=255)
    etat = models.CharField(max_length=50)
    tailleOrganisme=models.IntegerField(null=True, blank=True)
    phoneNumber = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=255)
    websiteUrl = models.TextField()
    def __str__(self):
        return self.nom
    



class Competence(models.Model):
    nom = models.CharField(max_length=100)
    def __str__(self):
        return self.nom

class Formateur(models.Model):
    """
    Modèle représentant un formateur.

    Attributs :
    - nom (CharField) : Le nom de famille du formateur, limité à 100 caractères.
    - prenom (CharField) : Le prénom du formateur, limité à 100 caractères.
    - email (EmailField) : L'adresse e-mail du formateur.
    - specialites (TextField) : Les spécialités du formateur, sous forme de texte libre.
    """
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    specialites = models.TextField()

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Module(models.Model):
    """
    Modèle représentant un module de formation.

    Attributs :
    - `titre` (CharField) : Le titre du module, avec une longueur maximale de 255 caractères.
    - `description` (TextField) : Une description du module. Par défaut, il est défini sur "Aucune description fournie".
    - `competences` (ManyToManyField) : Une relation de plusieurs à plusieurs avec le modèle `Competence`, permettant d'associer plusieurs compétences à un module.
    - `volume_horaire` (IntegerField) : Indique le nombre d'heures de formation pour le module.
    - `formateur` (ForeignKey) : Une clé étrangère vers le modèle `Formateur`, définissant le formateur responsable du module. La suppression d'un formateur entraînera la suppression de ses modules associés. Ce champ est optionnel (blank=True).
    """
    titre = models.CharField(max_length=255)
    description = models.TextField(default='Aucune description fournie')
    competences = models.ManyToManyField(Competence, related_name='competences')
    volume_horaire=models.IntegerField()
    formateur = models.ForeignKey(Formateur, on_delete=models.CASCADE, related_name='formateur',blank=True)
   
    def __str__(self):
        return self.titre


class Formation(models.Model):
    """Modèle représentant une formation.

    Attributs :
    - titre : Le titre de la formation (CharField).
    - Module : Liste des modules associés à la formation (ManyToManyField avec la relation Module).
    - description : La description de la formation (TextField).
    - date_debut : La date de début de la formation (DateField avec une valeur par défaut).
    - date_fin : La date de fin de la formation (DateField avec une valeur par défaut).
    """
    titre = models.CharField(max_length=255)
    Module=models.ManyToManyField(Module, related_name='modules')
    description = models.TextField()
    date_debut = models.DateField(default=datetime.date.today)
    date_fin = models.DateField(default=datetime.date.today)
    def __str__(self):
        return self.titre
    

class Chapitre(models.Model):
    """Modèle représentant un chapitre.

    Attributs :
    - titre : Le titre du chapitre (CharField).
    - contenu : Le contenu du chapitre (TextField).
    - duree : La durée du chapitre en minutes (IntegerField).
    """
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    duree=models.IntegerField()

    def __str__(self):
        return self.titre     


class Cours(models.Model):
    """Modèle représentant un cours.

    Attributs :
    - titre : Le titre du cours (CharField).
    - description : La description du cours (TextField avec une valeur par défaut).
    - competences : Les compétences associées au cours (ManyToManyField avec la relation Competence).
    - chapitres : Les chapitres associés au cours (ManyToManyField avec la relation Chapitre).
    """
    titre = models.CharField(max_length=255)
    description = models.TextField(default='Aucune description fournie')
    competences = models.ManyToManyField(Competence, related_name='competences_theme',blank=True)
    chapitres = models.ManyToManyField(Chapitre, related_name='chapitres',blank=True)

    def __str__(self):
        return self.titre



class Theme_formation(models.Model):
    """
    Modèle représentant un thème de formation.

    Attributs :
    - `titre` (CharField) : Le titre du thème, avec une longueur maximale de 255 caractères.
    - `cours` (ManyToManyField) : Une relation de plusieurs à plusieurs avec le modèle `Cours`, permettant d'associer plusieurs cours à un thème de formation.

    """
    titre = models.CharField(max_length=255)
    cours=models.ManyToManyField(Cours, related_name='cours')

    def __str__(self):
        return self.titre

class Demande_Devis(models.Model):
    """Modèle représentant une demande de devis.

    Attributs :
    - organisme : Nom de l'organisme ou de l'entreprise qui fait la demande (CharField).
    - email : Adresse email de contact pour la demande (EmailField).
    - Numero_telephone : Numéro de téléphone de contact (IntegerField, facultatif).
    - Formations : Liste des formations demandées dans le devis (ManyToManyField avec le modèle 'Theme_formation').
    - Nombre_participants : Nombre de participants à la formation demandée (IntegerField, facultatif).
    """
    organisme = models.CharField((""), max_length=50)
    email = models.EmailField()
    Numero_telephone=models.IntegerField(null=True, blank=True)
    Formations=models.ManyToManyField('Theme_formation', related_name='themes_devis')
    Nombre_participants = models.IntegerField(null=True, blank=True)
    
    def __str__(self):
        return self.organisme

class Devis(models.Model):
    """Modèle représentant un devis.

    Attributs :
    - montant : Le montant du devis (FloatField, facultatif).
    - demande_devis : Référence à la demande de devis associée (ForeignKey vers Demande_Devis).
    """
    montant = models.FloatField(null=True, blank=True) 
    demande_devis = models.ForeignKey(Demande_Devis, on_delete=models.SET_NULL, null=True, blank=True)
    
    def __str__(self):
        return self.montant



class Partenaire(models.Model):
    """
    Modèle représentant un partenaire Relex.

    Attributs :
    - `nom` (CharField) : Le nom du partenaire, avec une longueur maximale de 255 caractères.
    - `description` (TextField) : Une description détaillée du partenaire.
    - `contact` (IntegerField, nullable) : Le numéro de contact du partenaire. Ce champ est optionnel.
    - `email` (EmailField) : L'adresse email du partenaire, avec une longueur maximale de 255 caractères.
    """
    nom = models.CharField(max_length=255)
    description = models.TextField()
    contact = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=255)
    
    def __str__(self):
        return self.nom
    





#forum
class Question(models.Model):
    """
    Modèle représentant une question dans le forum.

    Attributs :
    - category (CharField) : La catégorie à laquelle la question appartient (ex. 'général', 'technique'). Longueur maximale : 50 caractères.
    - titre (CharField) : Le titre de la question, résumé en une phrase. Longueur maximale : 255 caractères.
    - contenu (TextField) : Le contenu détaillé de la question.
    - date_creation (DateTimeField) : Date et heure de création de la question. Assignée automatiquement lors de la création.
    - valide (BooleanField) : Indicateur pour savoir si la question est validée par un administrateur/modérateur. Par défaut, `False`.
    """
    
    category=models.CharField(max_length=50)
  #  auteur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    valide=models.BooleanField(default=False)
    def __str__(self):
        return self.contenu


class Reponse(models.Model):
    """
    Modèle représentant une réponse à une question du forum.

    Attributs :
    - question (ForeignKey) : La question à laquelle cette réponse est liée. Supprimée en cascade si la question est supprimée.
    - contenu (TextField) : Le contenu de la réponse.
    - date_creation (DateTimeField) : Date et heure de création de la réponse. Assignée automatiquement lors de la création.
    """
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.contenu


class Annuaire(models.Model):
    """
    Modèle représentant une entrée dans l'annuaire.

    Attributs :
    - nom : Le nom de la personne (str).
    - prenom : Le prénom de la personne (str).
    - description : Une description de la personne (str).
    - contact : Le numéro de contact de la personne (int, optionnel).
    - email : L'adresse email de la personne (str).
    - photo : Une photo de la personne (ImageField, optionnel).
    - linkedin : L'URL du profil LinkedIn de la personne (str, optionnel).
    - mot_cle : Des mots clés associés à la personne (str, optionnel).
    """
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)  
    description = models.TextField()
    contact = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=255)
    photo = models.ImageField(upload_to='annuaire_photos/', null=True, blank=True)
    linkedin = models.CharField(max_length=200, blank=True, null=True)
    mot_cle = models.CharField(max_length=100, blank=True, null=True)
    
    def __str__(self):
        return f"{self.nom} {self.prenom}"

class Administration_Annuaire(Annuaire):
    """
    Modèle représentant une entrée dans l'annuaire pour l'administration.

    Attributs :
    - service : Le service de l'administration (str, optionnel).
    """
    CATEGORY = 'admin'
    service = models.CharField(max_length=100, blank=True)

class Enseignant_Annuaire(Annuaire):
    """
    Modèle représentant une entrée dans l'annuaire pour les enseignants.

    Attributs :
    - grade : Le grade de l'enseignant (str, avec des choix prédéfinis).
    """
    CATEGORY = 'enseignant'
    GRADE_CHOICES = [
        ('professeur', 'Professeur'),
        ('maître de conférences A', 'Maître de conférences A'),
        ('maître de conférences B', 'Maître de conférences B'),
    ]
    grade = models.CharField(max_length=50, choices=GRADE_CHOICES, blank=True)

class Alumnie_Annuaire(Annuaire):
    """
    Modèle représentant une entrée dans l'annuaire pour les anciens élèves.

    Attributs :
    - promotion : La promotion de l'alumni (str, optionnel).
    """
    CATEGORY = 'alumnie'
    promotion = models.CharField(max_length=200, blank=True, null=True)