import { useEffect, useState } from 'preact/hooks';
import styles from '../styles/Imgs.module.css';
const arrowLeft = "/imgs/arrow-left.svg";
const arrowRight = "/imgs/arrow-right.svg";

export default function Imgs() {
    const [imgs, setImgs] = useState<string[]>([]);
    const [currentImg, setCurrentImg] = useState<number>(0);


  

    async function fetchImgs() {
        // const res = await fetch("http://127.0.0.1:8000/api/v1/images");
        const res = await fetch("https://www.thetracesofterrorback.piterxus.com/api/v1/images");
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





    return (
        <div className={styles.imageGalleryContainer}>

            <img onClick={prevImg} className={`${styles.arrow} ${styles.left}`} src={arrowLeft} alt="Left Arrow" id="left" />

            <div className={styles.imageGallery}>
             
                {/* <img className={styles.galleryImage}  key={currentImg} src={`http://127.0.0.1:8000/images/${imgs[currentImg]}`} /> */}
                <img className={styles.galleryImage} key={currentImg} src={`https://www.thetracesofterrorback.piterxus.com/images/${imgs[currentImg]}`} />
            </div>

            <img onClick={nextImg} className={`${styles.arrow} ${styles.right}`} src={arrowRight} alt="Right Arrow" id="right" />
        </div>
    );
}