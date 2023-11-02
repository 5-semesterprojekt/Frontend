import { Link } from 'react-router-dom';
import Page from '../components/Page';

export default function AboutPage() {
  return (
    <Page title="Om os">
      <h1>Om os</h1>
      <h2>Hvem er vi?</h2>
      Vi er en gruppe unge mennesker i aldersgruppen 15-27 år, der samles hver
      onsdag i Godthåbskirken. Typisk har vi en taler der kommer og holder
      bibeltime for os om vores frelser Jesus. Programmet skifter fra gang til
      gang, og hvad vi lige skal høre om/hvad der sker kan du se i{' '}
      <Link to="/kalender">programmet</Link>.<h2>Hvad er LMU?</h2>
      LMU står for Luthersk Missions Unge, og er en sammenslutning af samtlige
      ungdomskredse i Luthersk Mission. Vi bygger vores tro på, at Bibelen er
      Guds ord, og derfor troværdigt i alle forhold. Derudover anser vi Den
      Danske Folkekirkes evangeliske-lutherske bekendelse som sand og
      forpligtende tolkning af Bibelen. Læs mere om vores grundlag her.
      <h2>Hvor er vi?</h2>
      Adressen er Rosenlunden 15, 5000 Odense C, og vi går typisk igang kl.
      19:00 med mindre andet er angivet. Efter mødet er der kaffe og kage, hvor
      vi snakker sammen, spiller brætspil og ellers bare hygger.
    </Page>
  );
}
