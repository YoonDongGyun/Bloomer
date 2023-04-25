package com.exmaple.flory.service;

import com.exmaple.flory.dto.oauth.OAuthAttributes;
import com.exmaple.flory.entity.Authority;
import com.exmaple.flory.entity.Member;
import com.exmaple.flory.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOauth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public CustomOauth2UserService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails()
                .getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId, userNameAttributeName,
                oAuth2User.getAttributes());

        save(attributes);

        return attributes;
    }

    private void save(OAuthAttributes attributes) {

        String email = attributes.getEmail();
        Optional<Member> member = memberRepository.findByEmail(email);
        //기존에 저장된 것이 없었다면
        if(!member.isPresent()) {
                memberRepository.save(
                    Member
                    .builder()
                    .email(attributes.getEmail())
                            .nickname(attributes.getName())
                            .password(passwordEncoder.encode("1234"))
                            .img("1")
                    .authority(Authority.ROLE_USER)
                    .build());
        }
    }


}
