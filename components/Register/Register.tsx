'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useSWRMutation from 'swr/mutation';
import { authRequest } from '@/core/api.crud';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormSchema {
  name: string;
  email: string;
  password: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid Email Address').required('Email is Required')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email Address'),
  password: yup.string().required('Password is required'),
});

const Registration = ({role}: {role: string}) => {
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

  const { trigger } = useSWRMutation(`register`, authRequest, {
    onSuccess() {
      router.push(`/${role}/login`)      
    },
  });

  const onSubmit = (data: FormSchema) => {
    trigger({ ...data, role: role.charAt(0).toUpperCase() + role.slice(1) });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title text-center">Registration</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      />
                    )}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">Register</button>

                <div className="mt-3">
                  Already have an account?{' '}
                  <Link href={`/${role}/login`}>
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
