import { useEffect, useState } from 'preact/hooks';
const arrowLeft = "/imgs/arrow-left.svg";
const arrowRight = "/imgs/arrow-right.svg";

export default function Imgs() {
    const [imgs, setImgs] = useState<string[]>([]);
    const [currentImg, setCurrentImg] = useState<number>(0);
    



    async function fetchImgs() {
        const res = await fetch("http://127.0.0.1:8000/api/v1/images");
        const data = await res.json();
        setImgs(data.map((img: any) => img.path));
    }

    useEffect(() => {
        fetchImgs();
    }, []);

    
    function nextImg() {
      if (currentImg < imgs.length - 1) {
        setCurrentImg(currentImg + 1);
      }
    }
    function prevImg() {
       if (currentImg > 0) {
        setCurrentImg(currentImg - 1);
       }
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
            {/* <button onClick={fetchImgs}>Fetch Images</button> */}
           
            {/* <button onClick={nextImg}>+</button>
            <button onClick={prevImg}>-</button> */}
            <img onClick={prevImg} class="arrow left" src={arrowLeft} alt="Left Arrow" id="left" />
            <img onClick={nextImg} class="arrow right" src={arrowRight} alt="Right Arrow" id="right" />
            <div>
                {/* {imgs.map((img, index) => (
                    <img style={imgStyle} key={index} src={`http://127.0.0.1:8000/images/${img}`} />
                ))} */}
                <img style={imgStyle}  src={`http://127.0.0.1:8000/images/${imgs[currentImg]}`} />
            </div>

            <div>
                
            </div>
        </div>
    );
}