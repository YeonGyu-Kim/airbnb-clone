'use client';

import axios from 'axios';
import Button from '../Button';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { useState } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useRegisterModal } from '../hooks/useRegisterModal';
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RegisterModal() {
  const router = useRouter();
  const { isOpen, onClose, label } = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    /* axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Registered!');
        onClose();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      }); */
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in');
        router.refresh();
        onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const bodyContent = (
    <>
      <Heading title='Welcome to Airbnb' subtitle='Create an account' />
      {label === 'signUp' && (
        <Input
          id='name'
          label='Name'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      )}
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

  const footerContent = (
    <div className='flex flex-col gap-4'>
      <Button
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Button
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />
    </div>
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
      footer={footerContent}
    ></Modal>
  );
}
