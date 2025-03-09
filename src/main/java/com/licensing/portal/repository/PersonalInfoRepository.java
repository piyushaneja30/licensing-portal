package com.licensing.portal.repository;

import com.licensing.portal.model.PersonalInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface PersonalInfoRepository extends MongoRepository<PersonalInfo, String> {
    Optional<PersonalInfo> findByApplicationId(String applicationId);
} 