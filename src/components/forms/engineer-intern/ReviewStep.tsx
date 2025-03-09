import React from 'react';
import {
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';

interface ReviewStepProps {
  formData: {
    personalInfo: any;
    education: any;
    documents: any;
  };
  onEdit: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, onEdit }) => {
  const { personalInfo, education, documents } = formData;

  const formatDate = (date: string | Date | null) => {
    if (!date) return 'Not provided';
    return new Date(date).toLocaleDateString();
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Review Your Application
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Please review your application details before submission. Click the edit button to make any changes.
        </Typography>
      </Grid>

      {/* Personal Information Section */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Personal Information</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => onEdit(0)}
                size="small"
              >
                Edit
              </Button>
            </Box>
            <List>
              <ListItem>
                <ListItemText
                  primary="Full Name"
                  secondary={`${personalInfo?.firstName} ${personalInfo?.lastName}`}
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Contact Information"
                  secondary={
                    <>
                      <Typography component="span" display="block">
                        Email: {personalInfo?.email}
                      </Typography>
                      <Typography component="span" display="block">
                        Phone: {personalInfo?.phone}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              <Divider component="li" />
              <ListItem>
                <ListItemText
                  primary="Address"
                  secondary={
                    <>
                      <Typography component="span" display="block">
                        {personalInfo?.address.street}
                      </Typography>
                      <Typography component="span" display="block">
                        {personalInfo?.address.city}, {personalInfo?.address.state} {personalInfo?.address.zipCode}
                      </Typography>
                      <Typography component="span" display="block">
                        {personalInfo?.address.country}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Education Section */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Education</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => onEdit(1)}
                size="small"
              >
                Edit
              </Button>
            </Box>
            <List>
              {education?.education.map((edu: any, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem>
                    <ListItemText
                      primary={edu.institution}
                      secondary={
                        <>
                          <Typography component="span" display="block">
                            {edu.degree} in {edu.major}
                          </Typography>
                          <Typography component="span" display="block">
                            Graduation Date: {formatDate(edu.graduationDate)}
                          </Typography>
                          <Typography component="span" display="block">
                            GPA: {edu.gpa}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      {/* Documents Section */}
      <Grid item xs={12}>
        <Card variant="outlined">
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Documents</Typography>
              <Button
                startIcon={<EditIcon />}
                onClick={() => onEdit(2)}
                size="small"
              >
                Edit
              </Button>
            </Box>
            <List>
              {documents?.map((doc: any, index: number) => (
                <React.Fragment key={index}>
                  {index > 0 && <Divider component="li" />}
                  <ListItem>
                    <ListItemText
                      primary={doc.type.charAt(0).toUpperCase() + doc.type.slice(1)}
                      secondary={
                        <>
                          <Typography component="span" display="block">
                            File: {doc.name}
                          </Typography>
                          <Typography component="span" display="block">
                            Uploaded: {formatDate(doc.uploadDate)}
                          </Typography>
                          <Typography component="span" display="block">
                            Status: {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          By submitting this application, you confirm that all the information provided is accurate and complete.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ReviewStep; 