import {useRef, useState} from "react";
import './Form.css';

const Form = props => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        staff: '',
        bio: '',
        emailNotifications: 'No'
    });

    const [errors, setErrors] = useState([])

    const handleChange = keyName => e => {
        setUser(prev => ({...prev, [keyName]: e.target.value}))
    }
    
    const validate = () => {
        let newErrors = [];

        // name validation

        if (!user.name.trim()) {
            newErrors.name = 'Name is required.';
        }

        // email validation

        if (!user.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = 'Email address is invalid.';
        }
    
        // phone number validation

        if (user.phoneNumber.trim()) {
            if (!/^[\d\s-]+$/.test(user.phoneNumber)) {
                newErrors.phoneNumber = 'Phone number is invalid.';
            }

            if (!user.phoneType) {
                newErrors.phoneType = 'Phone type must be selected if a phone number is provided.';
            }
        }

        // bio validation

        if (user.bio.length > 280) {
            newErrors.bio = 'Bio should have a character limit of 280 characters.';
        }

        setErrors(newErrors);
        return newErrors;
    }

    const handleSubmit = e => {
        e.preventDefault();
        const resultErrors = validate();
        
        if (errors.length === 0) {
            console.log(user);

            setUser({
                name: '',
                email: '',
                phoneNumber: '',
                phoneType: '',
                staff: '',
                bio: '',
                emailNotifications: 'No'
            });
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:
                <input type="text" value={user.name} onChange={handleChange('name')} />
                {errors.name && <p className="error">{errors.name}</p>}
            </label>

            <label>Email:
                <input type="text" value={user.email} onChange={handleChange('email')} />
                {errors.email && <p className="error">{errors.email}</p>}
            </label>

            <label>Phone Number:
                <input type="text" value={user.phoneNumber} onChange={handleChange('phoneNumber')} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </label>
            
            <select value={user.phoneType} onChange={handleChange('phoneType')}>
                <option value="" disabled>Select a phone type:</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="mobile">Mobile</option>
            </select>
            {errors.phoneType && <p className="error">{errors.phoneType}</p>}


            <p>Staff:</p>
            <label>Instructor
                <input type="radio" name="staff" value="instructor" onChange={handleChange('staff')}/>
            </label>

            <label>Student
                <input type="radio" name="staff" value="student" onChange={handleChange('staff')} />
            </label>

            <textarea placeholder="Tell us about yourself" value={user.bio} onChange={handleChange('bio')}></textarea>
            {errors.bio && <p className="error">{errors.bio}</p>}

            <label>Do you want to subscribe to email notifications?
                <input type="checkbox" value="Yes" onChange={({target}) => setUser(prev => ({...prev, emailNotifications: target.checked ? 'Yes' : 'No'}))}/>
            </label>

            <button>Create User</button>
        </form>
    )
}

export default Form;