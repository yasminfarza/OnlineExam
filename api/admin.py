from django.contrib import admin

from .models import *

admin.site.register(Question)
admin.site.register(Option)
admin.site.register(Subject)
admin.site.register(Examination)
admin.site.register(QuestionSet)
admin.site.register(OptionSet)
admin.site.register(Assign)
