/* email로 조회 */
select ID,
       PROVIDER,
       PROVIDER_ID,
       PROFILE_IMAGE_URL,
       EMAIL,
       NAME,
       PASSWORD,
       to_char(STATUS) as STATUS
from KAKAO_USERS
where EMAIL = 'wooae1234@gmail.com'
  and status = 1;

/* id로 user조회 */
select ID,
       PROVIDER,
       PROVIDER_ID,
       PROFILE_IMAGE_URL,
       EMAIL,
       NAME,
       password,
       to_char(STATUS) as STATUS
from KAKAO_USERS
where ID = 'test8'
  and STATUS = 1;

/* user 삽입 (회원가입) */
insert into kakao_users
(ID,
 PROVIDER,
 NAME,
 PROFILE_IMAGE_URL,
 STATUS,
 CREATEAT,
 PROVIDER_ID,
 EMAIL,
 PASSWORD)
values ('test101',
        'local',
        '박현준',
        '',
        1,
        sysdate,
        '',
        'guswns3559@gmail.com',
        '$2a$10$HJ8qHI9HnlrZlFufEJfHruwIhb0iUqv.o5doaWBLAokOnDeQHp6fG');

/* refresh token 조회 */
select REFRESH_TOKEN
from KAKAO_USERS
where EMAIL = 'wooae1234@gmail.com'
  and STATUS = 1;

/* refresh token 업데이트 */
update
    KAKAO_USERS
set REFRESH_TOKEN = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ3b29hZTEyMzRAZ21haWwuY29tIiwicm9sZSI6IlJPTEVfVVNFUiIsImlhdCI6MTY2MzU2Nzc2MywiZXhwIjoxNjY0MTcyNTYzfQ.SHXEgujS4W7HO-DPEvqI-zKeH-1_fQhxUhflg9Uf7T1kgomDKLYHzxI_hdmSQcmasY_cISVQSU8ilFpqLEruuQ'
where EMAIL = 'wooae1234@gmail.com'
  and STATUS = 1;

/* user 삭제 ( 탈퇴 처리 ) */
update
    KAKAO_USERS
set STATUS   = 2,
    UPDATEAT = sysdate
where EMAIL = 'wooae1234@gmail.com';

/* user 프로필 업데이트 */
update
    KAKAO_USERS
set ID                   = 'guswns',
    NAME                 = '박',
    PROFILE_IMAGE_URL    = 'site',
    BACKGROUND_IMAGE_URL = 'site',
    UPDATEAT             = sysdate
where EMAIL = 'wooae1234@gmail.com';