import { useEffect, useState } from 'preact/hooks';
import styles from '../styles/Comments.module.css';
const commentsIcon = "/imgs/vampire-teeth.svg";
const comic = "/imgs/comic.png";
const closeCommentsImg = '/imgs/closeComments.png';
const listVignette = '/favicon.svg';

export default function Comments(props: any) {
    const [comments, setComments] = useState<string[]>([]);
    const [author, setAuthor] = useState<string>("");

    async function fetchComments() {
        try {
            const res = await fetch(import.meta.env.PUBLIC_COMMENTS_API_URL);
            if (!res.ok) {
                throw new Error(`Failed to fetch comments: ${res.statusText}`);
            }
            const data = await res.json();
            const filterComments = data.filter((comment: any) => comment.id_img === props.id);
            const content = filterComments.map((comment: any) => comment.content);
            const author = filterComments.map((comment: any) => comment.author);
            setAuthor(author);
            setComments(content);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    }

    useEffect(() => {
        fetchComments();
    }, [props.id]);

    useEffect(() => {
        const commentUpload = document.getElementById(`comment-upload-${props.id}`) as HTMLButtonElement | null;
        const commentText = document.querySelector(`#comments-${props.id} textarea[name="comments"]`) as HTMLTextAreaElement | null;
        const author = document.querySelector(`#comments-${props.id} input[name="author"]`) as HTMLInputElement | null;

        if (commentUpload) {
            commentUpload.addEventListener("click", async () => {
                const formData = new FormData();

                if (commentText) {
                    formData.append("content", commentText.value);
                }

                if (author) {
                    formData.append("author", author.value);
                }

                formData.append("id_img", props.id);

                try {
                    const res = await fetch(import.meta.env.PUBLIC_COMMENTS_API_URL, {
                        method: "POST",
                        body: formData
                    });
                    if (!res.ok) {
                        throw new Error(`Failed to upload comment: ${res.statusText}`);
                    }
                    const data = await res.json();
                    console.log("Comment uploaded:", data);
                    fetchComments();
                } catch (error) {
                    console.error("Error uploading comment:", error);
                }
            });
        }
    }, [props.id]);

    const handleComments = () => {

        const commentsContainer = document.getElementById(`comments-${props.id}`) as HTMLDivElement | null;
        const body = document.querySelector('body') as HTMLBodyElement | null;

        if (commentsContainer) {
            commentsContainer.style.display = commentsContainer.style.display === 'flex' ? 'none' : 'flex';
            if (body) {
                body.style.overflow = commentsContainer.style.display === 'flex' ? 'hidden' : 'auto';
            }
        }
    };

    const closeComments = () => {
        const commentsContainer = document.getElementById(`comments-${props.id}`) as HTMLDivElement | null;
        const body = document.querySelector('body') as HTMLBodyElement | null;
        if (commentsContainer) {
            commentsContainer.style.display = 'none';
            if (body) {
                body.style.overflow = commentsContainer.style.display === 'none' ? 'auto' : 'hidden';
            }


        }

    }
    interface CommentProps {
        comment: string;
    }
    function formatComment(comment:string) {
    
        const urlRegex = /(https?:\/\/[^\s]+)/g;

        
        return comment.split(urlRegex).map((part, index) => {
        
            if (urlRegex.test(part)) {
                return (
                    <a href={part} key={index} target="_blank" rel="noopener noreferrer">
                        {part}
                    </a>
                );
            }

            
            return part;
        });
    }

    return (
        <div>
            <div onClick={handleComments} className={styles.imagesComments}>
                <img className={styles.icon} src={commentsIcon} alt="Comments icon" id="icon" />
                <img className={styles.comic} src={comic} alt="Image with message to encourage commenting" id="comic" />
            </div>
            <div id={`comments-${props.id}`} className={styles.commentsSection} style={{ display: 'none' }}>
                <div className={styles.flexImg}>
                    <img src={props.src} alt="" className={styles.imgComment} />
                </div>
                <div>
                    <div className={styles.controlCommentsWImg}>
                        <div onClick={closeComments} className={styles.imagesComments}>
                            <img className={styles.icon} src={commentsIcon} alt="Comments icon" id="icon" />
                            <img className={styles.comic} src={closeCommentsImg} alt="Image with message to encourage commenting" />
                        </div>
                        <div className={`${styles.commentsList} ${comments.length === 0 ? styles.noComments : ''}`}>
                            {comments.map((comment, index) => (
                                <div> <img src={listVignette} alt="Vignette of list" className={styles.listVignette} /> <span>{author[index] != "" && (author[index]) || "Anonymous"}</span> <p key={index}>{formatComment(comment)}</p></div>
                            ))}
                        </div>
                        <div className={styles.controlComments}>
                            <textarea name="comments" placeholder="Write your comment here..."></textarea>
                            <input type="text" name="author" placeholder="Your name" />

                            <button id={`comment-upload-${props.id}`}>Post</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
