from django.db import models
from publication.models import Utilisateur
from django.utils import timezone


class Category(models.Model):
    """
    Modèle représentant une catégorie de pièces.

    Attributs :
    - `id_category` (AutoField) : Identifiant unique de la catégorie, généré automatiquement.
    - `name` (CharField) : Nom de la catégorie, avec une longueur maximale de 255 caractères.
    """
    id_category = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Piece(models.Model):
    """
    Modèle représentant une pièce de matériel.

    Attributs :
    - `id_piece` (AutoField) : Identifiant unique de la pièce, généré automatiquement.
    - `nom` (CharField) : Nom de la pièce, avec une longueur maximale de 100 caractères.
    - `quantite_disponible` (IntegerField) : Quantité de la pièce disponible, par défaut à 0.
    - `etat` (BooleanField) : État de disponibilité de la pièce (True pour disponible, False pour non disponible).
    - `categorie` (ForeignKey) : Référence à la catégorie à laquelle appartient la pièce.
    - `description` (TextField) : Description détaillée de la pièce.
    - `photo` (ImageField) : Photo de la pièce, stockée dans le dossier 'photos/'.
    - `created` (DateTimeField) : Date et heure de création de la pièce, automatiquement remplie.
    - `updated` (DateTimeField) : Date et heure de la dernière mise à jour de la pièce, automatiquement remplie.


    Meta :
    - `ordering` : Définit l'ordre de tri par défaut, d'abord par date de mise à jour, puis par date de création.
    """
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
    """
    Modèle représentant une demande de matériel.

    Attributs :
    - `nom` (CharField) : Nom de l'utilisateur qui fait la demande, avec une longueur maximale de 255 caractères.
    - `prenom` (TextField) : Prénom de l'utilisateur qui fait la demande.
    - `email` (EmailField) : Adresse email de l'utilisateur.
    - `numero_telephone` (CharField) : Numéro de téléphone de l'utilisateur, avec une longueur maximale de 20 caractères.
    - `numero_immatriculation` (CharField) : Numéro d'immatriculation de l'utilisateur, avec une longueur maximale de 20 caractères.
    - `piece` (ForeignKey) : Référence à la pièce demandée.
    - `quantite_empruntee` (IntegerField) : Quantité de matériel empruntée, par défaut à 1.
    - `date_emprunt` (DateTimeField) : Date et heure de l'emprunt, automatiquement remplie.
    - `cycle_etude` (CharField) : Cycle d'étude de l'utilisateur, avec des choix prédéfinis.
    - `description` (TextField) : Description de la demande.
    - `status` (CharField) : Statut de la demande (En attente, Validée, Rejetée), par défaut à 'EN_ATTENTE'.
    - `nombre_jours_emprunt` (IntegerField) : Nombre de jours d'emprunt, par défaut à 1.

    Meta :
    - `ordering` : Définit l'ordre de tri par défaut, basé sur la date de l'emprunt, du plus récent au plus ancien.
    """
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
    """
    Modèle représentant une inscription d'utilisateur dans le FabLab.

    Attributs :
    - `nom`: Nom de l'utilisateur (str).
    - `prenom`: Prénom de l'utilisateur (str).
    - `phone`: Numéro de téléphone de l'utilisateur (str).
    - `email`: Adresse e-mail de l'utilisateur (str).
    - `numero_immatriculation`: Numéro d'immatriculation de l'utilisateur (str).
    - `cycle_etude`: Cycle d'étude de l'utilisateur (str), choisi parmi `CYCLE_CHOICES`.
    - `outils_maitrise`: Liste des outils maîtrisés par l'utilisateur (TextField).
    - `projet_relationavec`: Type de relation avec un projet (str), choisi parmi `PROJET_RELATION_CHOICES`.
    - `description_projet`: Description du projet proposé par l'utilisateur (TextField).
    - `projet_type`: Type de projet proposé (str), choisi parmi `Type_Projet`.
    - `created`: Date de création de l'inscription (DateTimeField, auto-généré à l'ajout).
    - `status`: Statut de l'inscription (str), choisi parmi `STATUS_CHOICES`, par défaut `EN_ATTENTE`.

    Choices :
    - `STATUS_CHOICES`: 
        - `EN_ATTENTE`: En attente
        - `VALIDEE`: Validée
        - `REJETEE`: Rejetée
    - `CYCLE_CHOICES`: 
        - `1CP`, `2CP`, `1CS`, `2CS`, `3CS`, `OTHERS`
    - `PROJET_RELATION_CHOICES`: 
        - `PFE`, `Formation Master`, `FIE`, `Doctorat`, `Competition ESI`, `Autre`
    - `Type_Projet`: 
        - `Individuel avec coach`, `Individuel sans coach`, `Équipe avec coach`, `Équipe sans coach`, `Initié par ESI en collaboration avec fablab`
    """
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
    """
    Modèle représentant une pièce sauvegardée par un utilisateur.

    Attributs :
    - `user` (ForeignKey) : L'utilisateur qui a sauvegardé la pièce. Fait référence au modèle `Utilisateur`.
    - `piece` (ForeignKey) : La pièce sauvegardée. Fait référence au modèle `Piece`.
    - `saved_at` (DateTimeField) : La date et l'heure à laquelle la pièce a été sauvegardée, automatiquement définie lors de la création de l'enregistrement.

    """
    user = models.ForeignKey(Utilisateur, on_delete=models.CASCADE)
    piece = models.ForeignKey(Piece, on_delete=models.CASCADE)
    saved_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = [['user', 'piece']]

    def __str__(self):
        return f"{self.user.family_name} - {self.piece.nom}"
