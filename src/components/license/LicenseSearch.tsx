import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Skeleton,
  useTheme,
  alpha
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  AccessTime as TimeIcon,
  CalendarToday as CalendarIcon,
  AttachMoney as MoneyIcon,
  CheckCircle as RequirementIcon,
  ArrowUpward as SortAscIcon,
  ArrowDownward as SortDescIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';

// Import category-specific icons
import {
  LocalHospital as HealthcareIcon,
  Engineering as EngineeringIcon,
  Construction as ConstructionIcon,
  Home as RealEstateIcon,
  ContentCut as PersonalServicesIcon,
  Business as BusinessIcon,
  SportsBasketball as SportsIcon,
  People as SocialServicesIcon,
  Security as SecurityIcon,
  More as OtherIcon
} from '@mui/icons-material';

interface License {
  id: string;
  name: string;
  description: string;
  fee: number;
  category: string;
  icon: string;
  requirements?: string[];
  processingTime?: string;
  validityPeriod?: string;
}

const categoryIcons: { [key: string]: React.ReactElement } = {
  Healthcare: <HealthcareIcon />,
  Engineering: <EngineeringIcon />,
  Construction: <ConstructionIcon />,
  'Real Estate': <RealEstateIcon />,
  'Personal Services': <PersonalServicesIcon />,
  Business: <BusinessIcon />,
  'Sports & Entertainment': <SportsIcon />,
  'Social Services': <SocialServicesIcon />,
  'Investigation & Security': <SecurityIcon />,
  Other: <OtherIcon />
};

const LICENSE_CATEGORIES = [
  'Healthcare',
  'Engineering',
  'Construction',
  'Real Estate',
  'Personal Services',
  'Business',
  'Sports & Entertainment',
  'Social Services',
  'Investigation & Security',
  'Other'
];

export default function LicenseSearch() {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data: licenses, isLoading, error } = useQuery<License[]>({
    queryKey: ['licenses', searchTerm, selectedCategory, sortBy, sortOrder],
    queryFn: async () => {
      try {
        const params = new URLSearchParams({
          query: searchTerm,
          category: selectedCategory,
          sortBy,
          sortOrder
        });
        const response = await fetch(`http://localhost:5001/api/licenses?${params}`);
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error:', errorText);
          throw new Error(`Failed to fetch licenses: ${errorText}`);
        }
        const data = await response.json();
        console.log('Fetched licenses:', data);
        return data;
      } catch (error) {
        console.error('Fetch error:', error);
        throw error;
      }
    },
    retry: 1
  });

  const handleSortChange = (newSortBy: string) => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(newSortBy);
      setSortOrder('asc');
    }
  };

  const handleApplyNow = (license: License) => {
    // Store the selected license in Redux
    dispatch({
      type: 'application/setSelectedLicense',
      payload: license
    });
    // Navigate to the application form
    navigate('/new-application');
  };

  const renderSkeleton = () => (
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card>
            <CardContent>
              <Skeleton variant="rectangular" height={40} />
              <Skeleton variant="text" height={80} />
              <Skeleton variant="text" width="60%" />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error" variant="h6">
          Error loading licenses. Please try again later.
        </Typography>
        <Typography color="error" variant="body2">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Professional License Search
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search licenses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: searchTerm && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                label="Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {LICENSE_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {categoryIcons[category]}
                      {category}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="fee">Fee</MenuItem>
                <MenuItem value="processingTime">Processing Time</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {isLoading ? (
        renderSkeleton()
      ) : licenses?.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No licenses found matching your criteria
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {licenses?.map((license: License) => (
            <Grid item xs={12} sm={6} md={4} key={license.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                      backgroundColor: alpha(theme.palette.primary.main, 0.04)
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1 }}>
                      {categoryIcons[license.category]}
                      <Typography variant="h6" component="h2">
                        {license.name}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {license.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        icon={<MoneyIcon />}
                        label={`$${license.fee}`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      {license.processingTime && (
                        <Chip
                          icon={<TimeIcon />}
                          label={license.processingTime}
                          size="small"
                          color="info"
                          variant="outlined"
                        />
                      )}
                      {license.validityPeriod && (
                        <Chip
                          icon={<CalendarIcon />}
                          label={license.validityPeriod}
                          size="small"
                          color="success"
                          variant="outlined"
                        />
                      )}
                    </Box>
                    {license.requirements && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Requirements:
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {license.requirements.map((req, index) => (
                            <Chip
                              key={index}
                              icon={<RequirementIcon />}
                              label={req}
                              size="small"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => handleApplyNow(license)}
                    >
                      Apply Now
                    </Button>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
} 