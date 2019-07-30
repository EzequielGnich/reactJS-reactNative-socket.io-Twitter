// Importa o tipo de navegação por botões do react-navigation
import { createStackNavigator } from 'react-navigation';

// Importa as páginas da aplicação
import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';

// Cria uma variavel com as paginas importadas
const Routes = createStackNavigator({
  Login,
  Timeline,
  New,
});

// Exporta a váriavel Routes
export default Routes;