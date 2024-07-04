import { useEffect, useState } from 'preact/hooks';
import styles from '../styles/Imgs.module.css';

const arrowLeft = "/imgs/arrow-left.svg";
const arrowRight = "/imgs/arrow-right.svg";
console.log(".ENV", import.meta.env.PUBLIC_IMAGES_API_URL);
export default function Imgs() {
    const [imgs, setImgs] = useState<string[]>([]);
    const [currentImg, setCurrentImg] = useState<number>(0);
    let touchStartX: number = 0;
    let touchEndX: number = 0;

    async function fetchImgs() {
        // const res = await fetch("https://www.thetracesofterrorback.piterxus.com/api/v1/images");
        const res = await fetch(import.meta.env.PUBLIC_IMAGES_API_URL);
        const data = await res.json();
        const rawPath = window.location.pathname;
        const cleanPath = rawPath.replace(/^\/|\/$/g, '');
        const filteredData = data.filter((img: any) => img.type === cleanPath);
        setImgs(filteredData.map((img: any) => img.path));
    }

    useEffect(() => {
        fetchImgs();
    }, []);

    useEffect(() => {
        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            if (touchStartX - touchEndX > 50) {
                nextImg();
            }

            if (touchStartX - touchEndX < -50) {
                prevImg();
            }
        };

        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);
        document.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            document.removeEventListener('touchstart', handleTouchStart, false);
            document.removeEventListener('touchmove', handleTouchMove, false);
            document.removeEventListener('touchend', handleTouchEnd, false);
        };
    }, []);

    function nextImg() {
        setCurrentImg((prev) => (imgs.length > 0 ? (prev + 1) % imgs.length : 0));
    }

    function prevImg() {
        setCurrentImg((prev) => (imgs.length > 0 ? (prev - 1 + imgs.length) % imgs.length : 0));
    }

    return (
        <div className={styles.imageGalleryContainer}>
            <img onClick={prevImg} className={`${styles.arrow} ${styles.left}`} src={arrowLeft} alt="Left Arrow" id="left" />
            <div className={styles.imageGallery}>
                <img onTouchStart={nextImg} className={styles.galleryImage} key={currentImg} src={`${import.meta.env.PUBLIC_IMAGES_URL}${imgs[currentImg]}`} />
            </div>
            <img onClick={nextImg} className={`${styles.arrow} ${styles.right}`} src={arrowRight} alt="Right Arrow" id="right" />
        </div>
    );
}
