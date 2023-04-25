package com.exmaple.flory.service;

import com.exmaple.flory.dto.garden.GardenResponseDto;
import com.exmaple.flory.dto.guest.GuestRequestDto;
import com.exmaple.flory.dto.guest.GuestResponseDto;
import com.exmaple.flory.entity.Garden;
import com.exmaple.flory.entity.Guest;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.exception.CustomException;
import com.exmaple.flory.exception.error.ErrorCode;
import com.exmaple.flory.repository.GardenRepository;
import com.exmaple.flory.repository.GuestRepository;
import com.exmaple.flory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class GuestService {

    private final GuestRepository guestRepository;
    private final MemberRepository memberRepository;
    private final GardenRepository gardenRepository;

    @Transactional
    public GuestResponseDto insert(GuestRequestDto guestRequestDto) {

        Member member = memberRepository.findById(guestRequestDto.getUserId()).get();
        Garden garden = gardenRepository.findById(guestRequestDto.getGardenId()).get();

        //유저가 없다면
        if(member == null) throw new CustomException(ErrorCode.NO_USER);
        if(garden == null) throw new CustomException(ErrorCode.INVALID_GARDEN);

        return Optional.of(guestRepository.save(guestRequestDto.toEntity()))
                .flatMap(g-> {
                    g.setMember(member);
                    return Optional.of(g);
                }).flatMap(g -> {
                    g.setGarden(garden);
                    return Optional.of(g);
                })
                .map(Guest::toResponseDto)
                .orElseThrow(() -> new CustomException(ErrorCode.INTERNAL_SERVER_ERROR));
    }

    public GuestResponseDto getDetail(Long bookId) {

        return guestRepository.findById(bookId)
                .map(Guest::toResponseDto)
                .orElseThrow(()-> new CustomException(ErrorCode.NO_GUEST));
    }

    public GuestResponseDto update(GuestRequestDto guestRequestDto) {

        return guestRepository.findById(guestRequestDto.getBookId())
                .map(g->{
                    g.setContent(guestRequestDto.getContents());
                    g.setColor(guestRequestDto.getColor());
                    return g;
                })
                .map(guestRepository::save)
                .map(Guest::toResponseDto)
                .orElseThrow(()->new CustomException(ErrorCode.NO_GUEST));
    }

    public void delete(Long bookId) {

        guestRepository.findById(bookId)
                .orElseThrow(()-> new CustomException(ErrorCode.NO_GUEST));
        guestRepository.deleteById(bookId);
    }

    public List<GuestResponseDto> getGuestList(Long gardenId) {

        return guestRepository.getAllGuestByGardenId(gardenId)
                .stream()
                .map(Guest::toResponseDto)
                .collect(Collectors.toList());
    }
}
