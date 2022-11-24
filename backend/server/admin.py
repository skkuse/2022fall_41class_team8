from django.contrib import admin

from .models import user, problem, user_log

admin.site.register(user)
admin.site.register(problem)
admin.site.register(user_log)

# Register your models here.
