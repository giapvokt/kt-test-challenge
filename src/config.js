export const CONFIG_ENV = () => {
  const client = window.location.hostname;
  const port = '5150';
  let config;
  switch (process.env.NODE_ENV) {
    case 'dev':
      config = {
        ENV: 'development',
        CLIENT_ID: '11bb4c1845c7a0137ad0bc8f1df055792849df16',
        RESOURCE_OWNER: 'resource_owner',
        APP: 'Parent Portal Admin',
        HOST: 'https://79e9d355-89e0-467b-a7dd-b7736ecff063.mock.pstmn.io'
      };

      return config;
    case 'production':
      config = {
        ENV: 'production',
        CLIENT_ID: '11bb4c1845c7a0137ad0bc8f1df055792849df16',
        RESOURCE_OWNER: 'resource_owner',
        APP: 'Parent Portal Admin',
        HOST: 'https://79e9d355-89e0-467b-a7dd-b7736ecff063.mock.pstmn.io'
      };

      return config;
    case 'parentportaladmin.karrostech.io':
      config = {
        ENV: 'staging',
        CLIENT_ID: '11bb4c1845c7a0137ad0bc8f1df055792849df16',
        RESOURCE_OWNER: 'resource_owner',
        APP: 'Parent Portal Admin',
        HOST: 'https://api.karrostech.io'
      };

      return config;
    default:
      config = {
        ENV: 'development',
        CLIENT_ID: '0844c776530ac4da07fdbbe3e588ee642a13657e',
        RESOURCE_OWNER: 'resource_owner',
        APP: 'Parent Portal Admin',
        HOST: 'https://79e9d355-89e0-467b-a7dd-b7736ecff063.mock.pstmn.io'
      };

      return config;
  }
};
