import React from 'react';
import {BrowserRouter, Switch, Route, Redirect,} from "react-router-dom";
import {Layout, Menu} from 'antd';
import './App.less';
import publicRoutes from "./routes/publicRoutes";
import PublicRoute from "./components/PublicRoute";
import config from "./config";

const {Header, Content, Footer} = Layout;

export interface AppProps {
}

export class App extends React.Component<AppProps> {

    render() {
        return <Layout className="App">
            <Header style={{position: 'fixed', zIndex: 1, width: '100%'}}>
                <div className="logo"/>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={new Array(3).fill(null).map((_, index) => ({
                        key: String(index + 1),
                        label: `Menu ${index + 1}`,
                    }))}
                />
            </Header>
            <Content className="site-layout" style={{padding: '0 50px', marginTop: 64}}>
                <div className="site-layout-background" style={{padding: 24}}>
                    {/* 构造route */}
                    <BrowserRouter>
                        <Switch>
                            {/* 公共页面 */}
                            {publicRoutes.map(
                                (route) => <PublicRoute key={route.path} {...route} />
                            )}
                            {/* 根路径重定向主页 */}
                            <Route exact path="/">
                                <Redirect to={config.homePath}/>
                            </Route>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Content>
            <Footer style={{textAlign: 'center'}}>Copyright ©2022 XXX Technology Co.,Ltd All Rights Reserved XXX科技有限公司
                版权所有</Footer>
        </Layout>;
    }
}

export default App;
