# Generated by Django 5.0.6 on 2024-08-22 10:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publication', '0005_planing_session_remove_formation_id_formation_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Module',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('titre', models.CharField(max_length=255)),
            ],
        ),
        migrations.AddField(
            model_name='formation',
            name='Module',
            field=models.ManyToManyField(related_name='modules', to='publication.module'),
        ),
    ]