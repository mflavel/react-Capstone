import { useState, useEffect } from "react";
import { FormLabel, Input, Select, Button } from "@chakra-ui/react";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Css/bookingForm.css';
import { useFormik } from "formik";
import { useLocation } from "react-router-dom";


const BookingForm = () => {
    // helper to get today's date in YYYY-MM-DD for the date input
    const { state } = useLocation();
    const navigate = useNavigate();

    // availableTimes is loaded via fetchData so it can vary by date
    const [availableTimes, setAvailableTimes] = useState([]);
    const partyOccasion = ['Birthday', 'Anniversary', 'Other'];


    const validationSchema = Yup.object().shape({
        //error message for invalid infomation
        name: Yup.string().required('Name is required').min(2, 'Name is too short'),
        email: Yup.string().required('Email is required').email('Invalid email'),
        phone: Yup.string().required('Phone is required').matches(/^[0-9+()\-\s]{7,}$/, 'Invalid phone number')
    });


    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingPayload, setPendingPayload] = useState(null);

    // Use Formik for form state and validation
    const formik = useFormik({
        initialValues: {
            date: state?.date || '',
            time: state?.time || '',
            guests: state?.guests || '',
            occasion: state?.occasion || '',
            name: '',
            email: '',
            phone: ''
        },
        validationSchema,
        onSubmit: (values) => {
            // show confirmation dialog with validated values
            setPendingPayload(values);
            setShowConfirm(true);
        }
    });


    //confermation dialog functions for confirming
    const confirmReservation = () => {
        if (!pendingPayload) return;
        console.log('Reservation submitted:', pendingPayload);
        setShowConfirm(false);
        navigate('/conformation', { state: pendingPayload });
    };

    //confermation dialog functions for cancelling
    const cancelReservation = () => {
        setPendingPayload(null);
        setShowConfirm(false);
    };

    const backReservation = () => {
        navigate('/reservations');
    };

    return (
        // booking form
        <div className="booking-container" >
            <h1 style={{ textAlign: 'center', margin: '1rem 0', fontSize: '20px' }}><b>Reserve a Table</b></h1>
            <form className="booking-page" onSubmit={formik.handleSubmit}>
                {/* Row 1: Name + Email */}
                <div className="form-booking-row">
                    <div className="form-booking-group">
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Your Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="error">{formik.errors.name}</div>
                        )}
                    </div>

                    <div className="form-booking-group">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="error">{formik.errors.email}</div>
                        )}
                    </div>
                </div>

                {/* Row 2: Imported data + phone number */}
                <div className="form-booking-row imported-row">
                    <div className="booking-info">
                        <p><strong>Date:</strong> {state?.date}</p>
                        <p><strong>Time:</strong> {state?.time}</p>
                        <p><strong>Guests:</strong> {state?.guests}</p>
                        <p><strong>Occasion:</strong> {state?.occasion}</p>
                    </div>

                    <div className="form-booking-group phone-group">
                        <FormLabel htmlFor="phone">Phone Number</FormLabel>
                        <Input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Your Phone Number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <div className="error">{formik.errors.phone}</div>
                        )}
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" className="reserve-button" onClick={backReservation} >Change Reservation</button>
                    <button type="submit" className="reserve-button" id="button_submit1">
                        Make Your Reservation
                    </button>
                </div>
            </form>

            {/* conformation pop up */}
            {showConfirm && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: '#fff',
                        padding: '1.25rem',
                        borderRadius: '8px',
                        width: '90%',
                        maxWidth: '420px',
                        boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
                    }}>
                        <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Confirm Reservation</h2>
                        <p style={{ marginBottom: '1rem' }}>Are you sure you want to make this reservation?</p>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button type="button" onClick={cancelReservation} style={{ padding: '0.5rem 0.75rem' }}>Cancel</button>
                            <button type="button" onClick={confirmReservation} style={{ padding: '0.5rem 0.75rem', background: '#495E57', color: '#fff', border: 'none', borderRadius: '4px' }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingForm;