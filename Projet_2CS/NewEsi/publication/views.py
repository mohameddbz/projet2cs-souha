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
    if request.method == 'GET':
        queryset = Utilisateur.objects.all()
        serializer = UtilisateurSerializer(queryset, many=True)
        return Response(serializer.data)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_by_id(request, user_id):
    try:
        user = Utilisateur.objects.get(pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Utilisateur.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['POST'])
@user_types_required('superuser')  
#@permission_classes([AllowAny])
def add_user(request):
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
@user_types_required('editeur')
def edit_publication(request, pk):
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
    try:
        publications = Publication.objects.filter(publisher__Categorie= category)
    except Publication.DoesNotExist:
        return Response("Publications not found for this category", status=status.HTTP_404_NOT_FOUND)

    serializer = PublicationSerializer(publications, many=True)
    return Response(serializer.data)

#This is for publication
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_publications(request):
    if request.method == 'GET':
        queryset = Publication.objects.all()
        serializer = PublicationSerializer(queryset, many=True)
        return Response(serializer.data)



@api_view(['GET'])
@user_types_required('adminstrateur')
def get_publications_by_category_admin(request):
   
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
    if request.method == 'POST':
        serializer = CategorieSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_categorie(request, categorie_id):
    try:
        categorie = Categorie.objects.get(pk=categorie_id)
    except Categorie.DoesNotExist:
        return Response({"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND)
   
    categorie.delete()
    return Response({"success": "Category deleted successfully"}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
@permission_classes([AllowAny])
def search_publication(request):
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
@user_types_required('adminstrateur')
def delete_publication(request, pk):
    try:
        publication = Publication.objects.get(pk=pk)
    except Publication.DoesNotExist:
        return Response("Publication not found", status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        publication.delete()
        return Response("Publication deleted successfully", status=status.HTTP_204_NO_CONTENT)    


#club
# Get all members of a club
@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_members(request, club_id):
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
    current_date = timezone.now()
    events = event_inscription.objects.filter(club_id=club_id, date_archivage__gt=current_date)
    serializer = EventInscriptionSerializer(events, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@user_types_required('editeur')
def create_event_inscription(request):
    serializer = EventInscriptionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def create_section(request):
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
    if request.method == 'GET':
        clubs = Club.objects.all()
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)

# Create a new club
@api_view(['POST'])
@user_types_required('adminstrateur')
def create_club(request):
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
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'DELETE':
        club.delete()
        return Response("Club deleted successfully", status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_club_evenement_publications(request, club_id):
    club = get_object_or_404(Club, id_club=club_id)
    if request.method == 'GET':
        publications = club.publications.all()
        serializer = PublicationSerializer(publications, many=True)
        return Response(serializer.data)

# Add a publication of type 'evenement' to a club
@api_view(['POST'])
@user_types_required('editeur')
def add_evenement_publication_to_club(request, club_id):
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
    member = get_object_or_404(MembreClub, id_membre=member_id)
    if request.method == 'DELETE':
        member.delete()
        return Response("Member deleted successfully", status=status.HTTP_204_NO_CONTENT)

# Get Members by Name
@api_view(['GET'])
@permission_classes([AllowAny])
def get_members_by_name(request, club_id, name):
    if request.method == 'GET':
        club = get_object_or_404(Club, id_club=club_id)
        members = club.membres.filter(nom__icontains=name)
        serializer = MembreSerializer(members, many=True)
        return Response(serializer.data)

# Get Clubs by Name
@api_view(['GET'])
@permission_classes([AllowAny])
def get_clubs_by_name(request, name):
    if request.method == 'GET':
        clubs = Club.objects.filter(nom__icontains=name)
        serializer = ClubSerializer(clubs, many=True)
        return Response(serializer.data)



@api_view(['POST'])

@user_types_required('directeur_relex')
def add_partenaire(request):
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
    try:
        partenaire = Partenaire.objects.get(pk=id)
    except Partenaire.DoesNotExist:
        return Response("Partenaire introuvable", status=status.HTTP_404_NOT_FOUND)

    partenaire.delete()
    return Response("Partenaire supprimé avec succès", status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_partenaire(request):
    if request.method == 'GET':
        queryset = Partenaire.objects.all()
        serializer = PartenaireSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_partenaire_byid(request, id):
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
    try:
        demande = Demande_Partenariat.objects.get(pk=id)
    except Demande_Partenariat.DoesNotExist:
        return Response("Demande de partenariat introuvable", status=status.HTTP_404_NOT_FOUND)

    demande.etat = 'Refusée'
    demande.save()
    return Response("Demande de partenariat refusée", status=status.HTTP_200_OK)
   



@api_view(['POST'])
def add_devis(request):
    if request.method == 'POST':
        serializer = DevisSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@user_types_required('directeur_relex')
def valider_devis(request):
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
    if request.method == 'GET':
        queryset = Devis.objects.all()
        serializer = DevisSerializer(queryset, many=True)
        return Response(serializer.data)

@api_view(['POST'])
@user_types_required('adminstrateur')
def add_partenaire_labo(request):
    if  request.method == 'POST':
        serializer = Partenaire_laboSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def partenaire_labo_list(request):
    if request.method == 'GET':
        queryset = Partenaire_labo.objects.all()
        serializer = Partenaire_laboSerializer(queryset, many=True)
        return Response(serializer.data)      


@api_view(['GET'])
@permission_classes([AllowAny])
def laboratoire_list(request):
    if request.method == 'GET':
        queryset = Laboratoire.objects.all()
        serializer = LaboratoireSerializer(queryset, many=True)
        return Response(serializer.data)


@api_view([ 'POST'])
@permission_classes([AllowAny])
def add_laboratoire(request):
   
    if request.method == 'POST':
        serializer = LaboratoireSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@user_types_required('adminstrateur')
def add_chercheur(request):
   
    if request.method == 'POST':
        serializer = UtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



@api_view(['GET'])
@permission_classes([AllowAny])
def chercheur_list(request):
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
   if request.method == 'POST':
        serializer = Equipe_RechercheSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_members(request, equipe_id):
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
    enseignant = get_object_or_404(Enseignant_Annuaire, nom=nom, prenom=prenom)
    serializer = EnseignantAnnuaireSerializer(enseignant)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def equipe_recherche_list(request):
    if request.method == 'GET':
        queryset = Equipe_Recherche.objects.all()
        serializer = Equipe_RechercheSerializer(queryset, many=True)
        return Response(serializer.data)
   
@api_view(['GET'])
@permission_classes([AllowAny])
def get_equipes_par_laboratoire(request, laboratoire_nom):
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
   if request.method == 'POST':
        serializer = ProjetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def projet_list(request):
    if request.method == 'GET':
        queryset = Projet.objects.all()
        serializer = ProjetSerializer(queryset, many=True)
        return Response(serializer.data)
   


@api_view(['GET'])
@permission_classes([AllowAny])
def projets_par_laboratoire(request, nom_laboratoire):
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
    annees = Projet.objects.values_list('annee', flat=True).distinct()
    return Response({'annees': list(annees)})





@api_view(['POST'])
@permission_classes([AllowAny])
def add_theme_recherche(request):
   if request.method == 'POST':
        serializer = Theme_RechercheSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def theme_recherche_list(request):
    if request.method == 'GET':
        queryset = Theme_Recherche.objects.all()
        serializer = Theme_RechercheSerializer(queryset, many=True)
        return Response(serializer.data)
   


@api_view(['POST'])
@permission_classes([AllowAny])
def PoserQuestion( request):
     serializer = QuestionSerializer(data=request.data)
     if serializer.is_valid():
          #  serializer.save(auteur=request.user)  
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@user_types_required('superuser')
def RepondreQuestion(request, question_id):
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
    valide_questions = Question.objects.filter(valide=True)
    serializer = QuestionSerializer(valide_questions, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@user_types_required('adminstrateur')
def add_annuaire(request):
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
    annuaires = Annuaire.objects.all()
    serializer = AnnuaireSerializer(annuaires, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_Annuaire(request, pk):
    try:
        entry = Annuaire.objects.get(pk=pk)
        serializer = AnnuaireSerializer(entry)
        return Response(serializer.data)
    except Annuaire.DoesNotExist:
        return Response("Entry not found", status=status.HTTP_404_NOT_FOUND)





@api_view(['PUT'])
@user_types_required('adminstrateur')
def edit_Annuaire(request, pk):
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
@user_types_required('adminstrateur')
def delete_Annuaire(request, pk):
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
    grades_set = set(choice[1] for choice in Enseignant_Annuaire.GRADE_CHOICES)
    grades_list = list(grades_set)
    return Response({'grades': grades_list})


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_promotions(request):
    promotions = Alumnie_Annuaire.objects.values_list('promotion', flat=True).distinct()
    return Response({'promotions': promotions})

@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_services(request):
    services = Administration_Annuaire.objects.values_list('service', flat=True).distinct()
    return Response({'services': services})



@api_view(['GET'])
@permission_classes([AllowAny])
def get_publication(request, id):
    try:
        publication = Publication.objects.get(pk=id)
        serializer = PublicationSerializer(publication)
        return Response(serializer.data)
    except Publication.DoesNotExist:
        return Response("Publication introuvable", status=status.HTTP_404_NOT_FOUND)







@api_view(['PUT'])
@user_types_required('adminstrateur')
def annuler_publication(request, pk):
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
    if request.method == 'GET':
        queryset =Publication.objects.filter(type_publication='event',etat='valide')
        serializer = PublicationSerializer(queryset, many=True)
        return Response(serializer.data)

#delete all events_publications
@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_event_publications(request):
    if request.method == 'DELETE':
        # Filtrer et supprimer toutes les publications de type 'event'
        deleted_count, _ = Publication.objects.filter(type_publication='event').delete()
        return Response({'deleted_count': deleted_count}, status=200)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_info(request):
   
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
    categories = Categorie.objects.all()
    serializer = CategorieSerializer(categories, many=True)
    return Response(serializer.data)    

@api_view(['POST'])
@permission_classes([AllowAny])
def add_formation(request):
    if request.method == 'POST':
        serializer = FormationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_module(request):
    if request.method == 'POST':
        serializer = ModuleidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_module_by_id(request, id):
    try:
        module = Module.objects.get(pk=id)
        serializer = ModuleSerializer(module)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Module.DoesNotExist:
        return Response({"error": "Module not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_formations(request):
    formations = Formation.objects.all()
    serializer = FormationidSerializer(formations, many=True)
    return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([AllowAny])
def get_module(request):
    modules = Module.objects.all()
    serializer = ModuleSerializer(modules, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_competances(request):
    competances = Competence.objects.all()
    serializer = CompetenceSerializer(competances, many=True)
    return Response(serializer.data)  


@api_view(['GET'])
@permission_classes([AllowAny])
def get_formateur(request):
    fromateur = Formateur.objects.all()
    serializer = FormateurSerializer(fromateur, many=True)
    return Response(serializer.data)      



@api_view(['GET'])
@permission_classes([AllowAny])
def get_modules_by_formation(request, formation_id):
   
        formation = Formation.objects.get(id=formation_id)
        modules = formation.Module.all()
        serializer = ModuleSerializer(modules, many=True)
        return Response(serializer.data)

   


@api_view(['GET'])
@permission_classes([AllowAny])
def get_formation_by_id(request, formation_id):
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
    if request.method == 'POST':
        serializer = FormateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['POST'])
@permission_classes([AllowAny])
def add_competence(request):
    if request.method == 'POST':
        serializer = CompetenceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['PUT'])
@permission_classes([AllowAny])
def update_competence(request, pk):
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
    if request.method == 'POST':
        serializer = ChapitreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_chapitre(request, pk):
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
    chapitre = Chapitre.objects.all()
    serializer = ChapitreSerializer(chapitre, many=True)
    return Response(serializer.data)      





@api_view(['GET'])
@permission_classes([AllowAny])
def get_chapitre_by_id(request, id):
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
    if request.method == 'POST':
        serializer = CoursidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_cours(request, pk):
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
    cours = Cours.objects.all()
    serializer = CoursSerializer(cours, many=True)
    return Response(serializer.data)  



@api_view(['GET'])
@permission_classes([AllowAny])
def get_cours_by_id(request, id):
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
    if request.method == 'POST':
        serializer = ThemeFormationidSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)




@api_view(['PUT'])
@permission_classes([AllowAny])
def update_theme_formation(request, pk):
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
    theme_formation = Theme_formation.objects.all()
    serializer = ThemeFormationSerializer(theme_formation, many=True)
    return Response(serializer.data)  



@api_view(['GET'])
@permission_classes([AllowAny])
def get_theme_formation_by_id(request, id):
    try:
        theme_formation = Theme_formation.objects.get(id=id)
        serializer = ThemeFormationSerializer(theme_formation)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Theme_formation.DoesNotExist:
        return Response({"error": "theme formation not found"}, status=status.HTTP_404_NOT_FOUND)







@api_view(['GET'])
@permission_classes([AllowAny])
def publications_by_laboratory(request, laboratoire_id):
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







