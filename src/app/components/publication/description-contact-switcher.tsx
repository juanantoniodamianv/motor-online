"use client";
import { useState } from "react";
import ContactForm from "./contact-form";

export default function DescriptionContactSwitcher({
  description,
}: {
  description: string;
}) {
  const [showDescription, setShowDescription] = useState(true);
  return (
    <div>
      <div className="flex mb-4">
        <button
          className="text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-900 dark:hover:bg-green-600 dark:focus:ring-green-800"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? "Contacta al vendedor" : "Ver más características"}
        </button>
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
