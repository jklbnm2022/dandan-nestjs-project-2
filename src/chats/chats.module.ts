import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsGateway } from './chats.gateway';
import { Chatting, ChattingSchema } from './models/chatting.model';
import { Socket as SocketModel, SocketSchema } from './models/sockets.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: SocketModel.name, schema: SocketSchema },
    ]),
  ],
  providers: [ChatsGateway],
  exports: [ChatsGateway],
})
export class ChatsModule {}
