"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { toast } from "sonner";
import { Eye, EyeOff, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterResponse {
  user: any;
  tokens: { access: string; refresh: string };
}

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterFormData): Promise<RegisterResponse> => {
      const payload = {
        username: data.email,
        name: data.name,
        phone: data.phone,
        email: data.email,
        password: data.password,
        password2: data.confirmPassword,
      };
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, payload);
      return normalizeResponse<RegisterResponse>(response.data);
    },
    onSuccess: () => {
      toast.success("Account created successfully!");
      router.push("/login");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  const benefits = [
    "Discounted rates on all networks",
    "Instant delivery, 24/7",
    "Earn by reselling to others",
    "Bank-grade security",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative */}
      <div className="hidden lg:flex flex-1 relative bg-gradient-to-br from-primary-deep via-[#1a4228] to-[#0F3320] items-center justify-center p-12 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent-gold/20 blur-3xl" />
        <div className="absolute bottom-32 right-20 w-48 h-48 rounded-full bg-secondary-teal/20 blur-3xl" />
        <div className="absolute top-1/3 left-32 w-24 h-24 rounded-2xl bg-white/5 rotate-12" />
        <div className="absolute bottom-1/4 right-1/3 w-16 h-16 rounded-xl bg-accent-gold/10 -rotate-12" />

        <div className="relative z-10 text-white max-w-lg">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            Join thousands of users
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Start saving on
            <br />
            <span className="text-accent-gold">data today.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed mb-10">
            Create your free account and start enjoying discounted rates on data, airtime, and bill payments.
          </p>

          {/* Benefits List */}
          <ul className="space-y-4">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 text-white/80">
                <div className="w-6 h-6 rounded-full bg-accent-gold/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-accent-gold" />
                </div>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo & Header */}
          <div className="mb-8">
            <Link href="/" className="inline-flex items-center gap-3 mb-8">
              <div className="w-10 h-10 relative overflow-hidden rounded-xl">
                <Image src="/dbn.jpg" alt="DBN" fill className="object-cover" />
              </div>
              <span className="font-bold text-xl text-text-navy">DatabyNature</span>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-text-navy mb-3">
              Create your account
            </h1>
            <p className="text-gray-500">
              Get started in under 30 seconds
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                error={errors.name?.message}
                className="h-12 rounded-xl border-gray-200 focus:border-primary-deep focus:ring-primary-deep/20"
                {...register("name")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <Input
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                className="h-12 rounded-xl border-gray-200 focus:border-primary-deep focus:ring-primary-deep/20"
                {...register("email")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                placeholder="08012345678"
                error={errors.phone?.message}
                className="h-12 rounded-xl border-gray-200 focus:border-primary-deep focus:ring-primary-deep/20"
                {...register("phone")}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    error={errors.password?.message}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-deep focus:ring-primary-deep/20 pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    error={errors.confirmPassword?.message}
                    className="h-12 rounded-xl border-gray-200 focus:border-primary-deep focus:ring-primary-deep/20 pr-10"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms */}
            <p className="text-xs text-gray-500">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-primary-deep hover:underline">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="text-primary-deep hover:underline">Privacy Policy</Link>
            </p>

            <Button
              type="submit"
              className="w-full h-12 rounded-xl bg-primary-deep hover:bg-primary-deep/90 text-white font-semibold shadow-lg shadow-primary-deep/20 transition-all hover:shadow-xl hover:shadow-primary-deep/25"
              isLoading={mutation.isPending}
            >
              Create Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-400">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 h-12 px-4 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Sign in link */}
          <p className="text-center text-gray-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-primary-deep font-semibold hover:text-primary-bright transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
