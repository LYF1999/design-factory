# -*- coding:utf-8 -*-
from rest_framework import serializers

from materials.models import Material
from users.apis.serializers import UserSerializer
from files.apis.serializers import FileSerializer, ImageSerializer


class MaterialSerializer(serializers.ModelSerializer):
    files = FileSerializer(many=True)
    images = ImageSerializer(many=True)

    class Meta:
        model = Material
        fields = ('id', 'user', 'title', 'type', 'description', 'created_at', 'files', 'images', 'cover')
