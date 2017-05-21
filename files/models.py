# coding=utf-8
from django.db import models

from materials.models import Material


class File(models.Model):
    file = models.FileField(upload_to='files/')
    material = models.ForeignKey(Material, related_name='files')
    created_at = models.DateTimeField(u'创建时间', auto_now_add=True)


class Image(models.Model):
    image = models.ImageField(upload_to='images/')
    alt = models.CharField(u'alt属性', max_length=100, blank=True)
    material = models.ForeignKey(Material, related_name='images')
    created_at = models.DateTimeField(u'创建时间', auto_now_add=True)
