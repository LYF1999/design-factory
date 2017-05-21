# -*- coding:utf-8 -*-
from rest_framework import viewsets
from rest_framework.filters import DjangoFilterBackend

from materials.apis.paginations import MaterialPagination
from materials.apis.permissions import MaterialPermission
from materials.apis.serializers import MaterialSerializer
from materials.models import Material


class MaterialViewSet(viewsets.ModelViewSet):
    """
    实现的功能：获取Article的详情
    """
    queryset = Material.objects.all()
    serializer_class = MaterialSerializer
    pagination_class = MaterialPagination
    permission_classes = (MaterialPermission,)
    filter_backends = [DjangoFilterBackend]
    filter_fields = ['type']
