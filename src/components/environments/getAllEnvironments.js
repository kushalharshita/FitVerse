import {
    addEnvironment,
} from '../environments/environmentSlice';
import { db, auth } from '../../firebase';
import { collection, addDoc, onSnapshot, query } from 'firebase/firestore';
import { useDispatch } from 'react-redux';



export default function GetAllEnvironments() {
    const dispatch = useDispatch();
    const q = query(collection(db, "environments"));
    let todosArray = [];
    const unsub = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            todosArray.push({ ...doc.data(), id: doc.id });
        });
        console.log("todosArray1", todosArray);
    });

    todosArray.map((e) => {
        dispatch(addEnvironment(e));
    })
}