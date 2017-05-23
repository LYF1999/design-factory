# -*- coding:utf-8 -*-
from rest_framework import routers

from materials.apis.views import MaterialViewSet
from files.apis.views import FileViewSet, ImageViewSet
from users.apis.views import AuthViewSet, UserShowViewSet
from favorite.api.views import FavoriteCtrlViewSets, FavoriteObjectViewSets

router = routers.DefaultRouter()

router.register(r'material', MaterialViewSet, base_name='material')
router.register(r'file', FileViewSet, base_name='file')
router.register(r'image', ImageViewSet, base_name='image')
router.register(r'user', UserShowViewSet, base_name='user')
router.register(r'auth', AuthViewSet, base_name='auth')
router.register(r'favorite-ctrl', FavoriteCtrlViewSets, base_name='favorite-ctrl')
router.register(r'favorite-object', FavoriteObjectViewSets, base_name='favorite-object')
