# Generated by Django 5.0.6 on 2024-08-27 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('publication', '0011_alter_module_formateur'),
    ]

    operations = [
        migrations.AlterField(
            model_name='publication',
            name='etat',
            field=models.CharField(default='en attente', max_length=50),
        ),
    ]