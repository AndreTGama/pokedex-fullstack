import styles from '../../styles/pages/login.module.scss';
import evolutions from '../../assets/img/Evolution.webp';
import pokebal from '../../assets/img/pokeball.webp';
import square from '../../assets/img/square.webp';
import FormLogin from '../../components/forms/FormLogin';
import FormCreateUser from '../../components/forms/FormCreateUser';
import { ContextsProvider } from '../../hooks/useRegisterUsers';

export default function Index() {
    return (
        <ContextsProvider>
            <section className={styles.sectionLogin}>
                <div className={styles.logoPokemon}>
                    <img
                        className={styles.pokebalfirst}
                        src={pokebal}
                        alt="pokebola"
                    />
                    <img
                        className={styles.pokebalseconds}
                        src={pokebal}
                        alt="pokebola"
                    />
                    <img className={styles.square} src={square} alt="quadrados" />
                    <img
                        className={styles.pokemons}
                        src={evolutions}
                        alt="evoluções do gastly"
                    />
                </div>
                <div className={styles.form}>
                    <FormLogin />
                    <FormCreateUser />
                </div>
            </section>
        </ContextsProvider>
    );
}
