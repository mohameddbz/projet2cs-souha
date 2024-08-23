from django.contrib import admin
from django.urls import path,include
from publication.views import *
from django.conf import settings
from django.conf.urls.static import static
urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', get_all_users, name='get_all_users'),  # URL for getting all users and creating new users
    path('users/edit/<int:pk>/', edit_user, name='edit_user'),  # URL for editing a specific user
    path('users/search/', search_user, name='search_user'),  # URL for searching users by name
    path('users/add',add_user,name='add_user'),
    path('users/login',login_user,name='login_user'),
    path('users/delete/<int:pk>/',delete_user,name='delete_user'),
    path('user/<int:user_id>/',get_user_by_id,name='get_user'),

    path('publication/', get_all_publications, name='get_all_publications'),
    path('publication/add/', add_publication, name='add_publication'),
    path('publication/validate/<int:pk>/', validate_publication, name='validate_publication'),
    path('publication/refuse/<int:pk>/', refuse_publication, name='validate_publication'),
    path('publication/search/',search_publication,name='search_publication'),
    path('publication/delete/<int:pk>/', delete_publication, name='delete_publication'),
    path('publications/bycategory/<int:category>/', get_publications_by_category, name='get_publications_by_category'),
    path('publications/bycategory/', get_publications_by_category_admin, name='get_publications_by_category_admin'),
   
    path('partenaire/add',add_partenaire,name='add_partenaire'),
   path('partenaire/<int:id>/update/', update_partenaire, name='update_partenaire'),
    path('partenaire/<int:id>/delete/', delete_partenaire, name='delete_partenaire'),


    path('partenaires',get_all_partenaire,name='get_all_partenaire'),
    path('partenaire/<int:id>/',get_partenaire_byid,name='get_partenaire'),
    path('demande_partenariat',post_demande_partenariat,name='demande_partenariat'),
    path('demande_partenariat/all',get_all_demande_partenariat,name='get_all_demande_partenariat'),
        path('demande-partenariat/accepter/<int:id>/', accepter_demande_partenariat, name='accepter_demande_partenariat'),
 path('demande_partenariat/refuser/<int:id>/',refuser_demande_partenariat,name='refuser_demande_partenariat'),
    path('Devis/valider',valider_devis,name='valider_devis'),
    path('Devis/demande',add_devis,name='add_devis'),
    path('Devis',get_all_devis,name='get_all_devis'),
    path('chercheur',chercheur_list,name='chercheur'),
     path('publication/<int:pk>/', edit_publication, name='edit_publication'),
    path('publication/event_publications',get_event_publications,name='event_publications') , 
    path('publication/searchall/',search_publication_noauth,name='search_publication') , 
    path('publication/deleteEventsPublications/',delete_event_publications,name='delete_event_publications') , 
    path('sections/create/', create_section, name='create_section'),
  path('publication/sections/<int:publication_id>/', list_sections_by_publication, name='list_sections_by_publication'),


    path('partenair_labo',partenaire_labo_list,name='partenaire_labo_list'),
    path('add_partenair_labo',add_partenaire_labo,name='add_partenaire_labo'),

    path('labos',laboratoire_list,name='laboratoire_list'),
    path('add_laboratoire',add_laboratoire,name='add_laboratoire'),
    
 path('annees-projets/',annees_projets, name='annees_projets'),
 path('projets/<str:nom_laboratoire>/',projets_par_laboratoire, name='projets_par_laboratoire'),

path('equipe_recherche/add',add_equipe_recherche,name='add_equipe_recherche'),
    path('equipe/<int:equipe_id>/members/', equipe_members, name='equipe_members')
