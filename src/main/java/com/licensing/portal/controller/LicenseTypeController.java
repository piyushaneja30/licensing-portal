package com.licensing.portal.controller;

import com.licensing.portal.service.LicenseTypeService;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/license-types")
@CrossOrigin(origins = "*")
public class LicenseTypeController {

    @Autowired
    private LicenseTypeService licenseTypeService;

    @GetMapping
    public ResponseEntity<List<Document>> getAllLicenseTypes() {
        return ResponseEntity.ok(licenseTypeService.getAllLicenseTypes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Document> getLicenseType(@PathVariable String id) {
        return ResponseEntity.ok(licenseTypeService.getLicenseType(id));
    }

    @PostMapping
    public ResponseEntity<Document> createLicenseType(@RequestBody Document licenseType) {
        return ResponseEntity.ok(licenseTypeService.createLicenseType(licenseType));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateLicenseType(
            @PathVariable String id,
            @RequestBody Document update) {
        licenseTypeService.updateLicenseType(id, update);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLicenseType(@PathVariable String id) {
        licenseTypeService.deleteLicenseType(id);
        return ResponseEntity.ok().build();
    }
} 