# -*- coding:utf-8 -*-
from rest_framework import serializers

from files.models import File, Image


class FileSerializer(serializers.ModelSerializer):

    class Meta:
        model = File
        fields = ('id', 'file')


class ImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Image
        fields = ('id', 'image', 'alt')
