---------------- kakao_users ----------------
drop table kakao_users;
create table kakao_users
(

    email                varchar2(255),
    password             varchar2(255),
    id                   VARCHAR2(255),
    message              varchar2(255),
    name                 VARCHAR2(50),
    profile_image_url    VARCHAR2(255),
    background_image_url VARCHAR2(255),
    provider             VARCHAR2(20),
    provider_id          VARCHAR2(20),
    refresh_token        VARCHAR2(255),
    status               INTEGER,
    createAt             DATE,
    updateAt             DATE,
    reserved1            VARCHAR2(300),
    reserved2            VARCHAR2(300),
    reserved3            VARCHAR2(300),
    constraint kakao_users_pk primary key (email),
    constraint kakao_users_unique unique (id)
);

---------------- kakao_friends ----------------
drop table kakao_friends;
create table kakao_friends
(
    from_id   varchar2(255),
    to_id     varchar2(255),
    nickname  varchar2(50),
    status    INTEGER,
    createAt  DATE,
    updateAt  DATE,
    reserved1 VARCHAR2(300),
    reserved2 VARCHAR2(300),
    reserved3 VARCHAR2(300),
    constraint kakao_friends_pk primary key (to_id, from_id)
);


---------------- kakao_rooms ----------------
drop table kakao_rooms;
drop sequence kakao_rooms_seq;

create table kakao_rooms
(
    room_id   INTEGER,
    name      varchar2(50),
    type      INTEGER,
    status    INTEGER,
    createAt  DATE,
    updateAt  DATE,
    reserved1 VARCHAR2(300),
    reserved2 VARCHAR2(300),
    reserved3 VARCHAR2(300),
    constraint kakao_rooms_pk primary key (room_id)
);
create sequence kakao_rooms_seq start with 1 increment by 1 nocycle nocache;


---------------- kakao_join_users ----------------
drop table kakao_join_users;

create table kakao_join_users
(
    email     varchar2(255),
    room_id   INTEGER,
    status    INTEGER,
    createAt  DATE,
    updateAt  DATE,
    reserved1 VARCHAR2(300),
    reserved2 VARCHAR2(300),
    reserved3 VARCHAR2(300),
    constraint kakao_join_users_pk primary key (room_id, email)
);


---------------- kakao_chats ----------------
drop table kakao_chats;
drop sequence kakao_chats_seq;

create table kakao_chats
(
    chat_id   INTEGER,
    email     VARCHAR2(255),
    room_id   INTEGER,
    status    INTEGER,
    type      INTEGER,
    file_id   varchar2(300),
    content   varchar2(300),
    createAt  DATE,
    updateAt  DATE,
    reserved1 VARCHAR2(300),
    reserved2 VARCHAR2(300),
    reserved3 VARCHAR2(300),
    constraint kakao_chats_pk primary key (room_id, email, chat_id)
);
create sequence kakao_chats_seq start with 1 increment by 1 nocycle nocache;


---------------- kakao_read_users ----------------
drop table kakao_read_users;
create table kakao_read_users
(
    email     varchar2(255),
    room_id   INTEGER,
    chat_id   INTEGER,
    createAt  DATE,
    reserved1 varchar2(300),
    reserved2 varchar2(300),
    reserved3 varchar2(300),
    constraint kakao_read_users_pk primary key (room_id, email)
);


---------------- kakao_files ----------------
drop table kakao_files;

create table kakao_files
(
    file_id       INTEGER,
    email         VARCHAR2(266),
    original_name VARCHAR2(260),
    original_ext  VARCHAR2(8),
    createAt      date,
    reserved1     VARCHAR2(300),
    reserved2     VARCHAR2(300),
    reserved3     VARCHAR2(300),
    constraint kakao_files_pk primary key (email, file_id)
);


-- dummy test
--     chat_id   INTEGER,
--     email     VARCHAR2(255),
--     room_id   INTEGER,
--     status    INTEGER,
--     type      INTEGER,
--     file_id   varchar2(300),
--     content   varchar2(300),
--     createAt  DATE,
INSERT INTO kakao_chats(chat_id, email, room_id, status, type, content)
values (kakao_chats_seq.nextval, 'y2010214@naver.com', 3, 1, 2, '');
INSERT INTO kakao_chats(chat_id, email, room_id, status, type, content)
values (kakao_chats_seq.nextval, 'y2010213@naver.com', 3, 1, 2, '');

INSERT INTO kakao_chats(chat_id, email, room_id, status, type, content)
values (kakao_chats_seq.nextval, 'y2010213@naver.com', 3, 1, 1, '�ȳ��ϼ���');
commit;

