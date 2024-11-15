const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const createScene = async function(){
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3.Black;

    const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0), scene) // start point for light (1, 1, 0)
    light.intesnity = 1

    const alpha =  3 * Math.PI/2;
    const beta = Math.PI/50;
    const radius = 220;
    const target = new BABYLON.Vector3(0, 0, 0); // (0, 0 ,0) is the user position

    const camera = new BABYLON.ArcRotateCamera("Camera", alpha, beta, radius, target, scene);
    camera.attachControl(canvas, true);

    const supported = await BABYLON.WebXRSessionManager.IsSessionSupportedAsync('immersive-ar')
    let xrHelper

    if (supported) {
        console.log("IMMERSIVE AR SUPPORTED");
        xrHelper = await scene.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: 'immersive-ar',
                referenceSpaceType: "local-floor"
            }
        });
    }else {
        console.log("IMMERSIVE VR SUPPORTED")
        xrHelper = await scene.createDefaultXRExperienceAsync({
            uiOptions: {
                sessionMode: 'immersive-vr',
            }
        });
    }

    try {
        xrHelper.baseExperience.featuresManager.enableFeature(BABYLON.WebXRFeatureName.HAND_TRACKING, "latest", { xrInput: xr.input });
    } catch (err) {
        console.log("Articulated hand tracking not supported in this browser.");
    }

    return scene;

}

createScene().then(sceneToRender => {
    engine.runRenderLoop(() => sceneToRender.render());
});
