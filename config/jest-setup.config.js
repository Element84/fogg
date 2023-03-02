import { configure } from 'enzyme';
// React 17 specific enzyme adapter
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

configure({
  adapter: new Adapter()
});

registerRequireContextHook();
