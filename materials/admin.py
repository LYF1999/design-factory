# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from django_summernote.admin import SummernoteModelAdmin
from materials.models import Material


# Register your models here.

class MaterialsAdmin(SummernoteModelAdmin):
    list_display = ['title']


admin.site.register(Material, MaterialsAdmin)
