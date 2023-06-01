import logo from './logo.svg';
import './App.css';
import MobileCompanyClients from "./MobileCompanyClients";

const defaultClients = [
    {
        Id: 100,
        LastName: 'Ivanov',
        FirstName: 'Ivan',
        Surname: 'Ivanovich',
        Balance: 200},
    {
        Id: 200,
        LastName: 'Sidorov',
        FirstName: 'Sidor',
        Surname: 'Sidorovich',
        Balance: 250},
    {
        Id: 300,
        LastName: 'Petrov',
        FirstName: 'Petr',
        Surname: 'Petrovich',
        Balance: 180},
    {
        Id: 400,
        LastName: 'Grigoriev',
        FirstName: 'Grigory',
        Surname: 'Grigorievich',
        Balance: -220
    }]

function App() {
  return (
    <div className="App">
      <MobileCompanyClients clients={defaultClients}></MobileCompanyClients>
    </div>
  );
}

export default App;
