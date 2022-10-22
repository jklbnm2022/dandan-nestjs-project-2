import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  @Render('index') // views 아래에서 해당하는 파일을 찾아서 거기에 렌더링해줌.
  root() {
    return {message: 'Hello world!', data: { title: 'Chattings', copyright: 'park'}}
  }
}
