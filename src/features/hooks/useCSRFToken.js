import { useSelector } from 'react-redux';
import { selectCSRFToken } from '../auth/authSlice';

export const useCSRFToken = () => {
  const csrfToken = useSelector(selectCSRFToken);
  return csrfToken;
};
