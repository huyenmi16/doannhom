# Generated by Django 5.0.7 on 2024-09-14 09:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_service', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='user_images/'),
        ),
    ]