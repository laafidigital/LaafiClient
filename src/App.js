import { Provider, useSelector } from 'react-redux';
import './App.css';
import './App.scss'
import AdminMain from './components/Admin/AdminMain';
import Store from './components/Store/Store';

function App() {
  return (
    <div>
      <Provider store={Store}>
         <AdminMain/>
      </Provider>
    </div>
  );
}

export default App;
