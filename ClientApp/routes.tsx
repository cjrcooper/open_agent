import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Address } from './components/Addresses';
import {Edit} from "./components/Edit";

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/addresses' component={ Address } />
    <Route path='/address/edit' component={Edit} />
</Layout>;
 