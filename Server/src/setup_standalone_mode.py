import os
import sys
import django


if __name__ == '__main__':
    os.environ['DJANGO_SETTINGS_MODULE'] = 'StartfeldSmartTshirtServer.settings.development'
    django.setup()

    from profiles.models import Profile
    from StartfeldSmartTshirtServer.models import DeviceInfo
    from StartfeldSmartTshirtServer.apps import get_ip
    from django.contrib.auth import get_user_model

    uuid = sys.argv[1]

    User = get_user_model()
    user = User.objects.create_user(name='Local', email='local@local.com',
                                    password='12345')
    profile = Profile(user=user)
    device = DeviceInfo.objects.create(uuid=uuid)
    device.last_ip = get_ip()
    device.save()
    profile.assigned_device = device
    profile.save()
