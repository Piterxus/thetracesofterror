import styles from '../styles/Comments.module.css';
const commentsIcon = "/imgs/vampire-teeth.svg";
const comic = "/imgs/comic.png";

export default function Comments() {

    return (
        <div className={styles.commentsContainer}>
            <img className={styles.icon} src={commentsIcon} alt="Comments icon" />
            <img className={styles.comic} src={comic} alt="Image with message to encourage commenting" />
        </div>
    );
}