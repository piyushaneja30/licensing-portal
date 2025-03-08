import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  IconButton,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { LICENSE_TYPES } from '../../types/license';

const sortOptions = [
  { value: 'name_asc', label: 'Name (A-Z)' },
  { value: 'name_desc', label: 'Name (Z-A)' },
  { value: 'fee_asc', label: 'Fee (Low to High)' },
  { value: 'fee_desc', label: 'Fee (High to Low)' },
  { value: 'duration_asc', label: 'Duration (Shortest to Longest)' },
  { value: 'duration_desc', label: 'Duration (Longest to Shortest)' },
];

const LicenseSearch = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name_asc');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredLicenses, setFilteredLicenses] = useState(Object.values(LICENSE_TYPES));

  useEffect(() => {
    const filtered = Object.values(LICENSE_TYPES).filter((license) => {
      const matchesSearch = license.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        license.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedTypes.length === 0 || selectedTypes.includes(license.code);
      return matchesSearch && matchesType;
    });

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name_asc':
          return a.name.localeCompare(b.name);
        case 'name_desc':
          return b.name.localeCompare(a.name);
        case 'fee_asc':
          return a.fee - b.fee;
        case 'fee_desc':
          return b.fee - a.fee;
        case 'duration_asc':
          return a.validityPeriod - b.validityPeriod;
        case 'duration_desc':
          return b.validityPeriod - a.validityPeriod;
        default:
          return 0;
      }
    });

    setFilteredLicenses(sorted);
  }, [searchTerm, sortBy, selectedTypes]);

  const handleTypeToggle = (code: string) => {
    setSelectedTypes((prev) =>
      prev.includes(code)
        ? prev.filter((t) => t !== code)
        : [...prev, code]
    );
  };

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Search and Filters */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              mb: 3,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #1a237e11, #0d47a111)'
                : 'linear-gradient(45deg, #e3f2fd, #bbdefb33)',
            }}
          >
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search licenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth>
                    <InputLabel>Sort By</InputLabel>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      startAdornment={<SortIcon sx={{ mr: 1, color: 'text.secondary' }} />}
                    >
                      {sortOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <FilterIcon sx={{ color: 'text.secondary' }} />
                    {Object.values(LICENSE_TYPES).map((type) => (
                      <Chip
                        key={type.code}
                        label={type.code}
                        onClick={() => handleTypeToggle(type.code)}
                        color={selectedTypes.includes(type.code) ? 'primary' : 'default'}
                        sx={{
                          '&:hover': {
                            transform: 'translateY(-2px)',
                            transition: 'transform 0.2s ease',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* License Cards */}
        {filteredLicenses.map((license) => (
          <Grid item xs={12} md={6} key={license.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" gutterBottom>
                    {license.name}
                  </Typography>
                  <Tooltip title="View Requirements">
                    <IconButton size="small">
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {license.description}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Chip
                    label={`$${license.fee}`}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  <Chip
                    label={`${license.validityPeriod} months`}
                    size="small"
                    color="info"
                    variant="outlined"
                  />
                  <Chip
                    label={license.processingTime}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                </Box>
                <Typography variant="subtitle2" gutterBottom>
                  Requirements:
                </Typography>
                <Box component="ul" sx={{ pl: 2, mt: 0 }}>
                  {license.requirements.map((req, index) => (
                    <Typography
                      key={index}
                      component="li"
                      variant="body2"
                      color="text.secondary"
                    >
                      {req}
                    </Typography>
                  ))}
                </Box>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      transition: 'transform 0.2s ease',
                    },
                  }}
                >
                  Apply Now
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LicenseSearch; 