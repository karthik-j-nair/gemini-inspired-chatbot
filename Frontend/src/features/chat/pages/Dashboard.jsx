import {useSelector} from 'react-redux';
import { useChat } from '../hooks/useChat';
import { useEffect } from 'react';

const Dashboard = () => {

    const {user} = useSelector(state => state.auth);
    const chat = useChat();

    console.log(user);

    useEffect(()=>{
        chat.initializeSocketConnection();
    }, []);
    
  return (
    <div className='text-3xl font-bold text-center mt-20'>Dashboard</div>
  )
}

export default Dashboard