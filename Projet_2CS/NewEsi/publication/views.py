from django.conf import settings
from django.shortcuts import render,get_object_or_404
from .models import *
from .serializer import *
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view , permission_classes
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .decorators import *
from django.core.mail import send_mail
from langchain_openai import ChatOpenAI
from langchain_community.utilities import SQLDatabase
from sqlalchemy import create_engine
from langchain_community.agent_toolkits import create_sql_agent
import pandas as pd
from langchain_community.llms import HuggingFaceEndpoint
from transformers import AutoTokenizer, AutoModelForCausalLM

import json
@api_view(['GET'])
@permission_classes([AllowAny])
def query_publications(request):
    query = request.GET.get('query', '')
    results = []
    HUGGINGFACEHUB_API_TOKEN = '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'
   
    if query:
        try:
            df = pd.read_csv(r'C:\Users\Dell\Desktop\Projet_2CS\Projet_2CS\NewEsi\publication\Data\events.csv')
            df.rename(columns={'Concatenated': 'events'}, inplace=True)
            df_json = df.to_json(orient='records')
           
            llm = HuggingFaceEndpoint(
                huggingfacehub_api_token=HUGGINGFACEHUB_API_TOKEN,
                repo_id="mistralai/Mistral-7B-Instruct-v0.2",
                max_new_tokens=512,
                top_k=10,
                top_p=0.95,
                typical_p=0.95,
                temperature=0.01,
                repetition_penalty=1.03,
                streaming=True,
            )

            input_data = {
                'input': f"{query} ## Answer one answer that fits the best and is most close to the question from the following data. Don't answer outside the data, look at all data before answering and if there is no information in the data say: 'there is no information in the database to answer your question' #### Data= {df_json}"
            }

            input_data_str = json.dumps(input_data)
            results = llm.invoke(input_data_str)

        except Exception as e:
            print(f"Error invoking LLM: {e}")
            return Response({"error": "Internal server error"}, status=500)
   
    data = {
        'query': query,
        'results': results[:-4] if results else "There was an error processing your request."
    }
   
    serializer = PublicationQuerySerializer(data=data)
    if serializer.is_valid():
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
    
    
@api_view(['GET'])
@user_types_required('superuser')
def get_all_users(request):
    """Vue pour récupérer tous les utilisateurs.

    Cette vue permet aux super-utilisateurs de récupérer la liste de tous les utilisateurs dans le système.

    Méthodes autorisées :
    - GET : Récupère tous les utilisateurs.

    Paramètres :
    - request : Objet de requête contenant les informations de la requête HTTP.

    Réponse :
    - Si la requête est réussie, retourne une réponse contenant la liste des utilisateurs sérialisés sous forme de JSON avec un statut HTTP 200 OK.
    - En cas d'erreur, retourne un statut HTTP approprié (non spécifié ici).
     Autorisation :
    - Accessible par superuser .
    
    tags:
      - Utilisateurs

    """
    if request.method == 'GET':
        queryset = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(queryset, many=True)
        return Response(serializer.data)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_by_id(request, user_id):
    """Vue pour récupérer un utilisateur par son identifiant.

    Cette vue permet à quiconque de récupérer les informations d'un utilisateur spécifique en utilisant son identifiant unique.

    Méthodes autorisées :
    - GET : Récupère l'utilisateur correspondant à l'identifiant fourni.

    Paramètres :
    - request : Objet de requête contenant les informations de la requête HTTP.
    - user_id : Identifiant unique de l'utilisateur à récupérer (doit être un entier).

    Réponse :
    - Si l'utilisateur est trouvé, retourne les données de l'utilisateur sérialisées sous forme de JSON avec un statut HTTP 200 OK.
    - Si l'utilisateur n'est pas trouvé, retourne un message d'erreur avec un statut HTTP 404 Not Found.

    Autorisation :
    - Accessible par superuser.
    

    """
    try:
        user = Utilisateur.objects.get(pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Utilisateur.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_user(request):
    """Vue pour ajouter un nouvel utilisateur.

    Cette vue permet à quiconque d'ajouter un nouvel utilisateur dans le système en envoyant les données requises.

    Méthodes autorisées :
    - POST : Crée un nouvel utilisateur avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données à ajouter sous forme de JSON.

    Corps de la requête (JSON) : les champs pertinents définis dans le modèle Utilisateur.

    Réponse :
    - Si l'utilisateur est ajouté avec succès, retourne les données de l'utilisateur nouvellement créé avec un statut HTTP 201 Created.
    - Si les données ne sont pas valides, retourne une erreur avec les détails des erreurs de validation et un statut HTTP 400 Bad Request.
    Autorisation :
    - Accessible par administarateur.
    
    """
    if request.method == 'POST':
        data = request.data.copy()  # Create a copy of the request data
        data.pop('id', None)  # Remove 'id' field if present
        # if isinstance(data, list):  # If data is an array
        #     serializer = UtilisateurSerializer(data=data, many=True)
        # else:  # If data is a single object
        serializer = UtilisateurSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   

@api_view(['PUT'])
@user_types_required('editeur','chercheur')
def edit_publication(request, pk):
    """
    Modifier une publication existante dans le système.

    Permissions :
    - Accessible uniquement aux utilisateurs ayant les rôles 'editeur' ou 'chercheur'.

    Paramètres :
    - request (Request) : Objet de la requête HTTP contenant les données mises à jour de la publication.
    - pk (int) : Clé primaire de la publication à modifier.

    Retourne :
    - Response : Les données mises à jour de la publication si la requête est valide.
    - Erreur 404 : Si la publication n'est pas trouvée.
    - Erreur 400 : Si les données fournies sont invalides.
     """
    try:
        publication = Publication.objects.get(pk=pk)
    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = PublicationSerializer(publication, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_user(request):
    """Vue pour connecter un utilisateur.

    Cette vue permet aux utilisateurs de se connecter en fournissant un email et un mot de passe. Si les informations d'identification sont valides, un jeton d'authentification est renvoyé.

    Méthodes autorisées :
    - POST : Authentifie un utilisateur avec les informations fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données d'authentification sous forme de JSON.

    Corps de la requête (JSON) :
    - email : L'email de l'utilisateur (obligatoire).
    - password : Le mot de passe de l'utilisateur (obligatoire).

    Réponse :
    - Si l'authentification réussit, retourne un jeton d'authentification et des informations sur l'utilisateur avec un statut HTTP 200 OK.
    - Si l'email est manquant, retourne une erreur avec un statut HTTP 400 Bad Request.
    - Si le mot de passe est manquant, retourne une erreur avec un statut HTTP 400 Bad Request.
    - Si l'email existe mais que le mot de passe est incorrect, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si l'email n'est pas trouvé dans la base de données, retourne une erreur avec un statut HTTP 404 Not Found.
    
     Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    
    tags:
      - Utilisateurs

    """
    if request.method == 'POST':
        email = request.data.get('email', None)
        password = request.data.get('password', None)
       
        if not password:
            return Response({"error": "Password is required"}, status=status.HTTP_400_BAD_REQUEST)
        if not email:
            return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
       
        if Utilisateur.objects.filter(email=email, password=password).exists():
            user = Utilisateur.objects.get(email=email)
            token = Token.objects.get(user=user)
            categorie_serialized = {"id_categorie": user.Categorie.id_categorie, "nom": user.Categorie.nom } if user.Categorie else None
            return Response({
                "token": token.key,
                "is_adminstrateur": user.is_adminstrateur,
                "is_editeur": user.is_editeur,
                "Categorie": categorie_serialized,
                "is_chercheur":user.is_chercheur,
                "is_superuser":user.is_superuser,
                "is_responsable_fablab": user.is_responsable_fablab,
                "is_directeur_relex":user.is_directeur_relex
            }, status=status.HTTP_200_OK)
       
        if Utilisateur.objects.filter(email=email).exists():
            return Response({"error": "Incorrect password"}, status=status.HTTP_404_NOT_FOUND)
        else:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)



       
@api_view(['PUT'])
@user_types_required('adminstrateur')
def edit_user(request, pk):
    """Vue pour modifier les informations d'un utilisateur.

    Cette vue permet à un administrateur de modifier les informations d'un utilisateur existant en fournissant un ID d'utilisateur (pk) et les nouvelles données.

    Méthodes autorisées :
    - PUT : Modifie les informations d'un utilisateur existant.

    Paramètres :
    - request : Objet de requête contenant les nouvelles données de l'utilisateur sous forme de JSON.
    - pk : L'identifiant de l'utilisateur à modifier.

    Corps de la requête (JSON) :
    - Les champs à modifier de l'utilisateur (peuvent inclure des champs comme email, nom, etc.).

    Réponse :
    - Si l'utilisateur est trouvé et que la modification réussit, retourne les données mises à jour de l'utilisateur avec un statut HTTP 200 OK.
    - Si l'utilisateur avec l'ID spécifié n'existe pas, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si les données fournies ne sont pas valides, retourne les erreurs de validation avec un statut HTTP 400 Bad Request.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    
    tags:
      - Utilisateurs

    
    """
    try:
        user = Utilisateur.objects.get(pk=pk)
    except Utilisateur.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        data = request.data.copy()  # Create a copy of the request data
        data.pop('id', None)  # Remove 'id' field if present
        serializer = UtilisateurSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['GET'])
@user_types_required('adminstrateur')
def search_user(request):
    """Vue pour rechercher des utilisateurs en fonction des paramètres de requête.

    Cette vue permet à un administrateur de rechercher des utilisateurs en fournissant des paramètres de requête. Les utilisateurs peuvent être filtrés par différents champs.

    Méthodes autorisées :
    - GET : Récupère les utilisateurs en fonction des filtres spécifiés.

    Paramètres :
    - request : Objet de requête contenant les paramètres de filtrage sous forme de query string.

    Paramètres de requête (query string) :
    - Divers champs (par exemple, email, nom) qui peuvent être utilisés pour filtrer les utilisateurs. .

    Réponse :
    - Retourne une liste d'utilisateurs correspondant aux critères de filtrage avec un statut HTTP 200 OK.
    - Si aucun filtre n'est fourni, retourne tous les utilisateurs.
    

     Autorisation :
    - Accessible par les administrateurs.
    tags:
      - Utilisateurs

    """
    if request.method == 'GET':
        query_params = request.query_params
        filters = {}

        # Iterate over query parameters
        for key, value in query_params.items():
            # Exclude the 'query' parameter
            if key != 'query' and value:
                # Add filter condition if the field is not empty
                filters[key + '__icontains'] = value

        if filters:
            # Construct Q objects for filtering
            conditions = [Q(**{key: value}) for key, value in filters.items()]
            # Combine Q objects using OR operator
            users = Utilisateur.objects.filter(*conditions)
        else:
            # If no filters are provided, return all users
            users = Utilisateur.objects.all()

        serializer = UtilisateurSerializer(users, many=True)
        return Response(serializer.data)
    else:
        return Response("Invalid request method", status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['DELETE'])
