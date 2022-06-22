/**
 * ownerList
 */
import * as React from 'react';
import {RouteComponentProps} from "react-router-dom";
import {observer} from 'mobx-react'; // 调用action里面的数据
import {BindAll} from 'lodash-decorators';
import "./index.less";
import {Spin, Collapse, Avatar, Button, Card, Col, Row, Descriptions} from 'antd';
import * as mobx from "mobx";
import * as Store from "../../store";
import {ERROR_CODE} from "../../utils/enum";
import dogImg from '@/assets/images/pets/dog.jpg';
import catImg from '@/assets/images/pets/cat.jpg';
import fishImg from '@/assets/images/pets/fish.jpg';

const {Panel} = Collapse;
const {Meta} = Card;

const PET_IMAGE = {
    Dog: dogImg,
    Cat: catImg,
    Fish: fishImg
};

const PET_UNIT = {
    Dog: '只',
    Cat: '只',
    Fish: '条'
};

const PET_NAME = {
    Dog: '狗',
    Cat: '猫',
    Fish: '鱼'
};

const PetAvatar = (
    <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
        <path
            d="M99.096 315.634s-82.58-64.032-82.58-132.13c0-66.064 33.032-165.162 148.646-148.646 83.37 11.91 99.096 165.162 99.096 165.162l-165.162 115.614zM924.906 315.634s82.58-64.032 82.58-132.13c0-66.064-33.032-165.162-148.646-148.646-83.37 11.91-99.096 165.162-99.096 165.162l165.162 115.614z"
            fill="#6B676E"
            p-id="1143"
        />
        <path
            d="M1024 561.548c0 264.526-229.23 429.42-512.002 429.42S0 826.076 0 561.548 283.96 66.064 512.002 66.064 1024 297.022 1024 561.548z"
            fill="#FFEBD2"
            p-id="1144"
        />
        <path
            d="M330.324 842.126c0 82.096 81.34 148.646 181.678 148.646s181.678-66.55 181.678-148.646H330.324z"
            fill="#E9D7C3"
            p-id="1145"
        />
        <path
            d="M644.13 611.098C594.582 528.516 561.55 512 512.002 512c-49.548 0-82.58 16.516-132.13 99.096-42.488 70.814-78.73 211.264-49.548 247.742 66.064 82.58 165.162 33.032 181.678 33.032 16.516 0 115.614 49.548 181.678-33.032 29.18-36.476-7.064-176.93-49.55-247.74z"
            fill="#FFFFFF"
            p-id="1146"
        />
        <path
            d="M611.098 495.484c0-45.608 36.974-82.58 82.58-82.58 49.548 0 198.194 99.098 198.194 165.162s-79.934 144.904-148.646 99.096c-49.548-33.032-132.128-148.646-132.128-181.678zM412.904 495.484c0-45.608-36.974-82.58-82.58-82.58-49.548 0-198.194 99.098-198.194 165.162s79.934 144.904 148.646 99.096c49.548-33.032 132.128-148.646 132.128-181.678z"
            fill="#6B676E"
            p-id="1147"
        />
        <path
            d="M512.002 726.622c-30.06 0-115.614 5.668-115.614 33.032 0 49.638 105.484 85.24 115.614 82.58 10.128 2.66 115.614-32.944 115.614-82.58-0.002-27.366-85.556-33.032-115.614-33.032z"
            fill="#464655"
            p-id="1148"
        />
        <path
            d="M330.324 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
            p-id="1149"
        />
        <path
            d="M693.678 495.484m-33.032 0a33.032 33.032 0 1 0 66.064 0 33.032 33.032 0 1 0-66.064 0Z"
            fill="#464655"
            p-id="1150"
        />
    </svg>
);

@BindAll()
@observer
class OwnerList extends React.Component<RouteComponentProps> {

    state = {
        activeKey: 1,
        loading: true
    };

    componentDidMount() {
        this.getOwnerList();
    }

    componentWillUnmount() {
    }

    /**
     * getOwnerList
     */
    getOwnerList() {
        Store.owners.getOwners().then((res: any) => {
            if (res.state === ERROR_CODE.SUCCESS) {
                Store.owners.setOwnerList(res.data);
            }
            this.setState({loading: false});
        }).catch(err => {
            this.setState({loading: false});
            console.error("getOwnerList err: " + err.message);
        });
    }

    renderOwnerHeader(owner) {
        return <Descriptions size="small">
            <Descriptions.Item label="Name">{owner.name}</Descriptions.Item>
            <Descriptions.Item label="Gender">{owner.gender}</Descriptions.Item>
            <Descriptions.Item label="Age">{owner.age}</Descriptions.Item>
            <Descriptions.Item label="Number of pets">{owner.pets?.length || 0}</Descriptions.Item>
        </Descriptions>;
    }

    renderOwnerDesc(name, number) {
        return `大家好，我是${name}, 我${number > 0 ? `有${number}只` : '没有'}宠物。`;
    }

    renderExtra(key) {
        return <Button type="link"
                       onClick={() => {
                           // If you don't want click extra trigger collapse, you can prevent this:
                           // event.stopPropagation();
                           this.setState({activeKey: key});
                           console.log('activeKey: ', this.state.activeKey);
                           console.log('key: ', key);
                       }}
        >查看宠物</Button>

    };

    renderPets(pets) {
        console.log("renderPets:", pets);
        return <div className="site-card-wrapper">
            <Row gutter={16}>
                {(pets && pets.length > 0) && (
                    pets.map((pet, index) =>
                        <Col span={6} key={`pet-car-${index}`}>
                            <Card title="宠物信息" hoverable cover={<img alt="example" src={PET_IMAGE[pet.type]}/>}>
                                <Meta className="pet-meta"
                                      avatar={<Avatar src={PetAvatar}/>}
                                      title={<p className="pet-name" title={pet.name}>{pet.name}</p>}
                                      description={
                                          <div>
                                              <p className="pet-desc"
                                                 title={`大家好，我叫“${pet.name}”，`}>{`大家好，我叫“${pet.name}”，`}</p>
                                              <p className="pet-desc"
                                                 title={`我是一${PET_UNIT[pet.type]}${PET_NAME[pet.type]}。`}>{`我是一${PET_UNIT[pet.type]}${PET_NAME[pet.type]}。`}</p>
                                          </div>}
                                />
                            </Card>
                        </Col>
                    )
                )}
            </Row>
        </div>

    };

    render() {
        const ownerList = mobx.toJS(Store.owners?.ownerList || []);
        const {activeKey, loading} = this.state;
        console.log('ownerList: ', ownerList);
        return <div className="ownerList-wrapper">
            <Spin className="ownerList-spin" spinning={loading} size="large">
                {(ownerList && ownerList.length > 0) && <Collapse
                    activeKey={activeKey}
                    expandIcon={() => <Avatar src="https://joeschmoe.io/api/v1/random"/>}
                    accordion>
                    {ownerList.map((owner: any, index) =>
                        <Panel header={this.renderOwnerHeader(owner)} key={index}
                               extra={this.renderExtra(index)}>
                            <p className="owner-desc">{this.renderOwnerDesc(owner.name, owner.pets?.length || 0)}</p>
                            {this.renderPets(owner.pets)}
                        </Panel>
                    )}
                </Collapse>}
            </Spin>
        </div>;
    }
}

export default OwnerList;
