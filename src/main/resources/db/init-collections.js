db = db.getSiblingDB('licensing_portal');

// Drop existing collections to start fresh
db.license_types.drop();
db.applications.drop();
db.personal_info.drop();
db.education.drop();
db.work_experience.drop();
db.references.drop();
db.documents.drop();

// Create collections with validations
db.createCollection("license_types", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["code", "name", "description", "requirements", "fee"],
            properties: {
                code: { bsonType: "string" },
                name: { bsonType: "string" },
                description: { bsonType: "string" },
                requirements: { bsonType: "array" },
                fee: { bsonType: "double" }
            }
        }
    }
});

db.createCollection("applications", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["userId", "licenseTypeId", "status"],
            properties: {
                userId: { bsonType: "string" },
                licenseTypeId: { bsonType: "string" },
                status: { bsonType: "string" },
                submissionDate: { bsonType: "string" }
            }
        }
    }
});

db.createCollection("personal_info", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["applicationId", "firstName", "lastName", "email"],
            properties: {
                applicationId: { bsonType: "string" },
                firstName: { bsonType: "string" },
                lastName: { bsonType: "string" },
                email: { bsonType: "string" }
            }
        }
    }
});

db.createCollection("education", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["applicationId", "educationEntries"],
            properties: {
                applicationId: { bsonType: "string" },
                educationEntries: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["institution", "degree", "graduationDate"],
                        properties: {
                            institution: { bsonType: "string" },
                            degree: { bsonType: "string" },
                            graduationDate: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
});

db.createCollection("work_experience", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["applicationId", "experiences"],
            properties: {
                applicationId: { bsonType: "string" },
                experiences: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["employer", "position", "startDate"],
                        properties: {
                            employer: { bsonType: "string" },
                            position: { bsonType: "string" },
                            startDate: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
});

db.createCollection("references", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["applicationId", "references"],
            properties: {
                applicationId: { bsonType: "string" },
                references: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["name", "email", "phone"],
                        properties: {
                            name: { bsonType: "string" },
                            email: { bsonType: "string" },
                            phone: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
});

db.createCollection("documents", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["applicationId", "documents"],
            properties: {
                applicationId: { bsonType: "string" },
                documents: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["type", "name", "url"],
                        properties: {
                            type: { bsonType: "string" },
                            name: { bsonType: "string" },
                            url: { bsonType: "string" }
                        }
                    }
                }
            }
        }
    }
});

// Create indexes
db.license_types.createIndex({ "code": 1 }, { unique: true });
db.applications.createIndex({ "userId": 1 });
db.applications.createIndex({ "licenseTypeId": 1 });
db.personal_info.createIndex({ "applicationId": 1 }, { unique: true });
db.education.createIndex({ "applicationId": 1 }, { unique: true });
db.work_experience.createIndex({ "applicationId": 1 }, { unique: true });
db.references.createIndex({ "applicationId": 1 }, { unique: true });
db.documents.createIndex({ "applicationId": 1 }, { unique: true });

// Load initial license types
load("init-data.js"); 