import { Link } from 'react-router-dom'
import styles from '../../assets/css/TheHeader.module.css'

const TheHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        {/* <Link to="/">
					<button>Logo</button>
				</Link> */}
        {/* <h1>this is header space!</h1> */}
        <nav className={styles.navigation}>
          <ul>
            <li className={styles.list}>서재</li>
            <li className={styles.list}>단어장</li>
            <li className={styles.list}>Logout</li>
            <button className={styles.list}>정보</button>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default TheHeader
