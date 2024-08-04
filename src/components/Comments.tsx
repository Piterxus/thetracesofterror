import { useEffect, useState } from 'preact/hooks';
import styles from '../styles/Comments.module.css';
const commentsIcon = "/imgs/vampire-teeth.svg";
const comic = "/imgs/comic.png";

export default function Comments(props: any) {
    // const filteredComments:string[] = [];
    const [comments, setComments] = useState<string[]>([]);
    async function fetchComments() {
        try {
            const res = await fetch(import.meta.env.PUBLIC_COMMENTS_API_URL);
            if (!res.ok) {
                throw new Error(`Failed to fetch comments: ${res.statusText}`);
            }
            const data = await res.json();
            const filterComments = data.filter((comment: any) => comment.id_img === props.id)
            const content = filterComments.map((comment: any) => comment.content)
            console.log(props.id);
            setComments(content);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }


    useEffect(() => {
        fetchComments();

    }, []);

    const handleComments = () => {
        // fetchComments();
        const openComments = document.getElementById('openComments') as HTMLButtonElement | null;
        const closeComments = document.getElementById('closeComments') as HTMLButtonElement | null;
        const commentsContainer = document.getElementById('comments') as HTMLDivElement | null;
        if (openComments) {
            openComments.style.display = "block";
            if (commentsContainer) {
                commentsContainer.innerHTML += comments;
            }
        }
        if (closeComments) {
            closeComments.addEventListener("click", () => {
                if (openComments) {
                    if (commentsContainer) {
                        commentsContainer.innerHTML = " ";
                    }
                    openComments.style.display = "none";
                }
            });
        }
    }


    return (
        <div onClick={handleComments} className={styles.commentsContainer}>
            <img  className={styles.icon} src={commentsIcon} alt="Comments icon" />
            <img className={styles.comic} src={comic} alt="Image with message to encourage commenting" />
        </div>
    );
}