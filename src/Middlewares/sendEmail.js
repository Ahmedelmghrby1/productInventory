import nodemailer from "nodemailer";
export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedaboalgoud2@gmail.com",
      pass: "sjhazidjnntrjwzn",
    },
  });

  const info = await transporter.sendMail({
    from: '"Ahmed Morsy" <ahmedaboalgoud2@gmail.com>',
    to: email,
    subject: "Hello ✔",
    html: "<b>Hello world?</b>",
  });
  console.log(info);
};
