# Generated by Django 5.0.2 on 2024-08-26 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0004_gameroom_turn'),
    ]

    operations = [
        migrations.AddField(
            model_name='gameroom',
            name='new_move',
            field=models.JSONField(null=True),
        ),
    ]
