export const CONFIG_ENV = () => {
  const client = window.location.hostname;
  const port = '5150';
  let config = {
    ENV: 'development',
    CLIENT_ID: '11bb4c1845c7a0137ad0bc8f1df055792849df16',
    RESOURCE_OWNER: 'resource_owner',
    APP: 'Parent Portal Admin',
    HOST: 'https://79e9d355-89e0-467b-a7dd-b7736ecff063.mock.pstmn.io'
  };
  return config;
};
