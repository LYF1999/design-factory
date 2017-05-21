# coding=utf-8
from django.contrib.auth.models import (
    UserManager,
    AbstractBaseUser,
    PermissionsMixin,
)
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.crypto import get_random_string

import datetime

from users.constants import ALLOWED_CHARS


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(u'邮箱', unique=True)
    username = models.CharField(u'用户名', max_length=63, unique=True)
    short_desc = models.CharField(u'简介', max_length=255)

    is_staff = models.BooleanField(u'职员状态', default=False)
    is_active = models.BooleanField(u'账户状态', default=True)
    subscribed = models.BooleanField(u'订阅', default=True)
    date_joined = models.DateTimeField(u'注册时间', auto_now_add=True)

    verification_code = models.CharField(u'验证码', max_length=31, blank=True, null=True)
    verification_code_expired_at = models.DateTimeField(u'验证码过期时间', blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    class Meta:
        ordering = ['-id']

    def __unicode__(self):
        return unicode(self.username)

    def __str__(self):
        return self.__unicode__()

    def get_short_name(self):
        return self.__str__()

    def get_full_name(self):
        return self.__str__()

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def generate_verification_code(self, commit=True):
        self.verification_code = get_random_string(10, ALLOWED_CHARS)
        self.verification_code_expired_at = timezone.now() + datetime.timedelta(hours=24)
        if commit:
            self.save()
