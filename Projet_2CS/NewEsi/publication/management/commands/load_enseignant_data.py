from django.core.management.base import BaseCommand
from publication.models import Enseignant_Annuaire
import pandas as pd

class Command(BaseCommand):
    help = 'Load data from CSV into the Enseignant_Annuaire model'

    def handle(self, *args, **kwargs):
        try:
            df = pd.read_csv(r'C:\Users\ADMIN\Documents\Projet_2CS\Projet_2CS\NewEsi\publication\Data\enseignant.csv')

            for _, row in df.iterrows():
                Enseignant_Annuaire.objects.create(
                    nom=row['nom'],
                    prenom=row['prenom'],
                    contact=row['contact'],
                    email=row['email'],
                    photo=row['photo'],
                    linkedin=row['linkedin'],
                    mot_cle=row['mot_cle'],
                    grade=row['grade'] , 
                )
            
            self.stdout.write(self.style.SUCCESS('Données chargées avec succès dans le modèle Enseignant_Annuaire'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Une erreur s'est produite : {e}"))