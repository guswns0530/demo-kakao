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
values (kakao_chats_seq.nextval, 'y2010213@naver.com', 3, 1, 1, 'æ»≥Á«œººø‰');
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

-- start
with CUTOFF_RS as (select FR.*,
                          case
                              when (select count(*)
                                    from kakao_friends
                                    where STATUS = 2
                                      and from_id = FR.from_id
                                      and to_id = FR.to_id) <= 0 then '1'
                              else '2'
                              end as CUTOFF_RS
                   from kakao_friends FR
                   where from_id = 'y2010214@naver.com')
select C.room_id                                                       as ROOM_ID,
       '[' || nvl(C.NAME, LISTAGG(
                   '{' ||
                   ' ''name'' : ''' || nvl(DECODE(E.CUTOFF_RS, 1, E.nickname, null), F.NAME) || ''',' ||
                   ' ''email'' : ''' || D.EMAIL || ''',' ||
                   ' ''imageUrl'' : ''' || F.profile_image_url || '''' ||
                   '}', ', ')
                   within group ( order by E.nickname, F.NAME)) || ']' as USERS,
       count(D.EMAIL) + 1                                              as JOIN_USER_CNT,
       DECODE(G.CHAT_STATUS, 1, G.CHAT_CONTENT, null)                  as CHAT_CONTENT,
       to_char(G.CHAT_TYPE)                                            as CHAT_TYPE,
       to_char(G.CHAT_STATUS)                                          as CHAT_STATUS,
       G.CHAT_CREATEAT,
       (select count(*)
        from kakao_chats G
        where G.room_id = C.room_Id
          and G.CHAT_ID > (select chat_id
                           from KAKAO_READ_USERS
                           where room_id = G.room_id
                             and EMAIL = 'y2010214@naver.com'
                             and status in (1, 2)))                    as UNREAD_CNT
from kakao_join_users B
         join kakao_rooms C on B.ROOM_ID = C.ROOM_ID
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
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'y2010214@naver.com'
  and D.EMAIL != B.EMAIL
  and G.room_id is not null
group by C.ROOM_ID,
         C.NAME,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT
order by CHAT_CREATEAT desc;

