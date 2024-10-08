from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from publication.decorators import user_types_required
from rest_framework import status
from rest_framework.response import Response
from .models import *
from .serializers import *
from django.db.models import Q
from django.core.mail import send_mail
from publication.models import Utilisateur
from django.conf import settings
from datetime import datetime
from rest_framework.decorators import  permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_categories(request):
    """
    Récupère toutes les catégories disponible  des Pieces .

    Méthode HTTP : GET
    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Retourne :
    - Une liste de catégories sérialisées au format JSON.
    """
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

@api_view(['POST'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def add_category(request):
    """
    Ajoute une nouvelle catégorie des Pieces.

    Méthode HTTP : POST

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Corps de la requête :
    - `name` (str) : Nom de la catégorie.

    Retourne :
    - Les données de la catégorie nouvellement créée au format JSON, ou une erreur si la validation échoue.

    """
    serializer = CategorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def update_category(request, pk):
    """
    Met à jour une catégorie des Pieces existante.

    Méthode HTTP : PUT

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Paramètres :
    - `pk` (int) : Identifiant de la catégorie à mettre à jour.

    Corps de la requête :
    - `name` (str) : Nouveau nom de la catégorie.

    Retourne :
    - Les données de la catégorie mise à jour au format JSON, ou une erreur si la validation échoue.
    """
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer = CategorySerializer(category, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def delete_category(request, pk):
    """
    Supprime une catégorie des pieces existante.

    Méthode HTTP : DELETE
    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Paramètres :
    - `pk` (int) : Identifiant de la catégorie à supprimer.

    Retourne :
    - Un statut 204 No Content si la suppression réussit, ou une erreur si la catégorie n'existe pas.
    """
    try:
        category = Category.objects.get(pk=pk)
    except Category.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    category.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def ajouter_piece(request):
    """
    Ajoute une nouvelle pièce Fablab.

    Méthode HTTP : POST

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Corps de la requête :
    - `nom` (str) : Nom de la pièce.
    - `quantite_disponible` (int) : Quantité disponible.
    - `etat` (bool) : État de la pièce (disponible ou non).
    - `description` (str) : Description de la pièce.
    - `photo` (fichier) : Photo de la pièce.
    - `categorie_id` (int) : Identifiant de la catégorie associée.

    Retourne :
    - Les données de la pièce nouvellement créée au format JSON, ou une erreur si la validation échoue.
    """
    if request.method == 'POST':
        
        categories = Category.objects.all()
        
        categorie_id = request.data.get('categorie_id', None)
        if categorie_id:
            try:
                categorie = Category.objects.get(pk=categorie_id)
            except Category.DoesNotExist:
                return Response({"error": "La catégorie sélectionnée n'existe pas."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Veuillez sélectionner une catégorie."}, status=status.HTTP_400_BAD_REQUEST)

      
        request.data['categorie'] = categorie.pk

        serializer = PieceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_pieces(request):
    """
    Récupère toutes les pièces disponibles dans fablab .

    Méthode HTTP : GET

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Retourne :
    - Une liste de pièces sérialisées au format JSON.
    """
    if request.method == 'GET':
       
        pieces = Piece.objects.filter(quantite_disponible__gt=0)  
        serializer = PieceSerializer(pieces, many=True)

        return Response(serializer.data)
    
@api_view(['DELETE'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def supprimer_piece(request, piece_id):
    """
    Supprime une pièce existante dans Fablab.

    Méthode HTTP : DELETE

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Paramètres :
    - `piece_id` (int) : Identifiant de la pièce à supprimer.

    Retourne :
    - Un statut 204 No Content si la suppression réussit.
    """
    piece = get_object_or_404(Piece, id_piece=piece_id)
    if request.method == 'DELETE':
        piece.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['GET'])
@permission_classes([AllowAny])
def get_piece_detail(request, piece_id):
    """
    Récupère les détails d'une pièce.

    Méthode HTTP : GET


    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Paramètres :
    - `piece_id` (int) : Identifiant de la pièce à récupérer.

    Retourne :
    - Les données de la pièce au format JSON.
    """
    piece = get_object_or_404(Piece, id_piece=piece_id)
    serializer = PieceSerializer(piece)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
@api_view(['PUT', 'PATCH'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def modifier_piece(request, piece_id):
    """
    Modifie une pièce existante.

    Méthode HTTP : PUT ou PATCH
    URL : /pieces/update/<int:piece_id>/

    Permissions :
    - Autorisé à tous les utilisateurs (AllowAny).

    Paramètres :
    - `piece_id` (int) : Identifiant de la pièce à modifier.

    Corps de la requête :
    - Les champs à modifier (nom, quantite_disponible, etat, description, photo).

    Retourne :
    - Les données de la pièce mise à jour au format JSON, ou une erreur si la validation échoue.
    """
    piece = get_object_or_404(Piece, id_piece=piece_id)

    if request.method == 'PUT' or request.method == 'PATCH':
        serializer = PieceSerializer(piece, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

 
@api_view(['GET'])
def get_all_categories_fablab(request):
    """
    Récupère toutes les catégories  des pieces disponibles dans Fablab.

    Méthode HTTP : GET

    Retourne :
    - Une liste de catégories sérialisées au format JSON.
    """   
    if request.method == 'GET':
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)
    

@api_view(['GET'])
def pieces_by_category(request):
    """
    Récupère les pièces groupées par catégorie.

    Méthode HTTP : GET

    Retourne :
    - Une liste d'objets contenant les catégories et les pièces associées.

    """
    if request.method == 'GET':
      
        categories = Category.objects.all()

        category_data = []
        for category in categories:
            category_pieces = Piece.objects.filter(categorie=category, quantite_disponible__gt=0)
            category_serializer = PieceSerializer(category_pieces, many=True)
            category_data.append({
                'category': CategorySerializer(category).data,
                'pieces': category_serializer.data
            })

        return Response(category_data)
    




@api_view(['GET'])
def search_piece_by_name(request):
    """
    Recherche des pièces par leur nom.

    Méthode HTTP : GET

    Paramètres :
    - `nom` (str) : Le nom de la pièce à rechercher.

    Retourne :
    - Une liste de pièces correspondant à la recherche.
    """
    if request.method == 'GET':
      
        nom_piece = request.GET.get('nom', None)

        if nom_piece:
           
            pieces = Piece.objects.filter(Q(nom__icontains=nom_piece))

          
            serializer = PieceSerializer(pieces, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Veuillez fournir un nom de pièce valide dans le paramètre 'nom'."}, status=400)
        


@api_view(['GET'])
def filter_pieces_by_category(request):
    """
    Filtre les pièces par catégorie.

    Méthode HTTP : GET
    URL : /filter_pieces_by_category/

    Paramètres :
    - `categorie` (int) : L'ID de la catégorie pour filtrer les pièces.

    Retourne :
    - Une liste de pièces appartenant à la catégorie spécifiée.
    """
    if request.method == 'GET':
        
        categorie_id = request.GET.get('categorie', None)

        if categorie_id:
            
            pieces = Piece.objects.filter(categorie=categorie_id, quantite_disponible__gt=0)

          
            serializer = PieceSerializer(pieces, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Veuillez fournir l'ID de la catégorie dans le paramètre 'categorie'."}, status=400)
        



@api_view(['GET'])
def filter_pieces_by_state(request):
    """
    Filtre les pièces par état (disponible ou non).

    Méthode HTTP : GET
    URL : /filter_pieces_by_state/

    Paramètres :
    - `etat` (bool) : L'état des pièces ('true' pour disponible, 'false' pour indisponible).

    Retourne :
    - Une liste de pièces correspondant à l'état spécifié.

    """
    if request.method == 'GET':
        
        etat_param = request.GET.get('etat', None)

      
        if etat_param is not None:
            if etat_param.lower() == 'true':
                etat_bool = True
            elif etat_param.lower() == 'false':
                etat_bool = False
            else:
                return Response({"error": "Le paramètre 'etat' doit être 'true' ou 'false'."}, status=400)

          
            pieces = Piece.objects.filter(etat=etat_bool)

         
            serializer = PieceSerializer(pieces, many=True)
            return Response(serializer.data)
        else:
            return Response({"error": "Veuillez fournir un paramètre 'etat' pour filtrer les pièces ('true' pour oui, 'false' pour non)."}, status=400)



'''@api_view(['POST'])
@permission_classes([AllowAny])
def faire_demande_materiel(request):
    if request.method == 'POST':
        serializer = DemandeMaterielSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
    '''
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from .models import DemandeMateriel
from .serializers import DemandeMaterielSerializer
"""
@api_view(['POST'])
@permission_classes([AllowAny])  # Ajustez les permissions si nécessaire
def faire_demande_materiel(request):
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

        data = request.data.copy()
        data['utilisateur'] = user.id  # Assurez-vous que l'ID de l'utilisateur est inclus

        serializer = DemandeMaterielSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
@api_view(['GET'])
@user_types_required('responsable_fablab')
def get_all_demandes_materiel(request):
    """
    Récupère toutes les demandes de matériel.

    Méthode HTTP : GET

    Autorisation : Nécessite que l'utilisateur soit de type 'responsable_fablab'.

    Retourne :
    - Une liste de demandes de matériel sérialisées au format JSON.
    """
    if request.method == 'GET':
        demandes_materiel = DemandeMateriel.objects.all()
        serializer = DemandeMaterielSerializer(demandes_materiel, many=True)
        return Response(serializer.data)
    


@api_view(['POST'])
@user_types_required('responsable_fablab')
def accepter_rejeter_demande(request, demande_id):
    """
    Accepte ou rejette une demande de matériel avec envoi d'un mail .

    Méthode HTTP : POST

    Autorisation : Nécessite que l'utilisateur soit de type 'responsable_fablab'.

    Paramètres :
    - `demande_id`: ID de la demande de matériel à accepter ou rejeter.
    - `statut`: Le statut à attribuer à la demande, soit 'VALIDEE' soit 'REJETEE'.

    Retourne :
    - Un message confirmant l'acceptation ou le rejet de la demande au format JSON.

    """
    try:
        demande = DemandeMateriel.objects.get(pk=demande_id)
    except DemandeMateriel.DoesNotExist:
        return Response({"error": "La demande de matériel spécifiée n'existe pas."}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'POST':
        statut = request.data.get('statut', None)
        
      
        if not demande.piece.etat:
            return Response({"error": "La pièce demandée n'est pas disponible."}, status=status.HTTP_400_BAD_REQUEST)

       
        if statut == 'REJETEE' or not demande.piece.etat:
            demande.status = 'REJETEE'
            demande.save()
            sujet = "Réponse sur votre demande"
            message = f"Cher {demande.nom},\n\n"
            message += f"votre demande de matériel a été rejetée: {demande.piece.nom}.\n"
            message += "Merci !"

            send_mail(
                subject=sujet,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[demande.email],   
                fail_silently=True,
            )
            return Response({"message": "La demande de matériel a été rejetée."}, status=status.HTTP_200_OK)
        
        
       
        if statut == 'VALIDEE':
            piece = demande.piece
            quantite_empruntee = demande.quantite_empruntee

            if piece.quantite_disponible < quantite_empruntee:
                return Response({"error": "La quantité disponible de la pièce est insuffisante."}, status=status.HTTP_400_BAD_REQUEST)

            piece.quantite_disponible -= quantite_empruntee
            if piece.quantite_disponible == 0:
                piece.etat = False

            piece.save()
            sujet = "Réponse sur votre demande"
            message = f"Cher {demande.nom},\n\n"
            message += f"votre demande de matériel a été validée: {demande.piece.nom}.\n"
            message += "Merci !"

            send_mail(
                subject=sujet,
                message=message,
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[demande.email],  
                fail_silently=True,
            )
       
        demande.status = statut
        demande.save()
        return Response({"message": f"Demande de matériel {demande.status}."}, status=status.HTTP_200_OK)


@api_view(['GET'])
def filtrer_demandes_par_statut(request, statut):
    """
    Filtre les demandes de matériel en fonction de leur statut.

    Méthode HTTP : GET
    URL : /demandes_materiel/filtrer/<statut>/

    Paramètres :
    - `statut`: Le statut des demandes à filtrer (par exemple, 'VALIDEE', 'REJETEE').

    Retourne :
    - Une liste des demandes de matériel correspondant au statut spécifié au format JSON.
   """
    if request.method == 'GET':
        demandes = DemandeMateriel.objects.filter(status=statut)
        serializer = DemandeMaterielSerializer(demandes, many=True)
        return Response(serializer.data)
    
@api_view(['POST'])
@permission_classes([AllowAny])
def inscription_utilisateur(request):
    """
    Permet à un utilisateur de s'inscrire dans FabLab.

    Méthode : POST

    Paramètres :
    - `request.data`: Données de l'utilisateur, incluant les champs requis par le modèle `FablabInscriptionUtilisateur`.

    Réponses :
    - 201 Created : Si l'inscription est réussie, retourne un message de confirmation.
    - 400 Bad Request : Si les données fournies sont invalides, retourne les erreurs de validation.
    """
    if request.method == 'POST':
        serializer = FablabInscriptionUtilisateurSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Inscription réussie !'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def get_all_inscriptions(request):
    """
    Récupère toutes les inscriptions des utilisateurs dans le FabLab.

    Méthode : GET

    Réponses :
    - 200 OK : Retourne une liste de toutes les inscriptions, sérialisées.
    """
    if request.method == 'GET':
        inscriptions = FablabInscriptionUtilisateur.objects.all()
        serializer = FablabInscriptionUtilisateurSerializer(inscriptions, many=True)
        return Response(serializer.data)
    


@api_view(['POST'])
def save_piece(request, id_piece):
    """
    Permet à un utilisateur de sauvegarder une pièce.

    Méthode : POST

    Paramètres d'URL :
    - `id_piece` : ID de la pièce à sauvegarder.

    Authentification : L'utilisateur doit être authentifié pour effectuer cette opération.

    Réponses :
    - 201 Created : La pièce a été sauvegardée avec succès.
    - 200 OK : La pièce a déjà été sauvegardée par l'utilisateur.
    - 404 Not Found : La pièce spécifiée n'existe pas.

    """
    if request.method == 'POST':
        user = request.user
        piece = get_object_or_404(Piece, pk=id_piece)
        
        saved_piece, created = UserSavedPiece.objects.get_or_create(user=user, piece=piece)
        if created:
            return Response({"message": "Piece saved successfully"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"message": "Piece already saved"}, status=status.HTTP_200_OK)
        


@api_view(['GET'])
def piece_info(request, piece_id):
    """
    Récupère les informations d'une pièce spécifique.

    Méthode : GET

    Paramètres d'URL :
    - `piece_id` : ID de la pièce à récupérer.

    Réponses :
    - 200 OK : Retourne les informations de la pièce.
    - 404 Not Found : La pièce spécifiée n'existe pas.
    """
    try:
        piece = Piece.objects.get(pk=piece_id)
    except Piece.DoesNotExist:
        return Response({"error": "Piece not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = PieceInfoSerializer(piece, context={'request': request})
    return Response(serializer.data)



@api_view(['GET'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def filter_inscriptions_by_date(request):
    """
    Filtre les inscriptions des utilisateurs dans le FabLab en fonction d'une plage de dates.

    Méthode : GET

    Paramètres de requête :
    - `start_date` (optionnel) : Date de début au format YYYY-MM-DD.
    - `end_date` (optionnel) : Date de fin au format YYYY-MM-DD.

    Réponses :
    - 200 OK : Retourne une liste d'inscriptions correspondant à la plage de dates spécifiée.
    - 400 Bad Request : Si les formats de dates fournis sont invalides, retourne un message d'erreur.
    """
    if request.method == 'GET':
     
        start_date_str = request.query_params.get('start_date', None)
        end_date_str = request.query_params.get('end_date', None)
        

        if start_date_str:
            try:
                start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            except ValueError:
                return Response({"error": "Invalid start date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            start_date = datetime.min
        
        if end_date_str:
            try:
                end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
            except ValueError:
                return Response({"error": "Invalid end date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            end_date = datetime.max

   
        inscriptions = FablabInscriptionUtilisateur.objects.filter(created__range=[start_date, end_date])
        
 
        serializer = FablabInscriptionUtilisateurSerializer(inscriptions, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@user_types_required('responsable_fablab')
def filter_demandes_by_date(request):
    if request.method == 'GET':
        start_date_str = request.query_params.get('start_date', None)
        end_date_str = request.query_params.get('end_date', None)
        
        if start_date_str:
            try:
                start_date = datetime.strptime(start_date_str, '%Y-%m-%d')
            except ValueError:
                return Response({"error": "Invalid start date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            start_date = datetime.min
        
        if end_date_str:
            try:
                end_date = datetime.strptime(end_date_str, '%Y-%m-%d')
            except ValueError:
                return Response({"error": "Invalid end date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)
        else:
            end_date = datetime.max

        demandes = DemandeMateriel.objects.filter(date_emprunt__range=[start_date, end_date])
        
        serializer = DemandeMaterielSerializer(demandes, many=True)
        return Response(serializer.data)
    


@api_view(['POST'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def valider_inscription(request, inscription_id):
    try:
        inscription = FablabInscriptionUtilisateur.objects.get(pk=inscription_id)
    except FablabInscriptionUtilisateur.DoesNotExist:
        return Response({"error": "L'inscription spécifiée n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

    if inscription.status == 'VALIDEE':
        return Response({"message": "L'inscription est déjà validée."}, status=status.HTTP_200_OK)

    inscription.status = 'VALIDEE'
    inscription.save()

    sujet = "Réponse sur votre inscription"
    message = f"Cher {inscription.nom},\n\nVotre inscription au FabLab a été validée.\nMerci !"

    send_mail(
        subject=sujet,
        message=message,
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[inscription.email],
        fail_silently=True,
    )

    return Response({"message": "Inscription validée."}, status=status.HTTP_200_OK)

@api_view(['POST'])
#@user_types_required('responsable_fablab')
@permission_classes([AllowAny])
def rejeter_inscription(request, inscription_id):
    try:
        inscription = FablabInscriptionUtilisateur.objects.get(pk=inscription_id)
    except FablabInscriptionUtilisateur.DoesNotExist:
        return Response({"error": "L'inscription spécifiée n'existe pas."}, status=status.HTTP_404_NOT_FOUND)

    if inscription.status == 'REJETEE':
        return Response({"message": "L'inscription est déjà rejetée."}, status=status.HTTP_200_OK)

    inscription.status = 'REJETEE'
    inscription.save()

    sujet = "Réponse sur votre inscription"
    message = f"Cher {inscription.nom},\n\nVotre inscription au FabLab a été rejetée.\nMerci !"

    try:
        send_mail(
            subject=sujet,
            message=message,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[inscription.email],
            fail_silently=True,
        )
    except Exception as e:
        return Response({"error": f"Erreur lors de l'envoi de l'e-mail : {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response({"message": "Inscription rejetée."}, status=status.HTTP_200_OK)

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from .models import DemandeMateriel
from .serializers import DemandeMaterielSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def request_material(request):
    if request.method == 'POST':
        # Pas d'authentification requise, on récupère directement les données de la requête
        data = request.data

        # Debugging statement to check data
        print("Request data:", data)

        # Sérialiser les données pour les sauvegarder dans la base de données
        serializer = DemandeMaterielSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # Debugging statement to check serializer errors
            print("Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"error": "Invalid request method"}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

