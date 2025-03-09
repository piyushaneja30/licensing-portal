package com.licensing.portal.service;

import com.licensing.portal.exception.ApplicationException;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LicenseTypeService {

    private static final String COLLECTION_NAME = "license_types";

    @Autowired
    private MongoDBService mongoDBService;

    public Document getLicenseType(String id) {
        Document licenseType = mongoDBService.findById(COLLECTION_NAME, id);
        if (licenseType == null) {
            throw ApplicationException.notFound("License Type", id);
        }
        return licenseType;
    }

    public List<Document> getAllLicenseTypes() {
        return mongoDBService.findAll(COLLECTION_NAME);
    }

    public Document createLicenseType(Document licenseType) {
        return mongoDBService.insertOne(COLLECTION_NAME, licenseType);
    }

    public void updateLicenseType(String id, Document update) {
        mongoDBService.updateOne(COLLECTION_NAME, id, update);
    }

    public void deleteLicenseType(String id) {
        mongoDBService.deleteOne(COLLECTION_NAME, id);
    }
} 