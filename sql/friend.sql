-- 내가 추가한 친구들 검색
WITH CUTOFF_RS AS (select FR.*,
                          case
                              when (select count(*)
                                    from kakao_friends
                                    where STATUS = 2

                                      AND from_id = FR.to_id
                                      AND to_id = FR.from_id) <= 0 then '1'
                              else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where from_id = 'y2010212@naver.com')
select A.ID                                                   AS ID,
       A.EMAIL                                                AS EMAIL,
       DECODE(B.NICKNAME, null, A.NAME, B.NICKNAME)           AS NAME,
       DECODE(B.CUTOFF_RS, '1', A.MESSAGE, null)              AS MESSAGE,
       DECODE(B.CUTOFF_RS, '1', A.PROVIDER, null)             AS PROVIDER,
       DECODE(B.CUTOFF_RS, '1', A.PROFILE_IMAGE_URL, null)    AS PROFILE_IMAGE_URL,
       DECODE(B.CUTOFF_RS, '1', A.BACKGROUND_IMAGE_URL, null) AS BACKGROUND_IMAGE_URL,
       to_char(B.STATUS)                                      AS STATUS
from kakao_users A
         JOIN CUTOFF_RS B
              ON A.email = B.TO_ID
where B.status = 1
  and A.status = 1;


-- 나를 추가한 친구들 검색
WITH CUTOFF_RS AS (select FR.*,
                          case
                              when (select count(*)
                                    from kakao_friends
                                    where STATUS = 2

                                      AND from_id = FR.from_id
                                      AND to_id = FR.to_id) <= 0 then '1'
                              else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where to_id = 'ury0530@naver.com')
select A.ID,
       A.EMAIL,
       A.NAME                                                 AS NAME,
       DECODE(B.CUTOFF_RS, '1', A.MESSAGE, null)              AS MESSAGE,
       DECODE(B.CUTOFF_RS, '1', A.PROVIDER, null)             AS PROVIDER,
       DECODE(B.CUTOFF_RS, '1', A.PROFILE_IMAGE_URL, null)    AS PROFILE_IMAGE_URL,
       DECODE(B.CUTOFF_RS, '1', A.BACKGROUND_IMAGE_URL, null) AS BACKGROUND_IMAGE_URL
from kakao_users A
         join CUTOFF_RS B
              on B.from_id = A.email
where A.status = 1
  and B.status = 1
  and from_id not in
      (select to_id
       from kakao_friends
       where from_id = 'ury0530@naver.com');

-- 차단한 친구
WITH CUTOFF_RS AS (select FR.*,
                          case
                              when (select count(*)
                                    from kakao_friends
                                    where STATUS = 2

                                      AND from_id = FR.to_id
                                      AND to_id = FR.from_id) <= 0 then '1'
                              else '2' END AS CUTOFF_RS
                   from kakao_friends FR
                   where from_id = 'ury0530@naver.com')
select A.ID,
       A.EMAIL,
       A.NAME,
       DECODE(B.CUTOFF_RS, '1', A.MESSAGE, null)              AS MESSAGE,
       DECODE(B.CUTOFF_RS, '1', A.PROFILE_IMAGE_URL, null)    AS PROFILE_IMAGE_URL,
       DECODE(B.CUTOFF_RS, '1', A.BACKGROUND_IMAGE_URL, null) AS BACKGROUND_IMAGE_URL,
       to_char(B.STATUS)                                      AS STATUS
from kakao_users A
         join CUTOFF_RS B
              on A.email = B.to_id
where B.status = 2
  and A.status = 1;

-- 친구 검색
select B.ID                                                AS ID,
       B.EMAIL                                             AS EMAIL,
       DECODE(A.NICKNAME, null, B.NAME, A.NICKNAME)        AS NAME,
       DECODE(A.STATUS, '1', B.MESSAGE, null)              AS MESSAGE,
       DECODE(A.STATUS, '1', B.PROFILE_IMAGE_URL, null)    AS PROFILE_IMAGE_URL,
       DECODE(A.STATUS, '1', B.BACKGROUND_IMAGE_URL, null) AS BACKGROUND_IMAGE_URL,
       to_char(A.STATUS)                                   AS STATUS
from KAKAO_FRIENDS A
         join KAKAO_USERS B
              on A.TO_ID = B.EMAIL
where from_id = 'y2010212@naver.com'
  and to_id = 'y2010213@naver.com';

with CUTOFF_RS AS (select FR.*,
       case
           when (select count(*)
                 from kakao_friends
                 where STATUS = 2
--                    AND from_id = FR.from_id
--                    AND to_id = FR.to_id
                   AND from_id = FR.to_id
                   AND to_id = FR.from_id
                ) <= 0 then '1'
           else '2' END AS CUTOFF_RS
from kakao_friends FR
where FROM_ID = 'y2010214@naver.com')

select A.ID                                                   AS ID,
       A.EMAIL                                                AS EMAIL,
       DECODE(B.NICKNAME, null, A.NAME, B.NICKNAME)           AS NAME,
       DECODE(B.CUTOFF_RS, '1', A.MESSAGE, null)              AS MESSAGE,
       DECODE(B.CUTOFF_RS, '1', A.PROFILE_IMAGE_URL, null)    AS PROFILE_IMAGE_URL,
       DECODE(B.CUTOFF_RS, '1', A.BACKGROUND_IMAGE_URL, null) AS BACKGROUND_IMAGE_URL,
       to_char(B.STATUS)                                      AS STATUS,
       B.*
from kakao_users A
         JOIN CUTOFF_RS B
              ON A.email = B.TO_ID
where A.status = 1
  AND B.TO_ID = 'y2010212@naver.com'
