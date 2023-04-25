package com.exmaple.flory.dto.member;

import com.exmaple.flory.entity.Authority;
import com.exmaple.flory.entity.Member;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequestDto {

    @NotNull
    @Size(min = 1, max = 20)
    private String nickname;

    @NotNull
    @Size(min = 2, max = 50)
    private String password;

    @NotNull
    @Size(min = 5, max = 100)
    private String email;

    @NotNull
    private boolean classic;

    @NotNull
    private boolean jazz;

    @NotNull
    private boolean pop;

    @NotNull
    private boolean reggae;

    @NotNull
    private boolean rnb;

    @NotNull
    private boolean hiphop;

    @NotNull
    private boolean electronic;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .nickname(nickname)
                .img("1")
                .email(email)
                .classic(classic)
                .jazz(jazz)
                .pop(pop)
                .hiphop(hiphop)
                .reggae(reggae)
                .rnb(rnb)
                .electronic(electronic)
                .password(passwordEncoder.encode(password))
                .authority(Authority.ROLE_USER)
                .build();
    }

}
