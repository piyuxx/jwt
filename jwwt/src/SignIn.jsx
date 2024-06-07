import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [message, setMessage] = useState('')
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setMessage('All Fields Required!!')
            return;
        }
        try {
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            setMessage(data.message)


            if (data.success === false) {
                return;
            }
            setFormData({})

        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

                <input
                    type='email'
                    placeholder='email'
                    className='border p-3 rounded-lg'
                    id='email'
                    value={formData?.email || ''}
                    onChange={handleChange}
                />
                <input
                    type='password'
                    placeholder='password'
                    className='border p-3 rounded-lg'
                    id='password'
                    // maxLength={18}
                    // minLength={5}
                    value={formData?.password || ''}

                    onChange={handleChange}
                />
                <button
                    className='bg-blue-500 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >
                    Sign
                </button>
                {message ? <span>{message}</span> : ''}
            </form>
            <div className='flex gap-2 mt-5'>
                <p>Don't Have an account?</p>
                <Link to={'/sign-up'}>
                    <span className='text-blue-700'>Sign Up</span>
                </Link>
            </div>
        </div >
    );
}