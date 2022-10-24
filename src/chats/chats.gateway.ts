import { Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Model } from 'mongoose';
import { Socket as SocketModel } from './models/sockets.model';
import { Chatting } from './models/chatting.model';
import e from 'express';

@WebSocketGateway({
  // endpoint
  namespace: '/chattings',
})
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {
    this.logger.log('constructor');
  }

  afterInit(server: any) {
    this.logger.log('init');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log('connect');
    this.logger.log(`connected: ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log('disconnect');

    // sockeit.id 를 받고
    const user = await this.socketModel.findOne({ id: socket.id });
    // sockets.model 에서 id === socket.id 인 user 가져옴

    if (user) {
      socket.broadcast.emit('disconnected_user', user.username);
      await user.delete();
    }

    // 해당 user 제거
    this.logger.log(`disconnected: ${socket.id} ${socket.nsp.name}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  @SubscribeMessage('new_user')
  async setNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // username 을 DB에 적재 - username 을 받고, sockets.model 에 username 이 있는지 중복 체크
    const isExist = await this.socketModel.exists({ username });
    console.log({ username });

    // 중복: 랜덤수 추가해서 username 으로 저장. - 랜덤 수 추가. id
    if (isExist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
      console.log({ username });
    }

    console.log({ username });

    await this.socketModel.create({
      id: socket.id,
      username,
    });

    // broadcasting
    socket.broadcast.emit('user_connected', username);
    return username;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ) {
    const user = await this.socketModel.findOne({ id: socket.id });
    // socket.id 받고 id === socket.id 인 user 가져옴
    // username 으로 전달

    await this.chattingModel.create({
      user,
      chat,
    });

    socket.broadcast.emit('new_chat', {
      chat,
      username: user.username,
    });
  }
}
