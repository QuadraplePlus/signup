# signup

시험 제출용 서버

# 이용방법

## 회원가입 (신규 유저 등록)
### 요청
>[POST] /users/signup

전달값 
<pre>
{
  'id':'honggildong'.
  'password':'hong1234',
  'nickname':'슈퍼맨'
}
</pre>
### 결과

#### 성공
<pre>
{
  '_id':'1234567890abc',
  'id':'honggildong',
  'password':'25dCJXxsGAjFFWMW6FAKtrtdcPciFKz1qbgO2cT2YLQahe3ztzvYYUrnLCmcOa6cemEIjRAaIMKV9KqxqkDmoA==',
  'name':'슈퍼맨'
}
</pre>
#### 실패
<pre>
{
  'message':'400 bad request'
}
</pre>
