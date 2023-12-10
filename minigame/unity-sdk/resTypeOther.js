export const ResTypeOther = {
    Stats: {
        lastAccessedTime: 'number',
        lastModifiedTime: 'number',
        mode: 'number',
        size: 'number',
    },
    TCPSocketOnMessageListenerResult: {
        localInfo: 'LocalInfo',
        message: 'arrayBuffer',
        remoteInfo: 'RemoteInfo',
    },
    LocalInfo: {
        address: 'string',
        family: 'string',
        port: 'number',
    },
    RemoteInfo: {
        address: 'string',
        family: 'string',
        port: 'number',
        size: 'number',
    },
};
