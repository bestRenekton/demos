let ws = require('ws');            //引入websocket模块
let uuid = require('uuid');        //引入创建唯一id模块
let socketServer = ws.Server;
let wss = new socketServer({ port: 8888 });    //创建websocketServer实例监听8888端口
let clients = [];                //创建客户端列表，用于保存客户端及相关连接信息
let clientIndex = 0;            //由于默认nickname计数


console.log(`连接成功---8888`);
//监听连接
wss.on('connection', function (ws) {
    let client_uuid = uuid.v4();
    let nickname = `游客${clientIndex++}`;

    clients.push({
        "id": client_uuid,
        "ws": ws,
        "nickname": nickname
    });
    broadcastSend("messageSystem", `${nickname}上线`, nickname);

    /*监听消息*/
    ws.on('message', function (data) {
        let back = JSON.parse(data);
        let message = back.message;

        broadcastSend("messageUser", message, back.nickname || nickname);
    });
    /*监听断开连接*/
    ws.on('close', function () {
        closeSocket(client_uuid);
    })
})
/**
 * 关闭服务，从客户端监听列表删除
 */
function closeSocket(client_uuid) {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].id == client_uuid) {
            let name = clients[i]["nickname"];
            clients.splice(i, 1);
            broadcastSend("messageSystem", `${name}离线`, name);
        }
    }
}
/**
 * 广播所有客户端消息
 * @param  {String} type     广播方式(admin为系统消息，user为用户消息)
 * @param  {String} message  消息
 * @param  {String} nickname 用户昵称，广播方式为admin时可以不存在
 */
function broadcastSend(type, message, nickname) {
    clients.forEach(function (v, i) {
        if (v.ws.readyState === ws.OPEN) {
            v.ws.send(JSON.stringify({
                "type": type,
                "nickname": nickname,
                "message": message,
                "total": clients.length
            }));
        }
    })
}
