"use client";

type SendEmailProps = {
  subject: string;
  message: string;
};

export async function sendEmail({ subject, message }: SendEmailProps) {
  const apiEndpoint = "/api/email";

  fetch(apiEndpoint, {
    method: "POST",
    body: JSON.stringify({ subject, message }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response.message);
    })
    .catch((err) => {
      console.log(err);
    });
}
