import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../../config';
import Todos from '../todos';
import '../../config/reactotronConfig';

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Todos />
    </ApolloProvider>
  );
};

export default Root;