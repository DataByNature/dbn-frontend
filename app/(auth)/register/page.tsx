"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import apiClient, { normalizeResponse, extractErrorMessage } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/endpoints";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { toast } from "sonner";

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
        phone: data.phone,
        email: data.email,
        password: data.password,
        password2: data.confirmPassword,
      };
      const response = await apiClient.post(API_ENDPOINTS.REGISTER, payload);
      return normalizeResponse<RegisterResponse>(response.data);
    },
    onSuccess: () => {
      toast.success("Account created successfully. You can now sign in.");
    },
    onError: (error: any) => {
      const message = extractErrorMessage(error) || "Registration failed. Please try again.";
      toast.error(message);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w/full max-w-md">
        <CardHeader>
          <div className="flex flex-col items-center gap-2 mb-2">
            <Image
              src="/dbn-logo (1).svg"
              alt="DatabyNature logo"
              width={48}
              height={48}
              className="h-12 w-auto"
            />
            <CardTitle className="text-2xl text-center">Create your account</CardTitle>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Get started with DatabyNature in a few seconds
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Your name"
              error={errors.name?.message}
              {...register("name")}
            />

            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              label="Phone"
              placeholder="08012345678"
              error={errors.phone?.message}
              {...register("phone")}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={mutation.isPending}
            >
              Create Account
            </Button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary-deep hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

