import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useMutation, gql, useLazyQuery } from '@apollo/client';

const GET_TODOS = gql`
  query players {
    players  {
        name
        id
        jerseyNumber
        wonSuperBowl
    }
  }
`;

const ADD_TODO = gql`
  mutation createPlayer($name: String!) {
    createPlayer(name: $name) {
      id
      name
    }
  }
`;

const UPDATE_TODO = gql`
mutation updatePlayer($id: String!, $name: String!) {
    updatePlayer(id: $id, name: $name) {
      id
      name
    }
  }
`;

const DELETE_TODO = gql`
mutation deletePlayer($id: String!) {
    deletePlayer(id: $id) {
      id
    }
  }
`;


const Todos = () => {
    // const { loading, error, data, refetch, networkStatus } = useQuery(GET_TODOS);
    const [getDog, { loading, data }] = useLazyQuery(GET_TODOS);
    const [createPlayer] = useMutation(ADD_TODO);
    const [updatePlayer] = useMutation(UPDATE_TODO);
    const [deletePlayer] = useMutation(DELETE_TODO);
    const [name, setName] = useState('');
    const [item, setItem] = useState(-1);
    useEffect(() => {
        getDog();
    }, []);
    if (loading) return (<View style={[styles.viewContainer, styles.viewLoading]}><Text style={styles.textLoading}>Loading...</Text></View>);

    function renderTodo(todo) {
        return (<TouchableOpacity
            onPress={() => setItem(todo.id)}
            style={[styles.viewItem, todo.id === item && { backgroundColor: '#ffcccc' }]}>
            <Text style={styles.textName}>{todo?.name}</Text>
        </TouchableOpacity>);
    }

    return (
        <View style={styles.viewContainer}>
            <TextInput
                value={name}
                onChangeText={name => setName(name)}
                placeholder={'Enter Name'}
                style={styles.textInput}
            />
            <View style={styles.viewRow}>
                <TouchableOpacity
                    onPress={() => {
                        getDog();
                    }}
                    style={styles.button}>
                    <Text style={styles.textName}>Reload</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        deletePlayer({ variables: { id: item } });
                    }}
                    style={styles.button}>
                    <Text style={styles.textName}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        updatePlayer({ variables: { id: item, name } });
                    }}
                    style={styles.button}>
                    <Text style={styles.textName}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        createPlayer({ variables: { name } });
                    }}
                    style={styles.button}>
                    <Text style={styles.textName}>Add</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.textName}> id item choose: {item}</Text>
            <ScrollView style={styles.viewContainer}>
                {(data?.players || []).map(renderTodo)}
            </ScrollView>
        </View>
    );
};

export default Todos;

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    viewLoading: {
        backgroundColor: '#cce6ff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textLoading: {
        fontSize: 15,
        color: '#3399ff',
    },
    viewError: {
        backgroundColor: '#ffddcc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textError: {
        fontSize: 15,
        color: '#ff5500',
    },
    viewItem: {
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
    },
    textName: {
        color: '#595959',
        fontSize: 15,
    },
    textInput: {
        marginTop: 50,
        fontSize: 15,
        backgroundColor: '#cceeff',
        paddingVertical: 15,
        paddingHorizontal: 15,
    },
    viewRow: {
        flexDirection: 'row',
        height: 50,
        marginTop: 10,
    },
    button: {
        backgroundColor: '#00b300',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
});
