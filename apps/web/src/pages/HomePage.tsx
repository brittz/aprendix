import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Aprendix</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="home-content" fullscreen>
        <section className="home-hero">
          <p className="home-brand">Aprendix</p>
          <h1>Desenvolvimento cognitivo, com calma.</h1>
          <p className="home-lede">
            Plataforma modular de aprendizado. O primeiro módulo é o Motor de
            Geografia — começando pelos estados do Brasil.
          </p>
          <IonButton
            expand="block"
            onClick={() => history.push('/geography/map')}
          >
            Abrir mapa do Brasil
          </IonButton>
          <IonText color="medium">
            <p className="home-note">
              Fase 0: scaffold Ionic + Capacitor e integração do mapa.
            </p>
          </IonText>
        </section>
      </IonContent>
    </IonPage>
  );
}
