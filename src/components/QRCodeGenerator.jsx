import { useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { motion } from "framer-motion";
import "./QRCodeDashboard.css";

export default function QRCodeDashboard() {
    const [textList, setTextList] = useState([""]);
    const [showQR, setShowQR] = useState(false);
    const [fgColor, setFgColor] = useState("#0f172a");
    const [bgColor, setBgColor] = useState("#ffffff");
    const [logo, setLogo] = useState(null);
    const [ecc, setEcc] = useState("M");

    const handleGenerate = () => {
        if (textList.every((text) => text.trim() !== "")) {
            setShowQR(true);
        } else {
            alert("Please enter text or URL for all fields");
        }
    };

    const handleLogoUpload = (e) => {
        const file = e.target.files[0];
        if (file) setLogo(URL.createObjectURL(file));
    };

    const addInputField = () => {
        setTextList([...textList, ""]);
    };

    const handleInputChange = (index, value) => {
        const newTextList = [...textList];
        newTextList[index] = value;
        setTextList(newTextList);
    };

    const downloadQR = (index) => {
        const canvas = document.getElementById(`qr-canvas-${index}`);
        const url = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-code-${index + 1}.png`;
        link.click();
    };

    return (
        <div className="dashboard">


            {/* Main Content */}
            <main className="main-content">


                <section className="qr-section">
                    <div className="form-container">
                        {textList.map((text, index) => (
                            <input
                                key={index}
                                type="text"
                                placeholder={`Enter text or URL ${index + 1}`}
                                value={text}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                className="input-field"
                            />
                        ))}

                        <div className="flex-row">
                            <button onClick={addInputField} className="btn-secondary">
                                + Add More
                            </button>
                        </div>

                        <div className="flex-row">
                            <div>
                                <label>Foreground Color</label>
                                <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
                            </div>
                            <div>
                                <label>Background Color</label>
                                <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                            </div>
                            <div>
                                <label>Logo (optional)</label>
                                <input type="file" accept="image/*" onChange={handleLogoUpload} />
                            </div>
                            <div>
                                <label>ECC</label>
                                <select value={ecc} onChange={(e) => setEcc(e.target.value)}>
                                    <option value="L">L</option>
                                    <option value="M">M</option>
                                    <option value="Q">Q</option>
                                    <option value="H">H</option>
                                </select>
                            </div>
                        </div>

                        <button onClick={handleGenerate} className="btn-primary">
                            Generate QR Codes
                        </button>
                    </div>

                    {showQR && (
                        <motion.div
                            className="qr-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {textList.map((text, index) => (
                                <motion.div
                                    key={index}
                                    className="qr-card"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <QRCode
                                        id={`qr-canvas-${index}`}
                                        value={text}
                                        size={180}
                                        fgColor={fgColor}
                                        bgColor={bgColor}
                                        logoImage={logo}
                                        qrStyle="squares"
                                        ecLevel={ecc}
                                        logoWidth={40}
                                        logoHeight={40}
                                        logoOpacity={0.7}
                                    />
                                    <button onClick={() => downloadQR(index)} className="btn-download">
                                        Download QR {index + 1}
                                    </button>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </section>
            </main>
        </div>
    );
}