, 

    path('equipe_recherche',equipe_recherche_list,name='equipe_recherche_list'),
    # path('add_equipe',add_equipe,{'formset': "EquipeFormSet"},name="ajouter_equipe"),
    path('chercheur',chercheur_list,name='chercheur'),
    path('chercheur/add',add_chercheur,name='add_chercheur'),

    path('equipe_projet',equipe_projet_list,name='equipe_projet'),
    path('equipe_projet/add',add_equipe_projet,name='add_equipe_projet'),

    path('laboratoire/<str:laboratoire_nom>/equipes/', get_equipes_par_laboratoire, name='equipes_par_laboratoire_nom'),
    path('club/create',create_club,name='create_club'),

    path('theme',theme_recherche_list,name='theme'),
    path('theme/add',add_theme_recherche,name='add_theme_recherche'),

    path('project',projet_list,name='project'),
    path('project/add',add_projet,name='add_projet'),


    path('club/<int:club_id>/', get_club_members, name='get_club_members'),
    path('club/<int:club_id>/add_member/', add_club_member, name='add_club_member'),
    path('club/<int:club_id>/update/', update_club, name='update_club'),
    path('club/<int:club_id>/delete/', delete_club, name='delete_club'),
    path('club/<int:club_id>/members/<int:member_id>/update/', update_member, name='update_member'),
    path('club/<int:club_id>/members/<int:member_id>/delete/', delete_member, name='delete_member'),
    path('club/<int:club_id>/members/<str:name>/', get_members_by_name, name='get_members_by_name'),
    path('club/<str:name>/',get_clubs_by_name, name='get_clubs_by_name'),
    path('club/<int:club_id>/evenement_publications/', get_club_evenement_publications, name='get_club_evenement_publications'),
    path('club/<int:club_id>/add_evenement_publication/', add_evenement_publication_to_club, name='add_evenement_publication_to_club'),
    path('', include('AppFablab.urls')),
        path('poser-question/', PoserQuestion, name='poser_question'),
    path('repondre-question/<int:question_id>/', RepondreQuestion, name='repondre_question'),
    path('questions/<str:category>', GetQuestions, name='GetQuestions'),
    path('question/<int:question_id>/', GetQuestionById, name='get_question_by_id'),
    path('questions/', GetValideQuestions, name='get_all_questions'),
    path('all/questions/', GetAllQuestions, name='get_all_questions'),
    path('reponse/<int:question_id>/', get_responses_by_question, name='get_responses_by_question'),

    
    path('events/create/', create_event_inscription, name='create_event_inscription'),
    path('events/club/<int:club_id>/', list_events_by_club, name='list_events_by_club'),

    path('clubs/', get_all_clubs , name='get_all_clubs'),

    path('annuaire/', get_all_annuaire , name='get_all_directory_entries'),
    path('annuaire/add/',add_annuaire, name='add_directory_entry'),
    path('annuaire/<int:pk>/', get_Annuaire, name='get_directory_entry'),
    path('annuaire/edit/<int:pk>/', edit_Annuaire, name='edit_directory_entry'),
    path('annuaire/delete/<int:pk>/', delete_Annuaire, name='delete_directory_entry'),
    path('annuaire/enseignant/filter/', filter_enseignant_by_grade_and_mot_cle, name='filter_enseignant'),
    path('annuaire/administration/filter/', filter_administration_by_mot_cle_and_service, name='filter_administration'),
    path('annuaire/alumnie/filter/', filter_alumnie_by_promotion, name='filter_alumnie'),
    path('annuaire/grades/', get_all_grades, name='get_all_grades'),
    path('annuaire/promotions/', get_all_promotions, name='get_all_promotions'),
    path('annuaire/services/', get_all_services, name='get_all_services'),
    path('annuaire/enseignant/<str:nom>/<str:prenom>/', get_enseignant_annuaire, name='get_enseignant_annuaire'),
    
    path('publication1/<int:id>/', get_publication, name='get_publication'),
    path('publication/annuler/<int:pk>/',annuler_publication, name='annuler_publication'),


    path('event/add', add_event, name='add_event'),
    path('query_publications/', query_publications, name='query_publications'),
    path('actualité/add', add_actualité, name='add_actualité'),
    path('categorie/add', create_categorie, name='create_categorie'),
    path('delete_categorie/<int:categorie_id>/', delete_categorie, name='delete_categorie'),
    
    path('categorie', get_all_categories, name='get_all_categories'),

    
    path('user/',get_user_info,name='get_user_infos'),



    path('add-formation/', add_formation, name='add_formation'),
    path('add_module/', add_module, name='add_module'),
      path('formations/', get_formations, name='formation-list'),

      path('formation/<int:formation_id>/modules/', get_modules_by_formation, name='formation-modules'),
       path('formations/<int:formation_id>/', get_formation_by_id, name='get_formation_by_id'),
     path('formation/delete/<int:pk>/', delete_formation, name='delete_formation'),
     path('module/delete/<int:pk>/', delete_module, name='delete_module'),
      path('formateur/add/', add_formateur, name='add_formateur'),
      path('competence/add/', add_competence, name='add_competence'),
      path('competence/update/<int:pk>/', update_competence, name='update_competence'),
     path('formateur/update/<int:pk>/', update_formateur, name='update_formateur'),
    path('module/update/<int:pk>/', update_module, name='update_module'),
    path('formation/update/<int:pk>/', update_formation, name='update_formation'),
    path('module/<int:module_id>/competences/', get_competences_by_module, name='get_competences_by_module'),
    path('module/<int:module_id>/formateur/', get_formateur_by_module, name='get_formateur_by_module'),



     
   
  
   


]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT) + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

