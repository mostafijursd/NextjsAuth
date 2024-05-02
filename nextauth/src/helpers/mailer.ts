import User from '@/models/userModel';
import  nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs'

export const sendEmail=async ({email,emailType,userId}:any)=>{
try{
 // todo configure mail for user
  const hashedToken= await bcryptjs.hash(userId.toString(),10) 

 if(emailType==="VERIFY"){
  await User.findByIdAndUpdate(userId,
    {verifyToken:hashedToken, verifyTokenExpiry:Date.now()+3600000})
 } else if(emailType==="RESET"){
  await User.findByIdAndUpdate(userId,
    {forgotPasswordToken:hashedToken, forgotPasswordTokenExpiry:Date.now()+3600000})
 }
 var transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "42c2cdfac19810", 
    pass: "1df098e13ec333"
  }
});
      const mailOptions=
        {
            from: 'google@gmail.com', // sender address
            to: email, // list of receivers
            subject: emailType=== 'VERIFT'? "verify your email" :"Reset your password", // Subject line
            html: `<p>
            Click <a href="${process.env.DOMAIN}/veifyemail?token=${hashedToken}"></a> to  
             ${emailType === "VERIFY" ?" verify your eamil" : " reset your password"}
            or copy and passte the link below in your browser.
            <br>${process.env.DOMAIN}/veifyemail?token=${hashedToken}
        </p>`, // html body
          }
     const mailResponse=     await transport.sendMail(mailOptions)
     return mailResponse;
}catch(error:any){
    throw new Error(error.message)
};

}