package com.oauth2.sample.domain.room.service;

import com.oauth2.sample.domain.room.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@RequestMapping
@RequiredArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
}
