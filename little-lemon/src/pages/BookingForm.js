import { useState, useEffect } from "react";
import { FormLabel, Input, Select, Button } from "@chakra-ui/react";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Css/bookingForm.css';
import { useFormik } from "formik";


const BookingForm = () => {
    // helper to get today's date in YYYY-MM-DD for the date input
    const getTodaysDate = () => {
        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const initialDate = getTodaysDate();
    const navigate = useNavigate();

    // availableTimes is loaded via fetchData so it can vary by date
    const [availableTimes, setAvailableTimes] = useState([]);
    const partyOccasion = ['Birthday', 'Anniversary', 'Other'];

    // Simulated fetch function that returns available times for a given date.
    // Replace this with a real API call (fetch/axios) as needed.
    const fetchData = (selectedDate) => {
        const baseTimes = ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
        return new Promise((resolve) => {
            // simple deterministic filter based on day-of-month so results vary by date
            const dateToUse = selectedDate || getTodaysDate();
            const day = new Date(dateToUse).getDate();
            const filtered = baseTimes.filter((_, i) => ((i + day) % 2) === 0);
            // ensure there is at least one time available
            const result = filtered.length ? filtered : baseTimes;
            setTimeout(() => resolve(result), 200);
        });
    };

    // when the component mounts, fetch available times for today's date
    useEffect(() => {
        let mounted = true;
        fetchData(initialDate).then((times) => {
            if (mounted) setAvailableTimes(times);
        });
        return () => { mounted = false; };
    }, []);

    // helper used from inside Formik to refresh available times when date changes
    const refreshTimesForDate = async (selectedDate, setFieldValue) => {
        const times = await fetchData(selectedDate);
        setAvailableTimes(times);
        if (typeof setFieldValue === 'function') setFieldValue('time', '');
    };

    // Yup validation schema (no past dates)
    const minDate = new Date();
    minDate.setHours(0, 0, 0, 0);
    const validationSchema = Yup.object().shape({
        date: Yup.date()
            .transform((value, originalValue) => {
                // If already a Date instance, keep it
                if (originalValue instanceof Date && !isNaN(originalValue)) return originalValue;
                if (!originalValue) return null;
                // If the original value is an ISO datetime or already contains a time
                if (typeof originalValue === 'string' && (originalValue.includes('T') || originalValue.endsWith('Z'))) {
                    const parsed = new Date(originalValue);
                    return isNaN(parsed.getTime()) ? null : parsed;
                }
                // For plain YYYY-MM-DD strings from date inputs, append time to avoid timezone shift
                if (typeof originalValue === 'string') {
                    const parsed = new Date(originalValue + 'T00:00:00');
                    return isNaN(parsed.getTime()) ? null : parsed;
                }
                return null;
            })
            .typeError('Invalid date')
            .required('Required')
            .min(minDate, 'Date cannot be in the past'),
        time: Yup.string().required('Please select a time'),
        guests: Yup.number().required('Required').min(1, 'At least 1 guest').max(10, 'At most 10 guests'),
        occasion: Yup.string().required('Please select an occasion'),
        name: Yup.string().required('Name is required').min(2, 'Name is too short'),
        email: Yup.string().required('Email is required').email('Invalid email'),
        phone: Yup.string().required('Phone is required').matches(/^[0-9+()\-\s]{7,}$/, 'Invalid phone number')
    });


    const [clicked, setClicked] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [pendingPayload, setPendingPayload] = useState(null);

    // Use Formik for form state and validation
    const formik = useFormik({
        initialValues: {
            date: initialDate,
            time: '',
            guests: 1,
            occasion: 'Birthday',
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

    const buttonStyle = {
        backgroundColor: clicked ? '#495E57' : '#F4CE14',
        color: 'black',
        fontWeight: 'bold',
        padding: '8px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    };

    return (
        <div className="booking-container" >
            <h1 style={{ textAlign: 'center', margin: '1rem 0', fontSize: '20px' }}><b>Reserve a Table</b></h1>
            <form className="booking-page" onSubmit={formik.handleSubmit} style={{ display: 'grid', maxWidth: '400px', gap: '8px' }}>
                <FormLabel htmlFor="res-date">Choose date</FormLabel>
                <Input
                    className="input-booking"
                    type="date"
                    id="date"
                    name="date"
                    value={formik.values.date}
                    onChange={(e) => { formik.handleChange(e); refreshTimesForDate(e.target.value, formik.setFieldValue); }}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.date && formik.errors.date && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.date}</div>}

                <FormLabel htmlFor="res-time">Choose time</FormLabel>
                <Select
                    className="input-booking"
                    id="time"
                    name="time"
                    placeholder="Select time"
                    value={formik.values.time}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {availableTimes.map((timeOption) => (
                        <option key={timeOption} value={timeOption}>{timeOption}</option>
                    ))}
                </Select>
                {formik.touched.time && formik.errors.time && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.time}</div>}

                <FormLabel htmlFor="guests">Number of guests</FormLabel>
                <Input
                    className="input-booking"
                    type="number"
                    placeholder="1"
                    min="1"
                    max="10"
                    id="guests"
                    name="guests"
                    value={formik.values.guests}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.guests && formik.errors.guests && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.guests}</div>}

                <FormLabel htmlFor="occasion">Occasion</FormLabel>
                <Select
                    className="input-booking"
                    id="occasion"
                    name="occasion"
                    value={formik.values.occasion}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                >
                    {partyOccasion.map((partyOption) => (
                        <option key={partyOption} value={partyOption}>{partyOption}</option>
                    ))}
                </Select>
                {formik.touched.occasion && formik.errors.occasion && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.occasion}</div>}

                <FormLabel htmlFor="Name">Name</FormLabel>
                <Input
                    className="input-booking"
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.name}</div>}

                <FormLabel htmlFor="Email">Email</FormLabel>
                <Input
                    className="input-booking"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.email}</div>}

                <FormLabel htmlFor="Phone">Phone Number</FormLabel>
                <Input
                    className="input-booking"
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Your Phone Number"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && <div style={{ color: 'red', fontSize: '12px' }}>{formik.errors.phone}</div>}

                <Button
                    type="submit"
                    style={buttonStyle}
                    onClick={() => {
                        setClicked(true);
                        setTimeout(() => setClicked(false), 200);
                    }}
                >Make Your reservation</Button>
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