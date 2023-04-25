package com.exmaple.flory.repository;

import com.exmaple.flory.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long>, QMemberRepository {
    Optional<Member> findByEmail(String email);
    boolean existsByEmail(String email);
    boolean existsById(Long userId);
    Optional<Member> findByRefreshToken(String refreshToken);
}
