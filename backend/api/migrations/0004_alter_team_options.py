# Generated by Django 4.2.11 on 2024-04-02 00:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_rename_game_date_league_league_start_date_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='team',
            options={'ordering': ['name']},
        ),
    ]
