import { useState } from 'preact/hooks';

export default function Imgs() {
    const [imgs, setImgs] = useState<string[]>([]);

    async function fetchImgs() {
        const res = await fetch("http://127.0.0.1:8000/api/v1/images");
        const data = await res.json();
        setImgs(data.map((img: any) => img.path));
    }

    const imgStyle = {
        width: '200px',
        height: '200px',
        objectFit: 'cover',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    };

    return (
        <div>
            <button onClick={fetchImgs}>Fetch Images</button>
            <div>
                {imgs.map((img, index) => (
                    <img style={imgStyle} key={index} src={`http://127.0.0.1:8000/images/${img}`} />
                ))}
            </div>
        </div>
    );
}