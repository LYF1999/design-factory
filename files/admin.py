from django.contrib import admin
from files.models import File, Image


class FileAdmin(admin.ModelAdmin):
    list_display = ('id', 'file', 'created_at')


class ImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'image', 'alt', 'created_at')

admin.site.register(File, FileAdmin)
admin.site.register(Image, ImageAdmin)
