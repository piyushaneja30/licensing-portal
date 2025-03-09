package com.licensing.portal.controller;

import com.licensing.portal.model.*;
import com.licensing.portal.service.LicenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/licenses")
@CrossOrigin(origins = "*")
public class LicenseController {
    @Autowired
    private LicenseService licenseService;

    @GetMapping("/applications")
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(licenseService.getAllApplications());
    }

    @GetMapping("/applications/user/{userId}")
    public ResponseEntity<List<Application>> getUserApplications(@PathVariable String userId) {
        return ResponseEntity.ok(licenseService.getApplicationsByUserId(userId));
    }

    @PostMapping("/applications")
    public ResponseEntity<Application> createApplication(
            @RequestParam String userId,
            @RequestParam String licenseTypeId) {
        return ResponseEntity.ok(licenseService.createNewApplication(userId, licenseTypeId));
    }

    @PutMapping("/applications/{applicationId}/status")
    public ResponseEntity<Application> updateApplicationStatus(
            @PathVariable String applicationId,
            @RequestParam String status) {
        return ResponseEntity.ok(licenseService.updateApplicationStatus(applicationId, status));
    }

    @PostMapping("/applications/{applicationId}/submit")
    public ResponseEntity<Application> submitApplication(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.submitApplication(applicationId));
    }

    @PostMapping("/applications/{applicationId}/personal-info")
    public ResponseEntity<PersonalInfo> savePersonalInfo(
            @PathVariable String applicationId,
            @RequestBody PersonalInfo personalInfo) {
        return ResponseEntity.ok(licenseService.savePersonalInfo(applicationId, personalInfo));
    }

    @PostMapping("/applications/{applicationId}/education")
    public ResponseEntity<Education> saveEducation(
            @PathVariable String applicationId,
            @RequestBody Education education) {
        return ResponseEntity.ok(licenseService.saveEducation(applicationId, education));
    }

    @PostMapping("/applications/{applicationId}/work-experience")
    public ResponseEntity<WorkExperience> saveWorkExperience(
            @PathVariable String applicationId,
            @RequestBody WorkExperience workExperience) {
        return ResponseEntity.ok(licenseService.saveWorkExperience(applicationId, workExperience));
    }

    @PostMapping("/applications/{applicationId}/references")
    public ResponseEntity<References> saveReferences(
            @PathVariable String applicationId,
            @RequestBody References references) {
        return ResponseEntity.ok(licenseService.saveReferences(applicationId, references));
    }

    @PostMapping("/applications/{applicationId}/documents")
    public ResponseEntity<Documents> saveDocuments(
            @PathVariable String applicationId,
            @RequestBody Documents documents) {
        return ResponseEntity.ok(licenseService.saveDocuments(applicationId, documents));
    }

    @GetMapping("/applications/{applicationId}")
    public ResponseEntity<Application> getApplication(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getApplication(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found")));
    }

    @GetMapping("/applications/{applicationId}/personal-info")
    public ResponseEntity<PersonalInfo> getPersonalInfo(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getPersonalInfo(applicationId)
                .orElseThrow(() -> new RuntimeException("Personal info not found")));
    }

    @GetMapping("/applications/{applicationId}/education")
    public ResponseEntity<Education> getEducation(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getEducation(applicationId)
                .orElseThrow(() -> new RuntimeException("Education info not found")));
    }

    @GetMapping("/applications/{applicationId}/work-experience")
    public ResponseEntity<WorkExperience> getWorkExperience(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getWorkExperience(applicationId)
                .orElseThrow(() -> new RuntimeException("Work experience not found")));
    }

    @GetMapping("/applications/{applicationId}/references")
    public ResponseEntity<References> getReferences(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getReferences(applicationId)
                .orElseThrow(() -> new RuntimeException("References not found")));
    }

    @GetMapping("/applications/{applicationId}/documents")
    public ResponseEntity<Documents> getDocuments(@PathVariable String applicationId) {
        return ResponseEntity.ok(licenseService.getDocuments(applicationId)
                .orElseThrow(() -> new RuntimeException("Documents not found")));
    }
} 