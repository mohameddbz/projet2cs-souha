# Generated by Django 5.0.6 on 2024-08-23 22:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publication', '0007_competence_formateur_remove_formation_planing_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Chapitre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('contenu', models.TextField()),
                ('duree', models.IntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='module',
            name='competences',
            field=models.ManyToManyField(blank=True, related_name='competences', to='publication.competence'),
        ),
        migrations.AlterField(
            model_name='module',
            name='formateur',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='cours', to='publication.formateur'),
        ),
        migrations.AddField(
            model_name='module',
            name='chapitres',
            field=models.ManyToManyField(blank=True, related_name='chapitres', to='publication.chapitre'),
        ),
        migrations.CreateModel(
            name='Theme_formation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
                ('modules', models.ManyToManyField(related_name='modules_theme', to='publication.module')),
            ],
        ),
        migrations.DeleteModel(
            name='Planing',
        ),
        migrations.DeleteModel(
            name='Session',
        ),
    ]