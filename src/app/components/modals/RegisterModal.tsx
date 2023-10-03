'use client';

import axios from 'axios';
import { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterModal } from '../hooks/useRegisterModal';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';

export default function RegisterModal() {
  const { isOpen, onClose } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => onClose())
      .catch((error) => {
        toast.error('Something Went Wrong');
      })
      .finally(() => setIsLoading(false));
  };

  const bodyContent = (
    <>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='email'
        label='Email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='password'
        label='Password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title='Log in or sign up'
      actionLabel='Continue'
      disabled={isLoading}
      body={bodyContent}
    ></Modal>
  );
}
