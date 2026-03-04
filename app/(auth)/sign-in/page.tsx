'use client';
import InputField from "@/components/forms/inputField";
import {useForm} from "react-hook-form";
import FooterLink from "@/components/forms/FooterLink";
import { Button } from "@/components/ui/button";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    }, );
    const onSubmit = async (data: SignUpFormData) => {
        try{
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <InputField
                name="email"
                label="Email"
                placeholder="contact@jsmastery.com"
                register={register}
                error={errors.email}
                validation={{ required: 'Email name is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email address is required' }}
            />

            <InputField
                name="password"
                label="Password"
                placeholder="Enter a strong password"
                type="password"
                register={register}
                error={errors.password}
                validation={{ required: 'Password is required', minLength: 8 }}
            />
            <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                {isSubmitting ? 'Signing In' : 'Sign In'}
            </Button>

            <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
        </>
    )
}
export default SignIn

