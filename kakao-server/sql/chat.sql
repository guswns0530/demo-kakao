-- 유저 채팅 불러오기 Parameter( EMAIL, room_id )
with CUTOFF_RS as -- whit_start
         (select FR.*,
                 case
                     when (select count(*)
                           from kakao_friends
                           where STATUS = 2
                             and (
                                   (
                                               from_id = FR.to_id
                                           and to_id = FR.from_id
                                       )
                                   or (
                                               from_id = FR.from_id
                                           and to_id = FR.to_id
                                       )
                               ))
                         <= 0 then '1'
                     else '2'
                     end as CUTOFF_RS
          from kakao_friends FR
          where from_id = 'test1') -- whit_end

select A.USER_ID,
       A.NAME,
       DECODE(B.CUTOFF_RS, '1', A.PROVIDER, null)         as PROVIDER,
       DECODE(B.CUTOFF_RS, '1', B.NICKNAME, null)         as NICKNAME,
       DECODE(B.CUTOFF_RS, '1', A.PROFILE_IMAGE, null)    as PROFILE_IMAGE,
       DECODE(B.CUTOFF_RS, '1', A.BACKGROUND_IMAGE, null) as BACKGROUND_IMAGE,
       C.chat_id                                          as CHAT_ID,
       DECODE(C.status, '1', C.content, null)             as CONTENT,
       C.type                                             as type,
       C.seq                                              as SEQ,
       C.CREATEAT                                         as CHAT_CREATEAT
from (select chat_id,
             content,
             kakao_chats.EMAIL,
             kakao_chats.status                                        status,
             type,
             dense_rank() over (order by kakao_chats.createAt desc) as seq,
             kakao_chats.createAT --방안에 있는 모든 채팅
      from kakao_chats
               join kakao_join_users on kakao_chats.EMAIL = kakao_join_users.EMAIL
          and kakao_chats.room_id = kakao_join_users.room_id
      where kakao_chats.room_id = 1
        and kakao_chats.createAt >= (select createAt
                                     from kakao_join_users
                                     where room_id = 1
                                       and KAKAO_CHATS.EMAIL = 'y2010211@naver.com')
      order by kakao_chats.createAt desc) C
         join kakao_users A on c.EMAIL = A.EMAIL
         left outer join CUTOFF_RS B on B.to_id = A.EMAIL
where seq between 1 and 20;

-- 채팅 조회 ( 최종 ) --
-- with CUTOFF_RS as -- whit_start
--          (select FR.*,
--                  case
--                      when (select count(*)
--                            from kakao_friends
--                            where STATUS = 2
--                              and (
--                                    (
--                                                from_id = FR.to_id
--                                            and to_id = FR.from_id
--                                        )
--                                    or (
--                                                from_id = FR.from_id
--                                            and to_id = FR.to_id
--                                        )
--                                )) <= 0 then '1'
--                      else '2'
--                      end as CUTOFF_RS
--           from kakao_friends FR
--           where from_id = 'y2010214@naver.com') -- whit_end

select a.chat_id,
       a.EMAIL,
       DECODE(A.STATUS, '1', A.CONTENT, null) as CONTENT,
       a.status,
       a.type,
       a.seq,
       a.createAt
from (select A.chat_id,
             A.content,
             A.EMAIL,
             A.status,
             A.type,
             dense_rank() over (order by A.createAt desc) as seq,
             A.createAt --sub start
      from kakao_chats A
      where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                           from KAKAO_READ_USERS B
                           where B.EMAIL = 'y2010212@naver.com'
                             and B.ROOM_ID = A.ROOM_ID)
        and A.room_id = 46) A --sub end
     -- where seq >= 1
     --   and seq <= 20 -- start ~ endz
where A.CHAT_ID >= 1
order by seq,
         chat_id desc;

-- 채팅 삭제
update
    kakao_chats
set status = 2
where chat_id = ?;

-- 채팅 입력
insert into kakao_chats (chat_id,
                         EMAIL,
                         room_id,
                         content,
                         status,
                         type,
                         createAt)
values (KAKAO_CHATS_SEQ.nextval,
        조인 아이디,
        룸 아이디,
        컨텐트,
        1, -- 기본
        타입,
        sysdate);

-- 읽은 사람 조회
select chat_id
from kakao_read_users
where room_id = 46
order by chat_id desc;

