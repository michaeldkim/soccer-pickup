# Generated by Django 4.2.11 on 2024-04-02 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_team_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='league',
            name='teams',
            field=models.ManyToManyField(blank=True, related_name='leagues', to='api.team'),
        ),
    ]
