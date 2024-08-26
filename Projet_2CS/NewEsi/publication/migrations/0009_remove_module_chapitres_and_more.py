# Generated by Django 5.0.6 on 2024-08-25 21:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publication', '0008_chapitre_alter_module_competences_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='module',
            name='chapitres',
        ),
        migrations.RemoveField(
            model_name='theme_formation',
            name='modules',
        ),
        migrations.CreateModel(
            name='Cours',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('description', models.TextField(default='Aucune description fournie')),
                ('chapitres', models.ManyToManyField(blank=True, related_name='chapitres', to='publication.chapitre')),
                ('competences', models.ManyToManyField(blank=True, related_name='competences_theme', to='publication.competence')),
            ],
        ),
        migrations.AddField(
            model_name='theme_formation',
            name='cours',
            field=models.ManyToManyField(related_name='cours', to='publication.cours'),
        ),
    ]