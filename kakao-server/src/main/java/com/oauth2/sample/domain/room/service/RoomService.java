package com.oauth2.sample.domain.room.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.oauth2.sample.domain.chat.dto.ChatType;
import com.oauth2.sample.domain.chat.dto.Chat;
import com.oauth2.sample.domain.chat.dto.ReadUser;
import com.oauth2.sample.domain.chat.repository.ChatRepository;
import com.oauth2.sample.domain.room.dto.InviteUserToRoom;
import com.oauth2.sample.domain.room.dto.RoomInfo;
import com.oauth2.sample.domain.room.dto.RoomType;
import com.oauth2.sample.domain.room.repository.RoomRepository;
import com.oauth2.sample.domain.room.dto.InsertRoom;
import com.oauth2.sample.domain.room.request.InviteRoomRequest;
import com.oauth2.sample.domain.room.request.UpdateRoomRequest;
import com.oauth2.sample.domain.room.response.RoomInfoResponse;
import com.oauth2.sample.domain.room.response.JoinUser;
import com.oauth2.sample.domain.user.repository.UserRepository;
import com.oauth2.sample.web.security.exception.BadRequestException;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequestMapping
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;


    public RoomInfoResponse selectRoom(String email, String roomId) {
        try {
            Optional<RoomInfo> roomInfoOf = roomRepository.selectRoom(email, roomId);

            RoomInfo roomInfo = roomInfoOf.orElseThrow(() -> {
                throw new BadRequestException("잘못된 접근입니다.");
            });

            return getRoomInfoResponse(roomInfo);
        } catch (Exception e) {
            throw new BadRequestException("잘못된 접근입니다.");
        }
    }


    public List<RoomInfoResponse> selectRoomList(String email) {
        List<RoomInfo> roomInfos = roomRepository.selectRoomList(email);

        Stream<RoomInfoResponse> roomInfoResponseStream = roomInfos.stream().map(roomInfo -> {
            return getRoomInfoResponse(roomInfo);
        });

        List<RoomInfoResponse> roomInfoResponseList = roomInfoResponseStream.collect(Collectors.toList());

        return roomInfoResponseList;
    }

    @Transactional
    public void updateRoom(UpdateRoomRequest request) {
        if (!roomRepository.existUser(request.getRoomId(), request.getEmail())) {
            throw new BadRequestException("권한이 없습니다.");
        }

        boolean result = roomRepository.updateRoom(request);
    }

    // 초대
    @Transactional
    public RoomInfoResponse inviteUserToRoom(InviteRoomRequest inviteRoomRequest) {
        List<String> users = inviteRoomRequest.getUsers();

        // 초대 유저 검증
        users.stream().forEach(user -> {
            if (!userRepository.existByEmail(user)) {
                throw new BadRequestException("존재하지 않는 유저입니다.");
            }
        });

        // 룸 생성
        Optional<RoomInfo> roomInfoOf = roomRepository.selectRoom(inviteRoomRequest.getFromEmail(), inviteRoomRequest.getRoomId());
        // 방이 존재하지 않는 경우
        RoomInfo roomInfo = roomInfoOf.orElseGet(() -> {
            if (StringUtils.hasText(inviteRoomRequest.getRoomId())) {
                throw new BadRequestException("권한이 없습니다.");
            }
            if (users.size() == 1) {
                throw new BadRequestException("잘못된 경로입니다.");
            }

            InsertRoom insertRoom = null;

            insertRoom = InsertRoom.builder()
                    .roomName(inviteRoomRequest.getRoomName())
                    .type(RoomType.GROUP)
                    .build();

            boolean isInsert = roomRepository.insertRoom(insertRoom);
            if (!isInsert) {
                throw new BadRequestException("방 생성중 오류가 발생하였습니다.");
            }

            users.add(inviteRoomRequest.getFromEmail());

            return RoomInfo.builder()
                    .roomId(insertRoom.getRoomId())
                    .roomType(RoomType.GROUP)
                    .build();
        });

        // 초대하는 방이 개인방인 경우 -> 새로운 방을 만듬
        if (roomInfo.getRoomType() == RoomType.PERSON) {
            InsertRoom insertRoom = InsertRoom.builder()
                    .roomName(inviteRoomRequest.getRoomName())
                    .type(RoomType.GROUP)
                    .build();

            boolean isInsert = roomRepository.insertRoom(insertRoom);
            if (!isInsert) {
                throw new BadRequestException("방 생성중 오류가 발생하였습니다.");
            }

            // 기존방에 있던 유저 초대
            try {
                List<JoinUser> userList = new ObjectMapper().readValue(roomInfo.getUsers(), new TypeReference<List<JoinUser>>() {
                });

                userList.stream().forEach((user) -> {
                    users.add(user.getEmail());
                });
            } catch (Exception ex) {
                throw new BadRequestException("서버 오류 발생 관리자에게 문의주세요");
            }

            roomInfo = RoomInfo.builder()
                    .roomId(insertRoom.getRoomId())
                    .build();
        }

        String roomId = roomInfo.getRoomId();
        String email = inviteRoomRequest.getFromEmail();

        joinRoom(users, roomId, email);

        RoomInfo room = roomRepository.selectRoom(email, roomId).orElseThrow(() -> {
            throw new BadRequestException("검색중 오류가 발생하였습니다.");
        });

        return getRoomInfoResponse(room);
    }

    @Transactional
    public void leaveRoom(String roomId, String email) {
        if (!roomRepository.existUser(roomId, email)) {
            throw new BadRequestException("방에 존재하지 않습니다.");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String nowStr = sdf.format(new Date());

        // chat 메시지 전달
        Chat chat = Chat.builder()
                .roomId(roomId)
                .email(email)
                .createAt(nowStr)
                .chatType(ChatType.LEAVE)
                .build();

        boolean insertChatResult = chatRepository.insertChat(chat);
        // join_users status 삭제로 변경
        boolean removeJoinUserResult = roomRepository.removeJoinUser(roomId, email);
        // read_users 삭제
        boolean removeReadUserResult = chatRepository.removeReadUser(roomId, email);

        if (!insertChatResult || !removeJoinUserResult || !removeReadUserResult) {
            throw new BadRequestException("방을 나가는데 실패하였습니다.");
        }

    }

    private RoomInfoResponse getRoomInfoResponse(RoomInfo roomInfo) {
        List<JoinUser> arrayList = null;
        try {
            arrayList = new ObjectMapper().readValue(roomInfo.getUsers(), new TypeReference<List<JoinUser>>() {});
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BadRequestException("서버 오류 발생 관리자에게 문의주세요");
        }
        return RoomInfoResponse.builder()
                .roomId(roomInfo.getRoomId())
                .roomName(roomInfo.getRoomName())
                .roomCreateAt(roomInfo.getRoomCreateAt())
                .chatCreateAt(roomInfo.getChatCreateAt())
                .chatContent(roomInfo.getChatContent())
                .chatStatus(roomInfo.getChatStatus())
                .chatType(roomInfo.getChatType())
                .unreadCnt(roomInfo.getUnreadCnt())
                .users(arrayList)
                .roomType(roomInfo.getRoomType())
                .joinUserCnt(roomInfo.getJoinUserCnt()).build();
    }

    private void joinRoom(List<String> users, String roomId, String email) {
        SimpleDateFormat sdf = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
        String nowStr = sdf.format(new Date());

        try {
            users.stream().forEach(user -> {
                InviteUserToRoom inviteUserToRoom = InviteUserToRoom.builder()
                        .roomId(roomId)
                        .email(user)
                        .createAt(nowStr)
                        .build();
                boolean insertResult = roomRepository.inviteUserToRoom(inviteUserToRoom);
                if (!insertResult) {
                    throw new BadRequestException("방 인원 추가에 실패하였습니다.");
                }
            });

            Chat insertChat = Chat.builder()
                    .email(email)
                    .content(new ObjectMapper().writeValueAsString(users.stream().filter(user -> !user.equals(email)).collect(Collectors.toList())))
                    .createAt(nowStr)
                    .chatType(ChatType.JOIN)
                    .roomId(roomId)
                    .build();

            boolean insertChatResult = chatRepository.insertChat(insertChat);
            if (!insertChatResult) {
                throw new BadRequestException("방 인원 추가에 실패하였습니다.");
            }

            String chatId = insertChat.getChatId();
            users.stream().forEach(user -> {
                ReadUser readUser = ReadUser.builder()
                        .chatId(chatId)
                        .roomId(roomId)
                        .email(user)
                        .createAt(nowStr)
                        .build();

                boolean insertReadUserResult = chatRepository.insertReadUser(readUser);
                if (!insertReadUserResult) {
                    throw new BadRequestException("방 인원 추가에 실패하였습니다.");
                }
            });
        } catch (DuplicateKeyException ex) {
            throw new BadRequestException("이미 추가된 유저가 존재합니다. 다시 시도해 주세요.");
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }
}
