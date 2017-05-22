# -*- coding:utf-8 -*-


class MaterialType(object):
    FONT = 1
    BACKGROUND = 2
    MATERIAL = 3
    PLATE_TYPE = 4


MATERIAL_TYPE_CHOICE = (
    (MaterialType.FONT, '字体'),
    (MaterialType.BACKGROUND, '背景'),
    (MaterialType.MATERIAL, '矢量'),
    (MaterialType.PLATE_TYPE, '版式'),
)
