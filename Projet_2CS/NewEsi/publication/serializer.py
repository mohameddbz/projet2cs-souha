# serializers.py
from rest_framework import serializers
from .models import *

class UtilisateurSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Utilisateur avec tout les attributs."""
    class Meta:
        model = Utilisateur
        fields ='__all__'
        #fields = ['id', 'email', 'family_name', 'first_name', 'is_active', 'date_joined', 'last_login']

class UserSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Utilisateur
    Attributs :
    - family_name : Le nom de famille de l'utilisateur (str).
    - first_name : Le prénom de l'utilisateur (str).
    """
    
    class Meta:
        model = Utilisateur
    
        fields = [ 'family_name', 'first_name']
        # fields= ['full_name']

class PublicationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Publication."""
    # publisher = UserSerializer()
    class Meta:
        model = Publication
        fields = [
            'id_publication', 'titre', 'description', 'image', 'etat', 
            'type_publication', 'date_debut', 'date_fin', 'date_publication', 
            'date_creation','publisher'
        ]
class ClubSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Club."""
    class Meta:
        model = Club
        fields = '__all__'
class MembreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembreClub
        fields = '__all__'  # Sérialiser tous les champs du modèle


class EventInscriptionSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Event Inscription."""
    class Meta:
        model = event_inscription
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle  Section d'un publication."""
    class Meta:
        model = section
        fields = '__all__'

class tokenSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Token."""
    class Meta:
        model = Token
        fields = ['key']
        

class PartenaireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Partenaire."""
    class Meta:
        model = Partenaire
        fields = '__all__'



class DemandePartenariatSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Demande_Partenariat."""
    class Meta:
        model = Demande_Partenariat
        fields = '__all__'  

class DevisSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle  Devis."""
    class Meta:
        model = Devis
        fields = '__all__'  


class DemandeDevisSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Demande Devis."""
    class Meta:
        model = Demande_Devis
        fields = '__all__'  







# #recherche

class LaboratoireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Laboratoire."""
    
    class Meta:
        model = Laboratoire
        fields = ['id_laboratoire', 'nom', 'description']

class Partenaire_laboSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle  Partenaire laboratoire."""
    class Meta:
        model = Partenaire_labo
        fields = ['nom', 'description', 'contact', 'email', 'laboratoire']

# class ChercheurSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Chercheur
#         fields = ['email','id', 'family_name', 'first_name', 'equipe']

class Equipe_RechercheSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Equipe Recherche."""
    class Meta:
        model = Equipe_Recherche
        fields = '__all__'

class Equipe_ProjetSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Equipe Projet."""
    #Chercheur = serializers.PrimaryKeyRelatedField(many=True, queryset=Chercheur.objects.all())  # Assuming Chercheur is the related model
    Chercheur =serializers.PrimaryKeyRelatedField(queryset=Utilisateur.objects.filter(is_chercheur=True), many=True, required=False)
    class Meta:
        model = Equipe_Projet
        fields = ['id_equipe_projet', 'nom', 'Chercheur', 'laboratoire']

class ProjetSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Projet ."""
    class Meta:
        model = Projet
        fields = '__all__' 

class Theme_RechercheSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Theme Recherche."""
    class Meta:
        model = Theme_Recherche
        fields = ['id_theme', 'nom', 'description']








class QuestionSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Question."""
    class Meta:
        model = Question
        fields = '__all__'

class ReponseSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Reponse."""
    class Meta:
        model = Reponse
        fields = '__all__'


class AnnuaireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Annuaire  ."""
    class Meta:
        model = Annuaire
        fields = '__all__'

class AdministrationAnnuaireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Administration Annuaire  ."""
    class Meta:
        model = Administration_Annuaire
        fields = '__all__'

class EnseignantAnnuaireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Enseignant Annuaire  ."""
    class Meta:
        model = Enseignant_Annuaire
        fields = '__all__'

class AlumnieAnnuaireSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Alumnie Annuairee  ."""
    class Meta:
        model = Alumnie_Annuaire
        fields = '__all__'
        


class CategorieSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Categorie  ."""
    class Meta:
        model = Categorie
        fields = ['id_categorie', 'nom']


class PublicationQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=255)
    results = serializers.CharField()
       


class FormationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Formation   ."""

    Module = serializers.PrimaryKeyRelatedField(many=True, queryset=Module.objects.all())
    class Meta:
        model = Formation
        fields = '__all__' 

 
class CompetenceSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Competence   ."""

    class Meta:
        model = Competence
        fields = '__all__' 

class FormateurSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Formateur  ."""
    class Meta:
        model = Formateur
        fields = '__all__'  

class ModuleSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Module   ."""
    competences = CompetenceSerializer(many=True,required=False)
    formateur = FormateurSerializer(required=False)
    class Meta:
        model = Module
        fields = '__all__' 


class ModuleidSerializer(serializers.ModelSerializer): 
    class Meta:
        model = Module
        fields = '__all__'

class FormationidSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Formation  .""" 
    Module = ModuleSerializer(many=True,required=False)
    class Meta:
        model = Formation
        fields = '__all__'  


class ChapitreSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Chapitre  .""" 
    class Meta:
        model = Chapitre
        fields = '__all__'  

class CoursSerializer(serializers.ModelSerializer):
    """
    Sérialiseur pour le modèle Cours.

    Attributs :
    - id : Identifiant unique du cours.
    - titre : Titre du cours.
    - description : Description détaillée du cours.
    - competences : Liste des compétences associées au cours.
    - chapitres : Liste des chapitres du cours.
    """ 
    chapitres = ChapitreSerializer(many=True, required=False)
    competences = CompetenceSerializer(many=True, required=False)
   
    class Meta:
        model = Cours
        fields = ['id', 'titre', 'description', 'competences', 'chapitres']    


class CoursidSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Cours avec tout Attribut   .""" 
   
    class Meta:
        model = Cours
        fields = '__all__' 

class ThemeFormationSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Module
    Attributs :
    - id : Identifiant unique du cours.
    - titre : Titre du cours.
    - cours : Liste des cours associées au Module.    
    """
    cours = CoursidSerializer(many=True, required=False)
   
    class Meta:
        model = Module
        fields = ['id', 'titre', 'cours']    





class ThemeFormationidSerializer(serializers.ModelSerializer):
    """Sérialiseur pour le modèle Theme formation avec tout Attribut   .""" 
   
    class Meta:
        model = Theme_formation
        fields = '__all__'