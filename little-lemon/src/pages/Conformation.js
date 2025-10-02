import { useLocation } from 'react-router-dom';
import {Button} from '@chakra-ui/react'
import '../Css/bookingForm.css';

const Conformation = () => {
    const { state } = useLocation();
    const { date, time, guests, occasion,name, email, phone} = state || {};

    return (
        <div className='conformation-page'>
            <h2>Reservation Confirmed</h2>
            <p>Thank you — your reservation has been received.</p>
            {state ? (
                <div className='confirmation-details'>
                    <p><strong>Date:</strong>   {date}</p>
                    <p><strong>Time:</strong> {time}</p>
                    <p><strong>Guests:</strong> {guests}</p>
                    <p><strong>Occasion:</strong> {occasion}</p>
                    <p><strong>Name:</strong> {name}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <Button onClick={() => window.location.href = '/'}>Back to Home</Button>
                </div>
            ) : (
                <p>No reservation details were provided.</p>
            )}
        </div>
    );
};

export default Conformation;