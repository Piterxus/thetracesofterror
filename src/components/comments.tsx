import { useEffect } from 'preact/hooks';
import styles from '../styles/Comments.module.css';
const commentsIcon = "/imgs/vampire-teeth.svg";
const comic = "/imgs/comic.png";

export default function Comments() {

   
    useEffect(() => {
        const handleComments = () => {
            const openComments = document.getElementById('openComments') as HTMLButtonElement | null;
            const closeComments = document.getElementById('closeComments') as HTMLButtonElement | null;
            if (openComments) {
                openComments.style.display = "block";
            }
            if (closeComments) {
                closeComments.addEventListener("click", () => {
                    if (openComments) {
                        openComments.style.display = "none";
                    }
                });
            }
        }

        const clickImages = document.querySelectorAll(`.${styles.icon}`);

        clickImages.forEach((img) => {
            img.addEventListener("click", handleComments);
        });

        // Cleanup event listeners on unmount
        return () => {
            clickImages.forEach((img) => {
                img.removeEventListener("click", handleComments);
            });
        };
    }, []);

       
   

    return (
        <div  className={styles.commentsContainer}>
            <img  className={styles.icon} src={commentsIcon} alt="Comments icon" />
            <img className={styles.comic} src={comic} alt="Image with message to encourage commenting" />
        </div>
    );
}