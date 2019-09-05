import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Address } from './components/Addresses';
import {Edit} from "./components/Edit";

export const routes = <Layout>
    <Route exact path='/' component={ Address } />
    <Route path='/address/edit' component={Edit} />
</Layout>;
 