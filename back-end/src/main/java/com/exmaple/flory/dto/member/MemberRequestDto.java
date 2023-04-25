package com.exmaple.flory.dto.member;

import com.exmaple.flory.entity.Authority;
import com.exmaple.flory.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberRequestDto {

    @NotNull
    @Size(min = 1, max = 20)
    private String nickname;

//    @NotNull
//    @Size(min = 2, max = 50)
//    private String password;

    private String img;

    @NotNull
    @Size(min = 5, max = 100)
    private String email;

}
