import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const addOrUpdateTask = () => {
    if (editIndex === -1) {
      // Add new task
      if (task.trim() !== '') {
        setTasks([...tasks, task]);
        setTask('');
      }
    } else {
      // Update existing task
      if (task.trim() !== '') {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setTask('');
        setEditIndex(-1);
      }
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setEditIndex(index);
    setTask(tasks[index]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logoText}>TodoApp</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.addEditText}>Add or Edit tasks:</Text>
        <TextInput
          style={styles.input}
          value={task}
          onChangeText={(text) => setTask(text)}
          placeholder="Enter task..."
        />
        <TouchableOpacity style={styles.button} onPress={addOrUpdateTask}>
          <Text style={styles.buttonText}>{editIndex === -1 ? 'Add Task' : 'Update Task'}</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView}>
        {tasks.map((task, index) => (
          <View key={index} style={styles.taskContainer}>
            <Text style={styles.taskText}>{task}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={() => editTask(index)}>
                <Text style={styles.editButton}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(index)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoText: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  addEditText: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  scrollView: {
    width: '100%',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    paddingVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
  },
});
