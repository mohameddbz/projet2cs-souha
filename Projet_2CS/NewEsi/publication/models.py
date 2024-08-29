import datetime
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
from rest_framework.authtoken.models import Token
import re

class UserManager(BaseUserManager):
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
    id_laboratoire = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    # # Chercheur=models.ManyToManyField('Chercheur', related_name='Labo_chercheur')
    # Partenaire=models.ManyToManyField(Partenaire_labo, related_name='Labo_partner')

    def __str__(self):
        return self.nom
class Equipe_Recherche(models.Model):
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
    id_club = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    slogan = models.CharField(max_length=255)
    description = models.TextField()
    logo = models.ImageField(upload_to='club/', null=True, blank=True)
    president = models.CharField(max_length=255, null=True, blank=True)  
   
  
    
    def __str__(self):
        return self.nom

class event_inscription(models.Model):
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
    id_categorie = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)

    def __str__(self):
        return self.nom

class Utilisateur(AbstractBaseUser, PermissionsMixin):
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
        # Check if email matches the pattern for esi.dz domain
        if re.match(r'^[a-zA-Z0-9._%+-]+@esi\.dz$', email):
            return True
        else:
            return False


# class ChercheurManager(models.Manager):
#     def get_queryset(self,*arg,**kwargs):
#         return super().get_queryset(*arg,**kwargs).filter(is_chercheur=True)




   

#club









    

class MembreClub(models.Model):
    id_membre=models.AutoField(primary_key=True)    
    nom = models.CharField(max_length=255)
    prenom= models.CharField(max_length=255)
    post= models.TextField()
    club = models.ForeignKey(Club, on_delete=models.CASCADE, related_name='membres')

    def __str__(self):
        return self.nom     
    
#publications    
class Publication(models.Model):
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
    def __str__(self):
        return self.titre

class section(models.Model):
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    id_publication = models.ForeignKey(Publication, related_name="publication", on_delete=models.CASCADE, default=None)
    def __str__(self):
        return self.titre   

#recherche




class Partenaire_labo(models.Model):
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
    id_equipe_projet = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    Chercheur=models.ManyToManyField('Utilisateur', related_name='equipe_projet')
    laboratoire = models.ForeignKey(Laboratoire, related_name="Equipes_projet", on_delete=models.CASCADE, default=None)
  
    def __str__(self):
        return self.nom
    
class Theme_Recherche(models.Model):
    id_theme = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=255)
    description = models.TextField()
    # projets=models.ManyToManyField(Projet,related_name= "themes")

    def __str__(self):
        return self.nom


class Projet(models.Model):
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
    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField()
    specialites = models.TextField()

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class Module(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField(default='Aucune description fournie')
    competences = models.ManyToManyField(Competence, related_name='competences')
    volume_horaire=models.IntegerField()
    formateur = models.ForeignKey(Formateur, on_delete=models.CASCADE, related_name='formateur')

    def __str__(self):
        return self.titre


class Formation(models.Model):
    titre = models.CharField(max_length=255)
    Module=models.ManyToManyField(Module, related_name='modules')
    description = models.TextField()
    date_debut = models.DateField(default=datetime.date.today)
    date_fin = models.DateField(default=datetime.date.today)
    def __str__(self):
        return self.titre
    

class Chapitre(models.Model):
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    duree=models.IntegerField()

    def __str__(self):
        return self.titre     


class Cours(models.Model):
    titre = models.CharField(max_length=255)
    description = models.TextField(default='Aucune description fournie')
    competences = models.ManyToManyField(Competence, related_name='competences_theme',blank=True)
    chapitres = models.ManyToManyField(Chapitre, related_name='chapitres',blank=True)

    def __str__(self):
        return self.titre



class Theme_formation(models.Model):
    titre = models.CharField(max_length=255)
    cours=models.ManyToManyField(Cours, related_name='cours')

    def __str__(self):
        return self.titre

class Devis(models.Model):
    etat = models.CharField(max_length=50 , default="en attente")
    montant = models.FloatField(null=True, blank=True) 
    
    def __str__(self):
        return self.montant


class Partenaire(models.Model):
    nom = models.CharField(max_length=255)
    description = models.TextField()
    contact = models.IntegerField(null=True, blank=True)
    email = models.EmailField(max_length=255)
    
    def __str__(self):
        return self.nom
    





#forum
class Question(models.Model):
    category=models.CharField(max_length=50)
  #  auteur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    titre = models.CharField(max_length=255)
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    valide=models.BooleanField(default=False)
    def __str__(self):
        return self.contenu


class Reponse(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    contenu = models.TextField()
    date_creation = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return self.contenu


class Annuaire(models.Model):
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
    CATEGORY = 'admin'
    service = models.CharField(max_length=100, blank=True)

class Enseignant_Annuaire(Annuaire):
    CATEGORY = 'enseignant'
    GRADE_CHOICES = [
        ('professeur', 'Professeur'),
        ('maître de conférences A', 'Maître de conférences A'),
        ('maître de conférences B', 'Maître de conférences B'),
    ]
    grade = models.CharField(max_length=50, choices=GRADE_CHOICES, blank=True)

class Alumnie_Annuaire(Annuaire):
    CATEGORY = 'alumnie'
    promotion = models.CharField(max_length=200, blank=True, null=True)