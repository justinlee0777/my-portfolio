import styles from './resume.module.scss';

export default function Resume(): JSX.Element {
  return (
    <>
      <p className={styles.line}>
        I am a web developer. I built this site using React and Next.js, and I
        host it myself. All for fun.
      </p>
      <p className={styles.line}>
        I have worked with{' '}
        <a href="https://www.unboundcommerce.com" rel="noopener noreferrer">
          Unbound Commerce
        </a>{' '}
        and{' '}
        <a
          href="https://www.sap.com/products/crm/e-commerce-platforms.html"
          rel="noopener noreferrer"
        >
          SAP
        </a>{' '}
        to make B2B websites a bit more complex than this one.
      </p>
      <p className={styles.line}>Though these are more fun.</p>
      <p className={styles.line}>
        I loathe handing out résumés. The work is always more interesting.
        Contact me at _blank_ if the site amuses you or for anything else.
      </p>
    </>
  );
}
