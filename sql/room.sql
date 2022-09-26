/*create table kakao_rooms
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
);*/

-- 에러 있음 --

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
                   where from_id = 'y2010212@naver.com')

select A.ROOM_ID,
       nvl(A.NAME, LISTAGG(nvl(DECODE(C.CUTOFF_RS, 1, C.nickname, null), D.NAME), ', ') within group (
           order by
               C.nickname,
               D.NAME
           ))                                         as NAME,
       nvl(A.NAME, LISTAGG(D.EMAIL, ', ') within group (
           order by
               C.nickname,
               D.NAME
           ))                                         as USERID,
       LISTAGG(nvl(D.EMAIL, 'null'), ', ') within group
           (
           order by
               C.nickname,
               D.NAME
           )                                          as NAME,
       count(B.EMAIL) + 1                             as CNT,
       DECODE(E.CHAT_STATUS, 1, E.CHAT_CONTENT, null) as CHAT_CONTENT,
       E.CHAT_TYPE,
       E.CHAT_STATUS,
       E.CHAT_CREATEAT,
       sum((select count(*)
            from kakao_chats G
            where A.ROOM_ID = G.ROOM_ID
              and G.chat_id > F.chat_id))             as UNREAD_CNT
from kakao_rooms A
         left outer join (select E.ROOM_ID,
                      max(E.CONTENT) keep (
                          DENSE_RANK last
                          order by
                              E.CREATEAT
                          ) CHAT_CONTENT,
                      max(E.type) keep (
                          DENSE_RANK last
                          order by
                              E.CREATEAT
                          ) CHAT_TYPE,
                      max(E.STATUS) keep (
                          DENSE_RANK last
                          order by
                              E.CREATEAT
                          ) CHAT_STATUS,
                      max(E.CREATEAT) keep (
                          DENSE_RANK last
                          order by
                              E.CREATEAT
                          ) CHAT_CREATEAT
               from KAKAO_CHATS E
               group by E.ROOM_ID) E
              on A.ROOM_ID = E.ROOM_ID
         join kakao_join_users B on A.ROOM_ID = B.ROOM_ID
         left outer join CUTOFF_RS C on B.EMAIL = C.TO_ID
         left outer join kakao_users D on B.EMAIL = D.EMAIL
         join kakao_read_users F on A.ROOM_ID = F.ROOM_ID
    and B.EMAIL = F.EMAIL
where B.EMAIL != 'y2010212@naver.com'
group by A.ROOM_ID,
         A.NAME,
         E.CHAT_CONTENT,
         E.CHAT_TYPE,
         E.CHAT_STATUS,
         E.CHAT_CREATEAT
order by CHAT_CREATEAT asc;


-- 최종 --
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
                   where from_id = 'y2010212@naver.com')

select A.room_id                                                                       as ROOM_ID,
       nvl(A.NAME, LISTAGG(nvl(DECODE(C.CUTOFF_RS, 1, C.nickname, null), D.NAME),
                           ', ') within group ( order by C.nickname, D.NAME))          as ROOM_NAME,
       nvl(A.NAME, LISTAGG(D.EMAIL, ', ') within group ( order by C.nickname, D.NAME)) as EMAILS,
       count(B.EMAIL) + 1                                                              as JOIN_USER_CNT,
       DECODE(E.CHAT_STATUS, 1, E.CHAT_CONTENT, null)                                  as CHAT_CONTENT,
       E.CHAT_TYPE,
       E.CHAT_STATUS,
       E.CHAT_CREATEAT,
       (select count(*)
        from kakao_chats G
        where G.room_id = A.room_Id
          and G.CHAT_ID > (select chat_id
                           from KAKAO_READ_USERS
                           where room_id = G.room_id
                             and EMAIL = 'y2010212@naver.com'
                             and status in (1, 2)))                                    as UNREAD_CNT
from KAKAO_ROOMS A
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
               group by E.ROOM_ID) E on A.ROOM_ID = E.ROOM_ID
         join KAKAO_JOIN_USERS B on A.ROOM_ID = B.ROOM_ID
         left outer join CUTOFF_RS C on B.EMAIL = C.TO_ID
         left outer join KAKAO_USERS D on B.EMAIL = D.EMAIL
where B.EMAIL != 'y2010212@naver.com'
  and A.STATUS = 1
group by A.ROOM_ID,
         A.NAME,
         E.CHAT_CONTENT,
         E.CHAT_TYPE,
         E.CHAT_STATUS,
         E.CHAT_CREATEAT
order by CHAT_CREATEAT desc;


-- 방 생성 -> 후에 join_user insert *****
INSERT INTO KAKAO_ROOMS
    (ROOM_ID, NAME, TYPE, STATUS, CREATEAT)
VALUES (KAKAO_ROOMS_SEQ.NEXTVAL, '', 1, 1, SYSDATE);

commit;

-- 삭제 ( 필요 여부 )
-- update
--     KAKAO_ROOMS
-- set STATUS = 2
-- where ROOM_ID = ?;



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
                   where from_id = 'y2010212@naver.com')
select A.room_id                                                                       as ROOM_ID,
       nvl(A.NAME, LISTAGG(nvl(DECODE(C.CUTOFF_RS, 1, C.nickname, null), D.NAME),
                           ', ') within group ( order by C.nickname, D.NAME))          as ROOM_NAME,
       nvl(A.NAME, LISTAGG(D.EMAIL, ', ') within group ( order by C.nickname, D.NAME)) as EMAILS,
       count(B.EMAIL) + 1                                                              as JOIN_USER_CNT,
       DECODE(E.CHAT_STATUS, 1, E.CHAT_CONTENT, null)                                  as CHAT_CONTENT,
       E.CHAT_TYPE,
       E.CHAT_STATUS,
       E.CHAT_CREATEAT,
       (select count(*)
        from kakao_chats G
        where G.room_id = A.room_Id
          and G.CHAT_ID > (select chat_id
                           from KAKAO_READ_USERS
                           where room_id = G.room_id
                             and EMAIL = 'y2010212@naver.com'
                             and status in (1, 2)))                                    as UNREAD_CNT
from KAKAO_ROOMS A
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
                          group by E.ROOM_ID) E on A.ROOM_ID = E.ROOM_ID
         join KAKAO_JOIN_USERS B on A.ROOM_ID = B.ROOM_ID
         left outer join CUTOFF_RS C on B.EMAIL = C.TO_ID
         left outer join KAKAO_USERS D on B.EMAIL = D.EMAIL
where B.EMAIL != 'y2010212@naver.com'
  and A.STATUS = 1
group by A.ROOM_ID,
         A.NAME,
         E.CHAT_CONTENT,
         E.CHAT_TYPE,
         E.CHAT_STATUS,
         E.CHAT_CREATEAT
order by CHAT_CREATEAT desc;

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
                   where from_id = 'y2010212@naver.com')
select *
from KAKAO_ROOMS A
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
                          group by E.ROOM_ID) E on A.ROOM_ID = E.ROOM_ID
         join KAKAO_JOIN_USERS B on A.ROOM_ID = B.ROOM_ID
         left outer join CUTOFF_RS C on B.EMAIL = C.TO_ID
         left outer join KAKAO_USERS D on B.EMAIL = D.EMAIL
where B.EMAIL != 'y2010212@naver.com'
  and A.STATUS = 1;