select nvl(max(chat_id), 1) chatId
from kakao_chats
where room_id = 1;

select CHAT_ID,
       ROOM_ID,
       EMAIL,
       DECODE(STATUS, '1', CONTENT, null) as content,
       STATUS,
       TYPE,
       CREATEAT
from KAKAO_CHATS
where ROOM_ID = 46
  and EMAIL = 'y2010212@naver.com'
  and CHAT_ID = 4;


select CHAT_ID,
       ROOM_ID,
--                EMAIL,
       DECODE(STATUS, '1', CONTENT, null)         as CONTENT,
       STATUS,
       TYPE,
       to_char(CREATEAT, 'YYYY-MM-DD HH24:MI:SS') as CREATEAT
from KAKAO_CHATS
where ROOM_ID = '46'
  and EMAIL = 'y2010212@naver.com'
  and CHAT_ID = '4';

select CHAT_ID,
       ROOM_ID,
       EMAIL,
       DECODE(STATUS, '1', CONTENT, null)         as CONTENT,
       STATUS,
       TYPE,
       to_char(CREATEAT, 'YYYY-MM-DD HH24:MI:SS') as CREATEAT
from KAKAO_CHATS
where ROOM_ID = '46'
  --and EMAIL = 'y2010212@naver.com'
  and CHAT_ID = '4';

update KAKAO_CHATS
set STATUS = 2
where CHAT_ID = ''
  and ROOM_ID = ''
  and EMAIL = ''


update KAKAO_READ_USERS
set CHAT_ID = (select max(KAKAO_CHATS.ROOM_ID) from KAKAO_CHATS where KAKAO_CHATS.ROOM_ID = #{roomId})
where ROOM_ID = ''
  and EMAIL = '';

update KAKAO_READ_USERS
set CHAT_ID = (select max(KAKAO_CHATS.CHAT_ID) from KAKAO_CHATS where KAKAO_CHATS.ROOM_ID = '46')
where ROOM_ID = '46'
  and EMAIL = 'y2010212@naver.com'

select a.chat_id,
       a.ROOM_ID,
       a.email,
       DECODE(A.STATUS, '1', A.CONTENT, null) as content,
       a.status,
       a.type,
       a.createAt,
       a.seq
from (select A.chat_id,
             A.ROOM_ID,
             A.content,
             A.EMAIL,
             A.status,
             A.type,
             dense_rank() over (order by A.createAt desc) as seq,
             A.createAt --sub start
      from kakao_chats A
      where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                           from KAKAO_READ_USERS B
                           where B.EMAIL = 'y2010212@naver.com'
                             and B.ROOM_ID = A.ROOM_ID)
        and A.room_id = 46
        and A.CHAT_ID > 4) A --sub end
where seq <= 20
order by seq,
         chat_id desc;

select a.chat_id,
       a.room_id,
       a.email,
       DECODE(A.STATUS, '1', A.CONTENT, null) as content,
       a.status,
       a.type,
       a.createAt
from (select A.chat_id,
             A.ROOM_ID,
             A.content,
             A.EMAIL,
             A.status,
             A.type,
             dense_rank() over (order by A.createAt desc) as seq,
             A.createAt --sub start
      from kakao_chats A
      where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                           from KAKAO_READ_USERS B
                           where B.EMAIL = 'y2010212@naver.com'
                             and B.ROOM_ID = A.ROOM_ID)
        and A.room_id = '1'
        and A.CHAT_ID > 'null') A --sub end
where seq <= 20
order by seq,
         chat_id desc


select a.chat_id,
       a.room_id,
       a.email,
       DECODE(A.STATUS, '1', A.CONTENT, null) as content,
       a.status,
       a.type,
       a.createAt
from (select A.chat_id,
             A.ROOM_ID,

                A.content,
              A.EMAIL,
             A.status,
             A.type,
             dense_rank() over (order by A.createAt desc) as seq, A.createAt --sub start
      from kakao_chats A
      where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                           from KAKAO_READ_USERS B
                           where B.EMAIL = 'y2010212@naver.com'
                             and B.ROOM_ID = A.ROOM_ID)
        and A.room_id = '1'

        and A.CHAT_ID < '3'

     ) A --sub end

order by seq,
         chat_id desc

select a.chat_id,
       a.room_id,
       a.email,
       DECODE(A.STATUS, '1', A.CONTENT, null) as content,
       a.status,
       a.type,
       a.createAt
