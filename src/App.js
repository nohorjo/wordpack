import { StackNavigator } from 'react-navigation';

import Menu from './Menu';
import Learn from './Learn';
import Test from './Test';

const App = StackNavigator(
    {
        Home: { screen: Menu },
        Learn: { screen: Learn },
        Test: { screen: Test },
    },
    {
        navigationOptions: {
            header: null
        }
    },
);

export default App;