INSERT INTO KAKAO_JOIN_USERS(EMAIL, ROOM_ID, STATUS, CREATEAT)
VALUES ('y2010214@naver.com', 4, 1, SYSDATE);
INSERT INTO KAKAO_JOIN_USERS(EMAIL, ROOM_ID, STATUS, CREATEAT)
VALUES ('y2010213@naver.com', 4, 1, SYSDATE);
INSERT INTO KAKAO_JOIN_USERS(EMAIL, ROOM_ID, STATUS, CREATEAT)
VALUES ('y2010212@naver.com', 4, 1, SYSDATE);
commit;

INSERT INTO KAKAO_READ_USERS(email, room_id, chat_id, createAt)
values ('y2010213@naver.com', 3, 2, sysdate);
INSERT INTO KAKAO_READ_USERS(email, room_id, chat_id, createAt)
values ('y2010214@naver.com', 3, 2, sysdate);
commit;

select A.*
from kakao_rooms A
WHERE type = '1'
  AND EXISTS(select 1 from kakao_join_users B where A.ROOM_ID = B.ROOM_ID AND email = 'test2')
  AND EXISTS(select 1 from kakao_join_users B where A.ROOM_ID = B.ROOM_ID AND email = 'test1');


insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010212@naver.com', '', 'test1', '안녕', '박현준', 1, 'local', 1, sysdate);


insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010210@naver.com', '', 'test8', 'hello world', '김태현', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010211@naver.com', '', 'test2', 'fps game', '박인환', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010213@naver.com', '', 'test3', 'byungsin', '박홍신', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010214@naver.com', '', 'test4', 'you', '송유신', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010215@naver.com', '', 'test7', '좋은 날', '이창연', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010216@naver.com', '', 'test6', '병신', '이주성', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('y2010217@naver.com', '', 'test5', '친구1', '김우석', 1, 'local', 1, sysdate);

insert into kakao_chats (chat_id, email, room_id, status, type, file_id, content, createAt)
values (KAKAO_CHATS_SEQ.nextval, 'ury0530@naver.com', 1, 1, 1, null, '더미 데이터1', sysdate);
insert into kakao_chats (chat_id, email, room_id, status, type, file_id, content, createAt)
values (KAKAO_CHATS_SEQ.nextval, 'ury0530@naver.com', 1, 1, 1, null, '더미 데이터2', sysdate);
insert into kakao_chats (chat_id, email, room_id, status, type, file_id, content, createAt)
values (KAKAO_CHATS_SEQ.nextval, 'y2010212@naver.com', 1, 1, 1, null, '더미 데이터3', sysdate);


WITH CUTOFF_RS AS (select FR.*,
                          case
                              when (select count(*)
                                    from kakao_friends
                                    where STATUS = 2

                                      AND from_id = FR.from_id
                                      AND to_id = FR.to_id) <= 0 then '1'
                              else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where from_id = 'ury0530@naver.com')


select C.room_id                                                      as ROOM_ID,
       nvl(C.NAME, '')                                                as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "name" : "' || nvl(DECODE(E.CUTOFF_RS, 1, E.nickname, null), F.NAME) || '",' ||
                   ' "profileImageUrl" : "' || F.profile_image_url || '",' ||
                   ' "message" : "' || DECODE(E.CUTOFF_RS, 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "status" : "' || NVL(E.status, 0) || '"' ||
                   '}', ', ')
                   within group ( order by E.nickname, F.NAME) || ']' as USERS,
       C.type                                                         as ROOM_TYPE,
       count(D.EMAIL)                                                 as JOIN_USER_CNT,
       DECODE(G.CHAT_STATUS, 1, G.CHAT_CONTENT, null)                 as CHAT_CONTENT,
       G.CHAT_TYPE,
       G.CHAT_STATUS,
       to_char(G.CHAT_CREATEAT, 'YYYY-MM-DD HH24:MI:SS')              as CHAT_CREATEAT,
       to_char(C.CREATEAT, 'YYYY-MM-DD HH24:MI:SS')                   as ROOM_CREATEAT,
       (select count(*)
        from kakao_chats G
        where G.room_id = C.room_Id
          and G.CHAT_ID > (select chat_id
                           from KAKAO_READ_USERS
                           where room_id = G.room_id
                             and EMAIL = 'ury0530@naver.com'
                             and status in (1, 2)))                   as UNREAD_CNT
