# readme

## HTTP vs Socket

- HTTP 연결방식: 단방향. '단'이란, 클라이언트가 반드시 요청을 보내야 응답을 함.
- 그리고 클라이언트와의 '연결'을 기억 못함.

- 주식 예시

  - 모든 클라이언트에게도 다 알려줘야 한다면? HTTP는 서버에서 다른 클라이언트에게 푸시 못함.왜냐하면 서버를 기억 못하니까. 일단은 그래서 클라이언트에게 계속 클라이언트가 서버에 요청을 보냄. A가 매도를 하면 그걸 다른 클라이언트도 알려야 함. 그거 하려면 계속 클라이언트가 서버에 연결 요청해서. (폴링 방식)
  - 근데 그러기에 HTTP 는 너무 무겁고. 양방향은 아니다. 서버도 응답 게속해줘야해서 부하 걸리고.

- 소켓

  - 소켓: 입구, 콘센트
  - 넌 나 기억하고 있어야지.

- 클라이언트와 서버에 소켓이 붙어있음. 이 소켓은 콘센트 같은 것.
- 연결을 하면 서버는 그거 받아서 비즈니스 로직 수행함. 연결은 이미 되어있으므로 다른 곳에는 그거에 맞게 쏴주기만 하면 됨.
- event 발생 -> 로직에 따라 비즈니스 로직 시행.

`nest g ga chats`

- ga: gateway
  - gateway 를 통해 소켓 비즈니스 로직을 작성한다.

## socket

- socket.emit(event, data)
  - socket.on() : emit 으로 보내면 on 으로 받을 수 있다.
- 소켓은 각각 아이디를 가진다. 아이디는 연결 끊기기 전까지 유지된다. 아이디는 연결될때마다 (기본적으로) 바뀐다.

### lifecycle
- lifecycle hooks 3가지
  - OnGatewayInit: afterInit() 메소드 강제 구현. 서버 인스턴스를 인수로 사용.
  - OnGatewayConnection: handleConnection() 메소드 강제 구현. 특정 클라이언트 소켓 인스턴스를 인수로 사용.
  - OnGatewayDisconnect: handleDisconnect() 메소드 강제 구현. 특정 클라이언트 소켓 인스턴스를 인수로 사용.
- implements 로 WebSocketGateway 에 붙여서 구현(?)

## BroadCasting
- 서버에서 클라이언트로 알려줌.

## 이벤트 정의 및 설계
- 새로운 유저 등록 및 이벤트 입력
  - 다른 소켓 브로드캐스팅
- 나갔을 때
- 더 필요한 거: 채팅