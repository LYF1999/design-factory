# -*- coding:utf-8 -*-


class MaterialType(object):
    FONT = 1
    BACKGROUND = 2
    MATERIAL = 3
    PLATE_TYPE = 4


MATERIAL_TYPE_CHOICE = (
    (MaterialType.FONT, 'Font'),
    (MaterialType.BACKGROUND, 'Background'),
    (MaterialType.MATERIAL, 'Material'),
    (MaterialType.PLATE_TYPE, 'Plate Type'),
)
