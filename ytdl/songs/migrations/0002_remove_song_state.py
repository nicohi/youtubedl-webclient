# Generated by Django 2.0.5 on 2018-05-16 14:02

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='song',
            name='state',
        ),
    ]
