import styles from './style.module.css';

const Panel = (props) => {
    const {title, children, style} = props;
    return (
      <article className={styles.panelContainer} style={style}>
        <header>{title}</header>
        <section>{children}</section>
      </article>
    );
}

export default Panel;