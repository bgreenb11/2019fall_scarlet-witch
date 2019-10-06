async function getBridgeConfig(api_session) {
    var bridge_config = await api_session.configuration.get();
    console.log(JSON.stringify(bridge_config, null, 2));
    return bridge_config;
}

async function getAllLights(api_session) {
    var lights = await api_session.lights.getAll();
    lights.forEach(light => {
        console.log(light.toStringDetailed());
    });
    return lights;
}

async function getAllGroups(api_session) {
    var groups = await api_session.groups.getAll();
    groups.forEach(group => {
        console.log(group.toStringDetailed());
    });
    return groups;
}

async function getAllScenes(api_session) {
    var scenes = await api_session.scenes.getAll();
    scenes.forEach(scene => {
        console.log(scene.toStringDetailed());
    });
    return scenes;
}