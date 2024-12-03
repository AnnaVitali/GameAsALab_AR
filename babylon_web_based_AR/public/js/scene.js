const canvas = document.getElementById('renderCanvas');
const engine = new BABYLON.Engine(canvas, true);

const enableFeatureImageTracking = function (featuresManager, hologram){
    try {
        const imageTracking = featuresManager.enableFeature(BABYLON.WebXRFeatureName.IMAGE_TRACKING, "latest", {
            images: [
                {
                    src: "../img/image_target.png",
                    estimatedRealWorldWidth: 0.2
                },
            ]
        });

        imageTracking.onUntrackableImageFoundObservable.add((image) => {
            console.log("image not found :(")
        });

        imageTracking.onTrackedImageUpdatedObservable.add((image) => {
            image.transformationMatrix.decompose(hologram.scaling, hologram.rotationQuaternion, hologram.position);
        });


    }catch(error){
        console.log("Image tracking not supported in this browser or device.");
        console.log(error)
    }
}

const createBoxHologram = function (scene, position, size){
    var cube = BABYLON.MeshBuilder.CreateBox("cube", {size: size}, scene);
    cube.position = position;

    const material = new BABYLON.StandardMaterial("material", scene);
    material.diffuseColor = BABYLON.Color3.White();

    cube.material = material;

    return cube
}

const createButton = function(name, text, width, height, color, background, cornerRadius, top, left, onClick) {
    var button = BABYLON.GUI.Button.CreateSimpleButton(name, text);
    button.width = width;
    button.height = height;
    button.color = color;
    button.cornerRadius = cornerRadius;
    button.background = background;
    button.top = top;
    button.left = left;
    button.onPointerUpObservable.add(onClick);
    return button;
}

const createPositioningGUI = function (hologram) {
    var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("PositioningGUI");

    const width = "200px";
    const height = "200px";
    const color = "white";
    const background = "gray";
    const cornerRadius = 20;

    var up = createButton("up", "UP", width, height, color, background, cornerRadius, 700, 250, function() {
        hologram.position.y += 0.1;
    });
    advancedTexture.addControl(up);

    var down = createButton("down", "DOWN", width, height, color, background, cornerRadius, 950, 250, function() {
        hologram.position.y -= 0.1;
    });
    advancedTexture.addControl(down);

    var left = createButton("left", "LEFT", width, height, color, background, cornerRadius, 850, 50, function() {
        hologram.position.x -= 0.1;
    });
    advancedTexture.addControl(left);

    var right = createButton("right", "RIGHT", width, height, color, background, cornerRadius, 850, 450, function() {
        hologram.position.x += 0.1;
    });
    advancedTexture.addControl(right);
}

const createScene = async function(){
    try{
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
    }else{
        console.log("AR not supported")
    }

    if(xrHelper !== undefined){

        var placeholder = new BABYLON.TransformNode("placeholder")
        placeholder.isVisible = false;

        var cube = createBoxHologram(scene, new BABYLON.Vector3(0, 0, 0), 0.1);

        cube.parent = placeholder;

        const featuresManager = xrHelper.baseExperience.featuresManager;
        enableFeatureImageTracking(featuresManager, placeholder);

        createPositioningGUI(cube)

        return scene;
    }
}catch(error){
    alert(error)
}
}


createScene().then(sceneToRender => {
    engine.runRenderLoop(() => sceneToRender.render());
});
