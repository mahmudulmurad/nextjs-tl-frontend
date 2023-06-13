import { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import LoginForm from '../components/login/Login.component';
import SignupForm from '../components/signup/Signup.component';
import { box, main } from './style';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('login');

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={main}>
      <Box sx={box}>
        <Tabs value={selectedTab} onChange={handleTabChange} centered>
          <Tab label="Login" value="login" />
          <Tab label="Signup" value="signup" />
        </Tabs>

        {selectedTab === 'login' && <LoginForm />}
        {selectedTab === 'signup' && <SignupForm />}
        </Box>
    </Box>
    
  );
};

export default HomePage;

