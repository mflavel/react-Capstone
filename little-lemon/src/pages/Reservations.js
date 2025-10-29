import { useState, useEffect } from "react";
import { FormLabel, Input, Select, Button } from "@chakra-ui/react";
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import '../Css/bookingForm.css';
import { useFormik } from "formik";
import { Link } from 'react-router-dom';




const Reservation = () => {
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
            //error message for invalid infomation
            .typeError('Invalid date')
            .required('Required')
            .min(minDate, 'Date cannot be in the past'),
        time: Yup.string().required('Please select a time'),
        guests: Yup.number().required('Required').min(1, 'At least 1 guest').max(10, 'At most 10 guests'),
        occasion: Yup.string().required('Please select an occasion'),
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


    return (
        <>
            <div className="booking">
                <h1 style={{ textAlign: 'center', margin: '1rem 0', fontSize: '20px' }}><b>Reserve a Table</b></h1>
                <form className="booking-page" onSubmit={formik.handleSubmit}>
  {/* Row 1: Date + Time */}
  <div className="form-row">
    <div className="form-group">
      <FormLabel htmlFor="res-date">Choose date</FormLabel>
      <Input
        className="input-booking"
        type="date"
        id="date"
        name="date"
        value={formik.values.date}
        onChange={(e) => {
          formik.handleChange(e);
          refreshTimesForDate(e.target.value, formik.setFieldValue);
        }}
        onBlur={formik.handleBlur}
      />
      {formik.touched.date && formik.errors.date && (
        <div className="error">{formik.errors.date}</div>
      )}
    </div>

    <div className="form-group">
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
          <option key={timeOption} value={timeOption}>
            {timeOption}
          </option>
        ))}
      </Select>
      {formik.touched.time && formik.errors.time && (
        <div className="error">{formik.errors.time}</div>
      )}
    </div>
  </div>

  {/* Row 2: Guests + Occasion */}
  <div className="form-row">
    <div className="form-group">
      <FormLabel htmlFor="guests">Number of guests</FormLabel>
      <Input
        className="input-booking"
        type="number"
        id="guests"
        name="guests"
        min="1"
        max="10"
        placeholder="1"
        value={formik.values.guests}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      {formik.touched.guests && formik.errors.guests && (
        <div className="error">{formik.errors.guests}</div>
      )}
    </div>

    <div className="form-group">
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
          <option key={partyOption} value={partyOption}>
            {partyOption}
          </option>
        ))}
      </Select>
      {formik.touched.occasion && formik.errors.occasion && (
        <div className="error">{formik.errors.occasion}</div>
      )}
    </div>
  </div>

  <Link to="/BookingForm">
    <button className="reserve-btn">Reserve a Table</button>
  </Link>
</form>

            </div>
        </>
    );
};

export default Reservation;