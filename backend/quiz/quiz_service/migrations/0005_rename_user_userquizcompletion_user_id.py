# Generated by Django 5.0.7 on 2024-09-09 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz_service', '0004_remove_quiz_is_completed_userquizcompletion'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userquizcompletion',
            old_name='user',
            new_name='user_id',
        ),
    ]
