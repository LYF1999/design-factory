from rest_framework.permissions import BasePermission


def check_permission(permission_class, self, request, object=None):
    #  !!! permission_class must a tuple !!! such like (a,)
    #  self = Class ViewSet self
    self.permission_classes = permission_class
    if object is not None:
        self.check_object_permissions(request, object)
    self.check_permissions(request)


class IsStaffOrSelf(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or request.user == obj


class IsAdminOrSelf(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_object_permission(self, request, view, obj):
        return request.method in ["OPTIONS"] or request.user.is_superuser or request.user == obj


class IsStaff(BasePermission):
    """
    Allows access only to admin users.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_staff


class IsAuthenticated(BasePermission):
    """
    Allows access only to authenticated users.
    """

    def has_permission(self, request, view):
        return request.method in ["OPTIONS"] or request.user and request.user.is_authenticated()
