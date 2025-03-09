import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  CheckCircle as CheckIcon,
  Description as FileIcon,
} from '@mui/icons-material';

interface Document {
  type: string;
  name: string;
  url: string;
  uploadDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface DocumentsStepProps {
  initialValues: Document[] | null;
  onSave: (documents: Document[]) => void;
}

const DocumentsStep: React.FC<DocumentsStepProps> = ({ initialValues, onSave }) => {
  const [documents, setDocuments] = useState<Document[]>(initialValues || []);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleFileUpload = (documentType: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate upload progress
    const key = `${documentType}-${Date.now()}`;
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(prev => ({ ...prev, [key]: progress }));
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate successful upload
        const newDocument: Document = {
          type: documentType,
          name: file.name,
          url: URL.createObjectURL(file), // In a real app, this would be the server URL
          uploadDate: new Date().toISOString(),
          status: 'pending',
        };
        const updatedDocuments = [...documents, newDocument];
        setDocuments(updatedDocuments);
        onSave(updatedDocuments);
      }
    }, 300);
  };

  const requiredDocuments = [
    {
      type: 'transcript',
      label: 'Official Transcripts',
      description: 'Upload your official academic transcripts (PDF)',
    },
    {
      type: 'identification',
      label: 'Government ID',
      description: 'Upload a valid government-issued ID (PDF, JPG)',
    },
    {
      type: 'resume',
      label: 'Resume/CV',
      description: 'Upload your current resume or CV (PDF)',
    },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Required Documents
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Please upload all required documents in PDF or image format.
        </Typography>
      </Grid>

      {requiredDocuments.map((doc) => {
        const uploadedDoc = documents.find(d => d.type === doc.type);
        const progress = uploadProgress[doc.type];

        return (
          <Grid item xs={12} key={doc.type}>
            <Card variant="outlined">
              <CardContent>
                <List>
                  <ListItem>
                    <ListItemIcon>
                      {uploadedDoc ? <CheckIcon color="success" /> : <FileIcon />}
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.label}
                      secondary={uploadedDoc ? uploadedDoc.name : doc.description}
                    />
                    {progress && progress < 100 ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress
                          variant="determinate"
                          value={progress}
                          size={24}
                        />
                        <Typography variant="body2">
                          {progress}%
                        </Typography>
                      </Box>
                    ) : (
                      <Button
                        component="label"
                        variant="outlined"
                        startIcon={<UploadIcon />}
                        disabled={!!uploadedDoc}
                      >
                        {uploadedDoc ? 'Uploaded' : 'Upload'}
                        <input
                          type="file"
                          hidden
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileUpload(doc.type)}
                        />
                      </Button>
                    )}
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default DocumentsStep; 