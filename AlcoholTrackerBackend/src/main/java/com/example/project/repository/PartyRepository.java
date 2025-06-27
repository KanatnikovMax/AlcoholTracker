package com.example.project.repository;

import com.example.project.entity.Party;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PartyRepository extends JpaRepository<Party, Long> {
    List<Party> findByUser_UserIdOrderByDateDesc(Long userId);
    Optional<Party> findByPartyIdAndUser_UserId(Long partyId, Long userId);

    @Modifying
    @Query("UPDATE Party p SET p.needFeedback = false WHERE p.partyId = :partyId AND p.user.userId = :userId")
    void markFeedbackAsProcessed(@Param("partyId") Long partyId, @Param("userId") Long userId);
}