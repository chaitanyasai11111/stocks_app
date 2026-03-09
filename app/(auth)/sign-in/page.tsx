'use client';

import InputField from "@/components/forms/InputField";
import {useForm} from "react-hook-form";
import FooterLink from "@/components/forms/FooterLink";
import { Button } from "@/components/ui/button";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignIn = () => {
    const router = useRouter();
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
    const onSubmit = async (data: SignInFormData) => {
        try {
            const result = await signInWithEmail(data);
            if(result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign in failed', {
                description: e instanceof Error ? e.message : 'Failed to sign in.'
            })
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="form-title">Sign In</h1>
            <InputField
                name="email"
                label="Email"
                placeholder="youremail@gmail.com"
                register={register}
                error={errors.email}
                validation={{ required: 'Email is required', pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i }}
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
                {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
            <FooterLink text="Don't have an account?" linkText="Create an account" href="/sign-up" />
        </form>
    )
}
export default SignIn

