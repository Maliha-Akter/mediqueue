"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, Description, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiUser, FiMail, FiLock, FiImage, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const SignUpPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) return;

        setIsLoading(true);
        const formdata = new FormData(e.currentTarget);
        const user = Object.fromEntries(formdata.entries());

        try {
            const { data, error } = await authClient.signUp.email({
                email: user.email,
                password: user.password,
                name: user.name,
                image: user.image || undefined,
            });

            if (data) {
                await authClient.signOut();
                toast.success("Account created successfully! Please log in.");
                router.push(`/login?callbackUrl=${encodeURIComponent(callbackUrl)}`);
            }

            if (error) {
                toast.error(error.message || "An authentication issue occurred.");
            }
        } catch (err) {
            toast.error("Connection failed during registration.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: callbackUrl, 
            });
        } catch (err) {
            toast.error("Failed to connect via Google.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#CC8FA3]/10 via-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6">

                {/* Header Context  */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Create Account
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                        Start your premium learning and monitoring path today
                    </p>
                </div>

                {/* Form Card Part */}
                <Card className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">

                    <Form onSubmit={onSubmit} validationBehavior="native" className="flex flex-col gap-4">

                        {/* Name Input Field */}
                        <TextField isRequired name="name" type="text">
                            <Label className="text-gray-700 font-bold text-sm">Full Name</Label>
                            <div className="relative mt-1 flex items-center">
                                <span className="absolute left-4 text-gray-400">
                                    <FiUser size={16} />
                                </span>
                                <Input
                                    placeholder="Enter your name"
                                    className="pl-11 rounded-2xl bg-gray-50 w-full"
                                />
                            </div>
                            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
                        </TextField>

                        {/* Image URL */}
                        <TextField name="image" type="url">
                            <Label className="text-gray-700 font-bold text-sm">Avatar Image URL</Label>
                            <div className="relative mt-1 flex items-center">
                                <span className="absolute left-4 text-gray-400">
                                    <FiImage size={16} />
                                </span>
                                <Input
                                    placeholder="https://example.com/avatar.png"
                                    className="pl-11 rounded-2xl bg-gray-50 w-full"
                                />
                            </div>
                            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
                        </TextField>

                        {/* Email Address */}
                        <TextField
                            isRequired
                            name="email"
                            type="email"
                            validate={(value) => {
                                if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                    return "Please enter a valid email address";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 font-bold text-sm">Email Address</Label>
                            <div className="relative mt-1 flex items-center">
                                <span className="absolute left-4 text-gray-400">
                                    <FiMail size={16} />
                                </span>
                                <Input
                                    placeholder="john@example.com"
                                    className="pl-11 rounded-2xl bg-gray-50 w-full"
                                />
                            </div>
                            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
                        </TextField>

                        {/* Password */}
                        <TextField
                            isRequired
                            minLength={6}
                            name="password"
                            type="password"
                            validate={(value) => {
                                if (value.length < 6) {
                                    return "Password must be at least 6 characters";
                                }
                                if (!/[A-Z]/.test(value)) {
                                    return "Password must contain at least one uppercase letter";
                                }
                                if (!/[a-z]/.test(value)) {
                                    return "Password must contain at least one lowercase letter";
                                }
                                return null;
                            }}
                        >
                            <Label className="text-gray-700 font-bold text-sm">Password</Label>
                            <div className="relative mt-1 flex items-center">
                                <span className="absolute left-4 text-gray-400">
                                    <FiLock size={16} />
                                </span>
                                <Input
                                    placeholder="••••••••"
                                    className="pl-11 rounded-2xl bg-gray-50 w-full"
                                />
                            </div>
                            <Description className="text-xs text-gray-400 mt-1 block">
                                Must be 6+ characters with 1 uppercase letter and 1 lowercase letter.
                            </Description>
                            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
                        </TextField>

                        {/* Primary Submit Button Action */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full font-bold text-md bg-[#BB6984] text-white hover:bg-[#a3536d] transition-colors duration-200 shadow-md py-6 rounded-2xl mt-2 flex justify-center items-center gap-2"
                        >
                            {isLoading ? "Creating Profile..." : "Register Account"}
                            {!isLoading && <FiArrowRight size={16} />}
                        </Button>
                    </Form>

                    {/*  Separator Divider */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="h-[1px] bg-gray-100 flex-grow" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Or register with
                        </span>
                        <div className="h-[1px] bg-gray-100 flex-grow" />
                    </div>

                    {/* Secondary Social Sign in */}
                    <div>
                        <Button
                            onClick={handleGoogleSignin}
                            variant="flat"
                            className="w-full font-bold text-sm bg-gray-50 border border-gray-200 hover:bg-gray-100/70 text-gray-700 transition-colors py-6 rounded-2xl flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={18} /> Sign in with Google
                        </Button>
                    </div>

                    {/*Login Option*/}
                    <p className="text-center text-sm text-gray-500 font-medium pt-2">
                        Already have an account?{" "}
                        <Link href="/login" className="text-[#BB6984] font-bold hover:underline">
                            Log In
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default SignUpPage;