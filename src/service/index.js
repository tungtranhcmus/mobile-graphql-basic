import { gql } from '@apollo/client';

const _GET_TODOS = gql`
  query players {
    players  {
        name
        id
        jerseyNumber
        wonSuperBowl
    }
  }
`;

const _ADD_TODO = gql`
  mutation createPlayer($name: String!) {
    createPlayer(name: $name) {
      id
      name
    }
  }
`;

const _UPDATE_TODO = gql`
mutation updatePlayer($id: String!, $name: String!) {
    updatePlayer(id: $id, name: $name) {
      id
      name
    }
  }
`;

const _DELETE_TODO = gql`
mutation deletePlayer($id: String!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;

export const GET_TODOS = _GET_TODOS;
export const ADD_TODO = _ADD_TODO;
export const UPDATE_TODO = _UPDATE_TODO;
export const DELETE_TODO = _DELETE_TODO;