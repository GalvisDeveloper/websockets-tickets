
import { Server } from 'http';
import { WebSocket, WebSocketServer } from 'ws';


interface Options {
    path?: string;
    server: Server;
}

export class WssService {
    private static _instance: WssService;
    private wss: WebSocketServer;

    private constructor(options: Options) {
        const { server, path = '/ws' } = options;

        this.wss = new WebSocketServer({ server, path });
        this.start();
    }

    static get instance(): WssService {
        if (!WssService._instance) {
            throw new Error('WssService not initialized');
        }

        return WssService._instance;
    }

    static initWss = (options: Options) => {
        if (!WssService._instance) {
            WssService._instance = new WssService(options);
        }
    }


    public start() {
        this.wss.on('connection', (ws: WebSocket) => {
            // ws.on('message', (message) => {
            //     console.log('received: %s', message);
            // });

            ws.on('close', () => {
                console.log('Client disconnected');
            });
        });
    }
}