#  coding=utf-8
from __future__ import unicode_literals
from materials.models import Material
from materials.apis.serializers import MaterialSerializer
from rest_framework import serializers
from favorite.models import FavoriteCtrl, FavoriteObject


class FavoriteCtrlSerializer(serializers.ModelSerializer):
    cover = serializers.ImageField(read_only=True)

    class Meta:
        model = FavoriteCtrl
        fields = ['id', 'name', 'cover']


class FavoriteObjectSerializer(serializers.ModelSerializer):
    material = MaterialSerializer(read_only=True)
    material_id = serializers.PrimaryKeyRelatedField(queryset=Material.objects.all(), write_only=True)

    class Meta:
        model = FavoriteObject
        fields = '__all__'