@user_types_required('adminstrateur')
def delete_user(request, pk):
    """Vue pour supprimer un utilisateur par son ID.

    Cette vue permet à un administrateur de supprimer un utilisateur en fournissant l'ID de l'utilisateur.

    Méthodes autorisées :
    - DELETE : Supprime l'utilisateur spécifié.

    Paramètres :
    - request : Objet de requête pour la demande de suppression.
    - pk : L'identifiant de l'utilisateur à supprimer.

    Réponse :
    - Si l'utilisateur est trouvé et supprimé, retourne un message de succès avec un statut HTTP 204 No Content.
    - Si l'utilisateur avec l'ID spécifié n'existe pas, retourne une erreur avec un statut HTTP 404 Not Found.
    
    Autorisation :
    - Accessible par les administrateurs.
    
    tags:
      - Utilisateurs
    """
    try:
        user = Utilisateur.objects.get(pk=pk)
    except Utilisateur.DoesNotExist:
        return Response("User not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        user.delete()
        return Response("User deleted successfully", status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_publications_by_category(request, category):
    """
    Vue permettant de récupérer toutes les publications valides de type 'event' et la catégorie de l'utilisateur qui les a publiées .

    Paramètres :
    - request : L'objet de la requête HTTP.
    - category :  nom de la catégorie de publieur dont on souhaite obtenir les publications.


    Retourne :
    - Une réponse JSON avec les données des publications trouvées.
    - Un message d'erreur "Publications not found for this category" avec un code HTTP 404 si aucune publication n'est trouvée.

    Autorisation :
    - Accessible à tous les utilisateurs, même ceux non authentifiés (AllowAny).
    """
    try:
        publications = Publication.objects.filter(publisher__Categorie= category, etat='valide', type_publication='event')
        
    except Publication.DoesNotExist:
        return Response("Publications not found for this category", status=status.HTTP_404_NOT_FOUND)

    serializer = PublicationSerializer(publications, many=True)
    return Response(serializer.data)

#This is for publication
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_publications(request):
    """
    Vue permettant de récupérer toutes les publications enregistrées dans la base de données.

    Méthode HTTP :
    - GET : Cette vue accepte uniquement les requêtes GET.

    Retourne :
    - Une réponse JSON contenant une liste de toutes les publications avec leurs données sérialisées.
    
    Autorisation :
    - Accessible à tous les utilisateurs, même ceux non authentifiés (AllowAny).
    """
    if request.method == 'GET':
        queryset = Publication.objects.all()
        serializer = PublicationSerializer(queryset, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@user_types_required('adminstrateur')
def get_publications_by_category_admin(request):
        """
    Vue permettant à un administrateur de récupérer les publications en fonction de sa catégorie.

    Méthode HTTP :
    - GET : Cette vue accepte uniquement les requêtes GET pour récupérer des publications liées à la catégorie de l'utilisateur.

    Fonctionnalité :
    - Vérifie si l'en-tête d'autorisation contient un token valide.
    - Si le token est valide, il récupère l'utilisateur associé à ce token.
    - Filtre les publications en fonction de la catégorie de l'utilisateur récupéré.
    - Si aucune publication n'est trouvée pour la catégorie de l'utilisateur, une réponse 404 (Publications not found) est retournée.
    - Si le token est invalide ou absent, une réponse d'erreur 400 est retournée.

    Retourne :
    - Une réponse contenant les données sérialisées des publications de la catégorie de l'utilisateur, avec un statut HTTP 200 (OK).
    - Une réponse d'erreur avec un statut HTTP 400 (Bad Request) si le token est invalide ou absent.
    - Une réponse d'erreur avec un statut HTTP 404 (Not Found) si aucune publication n'est trouvée pour la catégorie de l'utilisateur.

    Autorisation :
    - Seuls les utilisateurs de type 'administrateur' sont autorisés à accéder à cette vue (via le décorateur `user_types_required`).

        """
   
        auth_header = request.headers.get('Authorization')

        if auth_header:
            try:
                token_key = auth_header.split(' ')[1]
                user = Token.objects.get(key=token_key).user
                try:
                  publications = Publication.objects.filter(publisher__Categorie = user.Categorie)
                except Publication.DoesNotExist:
                  return Response("Publications not found for this category", status=status.HTTP_404_NOT_FOUND)
            except Token.DoesNotExist:
                return Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)
            except IndexError:
                return Response({"error": "Token format is invalid"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Authorization header is missing"}, status=status.HTTP_400_BAD_REQUEST)
    # except Publication.DoesNotExist:
    #  return Response("Publications not found for this category", status=status.HTTP_404_NOT_FOUND)

        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data)

#This is for publication
   


# POST a new publication
@api_view(['POST'])
@user_types_required('editeur', 'chercheur')
def add_publication(request):
    """
    Vue permettant de créer une nouvelle publication.

    Méthode HTTP :
    - POST : Cette vue accepte uniquement les requêtes POST pour ajouter une nouvelle publication.

    Fonctionnalité :
    - Vérifie si l'en-tête d'autorisation contient un token valide.
    - Si le token est valide, il récupère l'utilisateur associé et ajoute son ID en tant que 'publisher' à la publication.
    - Permet l'ajout d'une ou plusieurs publications à la fois :
        - Si les données envoyées sont une liste, plusieurs publications seront ajoutées.
        - Si les données envoyées sont un objet unique, une seule publication sera ajoutée.
    - Si les données sont valides, les publications sont enregistrées dans la base de données.

    Retourne :
    - Une réponse contenant les données sérialisées des publications créées, avec un statut HTTP 201 (Created).
    - Une réponse d'erreur avec un statut HTTP 400 (Bad Request) en cas de données invalides ou de problème avec le token.

    Autorisation :
    - Seuls les utilisateurs de type 'éditeur' ou 'chercheur' sont autorisés à accéder à cette vue (via le décorateur `user_types_required`).
    """
    if request.method == 'POST':
        auth_header = request.headers.get('Authorization')

        if auth_header:
            try:
                token_key = auth_header.split(' ')[1]
                user = Token.objects.get(key=token_key).user
            except Token.DoesNotExist:
                return Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)
            except IndexError:
                return Response({"error": "Token format is invalid"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Authorization header is missing"}, status=status.HTTP_400_BAD_REQUEST)
       
        # Check if request data is a list or single object
        if isinstance(request.data, list):  # If data is an array
            data = [dict(item, publisher=user.id) for item in request.data]  # Create a mutable copy and add publisher
            serializer = PublicationSerializer(data=data, many=True)
        else:  # If data is a single object
            data = request.data.copy()  # Create a mutable copy
            data['publisher'] = user.id
            serializer = PublicationSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@user_types_required('editeur')
def add_event(request):
    """
    Vue permettant à un utilisateur de type 'éditeur' de soumettre un nouvel publication de type événement.

    Méthode HTTP :
    - POST : Cette vue accepte uniquement les requêtes POST pour soumettre un nouvel événement.

    Fonctionnalité :
    - Ajoute automatiquement l'utilisateur en tant que publisher de l'événement.
    - Récupère la catégorie spécifiée dans la requête (`categorie`).
    - Vérifie si un administrateur existe pour cette catégorie. Si aucun administrateur n'est trouvé, une réponse 400 (Bad Request) est retournée.
    - Définit le type de publication à 'event' et l'état à 'en attente'.
    - Sérialise et valide les données de la requête avant de les sauvegarder dans la base de données.
    - Envoie un email à l'administrateur de la catégorie pour l'informer qu'une nouvelle demande de publication est en attente de validation.

    Retourne :
    - Une réponse contenant les données sérialisées de l'événement en cas de succès, avec un statut HTTP 201 (Created).
    - Une réponse contenant les erreurs de validation avec un statut HTTP 400 (Bad Request) si les données ne sont pas valides ou si aucun administrateur n'est trouvé pour la catégorie.

    """
    if request.method == 'POST':
        request.data['publisher'] = request.user.id
        cat_id = request.data['categorie']
        category = Categorie.objects.get(id=cat_id)
        user = Utilisateur.objects.filter(is_admin=True, categorie=category).first()
        if user is None:
            return Response({"error": "No admin user found for this category"}, status=status.HTTP_400_BAD_REQUEST)
       
        request.data['type_publication'] = 'event'
        request.data['etat'] = 'en attente'
        serializer = PublicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            sujet = "Demande de publication"
           
            message = f"Une nouvelle demande de publication est insérée, intitulé: {request.data['titre']}.\n"
            message += "en attendant votre validation "
            message += "Merci !"

            send_mail(
                subject=sujet,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[user.email],  
                fail_silently=True,
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@user_types_required('editeur')
def add_actualité(request):
    """
    Vue permettant à un utilisateur de type 'éditeur' de soumettre une nouvelle publication de type actualité.

    Méthode HTTP :
    - POST : Cette vue accepte uniquement les requêtes POST pour soumettre une nouvelle actualité.

    Fonctionnalité :
    - Définit automatiquement le type de publication à 'actualité' et l'état à 'en attente'.
    - Sérialise et valide les données de la requête avant de les sauvegarder dans la base de données.

    Retourne :
    - Une réponse contenant les données sérialisées de l'actualité en cas de succès, avec un statut HTTP 201 (Created).
    - Une réponse contenant les erreurs de validation avec un statut HTTP 400 (Bad Request) si les données ne sont pas valides.
    """
    if request.method == 'POST':

        request.data['type_publication'] = 'actualité'
        request.data['etat']='en attente'
        serializer = PublicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def create_categorie(request):
    """Créer une nouvelle catégorie.

    Cette vue permet de créer une nouvelle catégorie en fournissant un nom de catégorie. 

    Méthodes autorisées :
    - POST : Crée une nouvelle catégorie avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données de la catégorie sous forme de JSON.

    Corps de la requête (JSON) :
    - nom : Le nom de la catégorie (obligatoire).

    Réponse :
    - Si la création est réussie, retourne les données de la catégorie créée avec un statut HTTP 201 Created.
    - Si les données sont invalides, retourne les erreurs de validation avec un statut HTTP 400 Bad Request.

    Tags :
      - Catégories
    """
    if request.method == 'POST':
        serializer = CategorieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_categorie(request, categorie_id):
    """Supprimer une catégorie par son ID.

    Cette vue permet de supprimer une catégorie existante en fournissant son ID.

    Méthodes autorisées :
    - DELETE : Supprime la catégorie correspondante à l'ID fourni.

    Paramètres :
    - categorie_id : L'ID de la catégorie à supprimer (obligatoire).

    Réponse :
    - Si la catégorie est trouvée et supprimée, retourne un message de succès avec un statut HTTP 204 No Content.
    - Si la catégorie n'est pas trouvée, retourne une erreur avec un statut HTTP 404 Not Found.

    Tags :
      - Catégories
    """
    try:
        categorie = Categorie.objects.get(pk=categorie_id)
    except Categorie.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
   
    categorie.delete()
    return Response({"success": "Category deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def search_publication(request):
    """
    Vue permettant de rechercher des publications en fonction de plusieurs filtres.

    Méthode HTTP :
    - GET : Recherche des publications en fonction des paramètres de requête.

    Fonctionnalité :

    - Les filtres incluent tous les champs spécifiés dans les paramètres de requête (par exemple, titre, description).
     - Les administrateurs peuvent rechercher des publications par leur catégorie en plus , tandis que les éditeurs peuvent rechercher leurs propres publications.
    - Si aucun filtre n'est fourni, toutes les publications sont renvoyées.

    Paramètres de requête :
    - `publisher` : Filtre les publications par éditeur (publisher).
    - Tout autre paramètre sera utilisé pour filtrer les publications .

    Retourne :
    - Une liste de publications correspondant aux critères de recherche avec un statut HTTP 200 (OK).
    - Un message d'erreur si le jeton est invalide ou manquant avec un statut HTTP 400 (Bad Request).

    """
    if request.method == 'GET':
        query_params = request.query_params
        auth_header = request.headers.get('Authorization')

        if auth_header:
            try:
                token_key = auth_header.split(' ')[1]
                user = Token.objects.get(key=token_key).user
            except Token.DoesNotExist:
                return Response({"error": "Token not found"}, status=status.HTTP_400_BAD_REQUEST)
            except IndexError:
                return Response({"error": "Token format is invalid"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Authorization header is missing"}, status=status.HTTP_400_BAD_REQUEST)

        filters = {}
        publisher = None
       
        # Iterate over query parameters
        for key, value in query_params.items():
            if key == 'publisher' and value:
                publisher = value
            elif key != 'query' and value:
                filters[key + '__icontains'] = value
        if filters:
                conditions = [Q(**{key: value}) for key, value in filters.items()]
                publications = Publication.objects.filter(*conditions)
        else:
                publications = Publication.objects.all()
       
        if user.is_editeur:
            publications = Publication.objects.filter(publisher_id=publisher, **filters)
        if user.is_adminstrateur:
            publications = Publication.objects.filter(publisher__Categorie=user.Categorie, **filters)
           
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data)
    else:
        return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
@user_types_required('adminstrateur','superuser')
def validate_publication(request, pk):
    """
    Vue permettant à un administrateur ou super utilisateur de valider une publication.

    Méthode HTTP :
    - PUT : Cette vue accepte uniquement les requêtes PUT pour valider une publication.

    Fonctionnalité :
    - Change l'état de la publication spécifiée en "valide".
    - La publication est identifiée par son identifiant (`pk`).

    Paramètre de requête :
    - `pk` : L'ID de la publication à valider.

    Retourne :
    - Une réponse avec les détails de la publication mise à jour avec un statut HTTP 200 (OK).
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la publication n'existe pas.
    """
    try:
        publication = Publication.objects.get(pk=pk)

    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        # Update the 'etat' attribute to 'valide'
        publication.etat = 'valide'
        # Save the changes to the publication object
        publication.save()

        # Serialize the updated publication object
        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response("Invalid request method", status=status.HTTP_405_METHOD_NOT_ALLOWED)


@api_view(['PUT'])
@user_types_required('adminstrateur','superuser')
def refuse_publication(request, pk):
    """
    Vue permettant à un administrateur ou super utilisateur de refuser une publication.

    Méthode HTTP :
    - PUT : Cette vue accepte uniquement les requêtes PUT pour refuser une publication.

    Fonctionnalité :
    - Change l'état de la publication spécifiée en "refuse".
    - La publication est identifiée par son identifiant (`pk`).

    Paramètre de requête :
    - `pk` : L'ID de la publication à refuser.

    Retourne :
    - Une réponse avec les détails de la publication mise à jour avec un statut HTTP 200 (OK).
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la publication n'existe pas.

    """
    try:
        publication = Publication.objects.get(pk=pk)
    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        publication.etat = 'refuse'
        publication.save()
        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response("Invalid request method", status=status.HTTP_405_METHOD_NOT_ALLOWED)




# DELETE a publication by ID
@api_view(['DELETE'])
@user_types_required('adminstrateur','chercheur')
def delete_publication(request, pk):
    """
    Vue permettant à un administrateur ou un chercheur de supprimer une publication.

    Méthode HTTP :
    - DELETE : Cette vue accepte uniquement les requêtes DELETE pour supprimer une publication.

    Fonctionnalité :
    - Supprime la publication spécifiée par son identifiant (`pk`).

    Paramètre de requête :
    - `pk` : L'ID de la publication à supprimer.

    Retourne :
    - Une réponse avec un statut HTTP 204 (No Content) si la suppression est réussie.
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la publication n'existe pas.

    """
    try:
        publication = Publication.objects.get(pk=pk)
    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        publication.delete()
        return Response("Publication deleted successfully", status=status.HTTP_204_NO_CONTENT)    


# Get all members of a club
@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_members(request, club_id):
    """
    Retrieve the list of members for a specific club.

    Parameters:
    - request: The HTTP request object containing the details of the request.
    - club_id: The unique identifier of the club for which to obtain the members.

    Returns:
    - A JSON response containing the data of the club members if the club is found.
    - A 404 Not Found response if the club does not exist.
    """
    if request.method == 'GET':
        try:
            club = Club.objects.get(id_club=club_id)
        except Club.DoesNotExist:
            return Response("Club not found", status=status.HTTP_404_NOT_FOUND)

        members = club.membres.all()
        serializer = MembreSerializer(members, many=True)
        return Response(serializer.data)


# Add a member to a club
@api_view(['POST'])
@user_types_required('editeur')
def add_club_member(request, club_id):
    """
    Add a new member to a specific club.

    Parameters:
    - request: The HTTP request object containing the details of the member to be added.
    - club_id: The unique identifier of the club to which the member is being added.

    Returns:
    - A 201 Created response with the member data if the member is successfully added.
    - A 404 Not Found response if the club does not exist.
    - A 400 Bad Request response if the input data is invalid.
    """
    if request.method == 'POST':
        try:
            club = Club.objects.get(id_club=club_id)
        except Club.DoesNotExist:
            return Response("Club not found", status=status.HTTP_404_NOT_FOUND)

        serializer = MembreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(club=club)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




@api_view(['GET'])
@permission_classes([AllowAny])
def list_events_by_club(request, club_id):
    """
    Récupérer la liste des événements à venir pour un club spécifique.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les détails de la demande.
    - club_id : L'identifiant unique du club pour lequel on souhaite obtenir les événements.

    Retourne :
    - Une réponse contenant les données des événements à venir en format JSON.
    - Les événements retournés seront ceux dont la date d'archivage est supérieure à la date actuelle.

    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    current_date = timezone.now()
    events = event_inscription.objects.filter(club_id=club_id, date_archivage__gt=current_date)
    serializer = EventInscriptionSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@user_types_required('editeur')
def create_event_inscription(request):
    """Crée une nouvelle inscription à un événement.

    Cette vue permet à un utilisateur ayant le rôle 'editeur' de créer 
    une nouvelle inscription à un événement en fournissant les détails 
    nécessaires dans le corps de la requête.

    Retourne :
    - Response :
        - 201 Created : Détails de l'inscription créée.
        - 400 Bad Request : Si les données fournies sont invalides.
    
     Autorisation :
    - Accessible par les editeurs.
    """
    serializer = EventInscriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_section(request):
    """
    Vue permettant de créer une nouvelle section liée à une publication existante.

    Méthode HTTP :
    - POST : Crée une nouvelle section et la lie à une publication spécifiée par l'utilisateur.

    Fonctionnalité :
    - L'utilisateur doit fournir un `publication_id` dans le corps de la requête pour lier la section à une publication existante.
    - Si l'identifiant de la publication (`publication_id`) est manquant ou invalide, une réponse d'erreur est retournée.
    - Si la publication est trouvée, la section est créée et associée à cette publication.

    Paramètres de requête :
    - `publication_id` : L'ID de la publication à laquelle la section doit être liée.
    - Les autres champs pertinents pour la création de la section sont envoyés dans le corps de la requête.

    Retourne :
    - Les détails de la section créée avec un statut HTTP 201 (Created) en cas de succès.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si les données sont invalides.
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la publication spécifiée n'existe pas.

    """
    data = request.data.copy()
    publication_id = data.get('publication_id')

    if not publication_id:
        return Response({"error": "publication_id is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        publication = Publication.objects.get(pk=publication_id)
    except Publication.DoesNotExist:
        return Response({"error": "Publication not found."}, status=status.HTTP_404_NOT_FOUND)

    # Assign the publication instance to the `id_publication` field
    data['id_publication'] = publication.pk
    serializer = SectionSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def list_sections_by_publication(request, publication_id):
    """
    Vue permettant de lister toutes les sections liées à une publication spécifique.

    Méthode HTTP :
    - GET : Récupère et renvoie toutes les sections associées à une publication donnée.

    Fonctionnalité :
    - L'utilisateur doit fournir l'`id_publication` dans l'URL pour récupérer les sections correspondantes.
    - Si aucune section n'est trouvée pour la publication donnée, une réponse d'erreur est retournée.

    Paramètre de requête :
    - `publication_id` : L'ID de la publication pour laquelle récupérer les sections.

    Retourne :
    - Une liste de sections avec un statut HTTP 200 (OK) si des sections sont trouvées.
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si aucune section n'est trouvée pour la publication spécifiée.
    """
    try:
        sections = section.objects.filter(id_publication=publication_id)
    except section.DoesNotExist:
        return Response({"error": "No sections found for this publication."}, status=status.HTTP_404_NOT_FOUND)

    serializer = SectionSerializer(sections, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# Get all clubs
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_clubs(request):
    """Récupère tous les clubs.

    Cette fonction traite une requête HTTP GET pour récupérer toutes les entrées
    de clubs dans la base de données. Elle renvoie une liste de tous les clubs
    sérialisés.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les informations de la requête.

    Retourne :
    - Response : Une réponse contenant une liste de clubs sérialisés. 
      En cas de succès, les données des clubs sont renvoyées avec un code d'état HTTP 200.
    
     Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'GET':
        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)

# Create a new club
@api_view(['POST'])
@user_types_required('adminstrateur')
def create_club(request):
    """Crée un nouveau club.

    Cette fonction traite une requête HTTP POST pour créer un nouveau club dans 
    la base de données. Elle attend que les données du club soient fournies dans 
    le corps de la requête et les valide à l'aide du sérialiseur.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les données du club à créer.

    Retourne :
    - Response : Une réponse contenant les données du club créé en cas de succès 
      avec un code d'état HTTP 201. 
      En cas d'erreur de validation, elle renvoie les erreurs avec un code d'état 
      HTTP 400.
    
    Autorisation :
    - Accessible par  les adminstrateur .
    """
    if request.method == 'POST':
        serializer = ClubSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


# Update a Club
@api_view(['PUT'])
@user_types_required('editeur')
def update_club(request, club_id):
    """Met à jour un club existant.

    Cette fonction traite une requête HTTP PUT pour mettre à jour les informations 
    d'un club dans la base de données. Elle attend que les nouvelles données du 
    club soient fournies dans le corps de la requête.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les données du club à mettre à jour.
    - club_id : L'identifiant unique du club à mettre à jour.

    Retourne :
    - Response : Une réponse contenant les données du club mis à jour en cas de succès 
      avec un code d'état HTTP 200. 
      En cas d'erreur de validation, elle renvoie les erreurs avec un code d'état 
      HTTP 400.
     Autorisation :
    - Accessible par  les editeurs.
    """
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'PUT':
        serializer = ClubSerializer(club, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a Club
@api_view(['DELETE'])
@user_types_required('adminstrateur')
def delete_club(request, club_id):
    """Supprime un club existant.

    Cette fonction traite une requête HTTP DELETE pour supprimer un club de la base de données.

    Paramètres :
    - request : L'objet de la requête HTTP.
    - club_id : L'identifiant unique du club à supprimer.

    Retourne :
    - Response : Une réponse confirmant la suppression du club avec un code d'état 
      HTTP 204.
    
     Autorisation :
    - Accessible par les adminstrateur.
    """
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'DELETE':
        club.delete()
        return Response("Club deleted successfully", status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_evenement_publications(request, club_id):
    """Récupère toutes les publications d'un club.

    Cette fonction traite une requête HTTP GET pour récupérer les publications 
    associées à un club spécifique.

    Paramètres :
    - request : L'objet de la requête HTTP.
    - club_id : L'identifiant unique du club dont on veut récupérer les publications.

    Retourne :
    - Response : Une réponse contenant les publications du club avec un code d'état 
      HTTP 200.
    """
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'GET':
        publications = club.publications.all()
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data)

# Add a publication of type 'evenement' to a club
@api_view(['POST'])
@user_types_required('editeur')
def add_evenement_publication_to_club(request, club_id):
    """Ajoute une publication de type 'evenement' à un club existant.

    Cette fonction traite une requête HTTP POST pour ajouter une nouvelle publication
    de type 'evenement' à un club spécifique. Elle s'assure que la publication est 
    correctement associée au club et que le type de publication est valide.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les données de la publication à ajouter.
    - club_id : L'identifiant unique du club auquel la publication sera ajoutée.

    Retourne :
    - Response : 
      - Si la publication est ajoutée avec succès, renvoie les données de la publication 
        créée avec un code d'état HTTP 201.
      - Si le type de publication n'est pas 'evenement', renvoie un message d'erreur 
        avec un code d'état HTTP 400.
      - Si les données de la publication sont invalides, renvoie les erreurs de validation 
        avec un code d'état HTTP 400.
    """
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'POST':
        data = request.data.copy()
        data['club'] = club.id_club
        serializer = PublicationSerializer(data=data)
        if serializer.is_valid():
            if serializer.validated_data['type_publication'] != 'evenement':
                return Response("Publication type must be 'evenement'", status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update a Member
@api_view(['PUT'])
@user_types_required('editeur')
def update_member(request, member_id):
    """Met à jour les informations d'un membre du club.

    Cette vue permet aux utilisateurs ayant le type 'editeur' de mettre à jour
    les détails d'un membre spécifique en utilisant son identifiant unique.

    Paramètres :
    - request : L'objet de requête contenant les nouvelles données du membre.
    - member_id : L'identifiant unique du membre à mettre à jour.

    Retourne :
    - Response : 
        - 200 OK : Si la mise à jour a réussi, avec les données du membre mises à jour.
        - 400 Bad Request : Si les données fournies ne sont pas valides.
        
     Autorisation :
    - Accessible par  les editeurs.
    """
    member = get_object_or_404(MembreClub, id_membre=member_id)
    if request.method == 'PUT':
        serializer = MembreSerializer(member, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Delete a Member
@api_view(['DELETE'])
@user_types_required('adminstrateur')
def delete_member(request, member_id):
    """Supprime un membre du club.

    Cette vue permet aux utilisateurs ayant le type 'adminstrateur' de supprimer
    un membre spécifique en utilisant son identifiant unique.

    Paramètres :
    - request : L'objet de requête.
    - member_id : L'identifiant unique du membre à supprimer.

    Retourne :
    - Response : 
        - 204  : Si la suppression a réussi.
         Autorisation :
    - Accessible par tous les adminstrateurs .
    """
    member = get_object_or_404(MembreClub, id_membre=member_id)
    if request.method == 'DELETE':
        member.delete()
        return Response("Member deleted successfully", status=status.HTTP_204_NO_CONTENT)

# Get Members by Name
@api_view(['GET'])
@permission_classes([AllowAny])
def get_members_by_name(request, club_id, name):
    """Récupère les membres d'un club par leur nom.

    Cette vue permet à quiconque d'obtenir une liste de membres d'un club
    dont le nom contient une chaîne spécifique.

    Paramètres :
    - request : L'objet de requête.
    - club_id : L'identifiant unique du club dont on souhaite récupérer les membres.
    - name : La chaîne à rechercher dans les noms des membres.

    Retourne :
    - Response : 
        - 200 OK : Une liste de membres correspondant à la recherche.
     Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'GET':
        club = get_object_or_404(Club, id_club=club_id)
        members = club.membres.filter(nom__icontains=name)
        serializer = MembreSerializer(members, many=True)
        return Response(serializer.data)

# Get Clubs by Name
@api_view(['GET'])
@permission_classes([AllowAny])
def get_clubs_by_name(request, name):
    """Récupère les clubs par leur nom.

    Cette vue permet à quiconque d'obtenir une liste de clubs
    dont le nom contient une chaîne spécifique.

    Paramètres :
    - request : L'objet de requête.
    - name : La chaîne à rechercher dans les noms des clubs.

    Retourne :
    - Response : 
        - 200 OK : Une liste de clubs correspondant à la recherche.
    """
    if request.method == 'GET':
        clubs = Club.objects.filter(nom__icontains=name)
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)



@api_view(['POST'])

@user_types_required('directeur_relex')
def add_partenaire(request):
    """
    Vue permettant d'ajouter un nouveau partenaire ou plusieurs partenaires .

    Méthode HTTP :
    - POST : Crée un ou plusieurs partenaires.

    Fonctionnalité :
    - Si le corps de la requête contient un tableau (liste), plusieurs partenaires sont ajoutés simultanément.
    - Si le corps de la requête contient un seul objet, un partenaire unique est créé.
    - L'utilisateur doit avoir les droits 'directeur_relex' pour utiliser cette fonction.

    Paramètres de requête :
    - Les détails du partenaire (ou des partenaires) sont envoyés dans le corps de la requête.

    Retourne :
    - Les détails des partenaires créés avec un statut HTTP 201 (Created) en cas de succès.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si les données sont invalides.
    """
    if request.method == 'POST':
        if isinstance(request.data, list):  # If data is an array
            serializer = PartenaireSerializer(data=request.data, many=True)
        else:  # If data is a single object
            serializer = PartenaireSerializer(data=request.data)
       
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@user_types_required('directeur_relex')  # Remplacez par le décorateur ou la permission nécessaire
def update_partenaire(request, id):
    """
    Vue permettant de mettre à jour les informations d'un partenaire existant.

    Méthode HTTP :
    - PUT : Met à jour les informations du partenaire spécifié par l'ID.

    Fonctionnalité :
    - L'utilisateur doit avoir les droits 'directeur_relex' pour mettre à jour les informations.
    - Si le partenaire n'existe pas, une réponse d'erreur est retournée.

    Paramètres de requête :
    - `id` : L'ID du partenaire à mettre à jour.
    - Les nouvelles données pour mettre à jour le partenaire sont envoyées dans le corps de la requête.

    Retourne :
    - Les détails du partenaire mis à jour avec un statut HTTP 200 (OK) en cas de succès.
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si le partenaire n'est pas trouvé.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si les données sont invalides.
    """
    try:
        partenaire = Partenaire.objects.get(pk=id)
    except Partenaire.DoesNotExist:
        return Response("Partenaire introuvable", status=status.HTTP_404_NOT_FOUND)

    serializer = PartenaireSerializer(partenaire, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@user_types_required('directeur_relex')  # Remplacez par le décorateur ou la permission nécessaire
def delete_partenaire(request, id):
    """
    Vue permettant de supprimer un partenaire existant.

    Méthode HTTP :
    - DELETE : Supprime le partenaire spécifié par l'ID.

    Fonctionnalité :
    - L'utilisateur doit avoir les droits 'directeur_relex' pour effectuer la suppression.
    - Si le partenaire n'existe pas, une réponse d'erreur est retournée.

    Paramètre de requête :
    - `id` : L'ID du partenaire à supprimer.

    Retourne :
    - Un message confirmant la suppression avec un statut HTTP 204 (No Content).
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si le partenaire n'est pas trouvé.
    """
    try:
        partenaire = Partenaire.objects.get(pk=id)
    except Partenaire.DoesNotExist:
        return Response("Partenaire introuvable", status=status.HTTP_404_NOT_FOUND)

    partenaire.delete()
    return Response("Partenaire supprimé avec succès", status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_partenaire(request):
    """
    Vue permettant de récupérer la liste de tous les partenaires.

    Méthode HTTP :
    - GET : Renvoie la liste de tous les partenaires.

    Fonctionnalité :
    - Accessible à tous les utilisateurs (permission `AllowAny`).

    Retourne :
    - La liste des partenaires avec un statut HTTP 200 (OK).
    """
    
    if request.method == 'GET':
        queryset = Partenaire.objects.all()
        serializer = PartenaireSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_partenaire_byid(request, id):
    """
    Vue permettant de récupérer la liste de tous les partenaires.

    Méthode HTTP :
    - GET : Renvoie la liste de tous les partenaires.

    Fonctionnalité :
    - Accessible à tous les utilisateurs (permission `AllowAny`).

    Retourne :
    - La liste des partenaires avec un statut HTTP 200 (OK).
    """
    partenaire = get_object_or_404(Partenaire, id=id)
    serializer = PartenaireSerializer(partenaire)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def post_demande_partenariat(request):
    if request.method == 'POST':
        serializer = DemandePartenariatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
   
@api_view(['GET'])
@user_types_required('directeur_relex')
def get_all_demande_partenariat(request):
    if request.method == 'GET':
        demandes = Demande_Partenariat.objects.all()
        serializer = DemandePartenariatSerializer(demandes, many=True)
        return Response(serializer.data)


@api_view(['PUT'])
@user_types_required('directeur_relex')
def accepter_demande_partenariat(request, id):
    """
    Vue permettant d'accepter une demande de partenariat et de créer un partenaire associé.

    Méthode HTTP :
    - PUT : Change l'état de la demande à 'Acceptée' et crée un nouveau partenaire.

    Fonctionnalité :
    - L'utilisateur doit avoir les droits 'directeur_relex' pour accepter une demande.
    - Si la demande n'existe pas, une réponse d'erreur est retournée.

    Paramètre de requête :
    - `id` : L'ID de la demande à accepter.

    Retourne :
    - Un message confirmant l'acceptation et la création du partenaire avec un statut HTTP 200 (OK).
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la demande n'est pas trouvée.
    """
    try:
        demande = Demande_Partenariat.objects.get(pk=id)
    except Demande_Partenariat.DoesNotExist:
        return Response("Demande de partenariat introuvable", status=status.HTTP_404_NOT_FOUND)

    demande.etat = 'Acceptée'
    demande.save()

    partenaire = Partenaire.objects.create(
        nom=demande.organisme,
        description=demande.country,
        contact=demande.phoneNumber,
        email=demande.email
    )

    return Response("Demande de partenariat acceptée et le partenaire ajouté", status=status.HTTP_200_OK)


@api_view(['PUT'])
@user_types_required('directeur_relex')
def refuser_demande_partenariat(request, id):
    """
    Vue permettant de refuser une demande de partenariat.

    Méthode HTTP :
    - PUT : Change l'état de la demande à 'Refusée'.

    Fonctionnalité :
    - L'utilisateur doit avoir les droits 'directeur_relex' pour refuser une demande.
    - Si la demande n'existe pas, une réponse d'erreur est retournée.

    Paramètre de requête :
    - `id` : L'ID de la demande à refuser.

    Retourne :
    - Un message confirmant le refus de la demande avec un statut HTTP 200 (OK).
    - Un message d'erreur avec un statut HTTP 404 (Not Found) si la demande n'est pas trouvée.
    """
    try:
        demande = Demande_Partenariat.objects.get(pk=id)
    except Demande_Partenariat.DoesNotExist:
        return Response("Demande de partenariat introuvable", status=status.HTTP_404_NOT_FOUND)

    demande.etat = 'Refusée'
    demande.save()
    return Response("Demande de partenariat refusée", status=status.HTTP_200_OK)
   



@api_view(['POST'])
def add_devis(request):
    """
    Vue permettant d'ajouter un nouveau devis.

    Méthode HTTP :
    - POST : Crée un devis basé sur les données fournies dans la requête.

    Fonctionnalité :
    - Récupère les données envoyées, les valide et enregistre un devis.
    - Utilise le `DevisSerializer` pour sérialiser les données.

    Retourne :
    - Les données du devis nouvellement créé avec un statut HTTP 201 (Created) si la requête est valide.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si la requête est invalide.
    """
    if request.method == 'POST':
        serializer = DevisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@user_types_required('directeur_relex')
def valider_devis(request):
    """
    Valide un devis en changeant son état à "Validé".

    Requête POST :
    - Paramètre `devis_id` : L'identifiant unique du devis à valider.

    Réponses :
    - 200 : Succès, le devis a été validé.
    - 400 : Le paramètre `devis_id` est manquant.
    - 404 : Le devis n'existe pas.
    """
    devis_id = request.query_params.get('devis_id')
    if devis_id is None:
        return Response("ID du devis manquant", status=status.HTTP_400_BAD_REQUEST)
   
    try:
        devis = Devis.objects.get(pk=devis_id)
        devis.etat = 'Validé'
        devis.save()
        return Response("Devis validé", status=status.HTTP_200_OK)
    except Devis.DoesNotExist:
        return Response("Devis introuvable", status=status.HTTP_404_NOT_FOUND)



@api_view(['GET'])
@user_types_required('directeur_relex')
def get_all_devis(request):
    """
    Récupère tous les devis.

    Requête GET :
    - Cette vue permet aux utilisateurs de type 'directeur_relex' de récupérer la liste complète des devis enregistrés.

    Réponses :
    - 200 : Succès, retourne la liste des devis sous forme de données sérialisées.
    
    Fonctionnement :
    - Vérifie que l'utilisateur a les permissions requises (directeur_relex).
    - Récupère tous les devis dans la base de données via une requête à l'objet `Devis`.
    - Sérialise les données récupérées et les renvoie en réponse sous forme de liste JSON.
    """
    if request.method == 'GET':
        queryset = Devis.objects.all()
        serializer = DevisSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@user_types_required('adminstrateur')
def add_partenaire_labo(request):
    """
    Vue permettant d'ajouter un partenaire de laboratoire.

    Méthode HTTP :
    - POST : Crée un nouveau partenaire en fonction des données fournies.

    Fonctionnalité :
    - Valide les données reçues à l'aide du `Partenaire_laboSerializer`.
    - Sauvegarde un nouveau partenaire s'il n'y a pas d'erreurs.

    Retourne :
    - Les données du partenaire nouvellement créé avec un statut HTTP 201 (Created) en cas de succès.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si la validation échoue.
    """
    if  request.method == 'POST':
        serializer = Partenaire_laboSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def partenaire_labo_list(request):
    """
    Vue permettant de lister tous les partenaires de laboratoire.

    Méthode HTTP :
    - GET : Récupère la liste complète des partenaires de laboratoire.

    Fonctionnalité :
    - Utilise le `Partenaire_laboSerializer` pour sérialiser et retourner les données de tous les partenaires.

    Retourne :
    - La liste des partenaires avec un statut HTTP 200 (OK) en cas de succès.
    """
    if request.method == 'GET':
        queryset = Partenaire_labo.objects.all()
        serializer = Partenaire_laboSerializer(queryset, many=True)
        return Response(serializer.data)      


@api_view(['GET'])
@permission_classes([AllowAny])
def laboratoire_list(request):
    """Récupère la liste de tous les laboratoires.

    Cette vue permet à quiconque d'obtenir une liste de tous les laboratoires de recherche.

    Paramètres :
    - request : L'objet de requête.

    Retourne :
    - Response : 
        - 200 OK : Une liste de laboratoires avec leurs attributs.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'GET':
        queryset = Laboratoire.objects.all()
        serializer = LaboratoireSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view([ 'POST'])
@permission_classes([AllowAny])
def add_laboratoire(request):
    """Ajoute un nouveau laboratoire.

    Cette vue permet à quiconque de créer un laboratoire de recherche en fournissant les données nécessaires.

    Paramètres :
    - request : L'objet de requête contenant les données du laboratoire.

    Retourne :
    - Response : 
        - 201 Created : Les données du laboratoire créé.
        - 400 Bad Request : Erreurs de validation des données fournies.
    """
   
    if request.method == 'POST':
        serializer = LaboratoireSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@user_types_required('adminstrateur')
def add_chercheur(request):
    """Vue pour ajouter un nouvel utilisateur de type chercheur.

    Cette vue permet à un administrateur d'ajouter un nouvel utilisateur qui sera un chercheur dans le système.

    Méthodes autorisées :
    - POST : Crée un nouvel utilisateur en utilisant les données fournies.

    Paramètres :
    - request : Objet de requête contenant les données de l'utilisateur à ajouter.

    Corps de la requête (request body) :
    - Les données de l'utilisateur doivent être fournies sous forme d'objet JSON. Cela inclut les champs nécessaires pour créer un nouvel utilisateur :

    Réponse :
    - Si les données sont valides et l'utilisateur est créé avec succès, retourne les données de l'utilisateur nouvellement créé avec un statut HTTP 201 Created.
    - Si les données fournies ne sont pas valides, retourne les erreurs de validation avec un statut HTTP 400 Bad Request.
    Autorisation :
    - Accessible par les administrateurs.
   """
    if request.method == 'POST':
        serializer = UtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([AllowAny])
def chercheur_list(request):
    """Vue pour récupérer la liste des utilisateurs de type chercheur.

    Cette vue permet de récupérer tous les utilisateurs qui sont marqués comme chercheurs dans le système.

    Méthodes autorisées :
    - GET : Récupère la liste des chercheurs.

    Paramètres :
    - request : Objet de requête contenant les informations de la demande.

    Réponse :
    - Retourne une liste d'utilisateurs qui sont des chercheurs avec un statut HTTP 200 OK.
    - Si aucun chercheur n'est trouvé, retourne une liste vide.
    
    Autorisation :
    - Accessible par les administrateurs.
    """
    if request.method == 'GET':
        queryset = Utilisateur.objects.filter(is_chercheur=True)
        serializer = UtilisateurSerializer(queryset, many=True)
        return Response(serializer.data)
   


# @api_view(['GET', 'POST'])
# def equipe_projet_list(request):
#     if request.method == 'GET':
#         queryset = Equipe_Projet.objects.all()
#         serializer = Equipe_ProjetSerializer(queryset, many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = Equipe_ProjetSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()    
#             return Response(serializer.data, status=201)          
#         return Response(serializer.errors, status=400)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_projet_list(request):
    """
    Vue pour lister toutes les équipes de projet.

    Méthode HTTP :
    - GET : Récupère la liste complète des équipes de projet.

    Fonctionnalité :
    - Récupère toutes les équipes de projet via le modèle `Equipe_Projet`.
    - Utilise le `Equipe_ProjetSerializer` pour sérialiser les données.

    Retourne :
    - La liste des équipes de projet avec un statut HTTP 200 (OK) en cas de succès.
    - Un message d'erreur avec un statut HTTP 500 (Internal Server Error) si une exception est levée.
    """
    if request.method == 'GET':
        # Assuming you want to filter equipe by authenticated Chercheur
        # if request.user.is_authenticated and request.user.is_chercheur:
            equipe = Equipe_Projet.objects.filter(Chercheur=request.user)
            serializer = Equipe_ProjetSerializer(equipe, many=True)
            return Response(serializer.data)
        # else:
        #     return Response("You are not authorized to access this resource.", status=status.HTTP_403_FORBIDDEN)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_projet_list(request):

 try:
        equipes = Equipe_Projet.objects.all()  # Récupère toutes les équipes de projet
        serializer = Equipe_ProjetSerializer(equipes, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
 except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view([ 'POST'])
@permission_classes([AllowAny])
def add_equipe_projet(request):
    """
    Vue pour ajouter une nouvelle équipe de projet.

    Méthode HTTP :
    - POST : Crée une nouvelle équipe de projet en fonction des données fournies.

    Fonctionnalité :
    - Valide les données reçues à l'aide du `Equipe_ProjetSerializer`.
    - Sauvegarde une nouvelle équipe de projet s'il n'y a pas d'erreurs.

    Retourne :
    - Les données de l'équipe de projet nouvellement créée avec un statut HTTP 201 (Created) en cas de succès.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si la validation échoue.
    """
    if request.method == 'POST':
        # You can add authorization logic here if required
        serializer = Equipe_ProjetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    


@api_view(['POST'])
@permission_classes([AllowAny])
def add_equipe_recherche(request):
    """
    Vue pour ajouter une nouvelle équipe de recherche.

    Méthode HTTP :
    - POST : Crée une nouvelle équipe de recherche en fonction des données fournies.

    Fonctionnalité :
    - Valide les données reçues à l'aide du `Equipe_RechercheSerializer`.
    - Sauvegarde une nouvelle équipe de recherche s'il n'y a pas d'erreurs.

    Retourne :
    - Les données de l'équipe de recherche nouvellement créée avec un statut HTTP 201 (Created) en cas de succès.
    - Un message d'erreur avec un statut HTTP 400 (Bad Request) si la validation échoue.
    """
    if request.method == 'POST':
        serializer = Equipe_RechercheSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_members(request, equipe_id):
    """
    Récupérer les membres d'une équipe de recherche spécifiée.

    Paramètres :
    - request : L'objet de la requête HTTP.
    - equipe_id : L'identifiant de l'équipe de recherche.

    Retourne :
    - Une réponse contenant la liste des utilisateurs et leurs informations de contact,
      ou une réponse vide si aucun membre n'est trouvé.
    """
    # Fetch users in the specified research team
    users = Utilisateur.objects.filter(equipeRecherche_id=equipe_id)
   
    # Create a dictionary to hold contact information
    contacts = []

    for user in users:
        # Search for contacts in the Annuaire based on user's first and last name
        contact = Annuaire.objects.filter(nom=user.family_name, prenom=user.first_name).first()
       
        # Serialize user and contact data
        user_data = UtilisateurSerializer(user).data
        contact_data = AnnuaireSerializer(contact).data if contact else None

        # Append to contacts list
        contacts.append({
            'user': user_data,
            'contact': contact_data
        })

    return Response(contacts)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_enseignant_annuaire(request, nom, prenom):
    """
    Récupérer les informations d'un enseignant dans l'annuaire.

    Paramètres :
    - request : L'objet de la requête HTTP.
    - nom : Le nom de l'enseignant.
    - prenom : Le prénom de l'enseignant.

    Retourne :
    - Les données de l'enseignant si trouvé, sinon une erreur 404.
    """
    enseignant = get_object_or_404(Enseignant_Annuaire, nom=nom, prenom=prenom)
    serializer = EnseignantAnnuaireSerializer(enseignant)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_recherche_list(request):
    """
    Vue pour lister toutes les équipes de recherche.

    Méthode HTTP :
    - GET : Récupère la liste complète des équipes de recherche.

    Fonctionnalité :
    - Récupère toutes les équipes de recherche via le modèle `Equipe_Recherche`.
    - Utilise le `Equipe_RechercheSerializer` pour sérialiser les données.

    Retourne :
    - La liste des équipes de recherche avec un statut HTTP 200 (OK) en cas de succès.
    """
    if request.method == 'GET':
        queryset = Equipe_Recherche.objects.all()
        serializer = Equipe_RechercheSerializer(queryset, many=True)
        return Response(serializer.data)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_equipes_par_laboratoire(request, laboratoire_nom):
    """Récupère toutes les équipes de recherche associées à un laboratoire donné.

    Cette vue permet de récupérer les équipes de recherche en fonction du nom du laboratoire spécifié.

    Paramètres :
    - laboratoire_nom : Le nom du laboratoire pour lequel les équipes doivent être récupérées.

    Retourne :
    - Response : 
        - 200 OK : Une liste d'équipes de recherche associées au laboratoire.
        - 404 Not Found : Si le laboratoire avec le nom spécifié n'existe pas.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    try:
        laboratoire = Laboratoire.objects.get(nom__iexact=laboratoire_nom)
        equipes = Equipe_Recherche.objects.filter(laboratoire=laboratoire)
        serializer = Equipe_RechercheSerializer(equipes, many=True)
        return Response(serializer.data)
    except Laboratoire.DoesNotExist:
        return Response({'error': 'Laboratoire not found'}, status=404)

@api_view(['POST'])
@permission_classes([AllowAny])
def add_projet(request):
    """
    Vue pour ajouter un nouveau projet.

    Méthode HTTP :
    - POST : Reçoit les données du projet à ajouter.

    Fonctionnalité :
    - Utilise le sérialiseur `ProjetSerializer` pour valider et sauvegarder les données dans la base de données.

    Retourne :
    - Les données du projet créé avec un statut HTTP 201 (CREATED) en cas de succès.
    - En cas d'erreur de validation, retourne les erreurs avec un statut HTTP 400 (BAD REQUEST).
    """   
    if request.method == 'POST':
        serializer = ProjetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def projet_list(request):
    """
    Vue pour lister tous les projets.

    Méthode HTTP :
    - GET : Récupère et retourne la liste complète des projets.

    Fonctionnalité :
    - Utilise le sérialiseur `ProjetSerializer` pour transformer les objets en format JSON.

    Retourne :
    - La liste des projets avec un statut HTTP 200 (OK) en cas de succès.
    """
    if request.method == 'GET':
        queryset = Projet.objects.all()
        serializer = ProjetSerializer(queryset, many=True)
        return Response(serializer.data)
   


@api_view(['GET'])
@permission_classes([AllowAny])
def projets_par_laboratoire(request, nom_laboratoire):
    """Récupère les projets associés à un laboratoire donné avec des options de filtrage.

    Cette vue permet de récupérer les projets basés sur le laboratoire spécifié et de filtrer 
    par type de projet, thème ou année.

    Paramètres :
    - nom_laboratoire : Le nom du laboratoire pour lequel les projets doivent être récupérés.

    Filtrage (paramètres optionnels) :
    - type : Filtre les projets par type.
    - theme : Filtre les projets par thème.
    - annee : Filtre les projets par année.

    Retourne :
    - Response :
        - 200 OK : Une liste de projets associés au laboratoire, filtrée selon les critères fournis.
        - 404 Not Found : Si le laboratoire avec le nom spécifié n'existe pas.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    laboratoire = get_object_or_404(Laboratoire, nom=nom_laboratoire)
    type_projet = request.GET.get('type', None)
    theme = request.GET.get('theme', None)
    annee = request.GET.get('annee', None)

    projets = Projet.objects.filter(equipe_projet__laboratoire=laboratoire)
    if type_projet:
        projets = projets.filter(type__iexact=type_projet)
   
    if theme:
        projets = projets.filter(themes__nom =theme)
   
    if annee:
        projets = projets.filter(annee=annee)
    serializer = ProjetSerializer(projets, many=True)
    return Response({'projets': serializer.data})





@api_view(['GET'])
@permission_classes([AllowAny])
def annees_projets(request):
    """
    Vue pour obtenir la liste des années distinctes des projets.

    Méthode HTTP :
    - GET : Récupère les années de tous les projets et retourne une liste.

    Retourne :
    - Un dictionnaire contenant une liste d'années sous la clé 'annees' avec un statut HTTP 200 (OK).
    """
    annees = Projet.objects.values_list('annee', flat=True).distinct()
    return Response({'annees': list(annees)})





@api_view(['POST'])
@permission_classes([AllowAny])
def add_theme_recherche(request):
    """
    Vue pour ajouter un nouveau thème de recherche.

    Méthode HTTP :
    - POST : Reçoit les données du thème de recherche à ajouter.

    Retourne :
    - Les données du thème de recherche créé avec un statut HTTP 201 (CREATED) en cas de succès.
    - En cas d'erreur de validation, retourne les erreurs avec un statut HTTP 400 (BAD REQUEST).
    """
    if request.method == 'POST':
        serializer = Theme_RechercheSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def theme_recherche_list(request):
    """
    Vue pour lister tous les thèmes de recherche.

    Méthode HTTP :
    - GET : Récupère et retourne la liste complète des thèmes de recherche.

    Retourne :
    - La liste des thèmes de recherche avec un statut HTTP 200 (OK) en cas de succès.
    """
    if request.method == 'GET':
        queryset = Theme_Recherche.objects.all()
        serializer = Theme_RechercheSerializer(queryset, many=True)
        return Response(serializer.data)
   


@api_view(['POST'])
@permission_classes([AllowAny])
def PoserQuestion( request):
     """
    Vue permettant à un utilisateur de poser une question.

    Méthode : POST

    Corps de la requête : 
    - Doit contenir les données sérialisées pour créer une nouvelle question (ex. titre, contenu, catégorie).

    Comportement :
    - Si les données sont valides, la question est créée et enregistrée dans la base de données.
    - Réponse : Renvoie les données de la question nouvellement créée avec le statut HTTP 201.
    - En cas d'erreur de validation, renvoie les erreurs avec le statut HTTP 400.

     """
     serializer = QuestionSerializer(data=request.data)
     if serializer.is_valid():
          #  serializer.save(auteur=request.user)  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@user_types_required('superuser')
def RepondreQuestion(request, question_id):
    """
    Vue permettant à un superutilisateur de répondre à une question.

    Méthode : POST

    Comportement :
    - Cherche la question correspondante via l'ID (renvoie une erreur 404 si la question n'existe pas).
    - Si les données de réponse sont valides, une réponse est créée pour la question.
    - Marque la question comme validée (`question.valide = True`).
    - Réponse : Renvoie les données de la réponse avec le statut HTTP 201.
    - En cas d'erreur de validation, renvoie les erreurs avec le statut HTTP 400.

    """
    question = get_object_or_404(Question, pk=question_id)
    serializer = ReponseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(question=question)
        question.valide = True
        question.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def GetQuestions(request, category):
    """
    Vue permettant de récupérer toutes les questions d'une catégorie spécifique.

    Méthode : GET

    Comportement :
    - Récupère toutes les questions de la catégorie spécifiée.
    - Pour chaque question, récupère ses réponses associées et les inclut dans la réponse.
    
    Réponse :
    - Une liste d'objets JSON contenant les détails des questions (titre, contenu, date de création, etc.) et les réponses associées.
    """
    questions = Question.objects.filter(category=category)
    data = []
    for question in questions:
        reponses = Reponse.objects.filter(question=question)
        reponses_data = []
        for reponse in reponses:
            reponses_data.append({
                'reponse_texte': reponse.contenu,
            })
        data.append({
            'id': question.id,
            'category': question.category,
           # 'auteur': question.auteur.username,
            'titre': question.titre,
            'contenu': question.contenu,
            'date_creation': question.date_creation,
            'valide':question.valide,
            'reponses': reponses_data
             
        })
    return Response(data)

@api_view(['GET'])
@permission_classes([AllowAny])
def GetQuestionById(request, question_id):
    """
    Vue permettant de récupérer une question par son ID ainsi que ses réponses associées.

    Méthode : GET

    Paramètre URL :
    - `question_id` : L'ID de la question à récupérer.

    Comportement :
    - Recherche la question par son identifiant.
    - Si la question est trouvée, récupère les réponses associées et les inclut dans la réponse.
    - Si la question n'existe pas, retourne une erreur 404.
    
    Réponse :
    - Un objet JSON contenant les détails de la question (titre, contenu, date de création, etc.) et ses réponses.
    - Chaque réponse inclut le texte et la date de création.
 """   
    try:
        question = Question.objects.get(pk=question_id)
        print(f"Question trouvée: {question}")
    except Question.DoesNotExist:
        print(f"Question avec l'ID {question_id} non trouvée")
        return Response({'error': 'Question not found.'}, status=status.HTTP_404_NOT_FOUND)
   
    reponses = Reponse.objects.filter(question=question)
    print(f"Nombre de réponses trouvées: {reponses.count()}")
   
    reponses_data = []
    for reponse in reponses:
        reponses_data.append({
            'reponse_texte': reponse.contenu,
            'date_creation': reponse.date_creation
        })
   
    question_data = {
        'id': question.id,
        'category': question.category,
        'titre': question.titre,
        'contenu': question.contenu,
        'date_creation': question.date_creation,
        'reponses': reponses_data
    }
   
    print(f"Data retournée: {question_data}")

    return Response(question_data)


@api_view(['GET'])
@permission_classes([AllowAny])
def GetAllQuestions(request):
    """
    Vue permettant de récupérer toutes les questions de la base de données.

    Méthode : GET

    Comportement :
    - Récupère toutes les questions existantes dans la base de données, sans filtre.
    
    Réponse :
    - Une liste d'objets JSON contenant les détails de chaque question : ID, catégorie, titre, contenu, date de création, et statut de validation.
    """
    questions = Question.objects.all()
    questions_data = []

    for question in questions:
        questions_data.append({
            'id': question.id,
            'category': question.category,
           # 'auteur': question.auteur.username,
            'titre': question.titre,
            'contenu': question.contenu,
            'valide':question.valide,
            'date_creation': question.date_creation,

        })

    return Response(questions_data, status=status.HTTP_200_OK)



@api_view(['GET'])
@permission_classes([AllowAny])
def GetValideQuestions(request):
    """
    Vue permettant de récupérer toutes les questions validées.

    Méthode : GET

    Comportement :
    - Filtre les questions pour ne récupérer que celles qui sont marquées comme `valide=True`.
    
    Réponse :
    - Une liste d'objets JSON des questions validées, avec les détails tels que : ID, catégorie, titre, contenu, et date de création.
    
    """
    valide_questions = Question.objects.filter(valide=True)
    serializer = QuestionSerializer(valide_questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@user_types_required('adminstrateur','chercheur')
def add_annuaire(request):
    """
    Ajouter une nouvelle entrée dans l'annuaire.

    Cette fonction traite les requêtes POST pour ajouter une entrée dans 
    l'annuaire en fonction de la catégorie spécifiée. Elle prend en charge 
    plusieurs types d'entrées : administrateurs, enseignants et anciens élèves.

    Paramètres :
    - request : 
        - `data` (dict) : Un dictionnaire contenant les données de l'annuaire, 
          incluant les champs requis selon la catégorie sélectionnée. 
          Les champs suivants sont attendus :
            - category (str) : La catégorie de l'entrée ('admin', 'enseignant', 'alumnie').
            - nom (str) : Le nom de la personne.
            - prenom (str) : Le prénom de la personne.
            - description (str) : Une description de la personne.
            - contact (str, optionnel) : Le numéro de contact de la personne.
            - email (str) : L'adresse email de la personne.
            - photo (file, optionnel) : Une photo de la personne.
            - linkedin (str, optionnel) : L'URL du profil LinkedIn de la personne.
            - mot_cle (str, optionnel) : Des mots clés associés à la personne.
            - service (str, optionnel) : Le service de l'administration (pour les admins).
            - grade (str, optionnel) : Le grade de l'enseignant (pour les enseignants).
            - promotion (str, optionnel) : La promotion de l'alumni (pour les anciens élèves).

    Retourne :
    - Response : 
        - En cas de succès : Les données de l'entrée créée (dict) et un code de statut 201 (Created).
        - En cas d'erreur de validation : Les erreurs de validation (dict) et un code de statut 400 (Bad Request).
        - En cas de catégorie invalide : Un message d'erreur et un code de statut 400 (Bad Request).
        - En cas de méthode de requête invalide : Un message d'erreur et un code de statut 405 (Method Not Allowed).
    """
    if request.method == 'POST':
        category = request.data.get('category')
        if category == 'admin':
            serializer = AdministrationAnnuaireSerializer(data=request.data)
        elif category == 'enseignant':
            serializer = EnseignantAnnuaireSerializer(data=request.data)
        elif category == 'alumnie':
            serializer = AlumnieAnnuaireSerializer(data=request.data)
        else:
            return Response("Invalid category", status=status.HTTP_400_BAD_REQUEST)
       
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return Response("Invalid request method", status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_annuaire(request):
    """
    Récupérer toutes les entrées de l'annuaire.

    Cette fonction renvoie toutes les entrées de l'annuaire sous forme de liste.

    Paramètres :
    - request : L'objet de la requête HTTP.

    Retourne :
    - Response : Une liste de toutes les entrées de l'annuaire (list), 
      ou une liste vide si aucune entrée n'est trouvée.
    """
    annuaires = Annuaire.objects.all()
    serializer = AnnuaireSerializer(annuaires, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_Annuaire(request, pk):
    """
    Récupérer une entrée spécifique de l'annuaire.

    Cette fonction renvoie une entrée de l'annuaire basée sur l'identifiant (pk) fourni.

    Paramètres :
    - request : L'objet de la requête HTTP.
    - pk (int) : L'identifiant de l'entrée à récupérer.

    Retourne :
    - Response : Les données de l'entrée (dict) si trouvée,
      ou un message d'erreur et un code de statut 404 si l'entrée n'existe pas.
    """
    try:
        entry = Annuaire.objects.get(pk=pk)
        serializer = AnnuaireSerializer(entry)
        return Response(serializer.data)
    except Annuaire.DoesNotExist:
        return Response("Entry not found", status=status.HTTP_404_NOT_FOUND)





@api_view(['PUT'])
@user_types_required('adminstrateur','chercheur')
def edit_Annuaire(request, pk):
    """
    Modifier une entrée existante dans l'annuaire.

    Cette fonction permet de mettre à jour les données d'une entrée de l'annuaire 
    spécifiée par l'identifiant (pk).

    Paramètres :
    - request : L'objet de la requête HTTP contenant les nouvelles données.
    - pk (int) : L'identifiant de l'entrée à modifier.

    Retourne :
    - Response : Les données mises à jour de l'entrée (dict) si la mise à jour est réussie,
      ou les erreurs de validation et un code de statut 400 si la mise à jour échoue,
      ou un message d'erreur et un code de statut 404 si l'entrée n'existe pas.
    """
    try:
        entry = Annuaire.objects.get(pk=pk)
        if request.method == 'PUT':
            serializer = AnnuaireSerializer(entry, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Annuaire.DoesNotExist:
        return Response("Entry not found", status=status.HTTP_404_NOT_FOUND)


@api_view(['DELETE'])
@user_types_required('adminstrateur','chercheur')
def delete_Annuaire(request, pk):
    """
    Supprimer une entrée de l'annuaire.

    Cette fonction permet de supprimer une entrée de l'annuaire spécifiée 
    par l'identifiant (pk).

    Paramètres :
    - request : L'objet de la requête HTTP.
    - pk (int) : L'identifiant de l'entrée à supprimer.

    Retourne :
    - Response : Un message de confirmation de suppression et un code de statut 204 
      si la suppression réussit,
      ou un message d'erreur et un code de statut 404 si l'entrée n'existe pas.
    """

    try:
        entry = Annuaire.objects.get(pk=pk)
        if request.method == 'DELETE':
            entry.delete()
            return Response("Entry deleted successfully", status=status.HTTP_204_NO_CONTENT)
    except Annuaire.DoesNotExist:
        return Response("Entry not found", status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def filter_enseignant_by_grade_and_mot_cle(request):
    """
    Filtrer les enseignants par grade et mots-clés.

    Cette fonction renvoie une liste d'enseignants qui correspondent aux critères de filtrage 
    basés sur le grade et les mots-clés fournis.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les paramètres de filtrage.
      - grade (str) : Le grade de l'enseignant à filtrer.
      - mot_cle (str) : Mots-clés à rechercher dans le champ 'mot_cle'.

    Retourne :
    - Response : Une liste d'enseignants correspondant aux critères de filtrage (list),
      ou une liste vide si aucune correspondance n'est trouvée.
    """
    grade = request.query_params.get('grade')
    mot_cle = request.query_params.get('mot_cle')
    if grade and mot_cle:
        enseignants = Enseignant_Annuaire.objects.filter(grade=grade, mot_cle__icontains=mot_cle)
    elif grade:
        enseignants = Enseignant_Annuaire.objects.filter(grade=grade)
    elif mot_cle:
        enseignants = Enseignant_Annuaire.objects.filter(mot_cle__icontains=mot_cle)
    else:
        enseignants = Enseignant_Annuaire.objects.all()  
    serializer = EnseignantAnnuaireSerializer(enseignants, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def filter_administration_by_mot_cle_and_service(request):
    """
    Filtrer les entrées d'administration par mots-clés et service.

    Cette fonction renvoie une liste d'entrées d'administration qui correspondent aux 
    critères de filtrage basés sur le service et les mots-clés fournis.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les paramètres de filtrage.
      - service (str) : Le service de l'administration à filtrer.
      - mot_cle (str) : Mots-clés à rechercher dans le champ 'mot_cle'.

    Retourne :
    - Response : Une liste d'entrées d'administration correspondant aux critères de filtrage (list),
      ou une liste vide si aucune correspondance n'est trouvée.
    """
    service= request.query_params.get('service')
    mot_cle = request.query_params.get('mot_cle')
    if service and mot_cle:
        admin = Administration_Annuaire.objects.filter(service=service, mot_cle__icontains=mot_cle)
    elif service :
        admin = Administration_Annuaire.objects.filter(service=service)
    elif mot_cle:
        admin = Administration_Annuaire.objects.filter(mot_cle__icontains=mot_cle)
    else:
        admin = Administration_Annuaire.objects.all()  
    serializer = AdministrationAnnuaireSerializer(admin, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def filter_alumnie_by_promotion(request):
    """
    Filtrer les anciens élèves par promotion.

    Cette fonction renvoie une liste d'anciens élèves qui correspondent aux critères de filtrage 
    basés sur la promotion et les mots-clés fournis.

    Paramètres :
    - request : L'objet de la requête HTTP contenant les paramètres de filtrage.
      - promotion (str) : La promotion de l'alumni à filtrer.
      - mot_cle (str) : Mots-clés à rechercher dans le champ 'mot_cle'.

    Retourne :
    - Response : Une liste d'anciens élèves correspondant aux critères de filtrage (list),
      ou une liste vide si aucune correspondance n'est trouvée.
    """
    promotion= request.query_params.get('promotion')
    mot_cle = request.query_params.get('mot_cle')
    if promotion and mot_cle:
        Alumnie = Alumnie_Annuaire.objects.filter(promotion=promotion, mot_cle__icontains=mot_cle)
    elif promotion :
        Alumnie = Alumnie_Annuaire.objects.filter(promotion=promotion)
    elif mot_cle:
        Alumnie = Alumnie_Annuaire.objects.filter(mot_cle__icontains=mot_cle)
    else:
        Alumnie= Alumnie_Annuaire.objects.all()  
    serializer = AlumnieAnnuaireSerializer(Alumnie, many=True)
    return Response(serializer.data)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_grades(request):
    """
    Récupérer tous les grades disponibles pour les enseignants.

    Cette fonction renvoie une liste des grades prédéfinis pour les enseignants.

    Paramètres :
    - request : L'objet de la requête HTTP.

    Retourne :
    - Response : Une liste des grades (list) disponibles pour les enseignants.
    """
    grades_set = set(choice[1] for choice in Enseignant_Annuaire.GRADE_CHOICES)
    grades_list = list(grades_set)
    return Response({'grades': grades_list})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_promotions(request):
    """
    Récupérer toutes les promotions d'anciens élèves disponibles.

    Cette fonction renvoie une liste des promotions distinctes pour les anciens élèves.

    Paramètres :
    - request : L'objet de la requête HTTP.

    Retourne :
    - Response : Une liste des promotions (list) distinctes pour les anciens élèves.
    """
    promotions = Alumnie_Annuaire.objects.values_list('promotion', flat=True).distinct()
    return Response({'promotions': promotions})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_services(request):
    """
    Récupérer tous les services d'administration disponibles.

    Cette fonction renvoie une liste des services distincts pour l'administration.

    Paramètres :
    - request : L'objet de la requête HTTP.

    Retourne :
    - Response : Une liste des services (list) distincts pour l'administration.
    """
    services = Administration_Annuaire.objects.values_list('service', flat=True).distinct()
    return Response({'services': services})



@api_view(['GET'])
@permission_classes([AllowAny])
def get_publication(request, id):
    """
    Récupère une publication par son ID.

    Méthode : GET

    Comportement :
    - Tente de récupérer une publication en fonction de l'ID fourni dans l'URL.
    - Si la publication existe, elle est sérialisée et les données sont retournées.
    - Si la publication n'existe pas, une réponse d'erreur est renvoyée.
    """
    try:
        publication = Publication.objects.get(pk=id)
        serializer = PublicationSerializer(publication)
        return Response(serializer.data)
    except Publication.DoesNotExist:
        return Response("Publication introuvable", status=status.HTTP_404_NOT_FOUND)







@api_view(['PUT'])
@user_types_required('adminstrateur')
def annuler_publication(request, pk):
    """
    Annule une publication par son ID.

    Méthode : PUT

    Comportement :
    - Tente de récupérer une publication en fonction de l'ID fourni dans l'URL.
    - Si la publication existe, elle met à jour son état à 'annulée' et sauvegarde les modifications.
    - Si la publication n'existe pas, une réponse d'erreur est renvoyée.

    Paramètres d'URL :
    - `pk` : ID de la publication à annuler.
    """
    try:
        publication = Publication.objects.get(pk=pk)

    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        # Update the 'etat' attribute to 'valide'
        publication.etat = 'annulée'
        # Save the changes to the publication object
        publication.save()

        # Serialize the updated publication object
        serializer = PublicationSerializer(publication)
        return Response(serializer.data, status=status.HTTP_200_OK)

    return Response("Invalid request method", status=status.HTTP_405_METHOD_NOT_ALLOWED)



@api_view(['GET'])
@permission_classes([AllowAny])
def search_publication_noauth(request):
    """
    Recherche des publications en fonction des paramètres de requête.

    Méthode : GET

    Paramètres de requête :
    - `query` : (optionnel) Texte à rechercher dans les publications.
    - `publisher` : (optionnel) ID de l'éditeur des publications.
    - Autres paramètres : Champs de la publication à filtrer, avec une recherche insensible à la casse.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'GET':
        query_params = request.query_params

        filters = {}
        publisher = None
        # Iterate over query parameters
        for key, value in query_params.items():
            if key == 'publisher' and value:
                publisher = value
            elif key != 'query' and value:
                # Add filter condition if the field is not empty
                filters[key + '__icontains'] = value

        if publisher:
            publications = Publication.objects.filter(publisher_id=publisher)
            if filters:
                conditions = [Q(**{key: value}) for key, value in
filters.items()]
                publications = publications.filter(*conditions)
        else:
            if filters:
                # Construct Q objects for filtering
                conditions = [Q(**{key: value}) for key, value in
filters.items()]
                # Combine Q objects using AND operator
                publications = Publication.objects.filter(*conditions)
            else:
                # If no filters are provided, return all publications
                publications = Publication.objects.all()

        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data)
    else:
        return Response("Invalid request method",
status=status.HTTP_405_METHOD_NOT_ALLOWED)


#get_event_publication
@api_view(['GET'])
@permission_classes([AllowAny])
def get_event_publications(request):
    """
    Récupère toutes les publications de type 'event' ayant un état valide.

    Méthode : GET
    
     
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'GET':
        queryset =Publication.objects.filter(type_publication='event',etat='valide')
        serializer = PublicationSerializer(queryset, many=True)
        return Response(serializer.data)

#delete all events_publications
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_event_publications(request):
    """
    Supprime toutes les publications de type 'event'.

    Méthode : DELETE
     
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    if request.method == 'DELETE':
        # Filtrer et supprimer toutes les publications de type 'event'
        deleted_count, _ = Publication.objects.filter(type_publication='event').delete()
        return Response({'deleted_count': deleted_count}, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_info(request):
    """
    Récupère les informations de l'utilisateur connecté.

    Méthode : GET
     
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    user = request.user
   
    user_data = {
        "id":user.id,
        "email": user.email,
        "first_name": user.first_name,
        "family_name": user.family_name,
        "type": user.type,
        "is_adminstrateur": user.is_adminstrateur,
        "is_editeur": user.is_editeur,
        "is_chercheur": user.is_chercheur,
        "is_responsable_fablab": user.is_responsable_fablab,
        "is_directeur_relex": user.is_directeur_relex,
        "is_superuser":user.is_superuser,
       
        "Categorie": {
            "id_categorie": user.Categorie.id_categorie,
            "nom": user.Categorie.nom
        } if user.Categorie else None,
        "equipeRecherche": {
            "id": user.equipeRecherche.id_equipe_recherche,
            "nom": user.equipeRecherche.nom
        } if user.equipeRecherche else None,
        "club": {
            "id_club": user.club.id_club,
            "nom": user.club.nom
        } if user.club else None
    }
   
    return Response(user_data, status=status.HTTP_200_OK)
   
   
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_responses_by_question(request, question_id):
    """
    Récupère les réponses associées à une question donnée.

    Méthode : GET

    Paramètres d'URL :
    - `question_id` : ID de la question pour laquelle récupérer les réponses.
    
     
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    question = get_object_or_404(Question, pk=question_id)
    responses = Reponse.objects.filter(question=question)
    serializer = ReponseSerializer(responses, many=True)
    return Response({
        'question': question_id,
        'responses': serializer.data
    })
   
   
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_categories(request):
    """Récupérer toutes les catégories.

    Cette vue permet de récupérer la liste de toutes les catégories existantes.

    Méthodes autorisées :
    - GET : Renvoie la liste de toutes les catégories.

    Réponse :
    - Retourne un tableau d'objets catégorie, chaque objet contenant les détails de la catégorie (id et nom), avec un statut HTTP 200 OK.
    - Si aucune catégorie n'est trouvée, retourne un tableau vide.

    Tags :
      - Catégories
    """
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)    

@api_view(['POST'])
@permission_classes([AllowAny])
def add_formation(request):
    """
    Ajoute une nouvelle formation.

    Méthode : POST

    Comportement :
    - Reçoit les données d'une nouvelle formation via la requête.
    - Tente de sérialiser les données fournies à l'aide de `FormationSerializer`.
    - Si les données sont valides, la formation est enregistrée dans la base de données.
    - Si les données ne sont pas valides, des erreurs de validation sont renvoyées.

    """
    if request.method == 'POST':
        serializer = FormationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_module(request):
    """Ajouter un nouveau module.

    Cette vue permet aux utilisateurs d'ajouter un nouveau module en fournissant un titre, une description, des compétences, 
    un volume horaire et un formateur.

    Méthodes autorisées :
    - POST : Crée un nouveau module avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données du module sous forme de JSON.

    Corps de la requête (JSON) :
    - titre : Le titre du module (obligatoire).
    - description : La description du module (facultatif).
    - competences : Liste des ID des compétences liées (facultatif).
    - volume_horaire : Le volume horaire du module (obligatoire).
    - formateur : ID du formateur (facultatif).

    Réponse :
    - Si l'ajout du module réussit, retourne les données du module créé avec un statut HTTP 201 Created.
    - Si des erreurs de validation se produisent, retourne les erreurs avec un statut HTTP 400 Bad Request.

    Tags :
      - Modules
    """
    if request.method == 'POST':
        serializer = ModuleidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_module_by_id(request, id):
    """Obtenir les détails d'un module par son ID.

    Cette vue permet de récupérer les informations d'un module spécifique en fournissant son ID.

    Méthodes autorisées :
    - GET : Récupère les données d'un module en fonction de son ID.

    Paramètres :
    - id : L'ID du module (obligatoire).

    Réponse :
    - Si le module est trouvé, retourne les données du module avec un statut HTTP 200 OK.
    - Si le module n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.

    Tags :
      - Modules
    """
    try:
        module = Module.objects.get(pk=id)
        serializer = ModuleSerializer(module)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Module.DoesNotExist:
        return Response({"error": "Module not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_formations(request):
    
    """Obtenir la liste des formations.

    Cette vue permet de récupérer toutes les formations disponibles.

    Méthodes autorisées :
    - GET : Récupère la liste de toutes les formations.

    Réponse :
    - Retourne la liste des formations avec un statut HTTP 200 OK.

    Tags :
      - Formations
    """
    formations = Formation.objects.all()
    serializer = FormationidSerializer(formations, many=True)
    return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([AllowAny])
def get_module(request):
    """Obtenir la liste de tous les modules.

    Cette vue permet de récupérer tous les modules disponibles.

    Méthodes autorisées :
    - GET : Récupère la liste de tous les modules.

    Réponse :
    - Retourne la liste des modules avec un statut HTTP 200 OK.

    Tags :
      - Modules
    """
    modules = Module.objects.all()
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_competances(request):
    """
    Récupérer la liste de toutes les compétences.

    Requête GET :
    - Récupère toutes les compétences disponibles dans la base de données.

    Réponse :
    - 200 : Liste de toutes les compétences avec leurs détails.
    """
    competances = Competence.objects.all()
    serializer = CompetenceSerializer(competances, many=True)
    return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([AllowAny])
def get_formateur(request):
    """
    Récupère tous les formateurs enregistrés dans la base de données.

    Méthode : GET

    Comportement :
    - Récupère tous les objets `Formateur` de la base de données.
    - Sérialise les objets récupérés à l'aide du `FormateurSerializer`.
    - Retourne la liste des formateurs sous forme de réponse JSON.
    """
    fromateur = Formateur.objects.all()
    serializer = FormateurSerializer(fromateur, many=True)
    return Response(serializer.data)      



@api_view(['GET'])
@permission_classes([AllowAny])
def get_modules_by_formation(request, formation_id):
    """Obtenir les modules associés à une formation spécifique.

    Cette vue permet de récupérer tous les modules liés à une formation donnée en fournissant l'ID de la formation.

    Méthodes autorisées :
    - GET : Récupère les modules associés à la formation spécifiée.

    Paramètres :
    - formation_id : L'ID de la formation (obligatoire).

    Réponse :
    - Si la formation est trouvée, retourne la liste des modules associés avec un statut HTTP 200 OK.
    - Si la formation n'est pas trouvée, retourne une erreur avec un statut HTTP 404 Not Found.

    Tags :
      - Modules
    """   
    formation = Formation.objects.get(id=formation_id)
    modules = formation.Module.all()
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data)

   


@api_view(['GET'])
@permission_classes([AllowAny])
def get_formation_by_id(request, formation_id):
    """
    Récupère une formation spécifique en fonction de son ID.

    Méthode : GET

    Comportement :
    - Tente de récupérer l'objet `Formation` correspondant à l'ID fourni.
    - Si la formation existe, elle est sérialisée et renvoyée.
    - Si la formation n'existe pas, une erreur 404 est renvoyée.

    """
    try:
        # Récupérer la formation par son ID
        formation = Formation.objects.get(id=formation_id)
    except Formation.DoesNotExist:
        return Response({'error': 'Formation not found'}, status=404)

    # Sérialiser la formation et retourner les données
    serializer = FormationidSerializer(formation)
    return Response(serializer.data, status=200)    


@api_view(['GET'])
@permission_classes([AllowAny])
def get_formateur_by_id(request, formateur_id):
    """
    Récupère un formateur spécifique en fonction de son ID.

    Méthode : GET

    Comportement :
    - Tente de récupérer l'objet `Formateur` correspondant à l'ID fourni.
    - Si le formateur existe, il est sérialisé et renvoyé.
    - Si le formateur n'existe pas, une erreur 404 est renvoyée.
    """
    try:
        # Récupérer la formation par son ID
        formateur = Formateur.objects.get(id=formateur_id)
    except Formateur.DoesNotExist:
        return Response({'error': 'formateur not found'}, status=404)

    # Sérialiser la formation et retourner les données
    serializer = FormateurSerializer(formateur)
    return Response(serializer.data, status=200)    


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_formateur(request, pk):
    """
    Supprime un formateur en fonction de son ID.

    Méthode : DELETE

    Comportement :
    - Tente de récupérer le formateur par son ID.
    - Si le formateur existe, il est supprimé de la base de données.
    - Si le formateur n'existe pas, une erreur 404 est renvoyée.
    """
    try:
        formateur = Formateur.objects.get(pk=pk)
    except Formateur.DoesNotExist:
        return Response("formateur not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        formateur.delete()
        return Response("formateur deleted successfully", status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_competence(request, pk):
    """
    Supprimer une compétence existante.

    Requête DELETE :
    - Supprime une compétence identifiée par son ID.

    Réponse :
    - 204 : Compétence supprimée avec succès.
    - 404 : Compétence non trouvée.
    """
    try:
        competence = Competence.objects.get(pk=pk)
    except Competence.DoesNotExist:
        return Response("competence not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        competence.delete()
        return Response("competence deleted successfully", status=status.HTTP_204_NO_CONTENT)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_module(request, pk):
    """Supprimer un module par son ID.

    Cette vue permet de supprimer un module spécifique en fournissant son ID.

    Méthodes autorisées :
    - DELETE : Supprime le module correspondant à l'ID fourni.

    Paramètres :
    - pk : L'ID du module à supprimer (obligatoire).

    Réponse :
    - Si le module est trouvé et supprimé avec succès, retourne un message de confirmation avec un statut HTTP 204 No Content.
    - Si le module n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.

    Tags :
      - Modules
    """
    try:
        module = Module.objects.get(pk=pk)
    except Module.DoesNotExist:
        return Response("module not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        module.delete()
        return Response("module deleted successfully", status=status.HTTP_204_NO_CONTENT)




@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_formation(request, pk):
    """
    Supprime une formation existante basée sur son identifiant (PK).

    Méthode : DELETE

    Paramètres :
    - `pk` : L'ID de la formation à supprimer.

    Réponses :
    - Si la formation est trouvée, elle est supprimée et une réponse avec le statut HTTP 204 est retournée.
    - Si la formation n'est pas trouvée, une réponse avec un message d'erreur et le statut HTTP 404 est renvoyée.
    """
    try:
        formation = Formation.objects.get(pk=pk)
    except Formation.DoesNotExist:
        return Response("formation not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        formation.delete()
        return Response("formation deleted successfully", status=status.HTTP_204_NO_CONTENT)



@api_view(['POST'])
@permission_classes([AllowAny])
def add_formateur(request):
    """
    Ajouter un nouveau formateur.

    Requête POST :
    - Crée un nouveau formateur à partir des données fournies.

    Corps de la requête :
    - `nom` : nom du formateur (string).

    Réponse :
    - 201 : Formateur créé avec succès.
    - 400 : Données invalides.
    """
    if request.method == 'POST':
        serializer = FormateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_competence(request):
    """
    Ajouter une nouvelle compétence.

    Requête POST :
    - Crée une nouvelle compétence à partir des données fournies.

    Corps de la requête :
    - `nom` : nom de la compétence (string).

    Réponse :
    - 201 : Compétence créée avec succès.
    - 400 : Données invalides.
    """
    if request.method == 'POST':
        serializer = CompetenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_competence(request, pk):
    """
    Mettre à jour une compétence existante.

    Requête PUT :
    - Met à jour les informations d'une compétence identifiée par son ID.

    Corps de la requête :
    - `nom` : nouveau nom de la compétence (string).

    Réponse :
    - 200 : Compétence mise à jour avec succès.
    - 404 : Compétence non trouvée.
    - 400 : Données invalides.
    """
    try:
        competence = Competence.objects.get(pk=pk)
    except Competence.DoesNotExist:
        return Response({'error': 'Competence not found'}, status=404)

    serializer = CompetenceSerializer(competence, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)



@api_view(['PUT'])
@permission_classes([AllowAny])
def update_competence(request, pk):
    """
    Mettre à jour une compétence existante.

    Requête PUT :
    - Met à jour les informations d'une compétence identifiée par son ID.

    Corps de la requête :
    - `nom` : nouveau nom de la compétence (string).

    Réponse :
    - 200 : Compétence mise à jour avec succès.
    - 404 : Compétence non trouvée.
    - 400 : Données invalides.
    """
    try:
        competence = Competence.objects.get(pk=pk)
    except Competence.DoesNotExist:
        return Response({'error': 'Competence not found'}, status=404)

    serializer = CompetenceSerializer(competence, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_formateur(request, pk):
    """
    Mettre à jour un formateur existant.

    Requête PUT :
    - Met à jour les informations d'un formateur identifié par son ID.

    Réponse :
    - 200 : Formateur mis à jour avec succès.
    - 404 : Formateur non trouvé.
    - 400 : Données invalides.
    """
    try:
        formateur = Formateur.objects.get(pk=pk)
    except Formateur.DoesNotExist:
        return Response({'error': 'Formateur not found'}, status=404)

    serializer = FormateurSerializer(formateur, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_module(request, pk):
    """Mettre à jour un module par son ID.

    Cette vue permet de mettre à jour les informations d'un module spécifique en fournissant son ID et les nouvelles données.

    Méthodes autorisées :
    - PUT : Met à jour le module correspondant à l'ID fourni avec les données fournies dans la requête.

    Paramètres :
    - pk : L'ID du module à mettre à jour (obligatoire).

    Corps de la requête (JSON) :
    - titre : Nouveau titre du module (optionnel).
    - description : Nouvelle description du module (optionnel).
    - competences : Liste des compétences associées au module (optionnel).
    - volume_horaire : Nouveau volume horaire du module (optionnel).
    - formateur : ID du formateur associé au module (optionnel).

    Réponse :
    - Si le module est trouvé et mis à jour avec succès, retourne les données du module mis à jour avec un statut HTTP 200 OK.
    - Si le module n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si les données fournies sont invalides, retourne les erreurs de validation avec un statut HTTP 400 Bad Request.

    Tags :
      - Modules
    """
    try:
        module = Module.objects.get(pk=pk)
    except Module.DoesNotExist:
        return Response({'error': 'Module not found'}, status=404)

    serializer = ModuleidSerializer(module, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_formation(request, pk):
    """
    Met à jour une formation existante basée sur son identifiant (PK).

    Méthode : PUT

    Paramètres :
    - `pk` : L'ID de la formation à mettre à jour.

    Comportement :
    - Tente de récupérer la formation à partir de l'ID fourni.
    - Si la formation n'existe pas, renvoie un message d'erreur avec le statut HTTP 404.
    - Si les données envoyées sont valides, la formation est mise à jour avec les nouvelles informations.
    - Si les données ne sont pas valides, renvoie une réponse avec les erreurs et le statut HTTP 400.
    """
    try:
        formation = Formation.objects.get(pk=pk)
    except Formation.DoesNotExist:
        return Response({'error': 'Formation not found'}, status=404)

    serializer = FormationSerializer(formation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)  



@api_view(['GET'])
@permission_classes([AllowAny])
def get_competences_by_module(request, module_id):
    """Récupérer les compétences associées à un module par son ID.

    Cette vue permet de récupérer la liste des compétences qui sont liées à un module spécifique en fournissant son ID.

    Méthodes autorisées :
    - GET : Récupère les compétences associées au module correspondant à l'ID fourni.

    Paramètres :
    - module_id : L'ID du module pour lequel les compétences doivent être récupérées (obligatoire).

    Réponse :
    - Si le module est trouvé, retourne une liste de compétences associées au module avec un statut HTTP 200 OK.
    - Si le module n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.

    Tags :
      - Modules
    """
    try:
        module = Module.objects.get(pk=module_id)
    except Module.DoesNotExist:
        return Response({'error': 'Module not found'}, status=404)

    competences = module.competences.all()
    serializer = CompetenceSerializer(competences, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_formateur_by_module(request, module_id):
    """Récupérer le formateur associé à un module par son ID.

    Cette vue permet de récupérer les informations du formateur qui est lié à un module spécifique en fournissant son ID.

    Méthodes autorisées :
    - GET : Récupère le formateur associé au module correspondant à l'ID fourni.

    Paramètres :
    - module_id : L'ID du module pour lequel le formateur doit être récupéré (obligatoire).

    Réponse :
    - Si le module est trouvé, retourne les informations du formateur associé au module avec un statut HTTP 200 OK.
    - Si le module n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si aucun formateur n'est associé au module, retourne une réponse appropriée.

    Tags :
      - Formateurs
    """
    try:
        module = Module.objects.get(pk=module_id)
    except Module.DoesNotExist:
        return Response({'error': 'Module not found'}, status=404)

    formateur = module.formateur
    serializer = FormateurSerializer(formateur)
    return Response(serializer.data)


#ici les vues de formation à la carte


#Vues de chapitre

@api_view(['POST'])
@permission_classes([AllowAny])
def add_chapitre(request):
    """Ajouter un chapitre.

    Cette vue permet d'ajouter un nouveau chapitre en fournissant un titre, un contenu et une durée.

    Méthodes autorisées :
    - POST : Crée un nouveau chapitre avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données du chapitre sous forme de JSON.

    Corps de la requête (JSON) :
    - titre : Titre du chapitre (obligatoire).
    - contenu : Contenu du chapitre (obligatoire).
    - duree : Durée du chapitre en minutes (obligatoire).

    Réponse :
    - Si la création réussit, retourne les données du chapitre avec un statut HTTP 201 Created.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """

    if request.method == 'POST':
        serializer = ChapitreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_chapitre(request, pk):
    """Mettre à jour un chapitre existant.

    Cette vue permet de modifier un chapitre existant en fournissant un titre, un contenu et une durée.

    Méthodes autorisées :
    - PUT : Met à jour un chapitre existant identifié par son ID.

    Paramètres :
    - request : Objet de requête contenant les nouvelles données du chapitre sous forme de JSON.
    - pk : Identifiant du chapitre à mettre à jour.

    Réponse :
    - Si la mise à jour réussit, retourne les données mises à jour du chapitre.
    - Si le chapitre n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """
    try:
        chapitre = Chapitre.objects.get(pk=pk)
    except Chapitre.DoesNotExist:
        return Response({'error': 'Chapitre not found'}, status=404)

    serializer = ChapitreSerializer(chapitre, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_chapitre(request, pk):
    """Supprimer un chapitre.

    Cette vue permet de supprimer un chapitre existant identifié par son ID.

    Méthodes autorisées :
    - DELETE : Supprime le chapitre spécifié.

    Paramètres :
    - pk : Identifiant du chapitre à supprimer.

    Réponse :
    - Si le chapitre est supprimé avec succès, retourne un message de confirmation avec un statut HTTP 204 No Content.
    - Si le chapitre n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """
    try:
        chapitre = Chapitre.objects.get(pk=pk)
    except Chapitre.DoesNotExist:
        return Response("chapitre not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        chapitre.delete()
        return Response("chapitre deleted successfully", status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapitres(request):
    """Récupérer tous les chapitres.

    Cette vue permet de récupérer la liste de tous les chapitres existants.

    Méthodes autorisées :
    - GET : Renvoie la liste de tous les chapitres.

    Réponse :
    - Retourne un tableau d'objets chapitre, chaque objet contenant les détails du chapitre (titre, contenu, durée).
    """
    chapitre = Chapitre.objects.all()
    serializer = ChapitreSerializer(chapitre, many=True)
    return Response(serializer.data)      





@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapitre_by_id(request, id):
    """Récupérer un chapitre par ID.

    Cette vue permet de récupérer un chapitre spécifique en fonction de son identifiant.

    Méthodes autorisées :
    - GET : Renvoie les détails du chapitre spécifié.

    Paramètres :
    - id : Identifiant du chapitre à récupérer.

    Réponse :
    - Si le chapitre est trouvé, retourne ses détails avec un statut HTTP 200 OK.
    - Si le chapitre n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """
    try:
        chapitre = Chapitre.objects.get(id=id)
        serializer = ChapitreSerializer(chapitre)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Chapitre.DoesNotExist:
        return Response({"error": "Chapitre not found"}, status=status.HTTP_404_NOT_FOUND)



#vues de cours

@api_view(['POST'])
@permission_classes([AllowAny])
def add_cours(request):
    """Ajouter un nouveau cours.

    Cette vue permet d'ajouter un nouveau cours en fournissant un titre, une description, des compétences, et des chapitres.

    Méthodes autorisées :
    - POST : Crée un nouveau cours avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données du cours sous forme de JSON.

    Corps de la requête (JSON) :
    - titre : Titre du cours (obligatoire).
    - description : Description du cours (facultatif).
    - competences : Liste des ID des compétences associées (facultatif).
    - chapitres : Liste des ID des chapitres associés (facultatif).

    Réponse :
    - Si la création réussit, retourne les données du cours avec un statut HTTP 201 Created.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """
    if request.method == 'POST':
        serializer = CoursidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cours(request, pk):
    """Mettre à jour un cours existant.

    Cette vue permet de modifier un cours existant en fournissant un titre, une description, des compétences, et des chapitres.

    Méthodes autorisées :
    - PUT : Met à jour un cours existant identifié par son ID.

    Paramètres :
    - request : Objet de requête contenant les nouvelles données du cours sous forme de JSON.
    - pk : Identifiant du cours à mettre à jour.

    Réponse :
    - Si la mise à jour réussit, retourne les données mises à jour du cours.
    - Si le cours n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """
    try:
        cours = Cours.objects.get(pk=pk)
    except Cours.DoesNotExist:
        return Response({'error': 'Cours not found'}, status=404)

    serializer = CoursidSerializer(cours, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_cours(request, pk):
    """Supprimer un cours.

    Cette vue permet de supprimer un cours existant identifié par son ID.

    Méthodes autorisées :
    - DELETE : Supprime le cours spécifié.

    Paramètres :
    - pk : Identifiant du cours à supprimer.

    Réponse :
    - Si le cours est supprimé avec succès, retourne un message de confirmation avec un statut HTTP 204 No Content.
    - Si le cours n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """
    try:
        cours = Cours.objects.get(pk=pk)
    except Cours.DoesNotExist:
        return Response("cours not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        cours.delete()
        return Response("cours deleted successfully", status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_cours(request):
    """Récupérer tous les cours.

    Cette vue permet de récupérer la liste de tous les cours existants.

    Méthodes autorisées :
    - GET : Renvoie la liste de tous les cours.

    Réponse :
    - Retourne un tableau d'objets cours, chaque objet contenant les détails du cours (titre, description, compétences, chapitres).
    """
    cours = Cours.objects.all()
    serializer = CoursSerializer(cours, many=True)
    return Response(serializer.data)  



@api_view(['GET'])
@permission_classes([AllowAny])
def get_cours_by_id(request, id):
    """Récupérer un cours par ID.

    Cette vue permet de récupérer un cours spécifique en fonction de son identifiant.

    Méthodes autorisées :
    - GET : Renvoie les détails du cours spécifié.

    Paramètres :
    - id : Identifiant du cours à récupérer.

    Réponse :
    - Si le cours est trouvé, retourne ses détails avec un statut HTTP 200 OK.
    - Si le cours n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """

    try:
        cours = Cours.objects.get(pk=id)
        serializer = CoursSerializer(cours)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Cours.DoesNotExist:
        return Response({"error": "cours not found"}, status=status.HTTP_404_NOT_FOUND)





#vues de theme_formation

@api_view(['POST'])
@permission_classes([AllowAny])
def add_theme_formation(request):
    """Ajouter un nouveau thème de formation.

    Cette vue permet d'ajouter un nouveau thème de formation en fournissant les informations nécessaires.

    Méthodes autorisées :
    - POST : Crée un nouveau thème de formation avec les données fournies dans la requête.

    Paramètres :
    - request : Objet de requête contenant les données du thème de formation sous forme de JSON.

    Corps de la requête (JSON) :
    - titre : Le titre du thème de formation (obligatoire).
    - description : La description du thème (facultatif).
    - modules : Liste des ID des modules associés (facultatif).
    - date_debut : Date de début de la formation (facultatif, par défaut aujourd'hui).
    - date_fin : Date de fin de la formation (facultatif, par défaut aujourd'hui).

    Réponse :
    - Si la création réussit, retourne les données du thème de formation avec un statut HTTP 201 Created.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """
    if request.method == 'POST':
        serializer = ThemeFormationidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_theme_formation(request, pk):
    """Mettre à jour un thème de formation existant.

    Cette vue permet de modifier un thème de formation existant identifié par son ID.

    Méthodes autorisées :
    - PUT : Met à jour un thème de formation existant avec les nouvelles données fournies.

    Paramètres :
    - request : Objet de requête contenant les nouvelles données du thème de formation sous forme de JSON.
    - pk : Identifiant du thème de formation à mettre à jour.

    Réponse :
    - Si la mise à jour réussit, retourne les données mises à jour du thème de formation.
    - Si le thème de formation n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    - Si des données invalides sont fournies, retourne une erreur avec un statut HTTP 400 Bad Request.
    """
    try:
        theme_formation = Theme_formation.objects.get(pk=pk)
    except Theme_formation.DoesNotExist:
        return Response({'error': 'theme formation not found'}, status=404)

    serializer = ThemeFormationidSerializer(theme_formation, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_theme_formation(request, pk):
    """Supprimer un thème de formation.

    Cette vue permet de supprimer un thème de formation existant identifié par son ID.

    Méthodes autorisées :
    - DELETE : Supprime le thème de formation spécifié.

    Paramètres :
    - pk : Identifiant du thème de formation à supprimer.

    Réponse :
    - Si le thème de formation est supprimé avec succès, retourne un message de confirmation avec un statut HTTP 204 No Content.
    - Si le thème de formation n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """
    try:
        theme_formation = Theme_formation.objects.get(pk=pk)
    except Theme_formation.DoesNotExist:
        return Response("theme formation not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        theme_formation.delete()
        return Response("theme formation deleted successfully", status=status.HTTP_204_NO_CONTENT)



@api_view(['GET'])
@permission_classes([AllowAny])
def get_theme_formation(request):
    """Récupérer tous les thèmes de formation.

    Cette vue permet de récupérer la liste de tous les thèmes de formation existants.

    Méthodes autorisées :
    - GET : Renvoie la liste de tous les thèmes de formation.

    Réponse :
    - Retourne un tableau d'objets thème de formation, chaque objet contenant les détails du thème (titre, description, modules, date de début, date de fin).
    """
    theme_formation = Theme_formation.objects.all()
    serializer = ThemeFormationSerializer(theme_formation, many=True)
    return Response(serializer.data)  



@api_view(['GET'])
@permission_classes([AllowAny])
def get_theme_formation_by_id(request, id):
    """Récupérer un thème de formation par ID.

    Cette vue permet de récupérer un thème de formation spécifique en fonction de son identifiant.

    Méthodes autorisées :
    - GET : Renvoie les détails du thème de formation spécifié.

    Paramètres :
    - id : Identifiant du thème de formation à récupérer.

    Réponse :
    - Si le thème de formation est trouvé, retourne ses détails avec un statut HTTP 200 OK.
    - Si le thème de formation n'est pas trouvé, retourne une erreur avec un statut HTTP 404 Not Found.
    """
    try:
        theme_formation = Theme_formation.objects.get(id=id)
        serializer = ThemeFormationSerializer(theme_formation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Theme_formation.DoesNotExist:
        return Response({"error": "theme formation not found"}, status=status.HTTP_404_NOT_FOUND)


# -------------------------------------------------------------------------------------------------------------------
# devis
# -----------------------------------------------------------------------------------------------------------------

# Create Demande_Devis
@api_view(['POST'])
@permission_classes([AllowAny])
def add_demande_devis(request):
    """
    Crée une nouvelle demande de devis.

    Requête POST :
    - organisme : Nom de l'organisme (string).
    - email : Adresse email de l'organisme (string).
    - Numero_telephone : Numéro de téléphone de contact (integer, optionnel).
    - Formations : Liste des IDs des formations liées (list d'entiers).
    - Nombre_participants : Nombre de participants (integer, optionnel).

    Réponses :
    - 201 : Succès, retourne les données de la demande de devis créée.
    - 400 : Erreur de validation des données.
    """
    if request.method == 'POST':
        serializer = DemandeDevisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Create Devis
@api_view(['POST'])
@permission_classes([AllowAny])
def add_devis(request):
    """
    Crée un nouveau devis.

    Requête POST :
    - montant : Le montant du devis (float, optionnel).
    - demande_devis : ID de la demande de devis associée (integer).

    Réponses :
    - 201 : Succès, retourne les données du devis créé.
    - 400 : Erreur de validation des données.
    """
    if request.method == 'POST':
        serializer = DevisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# List Demande_Devis
@api_view(['GET'])
@permission_classes([AllowAny])
def list_demande_devis(request):
    """
    Récupère toutes les demandes de devis.

    Requête GET :
    - Pas de paramètres requis.

    Réponses :
    - 200 : Succès, retourne la liste de toutes les demandes de devis.
    """
    demandes = Demande_Devis.objects.all()
    serializer = DemandeDevisSerializer(demandes, many=True)
    return Response(serializer.data)

# List Devis
@api_view(['GET'])
@permission_classes([AllowAny])
def list_devis(request):
    """
    Récupère tous les devis.

    Requête GET :
    - Pas de paramètres requis.

    Réponses :
    - 200 : Succès, retourne la liste de tous les devis.
    """
    devis = Devis.objects.all()
    serializer = DevisSerializer(devis, many=True)
    return Response(serializer.data)

# Retrieve Demande_Devis
@api_view(['GET'])
@permission_classes([AllowAny])
def retrieve_demande_devis(request, pk):
    """
    Récupère une demande de devis spécifique.

    Requête GET :
    - pk : L'identifiant unique de la demande de devis.

    Réponses :
    - 200 : Succès, retourne les détails de la demande de devis.
    - 404 : La demande de devis n'existe pas.
    """
    demande = get_object_or_404(Demande_Devis, pk=pk)
    serializer = DemandeDevisSerializer(demande)
    return Response(serializer.data)

# Retrieve Devis
@api_view(['GET'])
@permission_classes([AllowAny])
def retrieve_devis(request, pk):
    """
    Récupère un devis spécifique.

    Requête GET :
    - pk : L'identifiant unique du devis.

    Réponses :
    - 200 : Succès, retourne les détails du devis.
    - 404 : Le devis n'existe pas.
    """
    devis = get_object_or_404(Devis, pk=pk)
    serializer = DevisSerializer(devis)
    return Response(serializer.data)

# Update Demande_Devis
@api_view(['PUT'])
@permission_classes([AllowAny])
def update_demande_devis(request, pk):   
    """
    Met à jour une demande de devis existante.

    Requête PUT :
    - pk : L'identifiant unique de la demande de devis à mettre à jour.
    - Corps de la requête : Les champs de la demande à mettre à jour.

    Réponses :
    - 200 : Succès, retourne les détails mis à jour de la demande de devis.
    - 400 : Erreurs de validation.
    - 404 : La demande de devis n'existe pas.
    """
    demande = get_object_or_404(Demande_Devis, pk=pk)
    serializer = DemandeDevisSerializer(demande, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Update Devis
@api_view(['PUT'])
@permission_classes([AllowAny])
def update_devis(request, pk):
    """
    Met à jour un devis existant.

    Requête PUT :
    - pk : L'identifiant unique du devis à mettre à jour.
    - Corps de la requête : Les champs du devis à mettre à jour.

    Réponses :
    - 200 : Succès, retourne les détails mis à jour du devis.
    - 400 : Erreurs de validation.
    - 404 : Le devis n'existe pas.
    """
    devis = get_object_or_404(Devis, pk=pk)
    serializer = DevisSerializer(devis, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Delete Demande_Devis
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_demande_devis(request, pk):
    """
    Supprime une demande de devis spécifique.

    Requête DELETE :
    - pk : L'identifiant unique de la demande de devis à supprimer.

    Réponses :
    - 204 : Succès, la demande de devis a été supprimée avec succès.
    - 404 : La demande de devis n'existe pas.
    
    """
    demande = get_object_or_404(Demande_Devis, pk=pk)
    demande.delete()
    return Response(status=204)

# Delete Devis
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_devis(request, pk):
    """
    Supprime un devis spécifique.

    Requête DELETE :
    - pk : L'identifiant unique du devis à supprimer.

    Réponses :
    - 204 : Le devis a été supprimé avec succès.
    - 404 : Le devis n'existe pas.
    """
    devis = get_object_or_404(Devis, pk=pk)
    devis.delete()
    return Response(status=204)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_devis_by_demande_devis(request, demande_devis_id):
    """
    Récupère tous les devis associés à une demande de devis spécifique.

    Requête GET :
    - demande_devis_id : L'identifiant unique de la demande de devis.

    Réponses :
    - 200 : Succès, retourne la liste des devis associés à la demande de devis.
    - 404 : Aucun devis associé à cette demande de devis.
    """
    try:
        devis = Devis.objects.filter(demande_devis__id=demande_devis_id)
        serializer = DevisSerializer(devis, many=True)
        return Response(serializer.data)
    except Devis.DoesNotExist:
        return Response({"error": "No Devis found for this Demande_Devis"}, status=404)




@api_view(['GET'])
@permission_classes([AllowAny])
def publications_by_laboratory(request, laboratoire_id):
    """Récupère les publications associées à un laboratoire donné.

    Cette vue permet de récupérer les publications de type 'article' 
    qui ont été publiées par des chercheurs appartenant à un laboratoire spécifié.

    Paramètres :
    - laboratoire_id : L'identifiant unique du laboratoire pour lequel les publications doivent être récupérées.

    Retourne :
    - Response :
        - 200 OK : Une liste de publications (articles) associées au laboratoire.
        - 404 Not Found : Si le laboratoire avec l'identifiant spécifié n'existe pas.
    
    Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    try:
        laboratoire = Laboratoire.objects.get(id_laboratoire=laboratoire_id)
        
        researchers = Utilisateur.objects.filter(
            equipeRecherche__laboratoire=laboratoire
        )
        
        
        publications = Publication.objects.filter(
            publisher__in=researchers,
            type_publication='article'  
        )
        
        publication_data = [
            {
                'id': pub.id_publication,
                'titre': pub.titre,
                'description': pub.description,
                'date_publication': pub.date_publication,
                'image': pub.image.url if pub.image else None
            }
            for pub in publications
        ]
        
        return Response(publication_data, status=status.HTTP_200_OK)
    
    except Laboratoire.DoesNotExist:
        return Response({'error': 'Laboratoire not found'}, status=status.HTTP_404_NOT_FOUND)







@api_view(['GET'])
@permission_classes([AllowAny])
def publications_seminaire_bylabo(request, laboratoire_id):
    """Récupère les publications de séminaires associées à un laboratoire donné.

    Cette vue permet de récupérer les publications de type 'event' 
    qui ont été publiées par des chercheurs appartenant à un laboratoire spécifié,
    et qui ont un état validé.

    Paramètres :
    - laboratoire_id : L'identifiant unique du laboratoire pour lequel les publications doivent être récupérées.

    Retourne :
    - Response :
        - 200 OK : Une liste de publications (séminaires) associées au laboratoire.
        - 404 Not Found : Si le laboratoire avec l'identifiant spécifié n'existe pas.
    
     Autorisation :
    - Accessible par tous les utilisateurs, y compris ceux qui ne sont pas authentifiés (AllowAny).
    """
    try:
        laboratoire = Laboratoire.objects.get(id_laboratoire=laboratoire_id)
        
        researchers = Utilisateur.objects.filter(
            equipeRecherche__laboratoire=laboratoire
        )
        
        
        publications = Publication.objects.filter(
            publisher__in=researchers,
            type_publication='event',  
            etat='valide'
        )
        
        publication_data = [
            {
                'id': pub.id_publication,
                'titre': pub.titre,
                'description': pub.description,
                'date_debut': pub.date_debut,
                'image': pub.image.url if pub.image else None,
                'visiteur':pub.visiteur,
                'lieu':pub.lieu
            }
            for pub in publications
        ]
        
        return Response(publication_data, status=status.HTTP_200_OK)
    
    except Laboratoire.DoesNotExist:
        return Response({'error': 'Laboratoire not found'}, status=status.HTTP_404_NOT_FOUND)





@api_view(['PUT'])
@permission_classes([AllowAny])
def update_section(request, id):
    """
    Vue permettant de mettre à jour une section d'une publication existante par son ID.

    Méthode : PUT

    Réponse :
    - Si l'opération réussit, renvoie les données de la section mise à jour avec un statut HTTP 200.
    - Si la section n'est pas trouvée, renvoie une réponse d'erreur avec un statut HTTP 404.
    - Si les données ne sont pas valides, renvoie une réponse avec les erreurs et un statut HTTP 400.
    """
    try:
        section_instance = section.objects.get(id=id)
    except section.DoesNotExist:
        return Response({"error": "Section not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = SectionSerializer(section_instance, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




