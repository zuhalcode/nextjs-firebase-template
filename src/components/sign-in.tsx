import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icons } from "./icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const formSchema = z.object({
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});
type FormSchema = z.infer<typeof formSchema>;

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });
  const { handleSubmit, control } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    const response = await axios.post("http://localhost:3000/api/login", {
      email,
      password,
    });

    console.log(response);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className={cn("grid gap-5 rounded-lg border border-black p-10")}>
        <h1 className="text-2xl font-semibold tracking-tight">
          Masuk ke akun anda
        </h1>
        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          className="border-black"
                          placeholder="Masukkan Email Anda"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          className="border-black"
                          placeholder="Masukkan Password Anda"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Masuk
                </Button>
              </div>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-primary">
                Atau lanjut dengan
              </span>
            </div>
          </div>

          <div className="mx-auto w-full">
            <Button variant="default" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}
              Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
