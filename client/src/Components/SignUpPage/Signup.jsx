import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline'; // Import EyeIcon and EyeOffIcon from Heroicons

function Signup() {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
 
  const sendWelcomeEmail = (email) => {
    console.log(`Simulating sending welcome email to ${email}`);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const submitForm = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('http://localhost:8004/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
      
      const data = await response.json();
      console.log(data);
      if(data.success === true) {
      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);
      localStorage.setItem('username', values.username);
      alert('Sign up successful');
      navigate('/posts');
      window.location.reload(); 
      }
      // Redirect to post list
    } catch (error) {
      console.error('Error signing up:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Sign up for an account
        </h2>
        <Formik
          initialValues={{
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            termsAndConditions: false,
          }}
          validationSchema={Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Required'),
            password: Yup.string()
              .min(6, 'Password must be at least 6 characters')
              .required('Required'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .required('Required'),
            termsAndConditions: Yup.boolean()
              .oneOf([true], 'You must accept the terms and conditions')
              .required('Required'),
          })}
          onSubmit={submitForm}
        >
          <Form className="space-y-6 w-full max-w-sm">
            <div className='flex flex-col items-center justify-center'>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="input-field rounded border-2 border-slate-600"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input-field rounded border-2 border-slate-600"
                placeholder="Email address"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className=" flex flex-col items-center justify-center relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type={passwordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                className="input-field rounded border-2 border-slate-600"
                placeholder="Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <EyeOffIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-500" />
                )}
              </button>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className=" flex flex-col items-center justify-center relative">
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type={confirmPasswordVisible ? "text" : "password"}
                autoComplete="new-password"
                required
                className="input-field rounded border-2 border-slate-600"
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? (
                  <EyeOffIcon className="h-6 w-6 text-gray-500" />
                ) : (
                  <EyeIcon className="h-6 w-6 text-gray-500" />
                )}
              </button>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 mt-2"
              />
            </div>
            <div className="flex items-center">
              <Field
                id="termsAndConditions"
                name="termsAndConditions"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="termsAndConditions"
                className="ml-2 block text-sm text-gray-900"
              >
                I agree to the{' '}
                <a href="#" className="text-blue-600">
                  terms and conditions
                </a>
              </label>
            </div>
            <ErrorMessage
              name="termsAndConditions"
              component="div"
              className="text-red-500 mt-2"
            />
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
