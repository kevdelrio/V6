const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");

admin.initializeApp();
const db = admin.firestore();

// Clé API SendGrid depuis config Firebase
sgMail.setApiKey(functions.config().sendgrid.key);

// Validation email simple
function isEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v || "");
}

// 🔹 Fonction pour traiter les messages du formulaire de contact
exports.sendMail = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const { name, email, phone, message, token } = req.body || {};
    if (!name || !isEmail(email) || !message || !token) {
      return res.status(400).json({ error: "Champs manquants ou invalides" });
    }

    const secret = functions.config().recaptcha.secret;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
    const captcha = await fetch(verifyUrl, { method: "POST" }).then(r => r.json());
    if (!captcha.success) {
      return res.status(400).json({ error: "reCAPTCHA invalide" });
    }

    const fromEmail = process.env.MAIL_FROM;
    const adminEmail = process.env.MAIL_ADMIN;

    const htmlClient = `
      <p>Bonjour ${name},</p>
      <p>Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
      <p>Bien cordialement,<br/>KD Expertise</p>
    `;

    const htmlAdmin = `
      <p>Nouveau message de contact :</p>
      <ul>
        <li>Nom : ${name}</li>
        <li>Email : ${email}</li>
        ${phone ? `<li>Téléphone : ${phone}</li>` : ""}
        <li>Message : ${message}</li>
      </ul>
    `;

    await sgMail.send([
      { to: adminEmail, from: fromEmail, subject: `Nouveau message — ${name}`, html: htmlAdmin },
      { to: email, from: fromEmail, subject: `Votre message a bien été reçu`, html: htmlClient }
    ]);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("Erreur sendMail:", e);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// 🔹 Fonction pour récupérer les disponibilités
exports.getAvailabilities = functions.https.onRequest(async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Date requise" });

    // Exemples de créneaux
    const allSlots = ["10:00", "12:00", "14:00", "16:00", "18:00"];

    const bookedSnap = await db.collection("appointments")
      .where("date", "==", date)
      .get();

    const bookedSlots = bookedSnap.docs.map(doc => doc.data().time);
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));

    return res.status(200).json({ availableSlots });
  } catch (e) {
    console.error("Erreur getAvailabilities:", e);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

// 🔹 Fonction pour créer un rendez-vous et envoyer les e-mails
exports.createAppointment = functions.https.onRequest(async (req, res) => {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const appToken = req.header("X-App-Token");
    if (!appToken || appToken !== (process.env.APP_TOKEN || "")) {
      return res.status(403).send("Forbidden");
    }

    const { service, date, time, fullname, email, phone, address, message } = req.body || {};
    if (!service || !date || !time || !fullname || !isEmail(email) || !phone || !address) {
      return res.status(400).json({ error: "Champs manquants ou invalides" });
    }

    const dupSnap = await db.collection("appointments")
      .where("date", "==", date)
      .where("time", "==", time)
      .where("address", "==", address)
      .limit(1).get();

    if (!dupSnap.empty) {
      return res.status(409).json({ error: "Créneau déjà réservé pour cette adresse" });
    }

    const data = {
      service, date, time, fullname, email, phone, address,
      message: message || "",
      status: "pending",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection("appointments").add(data);

    const fromEmail = process.env.MAIL_FROM;
    const adminEmail = process.env.MAIL_ADMIN;

    const htmlClient = `
      <p>Bonjour ${fullname},</p>
      <p>Votre demande pour <b>${service}</b> le <b>${date}</b> à <b>${time}</b> a bien été reçue.</p>
      <p>Adresse : ${address}<br/>Téléphone : ${phone}</p>
      ${message ? `<p>Message : ${message}</p>` : ""}
      <p>Nous vous contacterons pour confirmer.</p>
      <p>Bien cordialement,<br/>KD Expertise</p>
    `;

    const htmlAdmin = `
      <p>Nouvelle demande :</p>
      <ul>
        <li>Service : ${service}</li>
        <li>Date/Heure : ${date} ${time}</li>
        <li>Nom : ${fullname}</li>
        <li>Email : ${email}</li>
        <li>Téléphone : ${phone}</li>
        <li>Adresse : ${address}</li>
        ${message ? `<li>Message : ${message}</li>` : ""}
        <li>ID Firestore : ${docRef.id}</li>
      </ul>
    `;

    await sgMail.send([
      { to: email, from: fromEmail, subject: `Votre demande — ${date} ${time}`, html: htmlClient },
      { to: adminEmail, from: fromEmail, subject: `Nouvelle demande — ${fullname}`, html: htmlAdmin }
    ]);

    return res.status(201).json({ id: docRef.id, ok: true });
  } catch (e) {
    console.error("Erreur createAppointment:", e);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});
