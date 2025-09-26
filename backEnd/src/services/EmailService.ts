import { UseSend } from "usesend-js";
import { OtpPurposes } from "@prisma/client";

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

export const sendVoterEmail = async (data: {
  email: string;
  purpose: OtpPurposes;
  otp: string;
}): Promise<boolean> => {
  const mailSent = await usesend.emails.send({
    to: data.email,
    from: "E-VOTE APP <noreply@mail.afuwapetunde.com>",
    subject: "Verification OTP Code",
    html: `<p>Your <strong>${data.purpose === OtpPurposes.VERIFY_EMAIL ? "Email Verification" : "Reset Password"}</strong> code is:</p>
                <p style="font-size:20px;font-weight:bold;letter-spacing:3px">${data.otp}</p>
                <p>This code expires in ${process.env.OTP_EXP_MINUTES ?? 5} minutes.</p>`,
  });

  if (mailSent.error !== null) {
    throw new Error("An error occurred! Couldn't dispatch email");
  }

  return true;
};