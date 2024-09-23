"use client";
import { useState } from "react";
import ContactForm from "./contact-form";
import { Button } from "../button";

export default function DescriptionContactSwitcher({
  description,
}: {
  description: string;
}) {
  const [showDescription, setShowDescription] = useState(true);
  return (
    <div>
      <div className="flex mb-4">
        <Button
          variant="primary"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "Contacta al vendedor" : "Ver más características"}
        </Button>
      </div>
      {showDescription ? (
        <Description description={description} />
      ) : (
        <ContactForm />
      )}
    </div>
  );
}

function Description({ description }: { description: string }) {
  return (
    <div className="bg-white dark:border-gray-700 dark:bg-gray-800 rounded-lg p-4 mb-4">
      <p className="text-gray-900 dark:text-white">{description}</p>
    </div>
  );
}
