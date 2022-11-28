---------------- kakao_users ----------------
drop table kakao_users;
create table kakao_users
(

    email                varchar2(255),
    password             varchar2(255),
    id                   VARCHAR2(255),
    message              varchar2(3000),
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
    name      varchar2(3000),
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

create table kakao_chats
(
    chat_id   INTEGER,
    email     VARCHAR2(255),
    room_id   INTEGER,
    status    INTEGER,
    type      INTEGER,
    file_id   varchar2(300),
    content   varchar2(3000),
    createAt  DATE,
    updateAt  DATE,
    reserved1 VARCHAR2(300),
    reserved2 VARCHAR2(300),
    reserved3 VARCHAR2(300),
    constraint kakao_chats_pk primary key (room_id, email, chat_id)
);

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
values ('test1@naver.com', '', 'test1', '안녕', '박현준', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test2@naver.com', '', 'test8', '', '김태현', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test3@naver.com', '', 'test2', '반가워', '박인환', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test4@naver.com', '', 'test3', 'Hello world', '박홍식', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test5@naver.com', '', 'test4', 'Good night', '송유신', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test6@naver.com', '', 'test7', '동해물과 백두산이', '이창연', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test7@naver.com', '', 'test6', '이주성', '이주성', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test8@naver.com', '', 'test5', '친구1', '김우석', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test9@naver.com', '', 'test9', '친구2', '허효준', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test10@naver.com', '', 'test10', '친구3', '전한비', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test11@naver.com', '', 'test11', '친구4', '잔나비', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test12@naver.com', '', 'test12', '친구5', '아이유', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test13@naver.com', '', 'test13', '리오레', 'League of legends', 1, 'local', 1, sysdate);
insert into kakao_users(email, password, id, message, name, profile_image_url, provider, status, createAt)
values ('test14@naver.com', '', 'test14', '오버워치', 'Overwatch', 1, 'local', 1, sysdate);