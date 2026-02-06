'use client'
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { RiAppleFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoMdMail } from "react-icons/io";
import { MdLock } from "react-icons/md";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { redirect } from 'next/navigation'


export default function Register() {

  function newPage () {
    redirect('404')
  }

  const [visible, isVisible] = useState(false)


    function Toggle() {
      isVisible(e => !e)
    }

  const Schema = z.object({
    email: z.string().email('Endereço de Email inválido'),
    password: z.string().min(1, "Esse campo não pode ficar vazio")
  })

  const { register, handleSubmit, formState: {errors, isSubmitSuccessful}} = useForm({
    resolver: zodResolver(Schema)
  })

      function SubmitResponse(data: any) {
        console.log(data)
      }


  return (
    <>
      <form onSubmit={handleSubmit(SubmitResponse)}>
        <CiLogin className="lg" size={52} />
        <h1>Sign in with email</h1>
        <span>
          Make a new doc to bring your words, data, and teams together. For free
        </span>

        <div className="inputs">
          <IoMdMail color="rgba(128, 128, 128, 0.84)" />
          <input type="email" {...register('email')} placeholder="Email" />
        </div>
        {errors.email && (
          <p className="errorr">{errors.email.message}</p>
        )}

        <div className="inputs">
          <MdLock color="rgba(128, 128, 128, 0.84)" />
          <input type={visible? "text":"password"} {...register('password')} placeholder="Password" />

          {visible? <BiSolidHide onClick={Toggle} color="rgba(128, 128, 128, 0.84)"/>: <BiSolidShow onClick={Toggle} color="rgba(128, 128, 128, 0.84)" />}

        </div>

        {errors.password && (
          <p className="errorr">
          {errors.password.message}
        </p>

        )}
        <p className="fgt" onClick={newPage}>Forgot password?</p>

        <input type="submit" value="Get Started" />
        <p className="or">---------- Or sign in with ----------</p>

        <div className="options">
          <div className="icn">
            <FcGoogle />
          </div>

          <div className="icn">
            <FaFacebook color="#0077ff" />
          </div>

          <div className="icn">
            <RiAppleFill />
          </div>
        </div>
      </form>
    </>
  );
}
