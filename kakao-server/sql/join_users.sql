-- create table kakao_join_users
-- (
--     email     varchar2(255),
--     room_id   INTEGER,
--     status    INTEGER,
--     createAt  DATE,
--     updateAt  DATE,
--     reserved1 VARCHAR2(300),
--     reserved2 VARCHAR2(300),
--     reserved3 VARCHAR2(300),
--     constraint kakao_join_users_pk primary key (room_id, email)
-- );

INSERT INTO KAKAO_JOIN_USERS(EMAIL, ROOM_ID, STATUS, CREATEAT) VALUES ('y2010214@naver.com', 3, 1, SYSDATE);
INSERT INTO KAKAO_JOIN_USERS(EMAIL, ROOM_ID, STATUS, CREATEAT) VALUES ('y2010213@naver.com', 3, 1, SYSDATE);
commit;