from django.db import models
from publication.models import Utilisateur
from django.utils import timezone


class Category(models.Model):
    id_category = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Piece(models.Model):
    id_piece = models.AutoField(primary_key=True)
    nom = models.CharField(max_length=100)
    quantite_disponible = models.IntegerField(default=0)
    etat = models.BooleanField(default=True)  # True pour disponible, False pour non disponible
    categorie = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField()
    photo = models.ImageField(upload_to='photos/')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        ordering = ['-updated', '-created']
    def __str__(self):
        return self.nom
    
class DemandeMateriel(models.Model):
    STATUS_CHOICES = (
        ('EN_ATTENTE', 'En attente'),
        ('VALIDEE', 'Validée'),
        ('REJETEE', 'Rejetée'),
    )

    UTILISATEUR_CHOICES = (
        ('1CP', '1CP'),
        ('2CP', '2CP'),
        ('1CS', '1CS'),
        ('2CS', '2CS'),
        ('3CS', '3CS'),
        ('OTHERS', 'OTHERS'),
    )

    #utilisateur = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    nom = models.CharField(max_length=255)
    prenom = models.TextField()
    email = models.EmailField()
    numero_telephone = models.CharField(max_length=20)
    numero_immatriculation = models.CharField(max_length=20)
    piece = models.ForeignKey(Piece, on_delete=models.CASCADE)
    quantite_empruntee = models.IntegerField(default=1)
    date_emprunt = models.DateTimeField(auto_now_add=True)
    cycle_etude = models.CharField(max_length=10, choices=UTILISATEUR_CHOICES)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='EN_ATTENTE')
    nombre_jours_emprunt = models.IntegerField(default=1)
    
   
    class Meta:
        ordering = ['-date_emprunt']
    def __str__(self):
        return f"Demande de {self.piece.nom} par {self.nom} {self.prenom}"



'''class OutilMaitrise(models.Model):
    nom = models.CharField(max_length=100)

    def __str__(self):
        return self.nom'''

class FablabInscriptionUtilisateur(models.Model):
    STATUS_CHOICES = (
        ('EN_ATTENTE', 'En attente'),
        ('VALIDEE', 'Validée'),
        ('REJETEE', 'Rejetée'),
    )
    CYCLE_CHOICES = (
        ('1CP', '1CP'),
        ('2CP', '2CP'),
        ('1CS', '1CS'),
        ('2CS', '2CS'),
        ('3CS', '3CS'),
        ('OTHERS', 'OTHERS'),
    )

    PROJET_RELATION_CHOICES = (
        ('PFE', 'P.F.E'),
        ('Formation Master', 'Formation Complémentaire (Master)'),
        ('FIE', 'F.I.E'),
        ('Doctorat', 'Doctorat'),
        ('Competition ESI', 'Compétition-ESI'),
        ('Autre', 'Autre'),
    )
    
    Type_Projet = (
        ('Individuel avec coach', 'Projet individuel avec coach'),
        ('Individuel sans coach', 'Projet individuel sans coach'),
        ('Équipe avec coach', 'Projet d\'équipe appartenant à un club avec coach'),
        ('Équipe sans coach', 'Projet d\'équipe appartenant à un club sans coach'),
        ('Initié par ESI en collaboration avec fablab', 'Projet initié par ESI en collaboration avec fablab'),
    )
   
    nom = models.CharField(max_length=255)
    prenom = models.CharField(max_length=255)
    phone = models.CharField(max_length=20)
    email = models.EmailField()
    numero_immatriculation = models.CharField(max_length=20)
    cycle_etude = models.CharField(max_length=10, choices=CYCLE_CHOICES)
    outils_maitrise = models.TextField()
    projet_relationavec = models.CharField(max_length=100, choices=PROJET_RELATION_CHOICES)
    description_projet = models.TextField()
    projet_type = models.CharField(max_length=100, choices=Type_Projet)
    created = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='EN_ATTENTE')
   
    class Meta:
        ordering = ['-created']


    def __str__(self):
        return f"Inscription de {self.nom} {self.prenom} dans le FabLab"


class UserSavedPiece(models.Model):
    user = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    piece = models.ForeignKey(Piece, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['user', 'piece']]

    def __str__(self):
        return f"{self.user.family_name} - {self.piece.nom}"
