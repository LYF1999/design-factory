# -*- coding:utf-8 -*-
from rest_framework import routers

from materials.apis.views import MaterialViewSet
from files.apis.views import FileViewSet, ImageViewSet
from users.apis.views import AuthViewSet, UserShowViewSet

router = routers.DefaultRouter()

router.register(r'material', MaterialViewSet, base_name='list')
router.register(r'auth', AuthViewSet, base_name='login')
router.register(r'file', FileViewSet, base_name='list')
router.register(r'image', ImageViewSet, base_name='list')
router.register(r'user', UserShowViewSet, base_name='user')
