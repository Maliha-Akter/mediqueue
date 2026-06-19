"use client";

import { authClient } from '@/lib/auth-client';
import { Button, Card, FieldError, Form, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FiMail, FiLock, FiArrowRight } from 'react-icons/fi';
import { toast } from 'react-toastify';

const LoginPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!e.currentTarget.checkValidity()) {
            return;
        }

        setIsLoading(true);
        const formdata = new FormData(e.currentTarget);
        const user = Object.fromEntries(formdata.entries());

        try {
            const { data, error } = await authClient.signIn.email({
                email: user.email,
                password: user.password,
            });

            if (data) {
                toast.success("Signed in successfully!");
                router.push("/");
                router.refresh(); // Refresh page context to update global auth status
            }

            if (error) {
                toast.error(error.message || "Invalid credentials provided.");
            }
        } catch (err) {
            console.error("Login failure exception:", err);
            toast.error("Connection failed during authentication.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignin = async () => {
        try {
            await authClient.signIn.social({
                provider: "google",
            });
        } catch (err) {
            console.error("Social login processing error:", err);
            toast.error("Failed to authenticate with Google.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#CC8FA3]/10 via-gray-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-6">
                
                {/* Header  */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500 font-medium text-sm">
                        Sign in to monitor your sessions and schedule bookings
                    </p>
                </div>

                {/* Main Form  */}
                <Card className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                    
                    <Form onSubmit={onSubmit} validationBehavior="native" className="flex flex-col gap-4">
                        
                        {/* Email Address Input */}
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

                        {/* Password Input */}
                        <TextField
                            isRequired
                            name="password"
                            type="password"
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
                            <FieldError className="text-xs font-semibold text-red-500 mt-1" />
                        </TextField>

                        {/* Form Submit Button */}
                        <Button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full font-bold text-md bg-[#BB6984] text-white hover:bg-[#a3536d] transition-colors duration-200 shadow-md py-6 rounded-2xl mt-2 flex justify-center items-center gap-2"
                        >
                            {isLoading ? "Verifying Credentials..." : "Log In"}
                            {!isLoading && <FiArrowRight size={16} />}
                        </Button>
                    </Form>

                    {/*  Separator Divider */}
                    <div className="flex items-center gap-3 my-2">
                        <div className="h-[1px] bg-gray-100 flex-grow" />
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                            Or continue with
                        </span>
                        <div className="h-[1px] bg-gray-100 flex-grow" />
                    </div>

                    {/* OAuth Google Button  */}
                    <div>
                        <Button 
                            onClick={handleGoogleSignin} 
                            variant="flat" 
                            className="w-full font-bold text-sm bg-gray-50 border border-gray-200 hover:bg-gray-100/70 text-gray-700 transition-colors py-6 rounded-2xl flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={18} /> Sign in with Google
                        </Button>
                    </div>

                 
                    <p className="text-center text-sm text-gray-500 font-medium pt-2">
                        Don't have an account yet?{" "}
                        <Link href="/signup" className="text-[#BB6984] font-bold hover:underline">
                            Register Now
                        </Link>
                    </p>
                </Card>
            </div>
        </div>
    );
};

export default LoginPage;