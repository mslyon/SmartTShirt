import asyncio
from aiohttp import web


# async def index_handler(request):
#     return web.FileResponse('./index.html')


async def ws_handler(request):
    ws = web.WebSocketResponse()
    await ws.prepare(request)
    request.app['ws_instances'].add(ws)

    async for msg in ws:
        if msg.type != web.WSMsgType.TEXT:
            break
        for websocket in request.app['ws_instances']:
            await websocket.send_str(msg.data)

    await ws.close()
    request.app['ws_instances'].remove(ws)
    return ws


def init_app():
    app = web.Application()
    # app.router.add_route('GET', '/', index_handler)
    app.router.add_route('GET', '/ws', ws_handler)
    app['ws_instances'] = set()
    return app


if __name__ == '__main__':
    web.run_app(init_app(), port=8090)