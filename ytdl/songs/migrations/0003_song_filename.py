# Generated by Django 2.0.5 on 2018-05-16 14:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('songs', '0002_remove_song_state'),
    ]

    operations = [
        migrations.AddField(
            model_name='song',
            name='filename',
            field=models.CharField(default='noname', max_length=255),
            preserve_default=False,
        ),
    ]