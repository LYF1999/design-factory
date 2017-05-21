# -*- coding:utf-8 -*-
from django.contrib.auth import login, authenticate, logout

from ratelimit.decorators import ratelimit
from rest_framework import viewsets, views
from rest_framework.decorators import list_route
from rest_framework.mixins import RetrieveModelMixin

from users.apis.serializers import UserRegistrationSerializer, UserLoginSerializer, UserShowSerializer, \
    ProfileChangeSerializer, UserSerializer, AccountChangeSerializer
from users.models import User
from utils import response
from utils.permissions import IsAuthenticated, IsAdminOrSelf


class AuthViewSet(viewsets.GenericViewSet):
    """
    实现的功能：登录、注册、忘记密码、邮箱验证
    """

    @list_route(['post'], serializer_class=UserLoginSerializer)
    @ratelimit(key='header:x-real-ip', rate='10/m', block=True)
    def login(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(email=serializer.data.get('email'), password=serializer.data.get('password'))
            if user:
                login(request, user)
                return response.OK({'success': True, 'id': user.id, 'email': user.email, 'username': user.username,
                                    'short_desc': user.short_desc})
            return response.Forbidden({'success': False, 'error_msg': 'invalid token'})
        else:
            return response.BadRequest(serializer.errors)

    @list_route(['post'], serializer_class=UserLoginSerializer)
    @ratelimit(key='header:x-real-ip', rate='10/m', block=True)
    def logout(self, request):
        if request.user.is_authenticated():
            logout(request)
        return response.NoContent()

    @list_route(['post'], serializer_class=UserRegistrationSerializer)
    @ratelimit(key='header:x-real-ip', rate='10/m', block=True)
    def registration(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create(email=serializer.data.get('email'))
            user.username = serializer.data.get('username')
            user.set_password(serializer.data.get('password'))
            user.is_active = True
            user.save()
            login(request, authenticate(email=serializer.data.get('email'), password=serializer.data.get('password')))
            return response.Created(UserShowSerializer(user).data)
        else:
            return response.BadRequest(serializer.errors)


class UserShowViewSet(viewsets.GenericViewSet, RetrieveModelMixin):
    """
    实现的功能：获取／修改一个user的信息
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsAdminOrSelf]

    def list(self, request):
        """
        获取用户自己的信息
        """
        serializer = self.get_serializer(request.user)
        return response.OK(serializer.data)

    @list_route(methods=['PUT'], serializer_class=ProfileChangeSerializer)
    def profile(self, request):
        """
        修改用户信息(非重要)
        """
        instance = request.user
        serializer = ProfileChangeSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.OK(serializer.data)

    @list_route(methods=['PUT'], serializer_class=AccountChangeSerializer)
    def account(self, request):
        """
        修改重要的用户信息(需要密码确认)
        包括 邮箱(Email) 用户名(Username) 密码(Password)
        """
        instance = request.user
        serializer = AccountChangeSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.update(instance, request.data)
        return response.OK(UserSerializer(instance).data)
