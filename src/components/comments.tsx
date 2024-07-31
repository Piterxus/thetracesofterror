import styles from '../styles/Comments.module.css';
const commentsIcon = "/imgs/vampire-teeth.svg";

export default function Comments() {

    return (
        <div >
           <img className={styles.icon} src={commentsIcon} alt="" />
        </div>
    );  
}