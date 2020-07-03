import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
import 'antd/dist/antd.css';
// import Demo from "./b";

const link = createUploadLink({ uri: 'http://localhost:3005' });

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    {/*<Demo/>*/}
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
