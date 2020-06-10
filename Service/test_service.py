import socket
import server
import zeroconf
import tornado
import tornado.web
import tornado.ioloop
import tornado.queues


class RegisterHandler(tornado.web.RequestHandler):
    async def get(self):
        uuid = self.get_argument('uuid', None)
        ip = self.get_argument('local_ip', None)
        assert uuid and ip
        tornado.ioloop.IOLoop.instance().stop()


def fail_test(queue):
    tornado.ioloop.IOLoop.instance().stop()
    queue.put('No service called!')


def test_zeroconf():
    ip = server.get_ip()
    info = zeroconf.ServiceInfo('_tshirt-server._tcp.local.', 'server._tshirt-server._tcp.local.',
                                socket.inet_aton(ip), 8085, 0, 0, {})
    conf = zeroconf.Zeroconf()
    conf.register_service(info)

    application = tornado.web.Application([
        (r'/register', RegisterHandler),
    ])
    err_queue = tornado.queues.Queue()
    http_server = tornado.httpserver.HTTPServer(application)
    http_server.listen(8085)
    tornado.ioloop.IOLoop.instance().call_later(3, fail_test, err_queue)
    tornado.ioloop.IOLoop.instance().start()
    if err_queue.qsize() > 0:
        msg = err_queue.get_nowait()
        raise ValueError(msg)
