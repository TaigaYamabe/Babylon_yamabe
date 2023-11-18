console.log('hello world');
  
// get our canvas
const canvas = document.getElementById('renderCanvas');
  
// create a BabylonJS engine
const engine = new BABYLON.Engine(canvas, true);
  
// create a scene
function createScene() {
    // create a scene
    const scene = new BABYLON.Scene(engine);
  
    // create a camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,-10),scene);
    camera.attachControl(canvas, true);
    // create a light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0,1,0),scene);
  
    // create a box
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size : 1
    }, scene);
  
    // create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: 32,
        diameter: 2,
    }, scene);
    sphere.position = new BABYLON.Vector3(3,0,0);
  
    // create a plane
    const plane = BABYLON.MeshBuilder.CreatePlane('plane',{},scene);
    plane.position = new BABYLON.Vector3(-3,0,0);
    return scene;
  
}
  
// create our scene
  
const scene = createScene();
  
engine.runRenderLoop(() => {
    scene.render();
  
});