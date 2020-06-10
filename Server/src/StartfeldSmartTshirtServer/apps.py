import os
import socket
import ipaddress
import zeroconf
from netifaces import interfaces, ifaddresses, AF_INET
from django.apps import AppConfig


def get_ip():
    adresses = []
    for iface_name in interfaces():
        default = [{'addr': 'No IP addr'}]
        adresses.extend([i['addr'] for i in ifaddresses(iface_name).setdefault(AF_INET, default)])
    for address in adresses:
        addr = ipaddress.IPv4Address(address)
        if addr.is_private and not addr.is_loopback:
            return address


def setup_zeroconf_service():
    print('Zeroconf init...')

    ip = get_ip()
    info = zeroconf.ServiceInfo('_tshirt-server._tcp.local.', 'server._tshirt-server._tcp.local.',
                                socket.inet_aton(ip), 8080, 0, 0, {})
    conf = zeroconf.Zeroconf()
    conf.register_service(info)


class TshirtAppConfig(AppConfig):
    name = 'StartfeldSmartTshirtServer'
    verbose_name = 'StartfeldSmartTshirtServer'

    def ready(self):
        if os.environ.get('NO_ZEROCONF', False):
            return
        setup_zeroconf_service()
