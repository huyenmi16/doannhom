# Generated by Django 5.0.7 on 2024-10-27 07:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_service', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=15, null=True, unique=True),
        ),
    ]
