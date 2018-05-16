from django.db import models

# Create your models here.

class Song(models.Model):
    url = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    state = models.CharField(max_length=10)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
