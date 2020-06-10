from django.contrib import admin

# Register your models here.
from .models import BlocklyBlock
from django.contrib.admin.helpers import ActionForm
from django import forms


class UpdateActionForm(ActionForm):
	studentclass = forms.CharField(required=False)

def update_class(modeladmin, request, queryset):
	studentclass = request.POST['studentclass']
	studentclass = str(studentclass)
	queryset.update(studentclass=studentclass)
update_class.short_description = 'Update class of selected rows'

def duplicate_event(modeladmin, request, queryset):
    for object in queryset:
        object.id = None
        object.studentclass = 'temp_class'
        object.save()
duplicate_event.short_description = "Duplicate selected record"

def all_blocks(modeladmin, request, queryset):
    for qs in queryset:
        print(qs.block_name)

def set_aclass(modeladmin, request, queryset):
    queryset.update(studentclass = 'Class A')

def active_block(modeladmin, request, queryset):
    queryset.update(block_active = True)
active_block.short_description = "Mark blocks as active"

def inactive_block(modeladmin, request, queryset):
    queryset.update(block_active = False)
inactive_block.short_description = "Mark blocks as inactive"

class BlockAdmin(admin.ModelAdmin):
    list_display = ('block_name', 'studentclass', 'profile', 'block_active')
    list_filter = ('studentclass',)
    action_form = UpdateActionForm
    actions = (update_class, duplicate_event, active_block, inactive_block)


admin.site.register(BlocklyBlock, BlockAdmin)
