import { UseSend } from "usesend-js";

const usesend = new UseSend("us_rk8cr9yjz4_15484d8ab01839fef3766a00f82a3888");

export const sendCandidateEmail = async (data: {
  email: string;
  password: string;
  party: string;
}): Promise<boolean> => {
  const mailSent = await usesend.emails.send({
    to: data.email,
    from: "E-VOTE APP <noreply@mail.afuwapetunde.com>",
    subject: "Candidate Account Created",
    // html: "<p>useSend is the best open source product to send emails</p>",
    html: `Welcome to your candidate Account. <p>You have been added as a candidate for ${data.party}. <br/><br />Your password is <b>${data.password}</b></p>. Please keep it safe`,
  });

  if (mailSent.error !== null) {
    throw new Error("An error occured! Couldn't dispatch email");
  }

  return true;
};
