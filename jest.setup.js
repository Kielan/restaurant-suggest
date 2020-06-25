import 'jest-styled-components';
import * as path from 'path';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createSerializer } from 'enzyme-to-json';

const dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
Enzyme.configure({ adapter: new Adapter() });
