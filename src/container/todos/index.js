import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useMutation, useLazyQuery } from '@apollo/client';
import { GET_TODOS, ADD_TODO, UPDATE_TODO, DELETE_TODO } from '../../service';
import Todo from './todo';

const Todos = () => {
    // const { loading, error, data, refetch, networkStatus } = useQuery(GET_TODOS);
    const [item, setItem] = useState(-1);
    const [name, setName] = useState('');
    const [test, setTest] = useState('');
    const [todos, setTodos] = useState([]);
    const [getTotos, { loading, data }] = useLazyQuery(GET_TODOS);
    const [createPlayer] = useMutation(ADD_TODO);
    const [updatePlayer] = useMutation(UPDATE_TODO);
    const [deletePlayer] = useMutation(DELETE_TODO);

    useEffect(() => {
        getTotos();
    }, []);

    useEffect(() => {
        setTodos(data?.players || []);
    }, [data]);

    const memoizedCallback = useCallback(
        () => {
            setItemAndTest(todos);
        },
        [todos],
    );

    function setItemAndTest(hi) {
        const todoss = [...todos];
        todoss[0] = { id: '11111', name: 'jujujuju' };
        console.tron.log('todoss', todoss);
        setTodos(todoss);
        setTest(`${item} ${hi}`);
    }

    function renderTodo(todo) {
        return (<Todo
            key={todo.id}
            setItemAndTest={memoizedCallback}
            setItem={setItem}
            todo={todo}
            isChoose={todo.id === item} />);
    }

    if (loading) return (<View
        style={[styles.viewContainer, styles.viewLoading]}>
        <Text style={styles.textLoading}>Loading...</Text>
    </View>);

    console.tron.log('rerender');
    return (
        <View style={styles.viewContainer}>
            <TextInput
                value={name}
                onChangeText={name => setName(name)}
                placeholder={'Enter Name'}
                style={styles.textInput} />
            <View style={styles.viewRow}>
                <TouchableOpacity
                    onPress={() => getTotos()}
                    style={styles.button}>
                    <Text style={styles.textName}>Reload</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => deletePlayer({ variables: { id: item } })}
                    style={styles.button}>
                    <Text style={styles.textName}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => updatePlayer({ variables: { id: item, name } })}
                    style={styles.button}>
                    <Text style={styles.textName}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => createPlayer({ variables: { name } })}
                    style={styles.button}>
                    <Text style={styles.textName}>Add</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.textName}> id item choose: {item}</Text>
            <View height={10} />
            <Text style={styles.textName}> test {test}</Text>
            <ScrollView style={styles.viewContainer}>
                {(todos || []).map(renderTodo)}
            </ScrollView>
        </View>
    );
};

export default Todos;

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        backgroundColor: 'white',
        marginTop: 10,
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
        alignItems: 'center',
        marginHorizontal: 5,
        flex: 1,
        borderRadius: 5,
        marginBottom: 10,
    },
});
