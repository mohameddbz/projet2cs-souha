from django.contrib import admin
from .models import Piece, Category, DemandeMateriel, FablabInscriptionUtilisateur

admin.site.register(Piece)
admin.site.register(Category)
admin.site.register(DemandeMateriel)
admin.site.register(FablabInscriptionUtilisateur)
