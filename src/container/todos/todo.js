/* eslint-disable react/prop-types */
import React, { memo, useMemo } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const Todo = ({ todo, isChoose, setItem, setItemAndTest }) => {

    console.tron.log(`rerender ${JSON.stringify(todo.id.slice(todo.id.length - 3))}`);

    function decideWhatToSay(todo) {
        return todo?.name;
    }
    const myReply = useMemo(() => decideWhatToSay(todo), [todo]);

    return (
        <TouchableOpacity
            onPress={() => setItem(todo.id)}
            style={[styles.viewItem, isChoose && styles.viewItemChoose]}>
            <Text style={styles.textName}>{myReply}</Text>
            <TouchableOpacity
                style={styles.viewTest}
                onPress={() => setItemAndTest('haha')} />
        </TouchableOpacity>
    );
};

export default memo(Todo, areEqual);

function areEqual(prevProps, nextProps) {
    return prevProps.isChoose === nextProps.isChoose
        && prevProps.setItemAndTest === nextProps.setItemAndTest;
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
}


const styles = StyleSheet.create({
    viewItem: {
        paddingVertical: 15,
        marginVertical: 5,
        backgroundColor: '#e6e6e6',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    textName: {
        color: '#595959',
        fontSize: 15,
    },
    viewItemChoose: { backgroundColor: '#ffcccc' },
    viewTest: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'gray',
    },
});
