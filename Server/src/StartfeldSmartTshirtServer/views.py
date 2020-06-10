import requests

from django.views import generic
from django.shortcuts import render, redirect
from django.http import HttpResponse, HttpResponseBadRequest, HttpResponseForbidden, JsonResponse
from .models import DeviceInfo, BlocklyBlock
from profiles.models import Profile
from django.views.decorators.csrf import csrf_exempt


class BasePage(generic.View):
    template_name = None

    def get(self, request):
        profile = Profile.objects.get(user_id=request.user.id)
        if not profile.assigned_device:
            return render(request, self.template_name)
        ip = profile.assigned_device.last_ip
        return render(request, self.template_name, {'device_ip': ip})


class HomePage(generic.TemplateView):
    template_name = 'home.html'


class LaufschriftPage(BasePage):
    template_name = 'laufschrift.html'


class SensorsPage(BasePage):
    template_name = 'sensors.html'


class GraphPage(BasePage):
    template_name = 'graph.html'

class TurtlePage(BasePage):
    template_name = 'turtle.html'

class BlocklyPage(BasePage):
    template_name = 'blockly.html'

    def get(self, request):
        profiles = Profile.objects.filter(assigned_device__isnull=False)
        context = {'profiles': profiles}
        profile = Profile.objects.get(user_id=request.user.id)
        if profile.assigned_device:
            context['device_ip'] = profile.assigned_device.last_ip
        return render(request, self.template_name, context)

@csrf_exempt
def save_block(request):
    profile = request.user.profile
    blid = request.POST.get('id', '')
    code = request.POST.get('code', '')
    desc = request.POST.get('desc', '')
    name = request.POST.get('name', '')
    studentclass = request.POST.get('studentclass', '')
    if blid:
        block = BlocklyBlock(id=blid, block_name=name, block_desc=desc, block_code=code, profile=profile, studentclass=studentclass)
    else:
        block = BlocklyBlock(block_name=name, block_desc=desc, block_code=code, profile=profile, studentclass=studentclass)
    block.save()
    return JsonResponse({})

def delete_block(request):
    profile = request.user.profile
    bid = request.GET.get('id', '')
    desc = request.GET.get('desc', '')
    name = request.GET.get('name', '')
    block = BlocklyBlock.objects.get(id=bid,block_name=name, block_desc=desc)
    block.delete()
    return JsonResponse({})


def load_block(request):
    blocks = BlocklyBlock.objects.all().filter(profile_id=request.user.profile).filter(block_active=True)
    data = []
    for block in blocks:
        user = block.profile.user.name if block.profile is not None else ''
        item = {'id':block.id, 'block_name': block.block_name, 'block_code': block.block_code,
                'block_desc': block.block_desc, 'user': user, 'studentclass': block.studentclass}
        data.append(item)
    return JsonResponse({'blocks': data})

def load_block_all(request):
    blocks = BlocklyBlock.objects.all().filter(block_active=True)
    data = []
    for block in blocks:
        user = block.profile.user.name if block.profile is not None else ''
        item = {'id':block.id, 'block_name': block.block_name, 'block_code': block.block_code,
                'block_desc': block.block_desc, 'user': user, 'studentclass': block.studentclass}
        data.append(item)
    return JsonResponse({'blocks': data})

def load_last(request):
    blocks = BlocklyBlock.objects.all().filter(profile_id=request.user.profile).filter(block_active=True).last()
    data = []
    # for block in blocks:
    user = blocks.profile.user.name if blocks.profile is not None else ''
    item = {'id':blocks.id, 'block_name': blocks.block_name, 'block_code': blocks.block_code,
            'block_desc': blocks.block_desc, 'user': user, 'studentclass': blocks.studentclass}
    data.append(item)
    return JsonResponse({'blocks': data})

def register(request):
    uuid = request.GET.get('uuid')
    ip = request.GET.get('local_ip')
    if not uuid or not ip:
        return HttpResponseBadRequest()
    dev, _created = DeviceInfo.objects.get_or_create(uuid=uuid)
    dev.last_ip = ip
    # Saving will refresh the time.
    dev.save()
    return HttpResponse()


def assign(request):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    context = {'devices': DeviceInfo.objects.all()}
    return render(request, 'assign.html', context)


def show_device(request):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    device_uuid = request.GET.get('uuid')
    if not device_uuid:
        return JsonResponse({'fail': 'No UUID supplied.'})
    info = DeviceInfo.objects.get(uuid=device_uuid)
    if not info:
        return JsonResponse({'fail': 'UUID not found in the database.'})
    addr = 'http://{}/identify'.format(info.last_ip)
    try:
        resp = requests.get(addr, params={'uuid': info.uuid})
    except Exception as err:
        msg = 'Cannot connect to device. Check if it is connected to network.'
        return JsonResponse({'fail': msg})
    if not resp.ok:
        msg = ('Error connecting to device. Device returned: {}. Try '
               'refreshing the page.'.format(resp.reason))
        return JsonResponse({'fail': msg})
    return JsonResponse({})


def assign_to_user(request, uuid):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    profiles = Profile.objects.filter(assigned_device__isnull=True)
    context = {'profiles': profiles, 'uuid': uuid}
    return render(request, 'assign_to.html', context)


def assign_device(request, uuid, user_id):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    device = DeviceInfo.objects.get(uuid=uuid)
    profile = Profile.objects.get(user_id=user_id)
    profile.assigned_device = device
    profile.save()
    return redirect('assign')


def _unassign_profiles(device):
    for profile in device.get_assigned_profiles():
        # Check if device is assigned, if so, unassign it first.
        try:
            profile.assigned_device = None
            profile.save()
        except Profile.DoesNotExist:
            pass


def unassign_device(request, device_id):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    device = DeviceInfo.objects.get(id=device_id)
    _unassign_profiles(device)
    return redirect('assign')


def delete_device(request, uuid):
    if not request.user.is_superuser:
        return HttpResponseForbidden('Permission denied.')
    device = DeviceInfo.objects.get(uuid=uuid)
    _unassign_profiles(device)
    device.delete()
    return redirect('assign')
