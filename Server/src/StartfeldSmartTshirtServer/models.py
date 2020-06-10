from django.db import models
from profiles.models import Profile


class DeviceInfo(models.Model):
    uuid = models.CharField(max_length=100)
    last_registered = models.DateTimeField(auto_now=True)
    last_ip = models.GenericIPAddressField(null=True)

    def get_assigned_profiles(self):
        return Profile.objects.filter(assigned_device=self.id)

    def has_profile_assigned(self):
        return bool(self.get_assigned_profiles())

    def __str__(self):
        return "Device with UUID: {}". format(self.uuid)


class BlocklyBlock(models.Model):
    block_name = models.CharField(max_length=50)
    block_desc = models.CharField(max_length=200)
    block_code = models.TextField()
    studentclass = models.CharField(max_length=200, default='NULL')
    block_active = models.BooleanField(default=True)
    profile = models.ForeignKey('profiles.Profile',
                                models.SET_NULL, null=True,
                                related_name='profile')
