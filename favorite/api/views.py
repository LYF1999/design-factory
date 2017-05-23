#  coding=utf-8
from __future__ import unicode_literals
from rest_framework.viewsets import ModelViewSet
from rest_framework import permissions
from rest_framework.response import Response

from materials.models import Material
from materials.apis.serializers import MaterialSerializer
from favorite.api.serializers import FavoriteCtrlSerializer, FavoriteObjectSerializer
from favorite.api.permissions import FavoriteCtrlPermission, FavoriteObjectPermission
from favorite.models import FavoriteCtrl, FavoriteObject


class FavoriteCtrlViewSets(ModelViewSet):
    serializer_class = FavoriteCtrlSerializer
    permission_classes = [FavoriteCtrlPermission, permissions.IsAuthenticated]

    def get_queryset(self):
        return FavoriteCtrl.objects.filter(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['user'] = request.user
        serializer.save()
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        favorite_ctrl = self.get_object()
        serializer = self.serializer_class(favorite_ctrl)
        data = serializer.data
        materials = Material.objects.filter(favoriteobject__in=favorite_ctrl.favoriteobject_set.all())
        data['materials'] = MaterialSerializer(materials, many=True).data
        return Response(data)


class FavoriteObjectViewSets(ModelViewSet):
    serializer_class = FavoriteObjectSerializer
    permission_classes = [FavoriteObjectPermission, permissions.IsAuthenticated]

    def get_queryset(self):
        favorite_ctrl_set = FavoriteCtrl.objects.filter(user=self.request.user)
        return FavoriteObject.objects.filter(favorite_ctrl__in=favorite_ctrl_set)

    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        favorite_ctrl = serializer.validated_data['favorite_ctrl']
        if not favorite_ctrl.user == request.user:
            return Response({'detail': '不是您的收藏夹'}, status=400)

        serializer.validated_data['material_id'] = serializer.validated_data['material_id'].id
        serializer.save()
        return Response(serializer.data)
