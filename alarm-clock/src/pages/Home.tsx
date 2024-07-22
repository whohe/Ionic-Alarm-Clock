import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import AlarmOption from '../components/AlarmOption/AlarmOption';
import AnalogClock from '../components/AnalogClock/AnalogClock';
import ContextAlarm from '../components/context/ContextAlarm';
import DigitalClock from '../components/DigitalClock/DigitalClock';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
    		<section className="clock container">
    		  <div className="clock__container grid">
    		    <div className="clock__content grid">
    					<section className="clock container">
    					  <div className="clock__container grid">
    					    <div className="clock__content grid">
    					      <ContextAlarm>
    					        <AnalogClock />
    					        <DigitalClock />
    					        <AlarmOption />
    					      </ContextAlarm>
    					    </div>
    					  </div>
    					</section>
    		    </div>
    		  </div>
    		</section>
      </IonContent>
    </IonPage>
  );
};

export default Home;
