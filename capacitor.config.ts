import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.robot.solar',
  appName: 'GamesLog',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '1095247217419-e240gfjnjcjef8451tqt2o4pkks2hctm.apps.googleusercontent.com', // Reemplaza con tu client ID
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
