'use client';

import React, { useState, useEffect } from 'react';
import { getProviders, ClientSafeProvider, signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";  // Import ShadCN Dialog components

export default function SignInPage() {
    const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };
        fetchProviders();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md text-center bg-white p-8 rounded-xl shadow-lg">
                <div className="mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900">Sign In</h1>
                    <p className="text-lg text-gray-600">Please sign in to continue to your account.</p>
                </div>

                {/* Back Button */}
                <Link href="/" className="absolute top-4 left-4 text-gray-800 hover:text-gray-900">
                    <Button variant="outline" size="sm" className="text-sm font-medium">
                        Back to Home
                    </Button>
                </Link>

                {/* Info Icon */}
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <div className="absolute top-4 right-4 text-gray-500 hover:text-gray-200 hover:cursor-pointer">
                        <DialogTrigger>
                            <Info size={24} />
                        </DialogTrigger>
                    </div>
                    <DialogContent className="p-6 rounded-xl bg-white text-black max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Sign In Information</DialogTitle>
                            <DialogDescription>
                                This is the sign-in page where you can log in using various authentication providers.
                                Choose a provider to sign in and access your account.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogClose className="absolute top-2 right-2 text-gray-500 hover:text-gray-900">
                            ✖
                        </DialogClose>
                    </DialogContent>
                </Dialog>

                {/* Providers */}
                {providers && Object.values(providers).map((provider) => (
                    <div key={provider.name} className="mb-4">
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                            className="w-full text-lg font-semibold hover:text-gray-100 text-white"
                            style={{
                                backgroundColor: provider.name === 'Google' ? '#4285F4' : '#4CAF50',
                            }}
                        >
                            Sign in with {provider.name}
                        </Button>
                    </div>
                ))}

                {/* Additional Info */}
                <div className="mt-6 text-gray-500 text-sm">
                    <p>
                        By signing in, you agree to our <span className="text-blue-500"><a href="/terms-of-service">Terms of Service</a></span> and <span className="text-blue-500"><a href="/privacy-policy">Privacy Policy</a></span>.
                    </p>
                </div>
            </div>
        </div>
    );
}
