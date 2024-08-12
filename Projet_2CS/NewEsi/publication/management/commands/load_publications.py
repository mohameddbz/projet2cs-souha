import pandas as pd
from django.core.management.base import BaseCommand
from publication.models import Publication, Utilisateur,Categorie
from django.utils.dateparse import parse_datetime
import random
class Command(BaseCommand):
    help = 'Load data from CSV into the Publication model'

    def handle(self, *args, **kwargs):
        df = pd.read_csv(r'C:\Users\Dell\Desktop\Projet_2CS\Projet_2CS\NewEsi\publication\Data\pub 2016-2017 - Feuille 1.csv')

        default_publisher = Utilisateur.objects.first()
        for _, row in df.iterrows():
            date_str = str(row['Date']) if pd.notna(row['Date']) else None
            try:
                date_publication = parse_datetime(date_str) if date_str else None
            except ValueError:
                self.stderr.write(f"Invalid date format for row: {row['Date']}. Skipping this row.")
                continue
            
       
            Publication.objects.create(
                titre=f"{row['Title']} By {row['organisateur']}",
                description=row.get('Publication', ''),
                # Assuming image and other fields are not available in CSV and will be handled separately
                etat='valide',
                type_publication='event',
                date_publication=date_publication,
                publisher=default_publisher,
                categorie_id=1
            )
        
        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))
