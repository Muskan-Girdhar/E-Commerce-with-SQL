const nodemailer = require("nodemailer");
function sendmail(email,name,token,text)
{
  console.log(email);

  let testAccount =  nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: 'gino.miller@ethereal.email',
        pass: 'bMGU63TrEDshwHSSmM'
       
    },
  });

  let info =  transporter.sendMail({
    from: '"Muskan girdhar 👻" <Muskan@example.com>', // sender address
    to: email, // list of receivers
    subject: `Hello ${name}✔`, // Subject line
    text:  `Hello ${name}✔`, // plain text body
    html: `<a href=http://localhost:3000/${token}>${text}</a>`, // html body
  });
 
}

module.exports = sendmail;