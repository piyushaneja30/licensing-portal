package com.licensing.portal.controller;

import com.licensing.portal.model.*;
import com.licensing.portal.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public ResponseEntity<Application> createApplication(
            @RequestParam String userId,
            @RequestParam String licenseTypeId) {
        return ResponseEntity.ok(applicationService.createApplication(userId, licenseTypeId));
    }

    @PostMapping("/{applicationId}/personal-info")
    public ResponseEntity<PersonalInfo> savePersonalInfo(
            @PathVariable String applicationId,
            @RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(applicationService.savePersonalInfo(applicationId, personalInfo));
    }

    @PostMapping("/{applicationId}/education")
    public ResponseEntity<Education> saveEducation(
            @PathVariable String applicationId,
            @RequestBody Education education) {
        return ResponseEntity.ok(applicationService.saveEducation(applicationId, education));
    }

    @PostMapping("/{applicationId}/work-experience")
    public ResponseEntity<WorkExperience> saveWorkExperience(
            @PathVariable String applicationId,
            @RequestBody WorkExperience workExperience) {
        return ResponseEntity.ok(applicationService.saveWorkExperience(applicationId, workExperience));
    }

    @PostMapping("/{applicationId}/references")
    public ResponseEntity<References> saveReferences(
            @PathVariable String applicationId,
            @RequestBody References references) {
        return ResponseEntity.ok(applicationService.saveReferences(applicationId, references));
    }

    @PostMapping("/{applicationId}/documents")
    public ResponseEntity<Documents> saveDocuments(
            @PathVariable String applicationId,
            @RequestBody Documents documents) {
        return ResponseEntity.ok(applicationService.saveDocuments(applicationId, documents));
    }

    @PostMapping("/{applicationId}/submit")
    public ResponseEntity<Application> submitApplication(
            @PathVariable String applicationId) {
        return ResponseEntity.ok(applicationService.submitApplication(applicationId));
    }

    @GetMapping("/{applicationId}")
    public ResponseEntity<Application> getApplication(
            @PathVariable String applicationId) {
        return applicationService.getApplication(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/personal-info")
    public ResponseEntity<PersonalInfo> getPersonalInfo(
            @PathVariable String applicationId) {
        return applicationService.getPersonalInfo(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/education")
    public ResponseEntity<Education> getEducation(
            @PathVariable String applicationId) {
        return applicationService.getEducation(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/work-experience")
    public ResponseEntity<WorkExperience> getWorkExperience(
            @PathVariable String applicationId) {
        return applicationService.getWorkExperience(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/references")
    public ResponseEntity<References> getReferences(
            @PathVariable String applicationId) {
        return applicationService.getReferences(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{applicationId}/documents")
    public ResponseEntity<Documents> getDocuments(
            @PathVariable String applicationId) {
        return applicationService.getDocuments(applicationId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
} 