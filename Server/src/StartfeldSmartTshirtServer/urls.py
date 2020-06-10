from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path
import profiles.urls
import accounts.urls
from . import views

# Personalized admin site settings like title and header
admin.site.site_title = 'Startfeld Smart T-shirt Server Site Admin'
admin.site.site_header = 'Startfeld Smart T-shirt Server Administration'

urlpatterns = [
    path('', views.HomePage.as_view(), name='home'),
    path('register/', views.register, name='register'),
    path('laufschrift/', views.LaufschriftPage.as_view(), name='laufschrift'),
    path('sensors/', views.SensorsPage.as_view(), name='sensors'),
    path('graph/', views.GraphPage.as_view(), name='graph'),
    path('blockly/', views.BlocklyPage.as_view(), name='blockly'),
    path('turtle/', views.TurtlePage.as_view(), name='turtle'),
    path('show_device/', views.show_device, name='show_device'),
    path('save_block/', views.save_block, name='save_block'),
    path('delete_block/', views.delete_block, name='delete_block'),
    path('load_block/', views.load_block, name='load_block'),
    path('load_last/', views.load_last, name='load_last'),
    path('load_block_all/', views.load_block_all, name='load_block_all'),
    path('assign/<str:uuid>/', views.assign_to_user, name='assign_to_user'),
    path('delete_device/<str:uuid>/', views.delete_device, name='delete_device'),
    path('assign_device/<str:uuid>/<int:user_id>/', views.assign_device, name='assign_device'),
    path('unassign_device/<int:device_id>/', views.unassign_device, name='unassign_device'),
    path('assign/', views.assign, name='assign'),
    path('users/', include(profiles.urls)),
    path('admin/', admin.site.urls),
    path('', include(accounts.urls)),
]

# User-uploaded files like profile pics need to be served in development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Include django debug toolbar if DEBUG is on
if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [
        path('__debug__/', include(debug_toolbar.urls)),
    ]
