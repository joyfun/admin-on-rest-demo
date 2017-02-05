import 'babel-polyfill';
import React, { Component } from 'react';
import FakeRest from 'fakerest';
import fetchMock from 'fetch-mock';
import { simpleRestClient,Admin, Resource } from 'admin-on-rest';
import { Delete } from 'admin-on-rest/lib/mui';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import './App.css';
import data from './data';

import sagas from './sagas';
import hdclient from './conf/hdclient';

import { VisitorList, VisitorEdit, VisitorDelete, VisitorIcon } from './visitors';
import { CommandList, CommandEdit, CommandIcon } from './commands';
import { ProductList, ProductEdit, ProductIcon } from './products';
import { CategoryList, CategoryEdit, CategoryIcon } from './categories';
import { ReviewList, ReviewEdit, ReviewIcon } from './reviews';
import { ConfList} from './conf';

const restClient = hdclient('http://localhost:3000');
const delayedRestClient = (type, resource, params) => new Promise(resolve => setTimeout(() => resolve(restClient(type, resource, params)), 500));

class App extends Component {
    componentWillMount() {
        const restServer = new FakeRest.FetchServer('http://localhost:3000');
        restServer.init(data);
        restServer.toggleLogging(); // logging is off by default, enable it
        fetchMock.mock('^http://localhost:3000', restServer.getHandler());
    }

    componentWillUnmount() {
        fetchMock.restore();
    }

    render() {
        return (
          //theme={getMuiTheme(darkBaseTheme)}
            <Admin title="华腾云会控系统" restClient={restClient} customSagas={sagas}>
              <Resource name="confs" list={ConfList} edit={ProductEdit} remove={Delete} icon={ProductIcon} options={{ label: '会议列表' }} />

                <Resource name="products" list={ProductList} edit={ProductEdit} remove={Delete} icon={ProductIcon} />
                <Resource name="customers" list={VisitorList} edit={VisitorEdit} remove={VisitorDelete} icon={VisitorIcon} options={{ label: '顾客' }} />
                <Resource name="commands" list={CommandList} edit={CommandEdit} remove={Delete} icon={CommandIcon} options={{ label: 'Orders' }}/>
                <Resource name="categories" list={CategoryList} edit={CategoryEdit} remove={Delete} icon={CategoryIcon} />
                <Resource name="reviews" list={ReviewList} edit={ReviewEdit} icon={ReviewIcon} />
            </Admin>
        );
    }
}

export default App;
