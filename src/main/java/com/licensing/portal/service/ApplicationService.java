package com.licensing.portal.service;

import com.licensing.portal.model.*;
import com.licensing.portal.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private PersonalInfoRepository personalInfoRepository;
    
    @Autowired
    private EducationRepository educationRepository;
    
    @Autowired
    private WorkExperienceRepository workExperienceRepository;
    
    @Autowired
    private ReferencesRepository referencesRepository;
    
    @Autowired
    private DocumentsRepository documentsRepository;

    @Transactional
    public Application createApplication(String userId, String licenseTypeId) {
        Application application = new Application();
        application.setUserId(userId);
        application.setLicenseTypeId(licenseTypeId);
        application.setStatus("draft");
        return applicationRepository.save(application);
    }

    @Transactional
    public PersonalInfo savePersonalInfo(String applicationId, PersonalInfo personalInfo) {
        personalInfo.setApplicationId(applicationId);
        return personalInfoRepository.save(personalInfo);
    }

    @Transactional
    public Education saveEducation(String applicationId, Education education) {
        education.setApplicationId(applicationId);
        return educationRepository.save(education);
    }

    @Transactional
    public WorkExperience saveWorkExperience(String applicationId, WorkExperience workExperience) {
        workExperience.setApplicationId(applicationId);
        return workExperienceRepository.save(workExperience);
    }

    @Transactional
    public References saveReferences(String applicationId, References references) {
        references.setApplicationId(applicationId);
        return referencesRepository.save(references);
    }

    @Transactional
    public Documents saveDocuments(String applicationId, Documents documents) {
        documents.setApplicationId(applicationId);
        return documentsRepository.save(documents);
    }

    @Transactional
    public Application submitApplication(String applicationId) {
        Optional<Application> optionalApplication = applicationRepository.findById(applicationId);
        if (optionalApplication.isPresent()) {
            Application application = optionalApplication.get();
            application.setStatus("submitted");
            application.setSubmissionDate(LocalDateTime.now().toString());
            return applicationRepository.save(application);
        }
        throw new RuntimeException("Application not found");
    }

    public Optional<Application> getApplication(String applicationId) {
        return applicationRepository.findById(applicationId);
    }

    public Optional<PersonalInfo> getPersonalInfo(String applicationId) {
        return personalInfoRepository.findByApplicationId(applicationId);
    }

    public Optional<Education> getEducation(String applicationId) {
        return educationRepository.findByApplicationId(applicationId);
    }

    public Optional<WorkExperience> getWorkExperience(String applicationId) {
        return workExperienceRepository.findByApplicationId(applicationId);
    }

    public Optional<References> getReferences(String applicationId) {
        return referencesRepository.findByApplicationId(applicationId);
    }

    public Optional<Documents> getDocuments(String applicationId) {
        return documentsRepository.findByApplicationId(applicationId);
    }
} 