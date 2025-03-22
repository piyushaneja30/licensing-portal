import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import ApplicationFlow from '../ApplicationFlow';
import applicationReducer from '../../../store/slices/applicationSlice';
import { submitApplication } from '../../../redux/actions/applicationActions';
import { ApplicationState } from '../../../store/slices/applicationSlice';

// Mock Material-UI components
jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  TextField: ({ label, onChange, error, helperText, name, id }: any) => (
    <div>
      <label htmlFor={id || name}>{label}</label>
      <input
        id={id || name}
        name={name}
        type="text"
        onChange={onChange}
        aria-invalid={error}
        aria-describedby={error ? `${label}-error` : undefined}
      />
      {error && <div id={`${label}-error`}>{helperText}</div>}
    </div>
  ),
  Button: ({ children, onClick }: any) => (
    <button onClick={onClick}>{children}</button>
  ),
  Alert: ({ children }: any) => <div role="alert">{children}</div>,
  Box: ({ children }: any) => <div>{children}</div>,
  Container: ({ children }: any) => <div>{children}</div>,
  Paper: ({ children }: any) => <div>{children}</div>,
  Typography: ({ children }: any) => <div>{children}</div>,
  Stepper: ({ children }: any) => <div>{children}</div>,
  Step: ({ children }: any) => <div>{children}</div>,
  StepLabel: ({ children }: any) => <div>{children}</div>,
  StepContent: ({ children }: any) => <div>{children}</div>,
}));

// Mock the API call
const mockSubmitApplication = jest.fn();
jest.mock('../../../redux/actions/applicationActions', () => ({
  submitApplication: {
    pending: 'application/submitApplication/pending',
    fulfilled: 'application/submitApplication/fulfilled',
    rejected: 'application/submitApplication/rejected',
    __esModule: true,
    default: () => mockSubmitApplication(),
  },
}));

// Create a mock store
const createMockStore = (initialState: Partial<ApplicationState> = {}) => {
  return configureStore({
    reducer: {
      application: applicationReducer,
    },
    preloadedState: {
      application: {
        applications: [],
        loading: false,
        error: null,
        ...initialState,
      },
    },
  });
};

describe('ApplicationFlow Component', () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should submit application successfully', async () => {
    const mockApplication = {
      applicationNumber: 'APP-123',
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      },
      education: [
        {
          institution: 'Test University',
          degree: 'Bachelor',
          graduationYear: 2024,
        },
      ],
      status: 'submitted',
      submissionDate: new Date(),
    };

    mockSubmitApplication.mockResolvedValueOnce({
      type: 'application/submitApplication/fulfilled',
      payload: mockApplication,
    });

    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ApplicationFlow />
        </BrowserRouter>
      </Provider>
    );

    // Fill in personal information
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.click(screen.getByText('Next'));
    });

    // Fill in education details
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/University/i), {
        target: { value: 'Test University' },
      });
      fireEvent.change(screen.getByLabelText(/Degree/i), {
        target: { value: 'Bachelor' },
      });
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip work experience
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip professional references
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip document upload
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip legal declarations
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Submit the application
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit Application/i));
    });

    // Wait for the submission to complete
    await waitFor(() => {
      expect(mockSubmitApplication).toHaveBeenCalledWith(expect.objectContaining({
        personalInfo: expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
        }),
        education: expect.arrayContaining([
          expect.objectContaining({
            institution: 'Test University',
            degree: 'Bachelor',
          }),
        ]),
      }));
    });

    // Verify navigation to success page
    expect(mockNavigate).toHaveBeenCalledWith('/application-success/APP-123');
  });

  it('should show error when submission fails', async () => {
    mockSubmitApplication.mockRejectedValueOnce(new Error('Submission failed'));

    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ApplicationFlow />
        </BrowserRouter>
      </Provider>
    );

    // Fill in personal information
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/First Name/i), {
        target: { value: 'John' },
      });
      fireEvent.change(screen.getByLabelText(/Last Name/i), {
        target: { value: 'Doe' },
      });
      fireEvent.click(screen.getByText('Next'));
    });

    // Fill in education details
    await act(async () => {
      fireEvent.change(screen.getByLabelText(/University/i), {
        target: { value: 'Test University' },
      });
      fireEvent.change(screen.getByLabelText(/Degree/i), {
        target: { value: 'Bachelor' },
      });
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip work experience
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip professional references
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip document upload
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Skip legal declarations
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Submit the application
    await act(async () => {
      fireEvent.click(screen.getByText(/Submit Application/i));
    });

    // Wait for error message to appear
    await waitFor(() => {
      expect(screen.getByText(/Failed to submit application/i)).toBeInTheDocument();
    });
  });

  it('should validate required fields before submission', async () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ApplicationFlow />
        </BrowserRouter>
      </Provider>
    );

    // Try to submit without filling required fields
    await act(async () => {
      fireEvent.click(screen.getByText('Next'));
    });

    // Wait for validation messages
    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
    });

    // Verify that submitApplication was not called
    expect(mockSubmitApplication).not.toHaveBeenCalled();
  });
}); 