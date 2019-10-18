/*  Vuex module to interact with Philips Hue bridges 
 */

const state = {
    bridges: [{
            name: "Philips hue 1 (192.xxx.xxx.xxx)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.xxx.xxx.xxx",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [{
                mimetype: "image/png",
                height: "48",
                width: "48",
                depth: "24",
                url: "hue_logo_0.png"
            }]
        },
        {
            name: "Philips hue 2 (192.xxx.xxx.xxx)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.xxx.xxx.xxx",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [{
                mimetype: "image/png",
                height: "48",
                width: "48",
                depth: "24",
                url: "hue_logo_0.png"
            }]
        },
        {
            name: "Philips hue 3 (192.xxx.xxx.xxx)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.xxx.xxx.xxx",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [{
                mimetype: "image/png",
                height: "48",
                width: "48",
                depth: "24",
                url: "hue_logo_0.png"
            }]
        },
        {
            name: "Philips hue 4 (192.xxx.xxx.xxx)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.xxx.xxx.xxx",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [{
                mimetype: "image/png",
                height: "48",
                width: "48",
                depth: "24",
                url: "hue_logo_0.png"
            }]
        },
        {
            name: "Philips hue 5 (192.xxx.xxx.xxx)",
            manufacturer: "Royal Philips Electronics",
            ipaddress: "192.xxx.xxx.xxx",
            model: {
                number: "BSB002",
                description: "Philips hue Personal Wireless Lighting",
                name: "Philips hue bridge 2015",
                serial: "0017xxxxxxxx"
            },
            version: {
                major: "1",
                minor: "0"
            },
            icons: [{
                mimetype: "image/png",
                height: "48",
                width: "48",
                depth: "24",
                url: "hue_logo_0.png"
            }]
        }
    ],
    chosen_bridge: null,
};

const getters = {
    allBridges: (state) => state.bridges,
    getBridge: (state) => state.chosen_bridge
};

const actions = {
    addBridges({
        commit
    }, results) {
        commit('addBridges', results)
    },
    chooseBridge({
        commit
    }, ip_address) {
        commit('setChosenBridge', ip_address)
    },
};

const mutations = {
    addBridges: (state, results) => {
        state.bridges.push(results);
        console.log(results);
    },
    setChosenBridge: (state, ip_address) => {
        state.bridges.forEach(element => {
            if (element.ip_address === ip_address) {
                state.chosen_bridge = element;
            }
        });
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};