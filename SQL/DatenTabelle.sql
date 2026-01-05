CREATE TABLE Daten (
    -- ID des Dateneintrags
    id INT AUTO_INCREMENT PRIMARY KEY,

    -- ID vom Teilnehmer -> WER
    teilnehmer_id INT NOT NULL,

    -- ID von der Freizeit -> WANN / WORAUF
    freizeit_id INT NOT NULL,

    -- ID vom Zimmer -> WO
    zimmer_id INT, -- Ist das über eine Int ID?

    FOREIGN KEY (teilnehmer_id) REFERENCES Teilnehmer(id),
    FOREIGN KEY (freizeit_id) REFERENCES Freizeiten(id),
    FOREIGN KEY (zimmer_id) REFERENCES Zimmer(id),

    UNIQUE KEY (teilnehmer_id, freizeit_id)
)