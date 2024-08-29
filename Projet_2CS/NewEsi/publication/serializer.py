# serializers.py
from rest_framework import serializers
from .models import *
class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
        fields ='__all__'
        #fields = ['id', 'email', 'family_name', 'first_name', 'is_active', 'date_joined', 'last_login']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Utilisateur
      
        fields = [ 'family_name', 'first_name']
        # fields= ['full_name']

class PublicationSerializer(serializers.ModelSerializer):
    # publisher = UserSerializer()
    class Meta:
        model = Publication
        fields = [
            'id_publication', 'titre', 'description', 'image', 'etat', 
            'type_publication', 'date_debut', 'date_fin', 'date_publication', 
            'date_creation','publisher'
        ]
class ClubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Club
        fields = '__all__'
class MembreSerializer(serializers.ModelSerializer):
    class Meta:
        model = MembreClub
        fields = '__all__'  # Sérialiser tous les champs du modèle


class EventInscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = event_inscription
        fields = '__all__'

class SectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = section
        fields = '__all__'

class tokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ['key']
        

class PartenaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partenaire
        fields = '__all__'



class DemandePartenariatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demande_Partenariat
        fields = '__all__'  # Sérialiser tous les champs du modèle

class DevisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devis
        fields = '__all__'  # Sérialiser tous les champs du modèle






# #recherche

class LaboratoireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laboratoire
        fields = ['id_laboratoire', 'nom', 'description']

class Partenaire_laboSerializer(serializers.ModelSerializer):
    class Meta:
        model = Partenaire_labo
        fields = ['nom', 'description', 'contact', 'email', 'laboratoire']

# class ChercheurSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Chercheur
#         fields = ['email','id', 'family_name', 'first_name', 'equipe']

class Equipe_RechercheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipe_Recherche
        fields = '__all__'

class Equipe_ProjetSerializer(serializers.ModelSerializer):
    #Chercheur = serializers.PrimaryKeyRelatedField(many=True, queryset=Chercheur.objects.all())  # Assuming Chercheur is the related model
    Chercheur =serializers.PrimaryKeyRelatedField(queryset=Utilisateur.objects.filter(is_chercheur=True), many=True, required=False)
    class Meta:
        model = Equipe_Projet
        fields = ['id_equipe_projet', 'nom', 'Chercheur', 'laboratoire']

class ProjetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Projet
        fields = '__all__' 

class Theme_RechercheSerializer(serializers.ModelSerializer):
    class Meta:
        model = Theme_Recherche
        fields = ['id_theme', 'nom', 'description']








class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'

class ReponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reponse
        fields = '__all__'


class AnnuaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Annuaire
        fields = '__all__'

class AdministrationAnnuaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Administration_Annuaire
        fields = '__all__'

class EnseignantAnnuaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enseignant_Annuaire
        fields = '__all__'

class AlumnieAnnuaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumnie_Annuaire
        fields = '__all__'
        


class CategorieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categorie
        fields = ['id_categorie', 'nom']


class PublicationQuerySerializer(serializers.Serializer):
    query = serializers.CharField(max_length=255)
    results = serializers.CharField()
       


class FormationSerializer(serializers.ModelSerializer):
    Module = serializers.PrimaryKeyRelatedField(many=True, queryset=Module.objects.all())
    class Meta:
        model = Formation
        fields = '__all__' 

 
class CompetenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Competence
        fields = '__all__' 

class FormateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Formateur
        fields = '__all__'  

class ModuleSerializer(serializers.ModelSerializer):
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
    Module = ModuleSerializer(many=True,required=False)
    class Meta:
        model = Formation
        fields = '__all__'  


class ChapitreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapitre
        fields = '__all__'  

class CoursSerializer(serializers.ModelSerializer):
    chapitres = ChapitreSerializer(many=True, required=False)
    competences = CompetenceSerializer(many=True, required=False)
   
    class Meta:
        model = Cours
        fields = ['id', 'titre', 'description', 'competences', 'chapitres']    


class CoursidSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Cours
        fields = '__all__' 

class ThemeFormationSerializer(serializers.ModelSerializer):
    cours = CoursidSerializer(many=True, required=False)
   
    class Meta:
        model = Module
        fields = ['id', 'titre', 'cours']    





class ThemeFormationidSerializer(serializers.ModelSerializer):
   
    class Meta:
        model = Theme_formation
        fields = '__all__'