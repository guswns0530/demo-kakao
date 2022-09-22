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
drop sequence kakao_files_seq;

create table kakao_files
(
    file_id       INTEGER,
    email         VARCHAR2(266),
    file_name     VARCHAR2(260),
    original_name VARCHAR2(260),
    original_ext  VARCHAR2(8),
    createAt      date,
    reserved1     VARCHAR2(300),
    reserved2     VARCHAR2(300),
    reserved3     VARCHAR2(300),
    constraint kakao_files_pk primary key (email, file_id)
);
create sequence kakao_files_seq start with 1 increment by 1 nocycle nocache;