from (select A.chat_id,
             A.ROOM_ID,
             A.content,
             A.EMAIL,
             A.status,
             A.type,
             dense_rank() over (order by A.createAt desc) as seq, A.createAt --sub start
      from kakao_chats A
      where A.createAt >= (select NVL(B.CREATEAT, sysdate)
                           from KAKAO_READ_USERS B
                           where B.EMAIL = 'y2010212@naver.com'
                             and B.ROOM_ID = A.ROOM_ID)
        and A.room_id = '1'
     ) A --sub end

where seq <= 20

order by seq,
         chat_id desc;

select A.*, true as sync
from kakao_chats A;

insert into kakao_chats (chat_id,
                         EMAIL,
                         room_id,
                         content,
                         status,
                         type,
                         createAt)
values (KAKAO_CHATS_SEQ.nextval,
        조인 아이디,
        ,
        컨텐트,
        1, -- 기본
        타입,
        sysdate);


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
              and A.room_id = '17'
              and A.CHAT_ID < '999999999999') A
      order by chat_id desc)
where rownum <= 30


    WITH CUTOFF_RS AS (select FR.*,
        case when (select count(*)
        from kakao_friends
        where STATUS = 2

                AND from_id =FR.to_id
                AND to_id = FR.from_id

        ) <= 0 then '1'
        else '2' END AS CUTOFF_RS
        from kakao_friends FR
        where

                from_id = 'y2010212@naver.com')


select C.room_id as ROOM_ID,
       nvl(C.NAME, '') as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "name" : "' || nvl(DECODE(NVL(E.CUTOFF_RS, 1), 1, E.nickname, null), F.NAME) || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "message" : "' || DECODE(NVL(E.CUTOFF_RS, 1), 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "profileImageUrl" : "' || DECODE(NVL(E.CUTOFF_RS, 1), 1, F.profile_image_url, null) || '",' ||
                   ' "status" : "' || D.status || '"' ||
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
    where B.EMAIL = 'y2010212@naver.com'
    and B.ROOM_ID = E.ROOM_ID)
    group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
    left outer join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
    left outer join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
    left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
    join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'y2010212@naver.com'
  and C.ROOM_ID = '60'
  and B.STATUS = 1
--   and D.STATUS = 1
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
                   where

                           from_id = 'y2010212@naver.com')


select C.room_id as ROOM_ID,
       nvl(C.NAME, '') as ROOM_NAME,
       '[' || LISTAGG(
                   '{' ||
                   ' "id" : "' || F.ID || '",' ||
                   ' "name" : "' || nvl(DECODE(NVL(E.CUTOFF_RS, 1), 1, E.nickname, null), F.NAME) || '",' ||
                   ' "email" : "' || D.EMAIL || '",' ||
                   ' "message" : "' || DECODE(NVL(E.CUTOFF_RS, 1), 1, F.MESSAGE, null) || '",' ||
                   ' "provider" : "' || F.PROVIDER || '",' ||
                   ' "lastReadChat" : "' || G.CHAT_ID || '",' ||
                   ' "profileImageUrl" : "' || DECODE(NVL(E.CUTOFF_RS, 1), 1, F.profile_image_url, null) || '",' ||
                   ' "roomStatus" : "' || NVL(D.status, 0) || '",' ||
                   ' "friendStatus" : "' || NVL(E.status, 0) || '"' ||
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
                                               where B.EMAIL = 'y2010212@naver.com'
                                                 and B.ROOM_ID = E.ROOM_ID)
                          group by E.ROOM_ID) G on C.ROOM_ID = G.ROOM_ID
         left outer join kakao_join_users D on C.ROOM_ID = D.ROOM_ID
         left outer join KAKAO_READ_USERS G on G.ROOM_ID = D.ROOM_ID and G.EMAIL = D.EMAIL
         left outer join CUTOFF_RS E on D.EMAIL = E.TO_ID
         join KAKAO_USERS F on D.EMAIl = F.EMAIL
where B.EMAIL = 'y2010212@naver.com'
  and C.ROOM_ID = '60'
  and B.STATUS = 1
--         and D.STATUS = 1
group by C.ROOM_ID,
         C.NAME,
         C.TYPE,
         C.CREATEAT,
         G.CHAT_CONTENT,
         G.CHAT_TYPE,
         G.CHAT_STATUS,
         G.CHAT_CREATEAT;

