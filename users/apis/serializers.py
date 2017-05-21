# -*- coding:utf-8 -*-
from django.contrib.auth import authenticate

from captcha.models import CaptchaStore
from rest_framework import serializers

from users.models import User


class UserRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=63)
    password = serializers.CharField(max_length=128)
    confirm_password = serializers.CharField(max_length=128)

    # captcha_key = serializers.CharField(max_length=255)
    # captcha_ans = serializers.CharField(max_length=32)

    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('Email already exists.')
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError('The two passwords are not the same.')
        # if data['captcha_ans'] != CaptchaStore.objects.get(hashkey=data['captcha_key']).response:
        #     raise serializers.ValidationError('Captcha error.')
        return data


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)


class UserShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'short_desc')


class ProfileChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'short_desc')


class AccountChangeSerializer(serializers.ModelSerializer):
    password = serializers.CharField(allow_blank=True, min_length=6, max_length=200, read_only=True)
    old_password = serializers.CharField(min_length=6, max_length=200, read_only=True)
    default_error_messages = {
        'inactive_account': 'User account is disabled.',
        'invalid_credentials': 'Unable to login with provided credentials.',
    }

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'old_password')

    def validate(self, attrs):
        _user = authenticate(username=self.instance.username, password=attrs['old_password'])
        if _user:
            if not _user.is_active:
                raise serializers.ValidationError(self.error_messages['inactive_account'])
            return attrs
        else:
            raise serializers.ValidationError(self.error_messages['invalid_credentials'])

    def update(self, instance, data):
        instance.username = data['username']
        instance.email = data['email']
        if data['password'] != "":
            instance.set_password(data['password'])
        instance.save()
        return instance


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'short_desc', 'is_staff', 'is_active', 'date_joined', 'subscribed')
