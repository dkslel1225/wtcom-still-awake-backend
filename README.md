# 구현할 기능 목록

### 유저 정보 req --> 유저 정보 res, 전체 유저에게 activated rooms 정보 전송

- 미완료
  - 소켓 아이디 만들어서 반영 필요함
- 체크리스트
  - available rooms 목록 업데이트, activated rooms 목록 업데이트 (배열)
  - 내가 들어갈수 있는지: available rooms . find(myroom)
  - 만석: !available rooms (빈 배열)

### 유저 연결이 끊긴 경우(브라우저를 닫은 경우)

- available rooms 목록 업데이트, activated rooms 목록 업데이트 (배열)
- (registered) 목록에서 해당 유저 관련 데이터 삭제, 방을 기준으로 찾는게 빠를듯..

### 실시간 접속자 확인

- n/28

### 데이터 구조

registered는 Host로 키 이름 바꾸기

```json
{
  "availableRooms": [
    101, 102, 103, 104, 105, 106, 107, 201, 202, 203, 204, 205, 206, 207, 301,
    302, 303, 304, 305, 306, 307, 401, 402, 403, 404, 405, 406, 407
  ],
  "activatedRooms": [304],
  "registered": [
    {
      "room": 304,
      "user": {
        "name": "Anonymous",
        "job": "No Job",
        "socketId": "xyz"
      }
    }
  ],
  "guests": []
}
```