from kakao_join_users B
         join kakao_rooms C
              on B.ROOM_ID = C.ROOM_ID
         left outer join (select E.ROOM_ID,
                                 max(E.CONTENT) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_CONTENT,
                                 max(E.type) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_TYPE,
                                 max(E.STATUS) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_STATUS,
                                 max(E.CREATEAT) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_CREATEAT
                          from KAKAO_CHATS E
                          where E.TYPE in (1, 2)
                            and E.CREATEAT >= (select NVL(B.CREATEAT, sysdate)
                                               from KAKAO_READ_USERS B
                                               where B.EMAIL = 'ury0530@naver.com'
                                                 and B.ROOM_ID = E.ROOM_ID)
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'ury0530@naver.com'
  and G.room_id is not null
  and B.STATUS = 1
  and D.STATUS = 1
group by C.ROOM_ID,
         C.NAME,
         C.TYPE,
         C.CREATEAT,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT
order by CHAT_CREATEAT desc


-- 수정 본
select *
from (select a.chat_id,
             a.room_id,
             a.email,
             DECODE(A.STATUS, '1', A.CONTENT, null) as content,
             a.status,
             a.type,
             a.createAt,
             'true'                                 as sync
      from (select A.chat_id,
                   A.ROOM_ID,
                   A.content,
                   A.EMAIL,
                   A.status,
                   A.type,
                   A.createAt --sub start
            from kakao_chats A
            where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                                 from KAKAO_READ_USERS B
                                 where B.EMAIL = 'ury0530@naver.com'
                                   and B.ROOM_ID = A.ROOM_ID)
              and A.room_id = '1'
              and A.CHAT_ID < '9999999999999') A
      order by chat_id desc)
where rownum <= 30

select * from kakao_read_users where room_id = '57';


WITH CUTOFF_RS AS (select FR.*,
                          case when (select count(*)
                                     from kakao_friends
                                     where STATUS = 2

                                       AND from_id = FR.from_id
                                       AND to_id = FR.to_id

                                    ) <= 0 then '1'
                               else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where

                           from_id = 'ury0530@naver.com')


select C.room_id as ROOM_ID,
       nvl(C.NAME, '') as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "name" : "' || nvl(DECODE(E.CUTOFF_RS, 1, E.nickname, null), F.NAME) || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "message" : "' || DECODE(E.CUTOFF_RS, 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "profileImageUrl" : "' || F.profile_image_url || '",' ||
                   ' "status" : "' || NVL(E.status, 0) || '"' ||
                   '}', ', ')
                   within group ( order by E.nickname, F.NAME) || ']' as USERS,
       C.type as ROOM_TYPE,
       count(D.EMAIL) as JOIN_USER_CNT,
       DECODE(G.CHAT_STATUS, 1, G.CHAT_CONTENT, null) as CHAT_CONTENT,
       NVL(G.CHAT_TYPE, null) AS CHAT_TYPE,
       NVL(G.CHAT_STATUS, null) AS CHAT_STATUS,
       NVL2(G.CHAT_CREATEAT, to_char(G.CHAT_CREATEAT, 'YYYY-MM-DD HH24:MI:SS'),null) as CHAT_CREATEAT,
       to_char(C.CREATEAT, 'YYYY-MM-DD HH24:MI:SS') as ROOM_CREATEAT
from kakao_join_users B
         join kakao_rooms C
              on B.ROOM_ID = C.ROOM_ID
         left outer join (select E.ROOM_ID,
                                 max (E.CONTENT) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_CONTENT, max (E.type) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_TYPE, max (E.STATUS) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_STATUS, max (E.CREATEAT) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_CREATEAT
                          from KAKAO_CHATS E
                          where E.TYPE in (1, 2)
                            and E.CREATEAT >= (select NVL(B.CREATEAT, sysdate)
                                               from KAKAO_READ_USERS B
                                               where B.EMAIL = 'ury0530@naver.com'
                                                 and B.ROOM_ID = E.ROOM_ID)
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'ury0530@naver.com'
  and C.ROOM_ID = '10'
  and B.STATUS = 1
  and D.STATUS = 1
group by C.ROOM_ID,
         C.NAME,
         C.TYPE,
         C.CREATEAT,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT;

WITH CUTOFF_RS AS (select FR.*,
                          case when (select count(*)
                                     from kakao_friends
                                     where STATUS = 2

                                       AND from_id = FR.from_id
                                       AND to_id = FR.to_id

                                    ) <= 0 then '1'
                               else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where

                           from_id = 'y2010210@naver.com')


select C.room_id as ROOM_ID,
       nvl(C.NAME, '') as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "name" : "' || nvl(DECODE(E.CUTOFF_RS, 1, E.nickname, null), F.NAME) || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "message" : "' || DECODE(E.CUTOFF_RS, 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "profileImageUrl" : "' || F.profile_image_url || '",' ||
                   ' "status" : "' || NVL(E.status, 0) || '"' ||
                   '}', ', ')
                   within group ( order by E.nickname, F.NAME) || ']' as USERS,
       C.type as ROOM_TYPE,
       count(D.EMAIL) as JOIN_USER_CNT,
       DECODE(G.CHAT_STATUS, 1, G.CHAT_CONTENT, null) as CHAT_CONTENT,
       NVL(G.CHAT_TYPE, null) AS CHAT_TYPE,
       NVL(G.CHAT_STATUS, null) AS CHAT_STATUS,
       NVL2(G.CHAT_CREATEAT, to_char(G.CHAT_CREATEAT, 'YYYY-MM-DD HH24:MI:SS'),null) as CHAT_CREATEAT,
       to_char(C.CREATEAT, 'YYYY-MM-DD HH24:MI:SS') as ROOM_CREATEAT
