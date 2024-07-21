
"use client";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { z } from "zod"
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/patient.actions";
import toast from "react-hot-toast";


export enum FormFieldType{
    INPUT = 'input',
    TEXTAREA = 'textarea',
    PHONE_INPUT = 'phoneInput',
    CHECKBOX= 'checkbox',
    DATE_PICKER = 'datePicker',
    SELECT= 'select',
    SKELETON = 'skeleton'
}


export function PatientForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email:"",
      phone:"",
    },
  })

  const onSubmit = async(values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);
    try{
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
     
      const newUser = await createUser(user);

     if(newUser) {
      toast.success('Patient created 🙂')
      router.push(`/patients/${newUser.$id}/register`) 
    }
}
    catch(error){
        console.log(error);
    }
    setIsLoading(false);
    console.log(values);
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-x-4">
        <h1 className="header">Hey there 👋🏾</h1>
        <p className="text-dark-700">Schedule your first appointment</p>
        </section>
      <CustomFormField 
      control={form.control}
       fieldType={FormFieldType.INPUT}
       name="name"
       label="Full name"
       placeholder="john doe"
       iconSrc="/assets/icons/user.svg"
       
       iconAlt="user"
       />
        <CustomFormField 
      control={form.control}
       fieldType={FormFieldType.INPUT}
       name="email"
       label="Email"
       placeholder="johnsmith@gmail.com"
       iconSrc="/assets/icons/email.svg"
       iconAlt="email"
       />
        <CustomFormField 
      control={form.control}
       fieldType={FormFieldType.PHONE_INPUT}
       name="phone"
       label="Phone Number"
       placeholder="(555) 123-4567"
       />
       <SubmitButton isLoading={isLoading}>
        Get Started
       </SubmitButton>
      </form>
    </Form>
  );
};



// "use client"

// import { z } from "zod"

// const formSchema = z.object({
//   username: z.string().min(2).max(50),
// })


// const PatientForm = () => {
//   return (
//     <div>PatientForm</div>
//   )
// }

// export default PatientForm