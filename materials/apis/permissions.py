#  coding=utf-8
from __future__ import unicode_literals
from rest_framework.permissions import BasePermission, SAFE_METHODS


class MaterialPermission(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS or request.user.is_superuser

    def has_object_permission(self, request, view, obj):
        return request.method in SAFE_METHODS or obj.user == request.user or request.user.is_superuser
