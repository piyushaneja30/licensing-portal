package com.licensing.portal.repository;

import com.licensing.portal.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    List<Application> findByUserId(String userId);
    List<Application> findByStatus(String status);
    List<Application> findByUserIdAndStatus(String userId, String status);
} 