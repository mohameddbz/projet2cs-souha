from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('categories/', get_all_categories, name='get_all_categories'),
    path('categories/add/', add_category, name='add_category'),
    path('categories/update/<int:pk>/', update_category, name='update_category'),
    path('categories/delete/<int:pk>/', delete_category, name='delete_category'),
    path('ajouter_piece/', ajouter_piece, name='ajouter_piece'),
    path('pieces/<int:piece_id>/', get_piece_detail, name='get_piece_detail'),
    path('pieces/', get_all_pieces, name='get_all_pieces'),
    path('supprimer_piece/<int:piece_id>/', supprimer_piece, name='supprimer_piece'),
    path('modifier_piece/<int:piece_id>/', modifier_piece, name='modifier_piece'),
    path('categories/', get_all_categories_fablab, name='categories_fablab'),
    path('pieces-by-category/', pieces_by_category, name='pieces_by_category'),
    path('search-piece/', search_piece_by_name, name='search_piece_by_name'),
    path('filter-pieces-by-category/', filter_pieces_by_category, name='filter_pieces_by_category'),
    path('filter-pieces-by-state/', filter_pieces_by_state, name='filter_pieces_by_state'),
    path('faire-demande-materiel/', request_material, name='request_material'),
    path('demandes-materiel/', get_all_demandes_materiel, name='get_all_demandes_materiel'),
    path('demandes-materiel/<int:demande_id>/accepter-rejeter/', accepter_rejeter_demande, name='accepter_rejeter_demande'),
    path('demandes-materiel/<str:statut>/', filtrer_demandes_par_statut, name='filtrer_demandes_par_statut'),
    path('inscription-utilisateur/', inscription_utilisateur, name='inscription_utilisateur'),
    path('inscriptions/', get_all_inscriptions, name='get_all_inscriptions'),
    path('save_piece/<int:id_piece>/', save_piece, name='save_piece'),
    path('piece/<int:piece_id>/', piece_info, name='piece_info'),
    path('filter-inscriptions-by-date/', filter_inscriptions_by_date, name='filter_inscriptions_by_date'),
    path('filter-demandes-by-date/', filter_demandes_by_date, name='filter_demandes_by_date'),
   path('inscriptions/<int:inscription_id>/valider/', valider_inscription, name='valider_inscription'),
    path('inscriptions/<int:inscription_id>/rejeter/', rejeter_inscription, name='rejeter_inscription'),

]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)