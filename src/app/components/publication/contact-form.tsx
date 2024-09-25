"use client";

import { useEffect, useState } from "react";
import { Label, Textarea, TextInput } from "flowbite-react";
import Link from "next/link";

import { createClient } from "@/src/app/utils/supabase/client";
import { sendEmail } from "@/src/app/utils/send-email";
import { Button, buttonStyles } from "../button";

export default function ContactForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email?: string; name: string } | null>(
    null
  );
  const supabase = createClient();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log({ session });
      setIsAuthenticated(!!session);

      if (session) {
        setUser({
          email: session.user.email,
          name: session?.user.user_metadata.name,
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-4">
        <span className="text-gray-900 dark:text-white">
          Para contactar al vendedor, por favor
          <Link href="/login" className={buttonStyles.link}>
            Inicia Sesión
          </Link>
          o
          <Link href="/login" className={buttonStyles.link}>
            Regístrate
          </Link>
        </span>
      </div>
    );
  }

  const handleSendEmail = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const message = formData.get("message") as string;

    const fullMessage = `${message}
        ${name}
        Correo electrónico: ${email}
        Teléfono: ${phone}
    `;

    sendEmail({
      subject: `Nuevo mensaje desde MotorOnline - ${name}`,
      message: fullMessage,
    });
  };

  return (
    <form
      action={handleSendEmail}
      className="bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-4"
    >
      <h5 className="text-md font-semibold text-gray-900 dark:text-white sm:text-1xl mb-4">
        Contacta al anunciante
      </h5>
      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="email">Mi correo electrónico</Label>
          <TextInput
            id="email"
            name="email"
            type="email"
            defaultValue={user?.email}
            readOnly={true}
          />
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="phone">Tu Nombre</Label>
          <TextInput
            id="name"
            name="name"
            type="name"
            defaultValue={user?.name}
            required
          />
        </div>
      </div>
      <div className="mb-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Label htmlFor="phone">Teléfono</Label>
          <TextInput
            id="phone"
            name="phone"
            type="phone"
            placeholder="123-45-678"
            required
          />
        </div>
      </div>
      <div className="mb-6 mt-6 grid grid-cols-1">
        <div className="col-span-2 sm:col-span-1">
          <Textarea
            id="message"
            name="message"
            defaultValue={
              "Me gustaría que me contactaran para más detalles sobre este vehículo."
            }
            required
          />
        </div>
      </div>
      <Button type="submit" variant="success">
        Enviar mensaje
      </Button>
    </form>
  );
}
