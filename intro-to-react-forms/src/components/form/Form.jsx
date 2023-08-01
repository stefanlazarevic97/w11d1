import { useState } from "react";
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
        
        if (Object.keys(resultErrors).length === 0) {
            const updatedUser = {...user, submissionTime: new Date().toISOString()};

            console.log(updatedUser);

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
                <input type="text" value={user.name} onChange={handleChange('name')} className={errors.name ? 'input-error' : ''} />
                {errors.name && <p className="error">{errors.name}</p>}
            </label>
            <br></br>

            <label>Email:
                <input type="text" value={user.email} onChange={handleChange('email')} className={errors.email ? 'input-error' : ''} />
                {errors.email && <p className="error">{errors.email}</p>}
            </label>
            <br></br>

            <label>Phone Number:
                <input placeholder="XXX-XXX-XXXX" type="text" value={user.phoneNumber} onChange={handleChange('phoneNumber')} className={errors.phoneNumber ? 'input-error' : ''} />
                {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
            </label>
            <br></br>
            
            <select value={user.phoneType} disabled={user.phoneNumber.length < 12} onChange={handleChange('phoneType')} className={errors.phoneType ? 'input-error' : ''}>
                <option value="" disabled>Select a phone type:</option>
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="mobile">Mobile</option>
            </select>
            {errors.phoneType && <p className="error">{errors.phoneType}</p>}
            <br></br>

            <p>Staff:</p>
            <label>Instructor
                <input type="radio" name="staff" value="instructor" onChange={handleChange('staff')}/>
            </label>

            <label>Student
                <input type="radio" name="staff" value="student" onChange={handleChange('staff')} />
            </label>
            <br></br>

            <textarea placeholder="Tell us about yourself" value={user.bio} onChange={handleChange('bio')} className={errors.bio ? 'input-error' : ''}></textarea>
            {errors.bio && <p className="error">{errors.bio}</p>}
            <br></br>

            <label>Do you want to subscribe to email notifications?
                <input type="checkbox" value="Yes" onChange={({target}) => setUser(prev => ({...prev, emailNotifications: target.checked ? 'Yes' : 'No'}))}/>
            </label>
            <br></br>

            <button>Create User</button>
        </form>
    )
}

export default Form;