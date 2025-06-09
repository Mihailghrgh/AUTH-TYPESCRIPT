type Params = { to: string; subject: string; text: string; html: string };
import resend from "@/lib/resend";

export const sendMail = async ({ to, subject, text, html }: Params) => {
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    text,
    html,
  });

  if (error) {
    console.log(error);
  }
};
