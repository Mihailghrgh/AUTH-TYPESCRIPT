type Params = { to: string; subject: string; text: string; html: string };
import resend from "@/lib/resend";

export const sendMail = async ({ to, subject, text, html }: Params) => {
  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "delivered@resend.dev",
    subject,
    text,
    html,
  });

  if (error) {
    console.log(error);
  }

  return { data, error };
};
