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

insert into kakao_files (file_id, email, original_name, original_ext, createAt)
values (1, '1', '1', '1', sysdate)

update
    kakao_users
set id            = 'sadsadasd',
    PROFILE_IMAGE_URL = 'wooae1234@gmail.com1667280416302',
    message       = '반갑습니다',

    updateAt      = sysdate
where email = 'wooae1234@gmail.com'
  and status = 1