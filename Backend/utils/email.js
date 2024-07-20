const nodemailer = require("nodemailer");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email ? user.email : "yos8760@gmail.com";
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Luvkush Sharma <${process.env.EMAIL_FROM}>`;
    this.message = user.message ? user.message : "No message provided";
  }

  newTransport() {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_PASSWORD,
        },
      });
  }

  async sendWelcomeHTML() {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "Welcome to Crowdsourced Urban Art Map!",
      text: `Hi ${this.firstName},\n\nWelcome to the Crowdsourced Urban Art Map community! Click here to complete your profile: ${this.url}`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Crowdsourced Urban Art Map, ${this.firstName}!</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f0f0f0; /* Background color */
          }
          h1, h2, h3 {
            font-family: serif;
            margin: 10px 0;
          }
          p {
            margin: 5px 0;
          }
          a {
            color: #ff6347; /* Primary color */
            text-decoration: none;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
          .hero {
            text-align: center;
            margin-bottom: 20px;
          }
          .features {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .feature {
            text-align: center;
            padding: 10px;
            margin: 5px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #999;
          }
          @media (max-width: 600px) {
            .features {
              flex-direction: column;
            }
            .feature {
              width: 100%;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header>
            <div class="logo">
              <center><img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1721455273/juqiw7fbq0l5emufkfqy.jpg" alt="Crowdsourced Urban Art Map Logo" width="200"></center>
            </div>
          </header>
          <main>
            <div class="hero">
              <h1>Welcome to Crowdsourced Urban Art Map, ${this.firstName}!</h1>
              <p>Join our global community of urban art enthusiasts and start exploring, documenting, and sharing amazing street art from around the world.</p>
            </div>
            <div class="features">
              <div class="feature">
                <h3>Document Art</h3>
                <p>Upload photos of urban art you discover and help preserve it digitally.</p>
              </div>
              <div class="feature">
                <h3>Explore the Map</h3>
                <p>Geotagged artworks allow you to find and explore street art in different locations.</p>
              </div>
              <div class="feature">
                <h3>Join the Community</h3>
                <p>Engage with other art enthusiasts, vote on your favorite pieces, and share your discoveries.</p>
              </div>
            </div>
            <p>Ready to start your journey? Click the button below to complete your profile and begin exploring the world of urban art.</p>
            <center><a href="${this.url}" class="button" style="display: inline-block; padding: 10px 20px; background-color: #ff6347; color: #fff; border-radius: 5px;">Complete Profile</a></center>
          </main>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Crowdsourced Urban Art Map</p>
          </footer>
        </div>
      </body>
      </html>
      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordResetHTML() {
    const mailOptions = {
      from: this.from,

      to: this.to,
      subject: "Reset Your Password for Dost",
      text: `Hi ${this.firstName},\n\nWelcome to Dost! Click here to complete your profile: ${this.url}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password for Dost</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
          }
          .text {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #b5179e;
            color: #faedcd;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
            <img src="https://luvkush8941.github.io/Groffers/Reset.jpg" alt="Dost Logo" class="logo" width="500" height="400">
          </header>
          <main class="text">
            <p>Hi ${this.firstName},</p>
            <p>We received a request to reset your password for your account on Urban Artmap. If you didn't request this, please disregard this email and your password will remain unchanged.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${this.url}" class="button">Reset Password</a>
            <p>This link will expire in 10 mins for your security. If you don't reset your password within 10 mins, you'll need to request a new password reset link.</p>
          </main>
          <br>
          <div>
            <center><img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1721455273/juqiw7fbq0l5emufkfqy.jpg" alt="AI Logo" width="500" height="300"/></center>
          </div>
          <footer class="footer">
            <p>&copy; ${new Date().getFullYear()} Urban Artmap</p>
          </footer>
        </div>
      </body>
      </html>

      `,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendIssuesHTML() {

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: "We are facing some issues!",
      text: `Hi moderators,\n\nWe are facing some issues. We are working on it. We will get back to you soon. Sorry for the inconvenience.`,
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>We are facing some issues!</title>
        <style>
          body {
            font-family: sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 20px;
          }
          .logo {
            display: block;
            margin: 0 auto;
          }
          .text {
            font-size: 16px;
            line-height: 1.5;
            margin-bottom: 20px;
          }
          .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #b5179e;
            color: #faedcd;
            text-decoration: none;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .footer {
            text-align: center;
            font-size: 12px;
            color: #999;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <header class="header">
          <center><img src="https://res.cloudinary.com/dx2vel6vy/image/upload/v1721455273/juqiw7fbq0l5emufkfqy.jpg" alt="AI Logo" width="500" height="300"/></center>
          </header>
          <main class="text">
            <p>Kindly see the below issue,</p>
            <p>${this.message}</p>
          </main>
          <footer class="footer">
            <b><p>&copy; ${new Date().getFullYear()} Urban Artmap</p></b>
          </footer>
        </div>
      </body>
      </html>

      `,
    };

    await this.newTransport().sendMail(mailOptions);
  };

  async sendWelcome() {
    await this.sendWelcomeHTML();
  }

  async sendPasswordReset() {
    await this.sendPasswordResetHTML();
  }

  async sendIssues() {
    await this.sendIssuesHTML();
  }
};
