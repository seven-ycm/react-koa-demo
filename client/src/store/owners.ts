import {action, observable} from "mobx";
import {getOwners} from "../apis/common/commonApi";

export class Owners {
    @observable
    ownerList;

    @action
    setOwnerList(data) {
        console.log("setOwnerList: ", data);
        this.ownerList = data;
    }

    /**
     * 获取Owners
     */
    async getOwners() {
        return new Promise((resolve, reject) => {
            getOwners()
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    }
}

export default new Owners();
