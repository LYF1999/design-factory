# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from materials.models import Material
from users.models import User


class FavoriteCtrl(models.Model):
    user = models.ForeignKey(User, verbose_name='用户')
    name = models.CharField('名称', max_length=255)

    def cover(self):
        first = self.favoriteobject_set.first()
        if first:
            return first.material.cover


class FavoriteObject(models.Model):
    favorite_ctrl = models.ForeignKey(FavoriteCtrl, verbose_name='收藏夹')
    material = models.ForeignKey(Material, verbose_name='素材')

# Create your models here.
