from django.contrib import admin

from .models import Publication ,Categorie,Utilisateur 

admin.site.register(Publication)
admin.site.register(Categorie)
admin.site.register(Utilisateur)