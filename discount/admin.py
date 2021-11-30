from django.contrib import admin

from discount.models import SingleUseDiscountCode
from discount.models import MultiUseDiscountCode

admin.site.register(SingleUseDiscountCode)

admin.site.register(MultiUseDiscountCode)
