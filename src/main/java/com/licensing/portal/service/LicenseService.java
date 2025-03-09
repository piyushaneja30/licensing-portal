package com.licensing.portal.service;

import com.licensing.portal.model.*;
import com.licensing.portal.repository.*;
import com.licensing.portal.exception.ApplicationException;
import com.licensing.portal.util.ValidationPatterns;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@Service
public class LicenseService {
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

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public List<Application> getApplicationsByUserId(String userId) {
        return applicationRepository.findByUserId(userId);
    }

    @Transactional
    public Application createNewApplication(String userId, String licenseTypeId) {
        if (userId == null || userId.trim().isEmpty()) {
            throw ApplicationException.validationError("User ID is required");
        }
        if (licenseTypeId == null || licenseTypeId.trim().isEmpty()) {
            throw ApplicationException.validationError("License type ID is required");
        }

        Application application = new Application();
        application.setUserId(userId);
        application.setLicenseTypeId(licenseTypeId);
        application.setStatus("draft");
        application.setSubmissionDate(LocalDateTime.now().toString());
        return applicationRepository.save(application);
    }

    @Transactional
    public Application updateApplicationStatus(String applicationId, String status) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> ApplicationException.notFound("Application", applicationId));

        if (status == null || status.trim().isEmpty()) {
            throw ApplicationException.validationError("Status is required");
        }

        // Validate status transition
        if (!isValidStatusTransition(app.getStatus(), status)) {
            throw ApplicationException.invalidState(
                String.format("Invalid status transition from %s to %s", app.getStatus(), status));
        }

        app.setStatus(status);
        return applicationRepository.save(app);
    }

    private boolean isValidStatusTransition(String currentStatus, String newStatus) {
        // Add logic for valid status transitions
        switch (currentStatus) {
            case "draft":
                return newStatus.equals("submitted") || newStatus.equals("cancelled");
            case "submitted":
                return newStatus.equals("under_review") || newStatus.equals("rejected");
            case "under_review":
                return newStatus.equals("approved") || newStatus.equals("rejected");
            default:
                return false;
        }
    }

    @Transactional
    public PersonalInfo savePersonalInfo(String applicationId, PersonalInfo personalInfo) {
        validateApplicationExists(applicationId);
        validatePersonalInfo(personalInfo);
        personalInfo.setApplicationId(applicationId);
        return personalInfoRepository.save(personalInfo);
    }

    private void validatePersonalInfo(PersonalInfo personalInfo) {
        if (personalInfo.getFirstName() == null || !Pattern.matches(ValidationPatterns.NAME_PATTERN, personalInfo.getFirstName())) {
            throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_NAME);
        }
        if (personalInfo.getLastName() == null || !Pattern.matches(ValidationPatterns.NAME_PATTERN, personalInfo.getLastName())) {
            throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_NAME);
        }
        if (personalInfo.getEmail() == null || !Pattern.matches(ValidationPatterns.EMAIL_PATTERN, personalInfo.getEmail())) {
            throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_EMAIL);
        }
        if (personalInfo.getPhone() != null && !Pattern.matches(ValidationPatterns.PHONE_PATTERN, personalInfo.getPhone())) {
            throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_PHONE);
        }
        if (personalInfo.getSsn() != null && !Pattern.matches(ValidationPatterns.SSN_PATTERN, personalInfo.getSsn())) {
            throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_SSN);
        }

        // Validate address if present
        if (personalInfo.getAddress() != null) {
            if (personalInfo.getAddress().getZipCode() != null && 
                !Pattern.matches(ValidationPatterns.ZIP_CODE_PATTERN, personalInfo.getAddress().getZipCode())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_ZIP);
            }
            if (personalInfo.getAddress().getState() != null && 
                !Pattern.matches(ValidationPatterns.STATE_CODE_PATTERN, personalInfo.getAddress().getState().toUpperCase())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_STATE);
            }
        }
    }

    @Transactional
    public Education saveEducation(String applicationId, Education education) {
        validateApplicationExists(applicationId);
        validateEducation(education);
        education.setApplicationId(applicationId);
        return educationRepository.save(education);
    }

    private void validateEducation(Education education) {
        if (education.getEducationEntries() == null || education.getEducationEntries().isEmpty()) {
            throw ApplicationException.validationError("At least one education entry is required");
        }

        for (Education.EducationEntry entry : education.getEducationEntries()) {
            if (entry.getInstitution() == null || 
                !Pattern.matches(ValidationPatterns.INSTITUTION_PATTERN, entry.getInstitution())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_INSTITUTION);
            }
            if (entry.getDegree() == null || 
                !Pattern.matches(ValidationPatterns.DEGREE_PATTERN, entry.getDegree())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_DEGREE);
            }
            if (entry.getGraduationDate() != null && 
                !Pattern.matches(ValidationPatterns.DATE_PATTERN, entry.getGraduationDate().toString())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_DATE);
            }
            if (entry.getGpa() != null && 
                !Pattern.matches(ValidationPatterns.GPA_PATTERN, entry.getGpa().toString())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_GPA);
            }
        }
    }

    @Transactional
    public WorkExperience saveWorkExperience(String applicationId, WorkExperience workExperience) {
        validateApplicationExists(applicationId);
        validateWorkExperience(workExperience);
        workExperience.setApplicationId(applicationId);
        return workExperienceRepository.save(workExperience);
    }

    private void validateWorkExperience(WorkExperience workExperience) {
        if (workExperience.getExperiences() == null || workExperience.getExperiences().isEmpty()) {
            throw ApplicationException.validationError("At least one work experience entry is required");
        }

        for (WorkExperience.Experience exp : workExperience.getExperiences()) {
            if (exp.getEmployer() == null || 
                !Pattern.matches(ValidationPatterns.COMPANY_NAME_PATTERN, exp.getEmployer())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_COMPANY);
            }
            if (exp.getPosition() == null || 
                !Pattern.matches(ValidationPatterns.POSITION_PATTERN, exp.getPosition())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_POSITION);
            }
            if (exp.getStartDate() != null && 
                !Pattern.matches(ValidationPatterns.DATE_PATTERN, exp.getStartDate().toString())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_DATE);
            }
            if (exp.getEndDate() != null && 
                !Pattern.matches(ValidationPatterns.DATE_PATTERN, exp.getEndDate().toString())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_DATE);
            }

            // Validate supervisor information if present
            if (exp.getSupervisor() != null) {
                if (exp.getSupervisor().getEmail() != null && 
                    !Pattern.matches(ValidationPatterns.EMAIL_PATTERN, exp.getSupervisor().getEmail())) {
                    throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_EMAIL);
                }
                if (exp.getSupervisor().getPhone() != null && 
                    !Pattern.matches(ValidationPatterns.PHONE_PATTERN, exp.getSupervisor().getPhone())) {
                    throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_PHONE);
                }
            }
        }
    }

    @Transactional
    public References saveReferences(String applicationId, References references) {
        validateApplicationExists(applicationId);
        validateReferences(references);
        references.setApplicationId(applicationId);
        return referencesRepository.save(references);
    }

    private void validateReferences(References references) {
        if (references.getReferences() == null || references.getReferences().isEmpty()) {
            throw ApplicationException.validationError("At least one reference is required");
        }

        for (References.Reference ref : references.getReferences()) {
            if (ref.getName() == null || !Pattern.matches(ValidationPatterns.NAME_PATTERN, ref.getName())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_NAME);
            }
            if (ref.getEmail() != null && !Pattern.matches(ValidationPatterns.EMAIL_PATTERN, ref.getEmail())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_EMAIL);
            }
            if (ref.getPhone() != null && !Pattern.matches(ValidationPatterns.PHONE_PATTERN, ref.getPhone())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_PHONE);
            }
            if (ref.getCompany() != null && 
                !Pattern.matches(ValidationPatterns.COMPANY_NAME_PATTERN, ref.getCompany())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_COMPANY);
            }
        }
    }

    @Transactional
    public Documents saveDocuments(String applicationId, Documents documents) {
        validateApplicationExists(applicationId);
        validateDocuments(documents);
        documents.setApplicationId(applicationId);
        return documentsRepository.save(documents);
    }

    private void validateDocuments(Documents documents) {
        if (documents.getDocuments() == null || documents.getDocuments().isEmpty()) {
            throw ApplicationException.validationError("At least one document is required");
        }

        for (Documents.ApplicationDocument doc : documents.getDocuments()) {
            if (doc.getName() == null || !Pattern.matches(ValidationPatterns.FILE_NAME_PATTERN, doc.getName())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_FILENAME);
            }
            if (doc.getUrl() != null && !Pattern.matches(ValidationPatterns.URL_PATTERN, doc.getUrl())) {
                throw ApplicationException.validationError(ValidationPatterns.ErrorMessages.INVALID_URL);
            }
        }
    }

    private void validateApplicationExists(String applicationId) {
        if (!applicationRepository.existsById(applicationId)) {
            throw ApplicationException.notFound("Application", applicationId);
        }
    }

    public Optional<Application> getApplication(String applicationId) {
        return applicationRepository.findById(applicationId);
    }

    public Optional<PersonalInfo> getPersonalInfo(String applicationId) {
        validateApplicationExists(applicationId);
        return personalInfoRepository.findByApplicationId(applicationId);
    }

    public Optional<Education> getEducation(String applicationId) {
        validateApplicationExists(applicationId);
        return educationRepository.findByApplicationId(applicationId);
    }

    public Optional<WorkExperience> getWorkExperience(String applicationId) {
        validateApplicationExists(applicationId);
        return workExperienceRepository.findByApplicationId(applicationId);
    }

    public Optional<References> getReferences(String applicationId) {
        validateApplicationExists(applicationId);
        return referencesRepository.findByApplicationId(applicationId);
    }

    public Optional<Documents> getDocuments(String applicationId) {
        validateApplicationExists(applicationId);
        return documentsRepository.findByApplicationId(applicationId);
    }

    @Transactional
    public Application submitApplication(String applicationId) {
        Application app = applicationRepository.findById(applicationId)
            .orElseThrow(() -> ApplicationException.notFound("Application", applicationId));

        if (!app.getStatus().equals("draft")) {
            throw ApplicationException.invalidState("Only applications in draft status can be submitted");
        }

        if (!isApplicationComplete(applicationId)) {
            throw ApplicationException.validationError("Application is incomplete");
        }

        app.setStatus("submitted");
        app.setSubmissionDate(LocalDateTime.now().toString());
        return applicationRepository.save(app);
    }

    private boolean isApplicationComplete(String applicationId) {
        boolean hasPersonalInfo = personalInfoRepository.findByApplicationId(applicationId).isPresent();
        boolean hasEducation = educationRepository.findByApplicationId(applicationId).isPresent();
        boolean hasWorkExperience = workExperienceRepository.findByApplicationId(applicationId).isPresent();
        boolean hasReferences = referencesRepository.findByApplicationId(applicationId).isPresent();
        boolean hasDocuments = documentsRepository.findByApplicationId(applicationId).isPresent();

        if (!hasPersonalInfo) throw ApplicationException.validationError("Personal information is missing");
        if (!hasEducation) throw ApplicationException.validationError("Education information is missing");
        if (!hasWorkExperience) throw ApplicationException.validationError("Work experience is missing");
        if (!hasReferences) throw ApplicationException.validationError("References are missing");
        if (!hasDocuments) throw ApplicationException.validationError("Required documents are missing");

        return true;
    }
} 