package com.licensing.portal.service;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MongoDBService {
    
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private MongoClient mongoClient;

    private static final String DATABASE_NAME = "licensing_portal";

    public MongoDatabase getDatabase() {
        return mongoClient.getDatabase(DATABASE_NAME);
    }

    public MongoCollection<Document> getCollection(String collectionName) {
        return getDatabase().getCollection(collectionName);
    }

    public Document findById(String collectionName, String id) {
        return getCollection(collectionName).find(new Document("_id", id)).first();
    }

    public List<Document> findAll(String collectionName) {
        List<Document> results = new ArrayList<>();
        getCollection(collectionName).find().into(results);
        return results;
    }

    public Document insertOne(String collectionName, Document document) {
        getCollection(collectionName).insertOne(document);
        return document;
    }

    public void updateOne(String collectionName, String id, Document update) {
        getCollection(collectionName).updateOne(
            new Document("_id", id),
            new Document("$set", update)
        );
    }

    public void deleteOne(String collectionName, String id) {
        getCollection(collectionName).deleteOne(new Document("_id", id));
    }

    public List<Document> findByField(String collectionName, String field, Object value) {
        List<Document> results = new ArrayList<>();
        getCollection(collectionName).find(new Document(field, value)).into(results);
        return results;
    }
} 