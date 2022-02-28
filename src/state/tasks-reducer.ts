import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskACType = {
    type: 'REMOVE-TASK';
    id: string;
    todolistId: string;
}
export type AddTaskACType = {
    type: 'ADD-TASK';
    taskTitle: string;
    todolistId: string;
}
export type ChangeTaskStatusACType = {
    type: 'CHANGE-TASK-STATUS';
    id: string;
    isDone: boolean;
    todolistId: string;
}
export type ChangeTaskTitleACType = {
    type: 'CHANGE-TASK-TITLE';
    id: string;
    title: string;
    todolistId: string;
}

type ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | ChangeTaskTitleACType
    | AddTodolistActionType | RemoveTodolistActionType;

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            let todolistTasks = state[action.todolistId];
            state[action.todolistId] = todolistTasks.filter(f => f.id != action.id);
            return {...state};
        case 'ADD-TASK':
            let task = {id: v1(), title: action.taskTitle, isDone: false};
            let tasks = state[action.todolistId];
            state[action.todolistId] = [task, ...tasks];
            return {...state};
        case 'CHANGE-TASK-STATUS':
            let currentTodolist = state[action.todolistId].map(m => m.id === action.id ? {...m, isDone: action.isDone} : m);
            state[action.todolistId] = currentTodolist;
            return {...state};
        case 'CHANGE-TASK-TITLE':
            let changedTask = state[action.todolistId].find(f => f.id === action.id);
            if (changedTask) changedTask.title = action.title;
            return {...state};
        case 'ADD-TODOLIST':
            let stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (id: string, todolistId: string): RemoveTaskACType => {
    return { type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}
export const addTaskAC = (taskTitle: string, todolistId: string): AddTaskACType => {
    return { type: 'ADD-TASK', taskTitle: taskTitle, todolistId: todolistId}
}
export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusACType => {
    return { type: 'CHANGE-TASK-STATUS', id: id, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleACType => {
    return { type: 'CHANGE-TASK-TITLE', id: id, title: title, todolistId: todolistId}
}