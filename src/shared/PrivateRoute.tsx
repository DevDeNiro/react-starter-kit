import { Navigate, Outlet } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { useAuth } from '@hooks/useAuth.ts';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid white;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 16px;
`;

const LoadingText = styled.p`
  font-size: 18px;
  font-weight: 500;
  margin: 0;
  text-align: center;
`;

const LoadingSubtext = styled.p`
  font-size: 14px;
  opacity: 0.8;
  margin: 8px 0 0 0;
  text-align: center;
`;

const LoadingScreen = () => (
    <LoadingContainer>
        <Spinner />
        <LoadingText>Checking authentication</LoadingText>
        <LoadingSubtext>Please wait...</LoadingSubtext>
    </LoadingContainer>
);

const PrivateRoute = () => {
    const { isAuthenticated, isLoading, error } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (error) {
        console.error('Erreur d\'authentification:', error);
        return <Navigate to="/auth/oauth2/login" replace />;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/auth/oauth2/login" replace />;
};

export default PrivateRoute;