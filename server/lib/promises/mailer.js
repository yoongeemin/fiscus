import nodemailer from "nodemailer";
import bluebird from "bluebird";

export function sendEmail(user, password, to, subject, html) {
    return new bluebird((resolve, reject) => {
        const smtpTransport = nodemailer.createTransport("SMTP", {
            service: "Gmail",
            auth: {
                user,
                password,
            },
        });

        smtpTransport.sendMail({
            from: user,
            to,
            subject,
            html,
        }, (err, info) => {
            if (err) {
                return reject(err);
            }
            return resolve(info.response);
        });
    });
}
