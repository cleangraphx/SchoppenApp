const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const SECRET_KEY = "SichererSchluessel";

const adminPool = mysql.createPool({
	host: 'localhost', user: 'db_admin', password: 'admin', database: 'SchoppenTool'
});

const verwaltungsPool = mysql.createPool({
	host: 'localhost', user: 'db_verwaltung', password: 'verwaltung', database: 'SchoppenTool'
});

const dbSelector = (req, res, next) => {
	const role = req.user ? req.user.role : null;

	if (role === 'admin') {
		req.db = adminPool;
		console.log("nutze Admin Verbindung");
	} else {
		req.db = verwaltungsPool;
		console.log("nutze Verwaltungs Verbindung");
	}
	next();
};

const authenticateToken = (req, res, next) => {
    	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) return res.sendStatus(401);

	jwt.verify(token, SECRET_KEY, (err, user) => {
	        if (err) return res.sendStatus(403);
	        req.user = user;
        next();
    	});
};

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(`Versuche Login für User: ${username}`);

        const [rows] = await adminPool.query('SELECT * FROM Benutzer WHERE Benutzername = ? AND Passwort = ?', [username, password]);

        if (rows.length > 0) {
            const user = rows[0];
            const token = jwt.sign({ username: user.Benutzername, role: user.Rolle }, SECRET_KEY);
            res.json({ token, role: user.Rolle });
            console.log("Login erfolgreich!");
        } else {
            res.status(401).send('Benutzername oder Passwort falsch');
            console.log("Login fehlgeschlagen: Falsche Daten");
        }
    } catch (error) {
        console.error("SCHWERER FEHLER BEIM LOGIN:", error);
        res.status(500).send("Serverfehler beim Login: " + error.message);
    }
});

app.get('/api/data', authenticateToken, dbSelector, async (req, res) => {
	try {
		const [rows] = await req.db.query('SELECT * FROM Teilnehmer');
		res.json(rows);
	} catch (e) {
        console.error(e);
		res.status(500).send(e.message);
	}
});

app.post('/api/input/teilnehmer', authenticateToken, dbSelector, async (req, res) => {
    console.log('Versuche neuen Teilnehmer hinzuzufügen');

    const {
        vorname,
        nachname,
        geschlecht,
        geburtstag,
        adresse,
        email
    } = req.body;

    console.log(`Neuer Teinehmer: ${vorname} ${nachname}`);

    if (!vorname || !nachname || !geschlecht || !geburtstag || !adresse || !email) {
        return res.status(400).send("Bitte alle Felder ausfüllen.");
    }

    try {
        await req.db.query('INSERT INTO Teilnehmer (Vorname, Nachname, Geschlecht, Geburtstag, Adresse, Email) VALUES (?, ?, ?, ?, ?, ?)', [vorname, nachname, geschlecht, geburtstag, adresse, email]);
        res.status(201).send('Teilnehmer gespeichert.');
        console.log('Teilnehmer gespeichert.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Datenbankfehler');
    }
});

app.get('/test', async (req, res) => {
    res.json("online");
    res.status(200);
})

app.listen(3000, () => console.log('Server läuft auf p3000'));
