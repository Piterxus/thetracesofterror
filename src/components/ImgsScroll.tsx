import { useEffect, useState } from 'preact/hooks';
import styles from '../styles/Imgs.module.css';
import Popup from './Popup';



const arrowLeft = "/imgs/arrow-left.svg";
const arrowRight = "/imgs/arrow-right.svg";

export default function Imgs() {
    const [imgs, setImgs] = useState<string[]>([]);
    const [uploadedImgs, setUploadedImgs] = useState<string[]>([]);
    const [description, setDescription] = useState<string>("");
    const [currentImg, setCurrentImg] = useState<number>(0);
    const [fileUploadVisible, setFileUploadVisible] = useState<boolean>(false); // Pending to use NanoStores
    const [popupMessage, setPopupMessage] = useState<string | null>(null);
    let touchStartX: number = 0;
    let touchEndX: number = 0;

    async function fetchImgs() {
        try {
            const res = await fetch(import.meta.env.PUBLIC_IMAGES_API_URL);
            if (!res.ok) {
                throw new Error(`Failed to fetch images: ${res.statusText}`);
            }
            const data = await res.json();
            const rawPath = window.location.pathname;
            const cleanPath = rawPath.replace(/^\/|\/$/g, '');
            const filteredData = data.filter((img: any) => img.type === cleanPath);
            setImgs(filteredData.map((img: any) => img.path));
            setUploadedImgs(filteredData.map((img: any) => img.uploaded));
            setDescription(filteredData.map((img: any) => img.description));
        } catch (error) {
            console.error("Error fetching images:", error);
        }
    }

    useEffect(() => {
        fetchImgs();

        const handleImageUploaded = () => {
            fetchImgs();
        };

        document.addEventListener('imageUploaded', handleImageUploaded);

        const fileUpload = document.getElementById('file-upload') as HTMLInputElement | null;
        const uploaderInput = document.querySelector('input[name="uploaded"]') as HTMLInputElement | null;
        const typeSelect = document.getElementById('type') as HTMLSelectElement | null;
        const description = document.getElementById('description') as HTMLInputElement | null;


        if (fileUpload) {
            fileUpload.addEventListener("change", async () => {
                if (!fileUpload.files || fileUpload.files.length === 0) {
                    setPopupMessage("Please select a file to upload.");
                    return;
                }

                const file = fileUpload.files[0];
                const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/svg+xml", "image/webp"];
                if (!validImageTypes.includes(file.type)) {
                    setPopupMessage("Only image files are allowed!");
                    return;
                }

                const formData = new FormData();
                formData.append("image", file);
                if (uploaderInput) {
                    formData.append("uploaded", uploaderInput.value);
                }
                if (typeSelect) {
                    formData.append("type", typeSelect.value);
                }

                if (description) {
                    formData.append("description", description.value);
                }

                try {
                    const response = await fetch(import.meta.env.PUBLIC_IMAGES_API_URL, {
                        method: "POST",
                        body: formData,
                    });

                    const result = await response.json();

                    if (response.ok) {
                        setPopupMessage("Image uploaded successfully!");
                        document.dispatchEvent(new CustomEvent('imageUploaded'));

                    } else {
                        setPopupMessage("Error uploading image: " + result.error);
                    }
                } catch (error) {
                    if (error instanceof Error) {
                        setPopupMessage("Error uploading image: " + error.message);
                    } else {
                        setPopupMessage("Unexpected error uploading image");
                    }
                }
            });
        }

        return () => {
            document.removeEventListener('imageUploaded', handleImageUploaded);
        };
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

    useEffect(() => {
        const fileUp = document.getElementById("fileUp");
        const close = document.getElementById("close");
        const credits = document.getElementById('credits') as HTMLElement | null;

        const handleFileUpClick = () => {
            const fileUploadContainer = document.querySelector(".fileUploadContainer") as HTMLElement;
            if (fileUploadContainer) {
                if (fileUp) {
                    fileUp.style.display = "none";
                }
                if (credits) {
                    credits.style.display = "none";
                }
                fileUploadContainer.style.display = "flex";
            }
        };

        const handleCloseClick = () => {
            const fileUploadContainer = document.querySelector(".fileUploadContainer") as HTMLElement;
            const credits = document.getElementById('credits') as HTMLElement | null;
            if (fileUploadContainer) {
                if (fileUp) {
                    fileUp.style.display = "block";
                }
                if (credits) {
                    credits.style.display = "block";
                }
                fileUploadContainer.style.display = "none";
            }
        };

        if (fileUp) {
            fileUp.addEventListener("click", handleFileUpClick);
        }

        if (close) {
            close.addEventListener("click", handleCloseClick);
        }

        return () => {
            if (fileUp) {
                fileUp.removeEventListener("click", handleFileUpClick);
            }
            if (close) {
                close.removeEventListener("click", handleCloseClick);
            }
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
                {imgs.length > 0 && (
                    <img
                        onTouchStart={nextImg}
                        className={styles.galleryImage}
                        key={currentImg}
                        src={`${import.meta.env.PUBLIC_IMAGES_URL}${imgs[currentImg]}`}
                        alt="Horror context gallery"
                    />
                )}
                <div id="credits">
                    {uploadedImgs.length > 0 && (
                        <p className={styles.uploaded}>Uploaded by: {uploadedImgs[currentImg] || "Anonymous"}</p>
                    )}
                    {description.length > 0 && (<p className={styles.uploaded}>The image belongs to: {description[currentImg] || "Unknown"}</p>)}
                </div>
            </div>
            <img onClick={nextImg} className={`${styles.arrow} ${styles.right}`} src={arrowRight} alt="Right Arrow" id="right" />
            <Popup message={popupMessage} onClose={() => setPopupMessage(null)} />
        </div>
    );
}