from kakao_join_users B
         join kakao_rooms C
              on B.ROOM_ID = C.ROOM_ID
         left outer join (select E.ROOM_ID,
                                 max (E.CONTENT) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_CONTENT, max (E.type) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_TYPE, max (E.STATUS) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_STATUS, max (E.CREATEAT) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_CREATEAT
                          from KAKAO_CHATS E
                          where E.TYPE in (1, 2)
                            and E.CREATEAT >= (select NVL(B.CREATEAT, sysdate)
                                               from KAKAO_READ_USERS B
                                               where B.EMAIL = 'y2010210@naver.com'
                                                 and B.ROOM_ID = E.ROOM_ID)
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'y2010210@naver.com'
  and C.ROOM_ID = '10'
  and B.STATUS = 1
  and D.STATUS = 1
group by C.ROOM_ID,
         C.NAME,
         C.TYPE,
         C.CREATEAT,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT;


WITH CUTOFF_RS AS (select FR.*,
                          case when (select count(*)
                                     from kakao_friends
                                     where STATUS = 2

                                       AND from_id =FR.to_id
                                       AND to_id = FR.from_id

                                    ) <= 0 then '1'
                               else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where from_id = '')
select C.room_id as ROOM_ID,
       nvl(C.NAME, '') as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "name" : "' || nvl(DECODE(E.CUTOFF_RS, 1, E.nickname, null), F.NAME) || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "message" : "' || DECODE(E.CUTOFF_RS, 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "profileImageUrl" : "' || DECODE(E.CUTOFF_RS, 1, F.profile_image_url, null) || '",' ||
                   ' "status" : "' || NVL(E.status, 0) || '"' ||
                   '}', ', ')
                   within group ( order by E.nickname, F.NAME) || ']' as USERS,
       C.type as ROOM_TYPE,
       count(D.EMAIL) as JOIN_USER_CNT,
       DECODE(G.CHAT_STATUS, 1, G.CHAT_CONTENT, null) as CHAT_CONTENT,
       NVL(G.CHAT_TYPE, null) AS CHAT_TYPE,
       NVL(G.CHAT_STATUS, null) AS CHAT_STATUS,
       NVL2(G.CHAT_CREATEAT, to_char(G.CHAT_CREATEAT, 'YYYY-MM-DD HH24:MI:SS'),null) as CHAT_CREATEAT,
       to_char(C.CREATEAT, 'YYYY-MM-DD HH24:MI:SS') as ROOM_CREATEAT
from kakao_join_users B
         join kakao_rooms C
              on B.ROOM_ID = C.ROOM_ID
         left outer join (select E.ROOM_ID,
                                 max (E.CONTENT) keep (
                                     DENSE_RANK last
                                     order by
                                         E.CREATEAT,
                                         E.CHAT_ID
                                     ) CHAT_CONTENT, max (E.type) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_TYPE, max (E.STATUS) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_STATUS, max (E.CREATEAT) keep (
        DENSE_RANK last
        order by
            E.CREATEAT,
            E.CHAT_ID
        ) CHAT_CREATEAT
                          from KAKAO_CHATS E
                          where E.TYPE in (1, 2)
                            and E.CREATEAT >= (select NVL(B.CREATEAT, sysdate)
                                               from KAKAO_READ_USERS B
                                               where B.EMAIL = 'y2010221@naver.com'
                                                 and B.ROOM_ID = E.ROOM_ID)
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'y2010221@naver.com'
  and C.ROOM_ID = '55'
  and B.STATUS = 1
  and D.STATUS = 1
group by C.ROOM_ID,
         C.NAME,
         C.TYPE,
         C.CREATEAT,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT