# Nodejs-AuthenticationServer

1.Passport là một module trong NodeJS, tích hợp với rất nhiều kiểu chứng thực (authenticate) phổ biến như: Basic, OpenID, OAuth, OAuth2, JWT .
<br><br>
2.JWT (Json Web Token) là một kiểu chứng thực (authenticate) đơn giản và an toàn thường được sử dụng cho REST API.
<br><br>

Module :
passport : cái này là chắc chắn rồi. Đây là cơ chế xác thực, sau này muốn tích hợp chiến lược nào thì cứ việc tích hợp vào (và trong này chính là JWT)
<br><br>
passport-jwt: tích hợp JWT vào Passport
<br><br>
jwt-simple: cái này dùng để mã hóa và giải mã token dạng JWT
<br><br>
secretOfKey: đây là 1 chuỗi gì đó tùy ý dùng làm mã khóa bí mật để mã hóa token.
<br><br>
Khai báo jwtStrategy: payload là thông tin sẽ được truyền đi mỗi khi user gửi token lên cho server.
<br>
