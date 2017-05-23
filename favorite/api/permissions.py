#  coding=utf-8
from __future__ import unicode_literals
from rest_framework.permissions import BasePermission, SAFE_METHODS


class FavoriteCtrlPermission(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class FavoriteObjectPermission(BasePermission):
    def has_permission(self, request, view):
        return True

    def has_object_permission(self, request, view, obj):
        return obj.favorite_ctrl.user == request.user
