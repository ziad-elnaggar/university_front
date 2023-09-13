'use client'

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authRequest } from '@/core/api.crud';
import useSWRMutation from 'swr/mutation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormSchema {
	email: string;
	password: string;
}

const schema = yup.object({
	email: yup.string().email('Invalid Email Address').required('Email is Required')
        .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid Email Address'),
	password: yup.string().required('Password is Required'),
});

const Login = ({role}: {role: string}) => {
  const route = useRouter()

  const { control, handleSubmit, formState: { errors } } = useForm<FormSchema>({
    resolver: yupResolver(schema),
  });

  const {data, trigger} = useSWRMutation(`login/${role}`, authRequest, {
    onSuccess(data) {
        localStorage.setItem('token', data.data.token)
        localStorage.setItem('role', data.data.role)
        route.push(`/${role}/dashboard`)
    },
  })
  
  const onSubmit = (data: FormSchema) => {
    trigger(data)
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <button type="submit" className="btn btn-primary">Login</button>

                <div className="mt-3">
                  Don&apos;t have an account?{' '}
                  <Link href={`/${role}/register`}>
                    Register
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

export default Login;
