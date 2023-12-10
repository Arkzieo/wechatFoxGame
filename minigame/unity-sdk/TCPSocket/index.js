import moduleHelper from '../module-helper';
import { formatJsonStr, formatResponseNew, uid, onEventCallback, offEventCallback, getListObject } from '../utils';
const TCPSocketList = {};
const wxTCPSocketBindWifiList = {};
const wxTCPSocketCloseList = {};
const wxTCPSocketConnectList = {};
const wxTCPSocketErrorList = {};
const wxTCPSocketMessageList = {};
const getTCPSocketObject = getListObject(TCPSocketList, 'TCPSocket');
function WX_CreateTCPSocket() {
    const obj = wx.createTCPSocket();
    const key = uid();
    TCPSocketList[key] = obj;
    return key;
}
function WX_TCPSocketBindWifi(id, option) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.bindWifi(formatJsonStr(option));
}
function WX_TCPSocketClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.close();
}
function WX_TCPSocketConnect(id, option) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.connect(formatJsonStr(option));
}
function WX_TCPSocketWrite(id, data) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    obj.write(formatJsonStr(data, 'string|arrayBuffer'));
}
function WX_TCPSocketOffBindWifi(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(wxTCPSocketBindWifiList, (v) => {
        obj.offBindWifi(v);
    }, id);
}
function WX_TCPSocketOffClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(wxTCPSocketCloseList, (v) => {
        obj.offClose(v);
    }, id);
}
function WX_TCPSocketOffConnect(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(wxTCPSocketConnectList, (v) => {
        obj.offConnect(v);
    }, id);
}
function WX_TCPSocketOffError(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(wxTCPSocketErrorList, (v) => {
        obj.offError(v);
    }, id);
}
function WX_TCPSocketOffMessage(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    offEventCallback(wxTCPSocketMessageList, (v) => {
        obj.offMessage(v);
    }, id);
}
function WX_TCPSocketOnBindWifi(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(wxTCPSocketBindWifiList, '_TCPSocketOnBindWifiCallback', id, id);
    obj.onBindWifi(callback);
}
function WX_TCPSocketOnClose(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(wxTCPSocketCloseList, '_TCPSocketOnCloseCallback', id, id);
    obj.onClose(callback);
}
function WX_TCPSocketOnConnect(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(wxTCPSocketConnectList, '_TCPSocketOnConnectCallback', id, id);
    obj.onConnect(callback);
}
function WX_TCPSocketOnError(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    const callback = onEventCallback(wxTCPSocketErrorList, '_TCPSocketOnErrorCallback', id, id);
    obj.onError(callback);
}
function WX_TCPSocketOnMessage(id) {
    const obj = getTCPSocketObject(id);
    if (!obj) {
        return;
    }
    if (!wxTCPSocketMessageList[id]) {
        wxTCPSocketMessageList[id] = [];
    }
    const callback = (res) => {
        formatResponseNew('TCPSocketOnMessageListenerResult', res);
        const resStr = JSON.stringify({
            callbackId: id,
            res: JSON.stringify(res),
        });
        moduleHelper.send('_TCPSocketOnMessageCallback', resStr);
    };
    wxTCPSocketMessageList[id].push(callback);
    obj.onMessage(callback);
}
export default {
    WX_CreateTCPSocket,
    WX_TCPSocketBindWifi,
    WX_TCPSocketClose,
    WX_TCPSocketConnect,
    WX_TCPSocketWrite,
    WX_TCPSocketOffBindWifi,
    WX_TCPSocketOffClose,
    WX_TCPSocketOffConnect,
    WX_TCPSocketOffError,
    WX_TCPSocketOffMessage,
    WX_TCPSocketOnBindWifi,
    WX_TCPSocketOnClose,
    WX_TCPSocketOnConnect,
    WX_TCPSocketOnError,
    WX_TCPSocketOnMessage,
};
