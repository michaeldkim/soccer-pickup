# Generated by Django 4.2.11 on 2024-04-01 23:50

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='league',
            name='game_date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name='league',
            name='game_time',
            field=models.TimeField(default=datetime.time(18, 0)),
        ),
        migrations.AddField(
            model_name='league',
            name='location',
            field=models.CharField(default='TBD', max_length=100),
        ),
        migrations.AddField(
            model_name='league',
            name='teams',
            field=models.ManyToManyField(related_name='leagues', to='api.team'),
        ),
    ]
