import React from 'react';

//als admin kann man hier seine eigene entwürfe sehen und posten.
// im Card Form kann man listen und an der rechten Ecke "posten" button wäre cool
import { useNavigate } from "react-router-dom";

function Entwuerfe({ entwuerfe, setEntwuerfe, texts, setTexts }) {
    const navigate = useNavigate();

    const handleLoeschen = (eintrag) => {
        if (window.confirm("Möchtest du diesen Entwurf wirklich löschen?")) {
            setEntwuerfe(entwuerfe.filter(e => e !== eintrag));
        }
    };

    const handleBearbeiten = (eintrag) => {
        navigate("/neuerText", { state: { existingPost: eintrag } });
    };

    const handleVeroeffentlichen = (eintrag) => {
        if (window.confirm("Diesen Entwurf veröffentlichen?")) {
            setTexts([...texts, eintrag]);
            setEntwuerfe(entwuerfe.filter(e => e !== eintrag));
        }
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2>📄 Meine Entwürfe</h2>

            {entwuerfe.length === 0 ? (
                <p>Du hast noch keine Entwürfe gespeichert.</p>
            ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                    {entwuerfe.map((e, index) => (
                        <div key={index} style={cardStyle}>
                            <div style={headerStyle}>
                                <span>{e.datum ? new Date(e.datum).toLocaleDateString("de-DE") : "Kein Datum"}</span>
                            </div>

                            {e.bild && (
                                <img src={e.bild} alt={e.ueberschrift} style={imageStyle} />
                            )}

                            <div style={contentStyle}>
                                <h3>{e.ueberschrift || "Ohne Titel"}</h3>
                                <p>{e.kurzbeschreibung || "Keine Kurzbeschreibung"}</p>
                                <p style={{ fontStyle: "italic" }}>{e.kategorie} – {e.autor}</p>

                                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                                    <button onClick={() => handleBearbeiten(e)}>📝 Bearbeiten</button>
                                    <button onClick={() => handleVeroeffentlichen(e)}>✅ Veröffentlichen</button>
                                    <button onClick={() => handleLoeschen(e)}>🗑️ Löschen</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// Styles
const cardStyle = {
    width: "260px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    overflow: "hidden"
};

const headerStyle = {
    padding: "8px 12px",
    backgroundColor: "#f5f5f5",
    borderBottom: "1px solid #ddd"
};

const imageStyle = {
    width: "100%",
    height: "160px",
    objectFit: "cover"
};

const contentStyle = {
    padding: "12px"
};

export default Entwuerfe;
