const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);
var HOST_ENDPOINT = "wss://economic-unleashed-citrine.glitch.me";
var ROOM_NAME = "my_room";
var room = {};
var xr = {};
var xrCamera = {};
var xr_Check = 0;
var camera_id = {};
var targetPosition = {};
var targetRotation = {};
var pickedMesh={};
var playerEntities = {};
var playerNextPosition = {};
var playerNextRotation = {};
var modelEntities = {};
var modelNextPosition = {};
var modelNextRotation = {};
var modelNextScaling = {};
var id_textNext = {};
var move ={};
var box ={};
//Hero character variables 
var heroSpeed = 0.1;
var heroSpeedBackwards = 0.1;
var heroRotationSpeed = 0.03;
//var animating = true;
var animating = {};
var walkAnim = {};
var walkBackAnim = {};
var idleAnim = {};
var sambaAnim = {};

function hideAllChildren(parentNode) {
  // 直接の子オブジェクトを非表示にする
  //var directChildren = parentNode.getChildren();
  var directChildren = parentNode.getChildren();
  //console.log(directChildren)
  directChildren.forEach(function (child) {
          hideAllChildren(child); // 再帰的に子TransformNodeを処理
          if (child instanceof BABYLON.Mesh) {
            child.isVisible = false; // メッシュなど非TransformNodeの場合は非表示にする
      }
  });
}

// Load Colyseus SDK (asynchronously)
var scriptUrl = "https://unpkg.com/colyseus.js@^0.15.0-preview.2/dist/colyseus.js";
var externalScript = document.createElement("script");
externalScript.src = scriptUrl;
document.head.appendChild(externalScript);

var loadingText = new BABYLON.GUI.TextBlock("instructions");
var id_text= new BABYLON.GUI.TextBlock("instructions");
var createScene = async function () {
var scene = new BABYLON.Scene(engine);
var non_vr_camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 2.5, 25), scene);
non_vr_camera.rotation =new BABYLON.Vector3(0, Math.PI, 0);
// non_vr_camera.position = new BABYLON.Vector3(0,20,-10);
//console.log("non vr camera position"+non_vr_camera.position);
//non_vr_camera.setTarget(BABYLON.Vector3.Zero());
non_vr_camera.attachControl(canvas, true);

var textInput = document.getElementById("textInput");
textInput.addEventListener("input", function() {
    var enteredText = textInput.value;
    id_text.text = textInput.value;
    console.log("Entered Text: ", enteredText);
    // ここで入力されたテキストを利用して何かを行うことができます
});

// // immersive-vrが起動したときの処理を定義する関数
// function handleVRStart() {
//   console.log('VRモードが起動しました。');

//   // ここに実行したい処理を追加
//   // 例: 特定のコンテンツの表示、UIの変更、音声の再生など
// }

// // WebVR関連のイベントリスナーを設定
// window.addEventListener('vrdisplayactivate', handleVRStart); // WebVRがアクティブになったとき
// window.addEventListener('vrdisplayconnect', handleVRStart);  // WebVRデバイスが接続されたとき

function removeEndDigits(inputString) {
  // 文末の数字を正規表現で検索し、削除する
  return inputString.replace(/\d+$/, '');
}



function ColorAllChildren(parentNode) {
  // 直接の子オブジェクトを非表示にする
  //var directChildren = parentNode.getChildren();
  var directChildren = parentNode.getChildren();
  //console.log(directChildren)
  directChildren.forEach(function (child) {
    ColorAllChildren(child); // 再帰的に子TransformNodeを処理
    if (child instanceof BABYLON.Mesh) {
          child.material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0); // 例: 黄色 
    }
  });
}
function NotColorAllChildren(parentNode) {
  // 直接の子オブジェクトを非表示にする
  //var directChildren = parentNode.getChildren();
  var directChildren = parentNode.getChildren();
  //console.log(directChildren)
  directChildren.forEach(function (child) {
    NotColorAllChildren(child); // 再帰的に子TransformNodeを処理
    if (child instanceof BABYLON.Mesh) {
          child.material.emissiveColor = new BABYLON.Color3(0, 0, 0); // 例: 無色
    }
  });
}

// // 例
// var originalString = "123-example123";
// var result = removeEndDigits(originalString);
// console.log(result); // "example"
var num = 4;
try{
xr = await scene.createDefaultXRExperienceAsync({
  //floorMeshes: [environment.ground] /* Array of meshes to be used as landing points */
});
box = BABYLON.MeshBuilder.CreateBox("box", {height: 1, width: 0.75, depth: 0.25});
//xr.baseExperience.camera.name = "aw";
xr.teleportation.detach();
xr.baseExperience.onStateChangedObservable.add((state)=>{
  if(state === BABYLON.WebXRState.IN_XR){
    xr_Check = 1;
    // box.rotation = xr.baseExperience.camera.rotation;
    xrCamera = xr.baseExperience.camera;
    // playerEntities[sessionId] = xr.baseExperience.camera;
    // playerNextPosition[sessionId] = xr.baseExperience.camera.position.clone();
    // playerNextRotation[sessionId] = xr.baseExperience.camera.rotation.clone();
    //console.log('WebXR camera position(before_enteringVR): '+xr.baseExperience.camera.position);
    xr.baseExperience.camera.position = camera_id.position;
    xr.baseExperience.camera.rotation =new BABYLON.Vector3(0, Math.PI, 0);
    //console.log('WebXR camera position(after_enteringVR): '+xr.baseExperience.camera.position);
  
  }        
  else if (state === BABYLON.WebXRState.NOT_IN_XR) {
    // XRモードから出たときの処理
    // ここに特定の処理を追加
    xr_Check = 0;
    camera_id.position = xr.baseExperience.camera.position;
    camera_id.rotation = xr.baseExperience.camera.rotation;
    // playerEntities[sessionId] = camera_id;
    // playerNextPosition[sessionId] = camera_id.position.clone();
    // playerNextRotation[sessionId] = camera_id.rotation.clone();
    //camera_id = scene.getCameraByName(`camera-${room.sessionId}`);
    plane1.setEnabled(false);
    plane2.setEnabled(false);
    plane3.setEnabled(false);
    plane4.setEnabled(false);
    NotColorAllChildren(pickedMesh);
    console.log('Left XR mode. Performing cleanup or additional actions.');
  }
});

//ホワイトボードのテクスチャ部分------------------------------------------------------------------------------------
var plane = BABYLON.MeshBuilder.CreatePlane("space", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./Metaverse_Babylon/texture/メタバース教室.png", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane.material = material;
plane.position = new BABYLON.Vector3(1.5, 6, -14);
plane.scaling = new BABYLON.Vector3(4.0, 2.2, 1);
plane.rotation =new BABYLON.Vector3(0, Math.PI, 0);

//BABYLON.VideoTexture.UseMediaSourceExtension = false;

// 動画のテクスチャを作成------------------------------------------------------------------------------------------
var videoTexture = new BABYLON.VideoTexture("video", ["./Metaverse_Babylon/movie/sea.mp4"], scene, true,false);
videoTexture.onLoadObservable.addOnce(function () {
  // ここにvideoTextureが完全に読み込まれた後に実行したい処理を書きます
  videoTexture.video.currentTime = 0;
  console.log("videoTextureが読み込まれました！");
});
//videoTexture.video.pause();
// if (videoTexture && videoTexture.video) {
//   videoTexture.video.muted = true;
// } else {
//   console.error("Either videoTexture or its video property is undefined or null.");
// }
videoTexture.video.autoplay = false;
// console.log(videoTexture.video.currentTime);
// // videoTexture.video.pause();
// videoTexture.video.currentTime = 0;
// console.log(videoTexture.video.currentTime);
//videoTexture.video.muted = true;
var screen = BABYLON.MeshBuilder.CreatePlane("space", { size: 5 }, scene);
var material = new BABYLON.StandardMaterial("videoMaterial", scene);
material.diffuseTexture = videoTexture;
//material.diffuseTexture = texture;
screen.material = material;
screen.position = new BABYLON.Vector3(-19.5, 6, -14.8);
screen.scaling = new BABYLON.Vector3(3.7, 2.4, 1);
screen.rotation =new BABYLON.Vector3(0, Math.PI, 0);

//動画の操作部分-----------------------------------------------------------------------------------------------------
var playPauseButton = document.getElementById("play-pause");
var seekBar = document.getElementById("seek-bar");
var muteButton = document.getElementById("mute");
var volumeBar = document.getElementById("volume-bar");
// 再生・一時停止の切り替え
playPauseButton.addEventListener("click", function () {
    if (videoTexture.video.paused) {
        videoTexture.video.play();
        playPauseButton.textContent = "Pause";
    } else {
        videoTexture.video.pause();
        playPauseButton.textContent = "Play";
    }
});

// シークバーの更新
videoTexture.video.addEventListener("timeupdate", function () {
    var value = (videoTexture.video.currentTime / videoTexture.video.duration) * 100;
    seekBar.value = value;
});

// シークバーでの動画移動
seekBar.addEventListener("input", function () {
    var value = seekBar.value * videoTexture.video.duration / 100;
    videoTexture.video.currentTime = value;
});

// ミュートの切り替え
muteButton.addEventListener("click", function () {
    videoTexture.video.muted = !videoTexture.video.muted;
    if (videoTexture.video.muted) {
        muteButton.textContent = "Unmute";
    } else {
        muteButton.textContent = "Mute";
    }
});

// ボリュームバーの更新
videoTexture.video.addEventListener("volumechange", function () {
    volumeBar.value = videoTexture.video.volume * 100;
});

// ボリュームバーでの音量調整
volumeBar.addEventListener("input", function () {
    videoTexture.video.volume = volumeBar.value / 100;
});

//アバター部分-------------------------------------------------------------------------------------------------------
// Keyboard events

//キー入力部分--------------------------------------------------------------------------------------------------------------
var map ={}; //object for multiple key presses
//キー入力を受け付ける宣言
//キー入力があるたびに、map変数の値がセットされる
scene.actionManager = new BABYLON.ActionManager(scene);
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; 
}));
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
}));
var distance = 0.01;


// Load hero character
// BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
//     var hero = newMeshes[0];
//     hero.position = new BABYLON.Vector3(0, -9, 0);
//     for(var i =0; i<newMeshes.length; i++){
//       newMeshes[i].name = "space";
//     }
//     console.log(animationGroups[0].name);
//     //Scale the model down        
//     hero.scaling.scaleInPlace(0.6);

//     //Lock camera on the character 

    

//     //Rendering loop (executed for everyframe)
//     scene.registerBeforeRender(function() {	
//       var walkAnim = scene.getAnimationGroupByName("Walking");
//       var walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
//       var idleAnim = scene.getAnimationGroupByName("Idle");
//       var sambaAnim = scene.getAnimationGroupByName("Samba");
//     //scene.onBeforeRenderObservable.add(() => {
//         var keydown = false;
//         //Manage the movements of the character (e.g. position, direction)
//         if (map["t"]) {
//           //console.log("t");
//             hero.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
//             keydown = true;
//         }
//         if (map["g"]) {
//             hero.moveWithCollisions(hero.forward.scaleInPlace(-heroSpeedBackwards));
//             keydown = true;
//         }
//         if (map["f"]) {
//             hero.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
//             keydown = true;
//         }
//         if (map["h"]) {
//             hero.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
//             keydown = true;
//         }
//         if (map["b"]) {
//             keydown = true;
//         }

//         //Manage animations to be played  
//         // if (keydown) {
//         //     if (!animating) {
//         //         animating = true;
//         //         if (map["g"]) {
//         //             //Walk backwards
//         //             walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
//         //         }
//         //         else if
//         //             (map["b"]) {
//         //             //Samba!
//         //             sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
//         //         }
//         //         else {
//         //             //Walk
//         //             walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
//         //         }
//         //     }
//         // }
//         // else {

//         //     if (animating) {
//         //         //Default animation is idle when no key is down     
//         //         idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

//         //         //Stop all animations besides Idle Anim when no key is down
//         //         sambaAnim.stop();
//         //         walkAnim.stop();
//         //         walkBackAnim.stop();

//         //         //Ensure animation are played only once per rendering loop
//         //         animating = false;
//         //     }
//         // }
//     });
// });



//WebXRのUI部分------------------------------------------------------------------------------------------------------
var plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./Metaverse_Babylon/texture/移動.png", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane1.material = material;
plane1.position = new BABYLON.Vector3(0.5, 0.32, 1);
plane1.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
plane1.rotation =new BABYLON.Vector3(0, 0, 0);
// plane1.position = new BABYLON.Vector3(-5, 0, 0);
// plane1.scaling = new BABYLON.Vector3(0.4, 0.4, 1);
// plane1.rotation =new BABYLON.Vector3(0, Math.PI, 0);
//plane1.parent = non_vr_camera;
plane1.parent =xr.baseExperience.camera;

var plane2 = BABYLON.MeshBuilder.CreatePlane("plane2", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./Metaverse_Babylon/texture/回転.png", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane2.material = material;
plane2.position = new BABYLON.Vector3(0.5, 0.06, 1);
plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
plane2.rotation =new BABYLON.Vector3(0, 0, 0);
//plane2.position = new BABYLON.Vector3(5, 0, 0);
//plane2.scaling = new BABYLON.Vector3(0.4, 0.4, 1);
//plane2.rotation =new BABYLON.Vector3(0, Math.PI, 0);
//plane2.parent = non_vr_camera;
plane2.parent =xr.baseExperience.camera;

var plane3 = BABYLON.MeshBuilder.CreatePlane("plane3", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./Metaverse_Babylon/texture/削除.jpeg", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane3.material = material;
plane3.position = new BABYLON.Vector3(0.5, -0.2, 1);
plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
plane3.rotation =new BABYLON.Vector3(0, 0, 0);
// plane3.position = new BABYLON.Vector3(0, 0, 0);
// plane3.scaling = new BABYLON.Vector3(0.4, 0.4, 1);
// plane3.rotation =new BABYLON.Vector3(0, Math.PI, 0);
//plane3.parent = non_vr_camera;
plane3.parent =xr.baseExperience.camera;

var plane4 = BABYLON.MeshBuilder.CreatePlane("plane4", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./Metaverse_Babylon/texture/カメラ.jpg", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane4.material = material;
plane4.position = new BABYLON.Vector3(0.5, -0.46, 1);
plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
plane4.rotation =new BABYLON.Vector3(0, 0, 0);
plane4.parent =xr.baseExperience.camera;

plane1.setEnabled(false);
plane2.setEnabled(false);
plane3.setEnabled(false);
plane4.setEnabled(false);

}catch (e) {
  console.log(e);
}
//物をつかむ機能
//const tmpRay = new BABYLON.Ray();
// tmpRay.origin = new BABYLON.Vector3();
// tmpRay.direction = new BABYLON.Vector3();
// tmpRay.length = 10;

var startCube=BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
pickedMesh=startCube;
pickedMesh.setEnabled(false);


// pickedMesh=BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
//       pickedMesh.dispose();
var csvArray = [["delete:"]];
for(var n =1; n<jsArray2[0].length; n++){
    csvArray[0].push(jsArray2[0][n]);
}

// //キー入力部分--------------------------------------------------------------------------------------------------------------
// var map ={}; //object for multiple key presses
// //キー入力を受け付ける宣言
// //キー入力があるたびに、map変数の値がセットされる
// scene.actionManager = new BABYLON.ActionManager(scene);
// scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
// map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; 
// }));

// scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
// map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
// }));
// var distance = 0.01;

const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
      light.diffuse = new BABYLON.Color3(1, 1, 1);
      light.specular = new BABYLON.Color3(1, 1, 1); // スペキュラカラー
      light.groundColor = new BABYLON.Color3(0.8, 0.8, 0.8); // 地面のカラー
      light.intensity = 1; // ライトの強度
// var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
// sphere.position.y = 1;

 //背景画像-----------------------------------------------------------------------------------------------------------
 var dome = new BABYLON.PhotoDome(
    "space",
    "./Metaverse_Babylon/texture/green.jpeg",
    {
        resolution: 32,
        size: 1000
    },
    scene
);
var childMeshes = dome.getChildMeshes();
// 子メッシュの名前をコンソールに出力
childMeshes.forEach(function(childMesh) {
    childMesh.name = "space";
});

  //-----------------------------------------------------------------------------------------

    //キー入力確認用
    // var Box_Left_Trigger = BABYLON.MeshBuilder.CreateBox("Box_Left_Trigger",{},scene);
    // Box_Left_Trigger.position = new BABYLON.Vector3(-2.5,10,3);
  
    // var Box_Left_Squeeze = BABYLON.MeshBuilder.CreateBox("Box_Left_Squeeze",{},scene);
    // Box_Left_Squeeze.position = new BABYLON.Vector3(-2.5,9,3);
  
    // var Sphere_Left_YButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_YButton", {diameter:1}, scene);
    // Sphere_Left_YButton.position = new BABYLON.Vector3(-2,10,3);
  
    // var Sphere_Left_XButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_XButton", {diameter:1}, scene);
    // Sphere_Left_XButton.position = new BABYLON.Vector3(-2,10,2);
  
  
    // var Box_Left_ThumbStick = BABYLON.MeshBuilder.CreateBox("Box_Left_ThumbStick",{size:0.5},scene);
    // Box_Left_ThumbStick.position = new BABYLON.Vector3(-1,10,1);
  
  
    // var Box_Right_Trigger = BABYLON.MeshBuilder.CreateBox("Box_Right_Trigger",{},scene);
    // Box_Right_Trigger.position = new BABYLON.Vector3(2.5,11,3);
  
    // var Box_Right_Squeeze = BABYLON.MeshBuilder.CreateBox("Box_Right_Squeeze",{},scene);
    // Box_Right_Squeeze.position = new BABYLON.Vector3(2.5,9,3);
  
    // var Sphere_Right_BButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_BButton", {diameter:1}, scene);
    // Sphere_Right_BButton.position = new BABYLON.Vector3(2,10,3);
  
    // var Sphere_Right_AButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_AButton", {diameter:1}, scene);
    // Sphere_Right_AButton.position = new BABYLON.Vector3(2,10,2);
  
    // var Box_Right_ThumbStick = BABYLON.MeshBuilder.CreateBox("Box_Right_ThumbStick",{size:0.5},scene);
    // Box_Right_ThumbStick.position = new BABYLON.Vector3(1,10,1);

  //教室の3Dモデル-----------------------------------------------------------------------------------------------------
  BABYLON.SceneLoader.ImportMesh("","./Metaverse_Babylon/Models/","classroom_window.glb", scene, 
    //BABYLON.SceneLoader.ImportMesh("","./Models/", "lab.glb", scene, 
    function (meshes) {
      //console.log(meshes.length);
      for(var i =0; i<meshes.length; i++){
        meshes[i].name = "space";
      }
      const mesh = meshes[0];
      mesh.name = "space";
      mesh.position = new BABYLON.Vector3(0, -10, 30);
      mesh.scaling = new BABYLON.Vector3(-10, 10, 10);
    },
  );

  //アップロードされている3Dモデル---------------------------------------------------------------------------------------
  var loadedMeshes = [];
  function loadAndAddMeshes(fileURL1,fileURL2, space, scene) {
    return new Promise(function (resolve, reject) {
        BABYLON.SceneLoader.ImportMesh("", fileURL1,fileURL2, scene, function (newMeshes) {
          if(space =="space"){
            newMeshes[0].name ="space";
            newMeshes[1].name ="space";
          }
          else{
            newMeshes[0].name =fileURL2
            csvArray.push([newMeshes[0].name]);
            for(var n =1; n<newMeshes.length; n++){
            newMeshes[n].name =fileURL2 + n;
            //newMeshes[n].scaling = BABYLON.Vector3(-1, 1, 1);
            csvArray.push([newMeshes[n].name]);
            }
          }
          loadedMeshes.push(newMeshes);
          resolve();
        });
    });
  }
  var loadPromises = [];
  for(var i =0; i<jsArray1.length; i++){
    loadPromises.push(loadAndAddMeshes("./Metaverse_Babylon/Models/",jsArray1[i][0], jsArray1[i][1],scene));
  }
  Promise.all(loadPromises).then(function () {
    // メッシュを特定の順序でシーンに追加
    // 例: i番目の.glbファイルのメッシュを最初に追加
    console.log(loadPromises.length);
    console.log(loadedMeshes);
    for(var i =0; i<loadPromises.length; i++){
    //scene.addMesh(loadedMeshes[i][0]);
    if(loadedMeshes[i][0].name=="space"){
      //if(k!=-1){loadedMeshes[k][1].dispose();}
      //k=i;
      //loadedMeshes[i][0].name = "space";
      loadedMeshes[i][0].scaling = new BABYLON.Vector3(10, 10, 10);
      loadedMeshes[i][0].position = new BABYLON.Vector3(0, -5, 0);
      loadedMeshes[i][0].rotation = new BABYLON.Vector3(0, 0, 0);
    }else{
      //loadedMeshes[i][0].scaling = new BABYLON.Vector3(1, 1, 1);
      // //loadedMeshes[i][0].name="object"
      // メッシュのバウンディングボックスを取得
      //var boundingBox = BABYLON.Tools.CalculateHierarchyWorldBoundingBox(loadedMeshes[i][0]);
      //var boundingBox = BABYLON.BoundingBox.CreateFromPoints(loadedMeshes[i][0].getHierarchyBoundingVectors());
      // var dimensions_min =1000;
      // var dimensions_max =0;
    
      var boundingInfo = loadedMeshes[i][loadedMeshes[i].length-1].getBoundingInfo();
      // バウンディングボックスの寸法を計算
      var dimensions = boundingInfo.boundingBox.maximumWorld.subtract(boundingInfo.boundingBox.minimumWorld);
      // if(boundingInfo.boundingBox.minimum.x<dimensions_min){
      //   dimensions_min = boundingInfo.boundingBox.minimumWorld.x;
      // }
      // if(boundingInfo.boundingBox.maximum.x>dimensions_max){
      //   dimensions_max = boundingInfo.boundingBox.maximumWorld.x;
      // }
       //console.log("バウンディングボックスの最小座標:", boundingInfo.boundingBox.minimumWorld);
       //console.log("バウンディングボックスの最大座標:", boundingInfo.boundingBox.maximumWorld);
      }
      // バウンディングボックスの寸法から正規化に必要なスケールを計算
      loadedMeshes[i][0].scaling = new BABYLON.Vector3(5/dimensions.length(), 5/ dimensions.length(), 5/ dimensions.length());
      //loadedMeshes[i][0].scaling = new BABYLON.Vector3(-1/(dimensions_max-dimensions_min), 1/ (dimensions_max-dimensions_min), 1/ (dimensions_max-dimensions_min));
      loadedMeshes[i][0].rotation = new BABYLON.Vector3(0, 0, 0);
      //loadedMeshes[i][0].scaling = new BABYLON.Vector3(-10, 10, 10);
      loadedMeshes[i][0].position = new BABYLON.Vector3(0, 0, 0);
      // //pickedMesh= loadedMeshes[i][0];
      for(var j =1; j<loadedMeshes[i].length; j++){
        loadedMeshes[i][j].scaling = new BABYLON.Vector3(-1, 1, 1);
      }
    }
    for(var m =0; m<scene.meshes.length; m++){
      //scene.meshes[m].rotation = new BABYLON.Vector3(0, 0, 0);
      for(var n =0; n<jsArray2.length; n++){
        if(scene.meshes[m].name == jsArray2[n][0]){
          scene.meshes[m].position = new BABYLON.Vector3(Number(jsArray2[n][1]), Number(jsArray2[n][2]), Number(jsArray2[n][3]));
          scene.meshes[m].rotation = new BABYLON.Vector3(Number(jsArray2[n][4]), Number(jsArray2[n][5]), Number(jsArray2[n][6]));
          scene.meshes[m].scaling = new BABYLON.Vector3(Number(jsArray2[n][7]), Number(jsArray2[n][8]), Number(jsArray2[n][9]));
        }
      }
      for(var n =0; n<csvArray.length; n++){
        if(scene.meshes[m].name == csvArray[n][0]){
          csvArray[n].push(scene.meshes[m].position.x);
          csvArray[n].push(scene.meshes[m].position.y);
          csvArray[n].push(scene.meshes[m].position.z);
          csvArray[n].push(scene.meshes[m].rotation.x);
          csvArray[n].push(scene.meshes[m].rotation.y);
          csvArray[n].push(scene.meshes[m].rotation.z);
          csvArray[n].push(scene.meshes[m].scaling.x);
          csvArray[n].push(scene.meshes[m].scaling.y);
          csvArray[n].push(scene.meshes[m].scaling.z);
        }
      }
      for(var n =0; n<csvArray[0].length; n++){
        if(scene.meshes[m].name == csvArray[0][n]){
          scene.meshes[m].isVisible = false;
        }
      }
    }
    for(var i =0; i<loadedMeshes.length; i++){
      modelEntities[loadedMeshes[i][0].name] = loadedMeshes[i][0];
      modelNextPosition[loadedMeshes[i][0].name] = loadedMeshes[i][0].position;
      modelNextRotation[loadedMeshes[i][0].name] = loadedMeshes[i][0].rotation;
      modelNextScaling[loadedMeshes[i][0].name] = loadedMeshes[i][0].scaling;
    }
    
    console.log(modelEntities);
    document.getElementById("csvArray").value = JSON.stringify(csvArray);
  });
  
  document.addEventListener('keyup', function (event) {
    // 押されたキーのキーコードを取得
    var keyCode = event.keyCode;

    // キーコードが例えばEnterキーの場合
    if (keyCode === 53) {
      if(pickedMesh.name !== "cube"){
        for(var m =0; m<scene.meshes.length; m++){
          if(scene.meshes[m].isVisible == false){
            for(var n =0; n<csvArray[0].length; n++){
              if(csvArray[0][n] === scene.meshes[m].name){
                break;
              }
              if(n == csvArray[0].length-1 && csvArray[0][n] !== scene.meshes[m].name){
                csvArray[0].push(scene.meshes[m].name);
              }
            }
          }
      }
      }
    }
    document.getElementById("csvArray").value = JSON.stringify(csvArray);
});
    //クリックイベント検出
    window.addEventListener("click", function () {
    // pickでポインタ情報を取得する
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    // もしクリックが壁にhitした場合、ぶつかった画像の位置を更新する
    if(pickResult.pickedMesh.name != "space"){
      if (pickResult.hit) {
        pickedMesh=pickResult.pickedMesh;
        // obj_mat = pickedMesh.material;
        //console.log(removeEndDigits(pickResult.pickedMesh.name))
        pickedMesh=scene.getMeshByName(removeEndDigits(pickResult.pickedMesh.name));
        //scene.getMeshByName(removeEndDigits(pickResult.pickedMesh.name));
      }
    }


scene.registerBeforeRender(function() {	
//scene.registerAfterRender(function() {	
//   if (scene.isReady()) {
//     scene.getMaterialByName("videoMaterial").getTexture().video.play();
// }
//"a"または"A"を押し続けている間、if文を実行
// if((map["ArrowUp"])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(-distance, 0, 0));
//     //xr.baseExperience.camera.translate(BABYLON.Axis.X, -2*distance, BABYLON.Space.WORLD);
// }
// //"d"または"D"を押し続けている間、if文を実行
// if((map["ArrowDown"])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(distance, 0, 0));
// }
// //"w"または"W"を押し続けている間、if文を実行
// if((map[","])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, distance, 0));
// }
// //"s"または"S"を押し続けている間、if文を実行
// if((map["."])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, -distance, 0));
// }
// //"w"または"W"を押し続けている間、if文を実行
// if((map["ArrowRight"])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, 0,distance));
// }
// //"s"または"S"を押し続けている間、if文を実行
// if((map["ArrowLeft"])){
//     xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, 0, -distance));
// }
//var cameraByName = scene.getCameraByName(`camera-${room.sessionId}`);
var cameraByName = scene.activeCamera;
cameraByName.position.y = 2.5;
if((map["ArrowUp"])){
  //console.log("1");
  if(cameraByName!= null){
    if(cameraByName.position && cameraByName.rotation){
      // var intervalID = setInterval(function(){
      //   console.log("ue");
      //   cameraByName.position.z += 0.02 * Math.cos(cameraByName.rotation.y);
      //   cameraByName.position.x += 0.02 * Math.sin(cameraByName.rotation.y);
      // },10)
      //console.log("ue");
      
      // cameraByName.position.z += 0.02 * Math.cos(cameraByName.rotation.y);
      // cameraByName.position.x += 0.02 * Math.sin(cameraByName.rotation.y);
    }
    //camera_id.translate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    //camera_id.position.z += 0.3;
  }
}
//"d"または"D"を押し続けている間、if文を実行
if((map["ArrowDown"])){
  if(cameraByName!= null){
    if(cameraByName.position && cameraByName.rotation){
      // cameraByName.position.z -= 0.02 * Math.cos(cameraByName.rotation.y);
      // cameraByName.position.x -= 0.02 * Math.sin(cameraByName.rotation.y);
    }
    //camera_id.translate(BABYLON.Axis.Y, -distance, BABYLON.Space.WORLD);
    //Math.cos(camera_id.rotation.y)

  }
}
//"w"または"W"を押し続けている間、if文を実行
if((map["ArrowRight"])){
  if(cameraByName!= null){
    if(cameraByName.position && cameraByName.rotation){
      // cameraByName.position.x += 0.02 * Math.cos(cameraByName.rotation.y);
      // cameraByName.position.z -= 0.02 * Math.sin(cameraByName.rotation.y);
    }
    //camera_id.translate(BABYLON.Axis.X, distance, BABYLON.Space.WORLD);
  }
}
//"s"または"S"を押し続けている間、if文を実行
if((map["ArrowLeft"])){
  if(cameraByName!= null){
    if(cameraByName.position && cameraByName.rotation){
      // cameraByName.position.x -= 0.02 * Math.cos(cameraByName.rotation.y);
      // cameraByName.position.z += 0.02 * Math.sin(cameraByName.rotation.y);
    }
    //camera_id.translate(BABYLON.Axis.X, distance, BABYLON.Space.WORLD);
  }
}

if(pickedMesh.name != "space"){
    var boundingBox_center = pickedMesh.getBoundingInfo().boundingBox.centerWorld;
    // var boundingBox_dimensions = pickedMesh.getBoundingInfo().boundingBox.maximumWorld.subtract( pickedMesh.getBoundingInfo().boundingBox.minimumWorld);
    // console.log(boundingBox_dimensions.length());
    //"a"または"A"を押し続けている間、if文を実行
    if((map["a"] || map["A"])){
      //console.log("1");
      if(pickedMesh!= null){
        if(boundingBox_center.x <= 35){
          pickedMesh.translate(BABYLON.Axis.X, distance, BABYLON.Space.WORLD);
        }
      }
    }
    //"d"または"D"を押し続けている間、if文を実行
    if((map["d"] || map["D"])){
      if(boundingBox_center.x >= -35){
        pickedMesh.translate(BABYLON.Axis.X, -distance, BABYLON.Space.WORLD);
      }
    }
    //"w"または"W"を押し続けている間、if文を実行
    if((map["w"] || map["W"])){
      if(boundingBox_center.y <= 15){
        pickedMesh.translate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
      }
    }
    //"s"または"S"を押し続けている間、if文を実行
    if((map["s"] || map["S"])){
      if(boundingBox_center.y >= -9){
        pickedMesh.translate(BABYLON.Axis.Y, -distance, BABYLON.Space.WORLD);
      }
    }
    //"q"または"Q"を押し続けている間、if文を実行
    if((map["q"] || map["Q"])){
      if(boundingBox_center.z >= -8){
      pickedMesh.translate(BABYLON.Axis.Z, -distance, BABYLON.Space.WORLD);
      }
    }
    //"e"または"E"を押し続けている間、if文を実行
    if((map["e"] || map["E"])){
      if(boundingBox_center.z <= 80){
      pickedMesh.translate(BABYLON.Axis.Z, distance, BABYLON.Space.WORLD);
      }
    }
    //"1"を押し続けている間、if文を実行
    if((map["1"])){
      //pickedMesh.rotate(BABYLON.Axis.Y, distance/5, BABYLON.Space.WORLD);
      pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, -distance/2, 0));
    }
    if((map["2"])){
      pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, distance/2, 0));
      //pickedMesh.rotate(BABYLON.Axis.X, distance/5, BABYLON.Space.WORLD);
    }
    if((map["3"])){
      pickedMesh.scaling = pickedMesh.scaling.scale(1000/999);
      //pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(-distance/2, distance/2, distance/2));
    }
    if((map["4"])){
      pickedMesh.scaling = pickedMesh.scaling.scale(999/1000);
      //pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(distance/2, -distance/2, -distance/2));
    }
    if((map["5"])){
      //getAllChildren(obj).isVisible = false;
      hideAllChildren(pickedMesh);
    }

    // if((map["ArrowUp"])){
    //   //console.log("1");
    //   if(camera_id!= null){
    //     //camera_id.translate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
    //     //camera_id.position.z += 0.3;
    //     camera_id.position.z += 0.2 * Math.cos(camera_id.rotation.y);
    //     camera_id.position.x += 0.2 * Math.sin(camera_id.rotation.y);
    //   }
    // }
    // //"d"または"D"を押し続けている間、if文を実行
    // if((map["ArrowDown"])){
    //   if(camera_id!= null){
    //     //camera_id.translate(BABYLON.Axis.Y, -distance, BABYLON.Space.WORLD);
    //     //Math.cos(camera_id.rotation.y)
    //     camera_id.position.z -= 0.2 * Math.cos(camera_id.rotation.y);
    //     camera_id.position.x -= 0.2 * Math.sin(camera_id.rotation.y);

    //   }
    // }
    // //"w"または"W"を押し続けている間、if文を実行
    // if((map["ArrowRight"])){
    //   if(camera_id!= null){
    //     //camera_id.translate(BABYLON.Axis.X, distance, BABYLON.Space.WORLD);
    //     camera_id.position.x += 0.2 * Math.cos(camera_id.rotation.y);
    //     camera_id.position.z -= 0.2 * Math.sin(camera_id.rotation.y);
    //   }
    // }
    // //"s"または"S"を押し続けている間、if文を実行
    // if((map["ArrowLeft"])){
    //   if(camera_id!= null){
    //     //camera_id.translate(BABYLON.Axis.X, -distance, BABYLON.Space.WORLD);
    //     camera_id.position.x -= 0.2 * Math.cos(camera_id.rotation.y);
    //     camera_id.position.z += 0.2 * Math.sin(camera_id.rotation.y);
    //   }
    // }




    for(var n =0; n<csvArray.length; n++){
      if(pickedMesh.name == csvArray[n][0]){
        csvArray[n][1] = pickedMesh.position.x;
        csvArray[n][2] = pickedMesh.position.y;
        csvArray[n][3] = pickedMesh.position.z;
        csvArray[n][4] = pickedMesh.rotation.x;
        csvArray[n][5] = pickedMesh.rotation.y;
        csvArray[n][6] = pickedMesh.rotation.z;
        csvArray[n][7] = pickedMesh.scaling.x;
        csvArray[n][8] = pickedMesh.scaling.y;
        csvArray[n][9] = pickedMesh.scaling.z;
      }
    }
    document.getElementById("csvArray").value = JSON.stringify(csvArray);
    
    }
});
});
document.addEventListener("keydown", function (event) {
    if (event.key === "x") {
        if (scene.debugLayer.isVisible()) {
          scene.debugLayer.hide();
        } else {
          scene.debugLayer.show();
        }
    }
  });

  //コントローラキー入力
  xr.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((motionController) => {
      //HMDの角度取得
      // const xrFrame = xr.baseExperience.camera.baseExperience.sessionManager.currentFrame;
      //   if (xrFrame) {
      //       const viewerPose = xrFrame.getViewerPose();
      //       if (viewerPose) {
      //           const viewerTransform = viewerPose.transform;
      //           // viewerTransformから姿勢データを取得して利用する
      //           const position = viewerTransform.position;
      //           const orientation = viewerTransform.orientation;
      //           box.rotation = viewerTransform.rotation;
      //           // カメラの向きや角度を更新するために姿勢データを利用する
      //       }
      //   }

        if (motionController.handness === 'left') {
             const xr_ids = motionController.getComponentIds();
             let triggerComponent = motionController.getComponent(xr_ids[0]);//xr-standard-trigger
             triggerComponent.onButtonStateChangedObservable.add(() => {
                 if (triggerComponent.pressed) {
                     //Box_Left_Trigger.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 
                 }else{
                     //Box_Left_Trigger.scaling= new BABYLON.Vector3(1,1,1);
                 
                 }

                 
                 scene.onPointerObservable.add((pointerInfo) => {
                  switch (pointerInfo.type) {
                      case BABYLON.PointerEventTypes.POINTERDOWN:
                          var pickResult = pointerInfo.pickInfo;
                          if (pickResult.hit) {
                            if(pickResult.pickedMesh == plane1){
                              num =1;
                              plane1.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane1.position = new BABYLON.Vector3(0.5, 0.32, 0.95);
                              plane2.position = new BABYLON.Vector3(0.5, 0.06, 1);
                              plane3.position = new BABYLON.Vector3(0.5,-0.20, 1);
                              plane4.position = new BABYLON.Vector3(0.5,-0.46, 1);
                            }
                            else if(pickResult.pickedMesh == plane2){
                              num=2;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane1.position = new BABYLON.Vector3(0.5, 0.32, 1);
                              plane2.position = new BABYLON.Vector3(0.5, 0.06, 0.95);
                              plane3.position = new BABYLON.Vector3(0.5,-0.20, 1);
                              plane4.position = new BABYLON.Vector3(0.5,-0.46, 1);
                            }
                            else if(pickResult.pickedMesh == plane3){
                              num=3;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane3.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane1.position = new BABYLON.Vector3(0.5, 0.32, 1);
                              plane2.position = new BABYLON.Vector3(0.5, 0.06, 1);
                              plane3.position = new BABYLON.Vector3(0.5,-0.20, 0.95);
                              plane4.position = new BABYLON.Vector3(0.5,-0.46, 1);
                            }
                            else if(pickResult.pickedMesh == plane4){
                              num=4;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane4.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane1.position = new BABYLON.Vector3(0.5, 0.32, 1);
                              plane2.position = new BABYLON.Vector3(0.5, 0.06, 1);
                              plane3.position = new BABYLON.Vector3(0.5,-0.20, 1);
                              plane4.position = new BABYLON.Vector3(0.5,-0.46, 0.95);
                            }
                            else
                            {
                              if(pickResult.pickedMesh.name != "space" && !pickedMesh.isEnabled()){
                                //console.log(removeEndDigits(pickResult.pickedMesh.name))
                                pickedMesh =scene.getMeshByName(removeEndDigits(pickResult.pickedMesh.name));
                                //pickedMesh = pickResult.pickedMesh;
                                ColorAllChildren(pickedMesh);
                                //pickResult.pickedMesh.material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0); // 例: 黄色
                              }
                              if(pickResult.pickedMesh.name != "space" && pickedMesh.isEnabled()){
                                NotColorAllChildren(pickedMesh);
                                //pickedMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0); 
                                //pickedMesh = pickResult.pickedMesh;
                                //console.log(removeEndDigits(pickResult.pickedMesh.name))
                                pickedMesh =scene.getMeshByName(removeEndDigits(pickResult.pickedMesh.name));
                                ColorAllChildren(pickedMesh);
                                //pickResult.pickedMesh.material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0); // 例: 黄色
                              }
                              if(pickResult.pickedMesh.name == "space" && pickedMesh.isEnabled()){
                                NotColorAllChildren(pickedMesh);
                                //pickResult.pickedMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0); 
                                pickedMesh=startCube;
                              }                  
                            }
                          }
                      break;
                      }
            
              });
             });
             // ボタンが押された瞬間のみ反応するアクションを作成
           
             let squeezeComponent = motionController.getComponent(xr_ids[1]);//xr-standard-squeeze
             squeezeComponent.onButtonStateChangedObservable.add((eventData) => {
                 if (eventData.pressed && eventData.value === 1) {
                  //console.log(eventData.value);
                     //Box_Left_Squeeze.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                     if (!plane1.isEnabled()) {
                      //console.log("オブジェクトは非表示です。");
                      plane1.setEnabled(true);
                      plane2.setEnabled(true);
                      plane3.setEnabled(true);
                      plane4.setEnabled(true);
                      // ここに非表示の場合の処理を記述
                    }
                    else{
                      plane1.setEnabled(false);
                      plane2.setEnabled(false);
                      plane3.setEnabled(false);
                      plane4.setEnabled(false);
                    }
                  
                 }else{
                     //Box_Left_Squeeze.scaling=new BABYLON.Vector3(1,1,1);
                 }
             });
             let thumbstickComponent = motionController.getComponent(xr_ids[2]);//xr-standard-thumbstick
             thumbstickComponent.onButtonStateChangedObservable.add(() => {
                 if (thumbstickComponent.pressed) {
                     //Box_Left_ThumbStick.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     //Box_Left_ThumbStick.scaling=new BABYLON.Vector3(1,1,1);
                 }
             });
             thumbstickComponent.onAxisValueChangedObservable.add((axes) => {
                 if(num == 1){
                  //Box_Left_ThumbStick.position.x += (axes.x)/100;
                  //Box_Left_ThumbStick.position.y -= (axes.y)/100;
 
                  pickedMesh.position.x -= (axes.x)/10;
                  pickedMesh.position.y -= (axes.y)/10;
                 }
                 if(num == 2){
                  //pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3((axes.y)/10, 0, 0));
                  pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, (axes.x)/10), 0);
                 }
                 if(num == 3){
                  //pickedMesh.scaling = pickedMesh.scaling.scale(99/100);
                  //pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(-axes.x/10, axes.x/10, axes.x/10));
                 }
                 if(num == 4){
                  xr.baseExperience.camera.position.x -= (axes.x)/10;
                  xr.baseExperience.camera.position.z += (axes.y)/10;
                 }
                // console.log(values.x, values.y);
             });

             
             function XrepeatFunction() {
              if(num == 1){
                pickedMesh.position.z += 0.03;
              }
              if(num == 2){
                //pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, -0.01, 0));
                pickedMesh.scaling = pickedMesh.scaling.scale(99/100);
              }
              if(num == 3){
                if(pickedMesh.name !== "cube"){
                  for(var m =0; m<scene.meshes.length; m++){
                    if(scene.meshes[m].isVisible == false){
                      for(var n =0; n<csvArray[0].length; n++){
                        if(csvArray[0][n] === scene.meshes[m].name){
                          break;
                        }
                        if(n == csvArray[0].length-1 && csvArray[0][n] !== scene.meshes[m].name){
                          csvArray[0].push(scene.meshes[m].name);
                        }
                      }
                    }
                }
                }
                hideAllChildren(pickedMesh);
                //pickedMesh.scaling = pickedMesh.scaling.scale(99/100);
                //pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(-0.01, -0.01, -0.01));
              }
              if(num == 4){
                //xr.baseExperience.camera.position.y -= 0.03;
              }
          }
             let xbuttonComponent = motionController.getComponent(xr_ids[3]);//x-button
             xbuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (xbuttonComponent.value == 1) {
                  //Sphere_Left_XButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  xbuttonComponent.repeatFunctionInterval = setInterval(XrepeatFunction, 10);
                  //console.log("1");
                 }
                 if(xbuttonComponent.value == 0){
                  //Sphere_Left_XButton.scaling=new BABYLON.Vector3(1,1,1);  
                  //console.log("0");
                  clearInterval(xbuttonComponent.repeatFunctionInterval);
                 }
             });
             function YrepeatFunction() {
              if(num == 1){
                pickedMesh.position.z -= 0.03;
              }
              if(num == 2){
                //pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, 0.01, 0));
                pickedMesh.scaling = pickedMesh.scaling.scale(100/99);
              }
              if(num == 3){
                //pickedMesh.scaling = pickedMesh.scaling.scale(100/99);
                //pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(0.01, 0.01, 0.01));
              }
              if(num == 4){
                //xr.baseExperience.camera.position.y += 0.01;
              }
             }
             let ybuttonComponent = motionController.getComponent(xr_ids[4]);//y-button
             ybuttonComponent.onButtonStateChangedObservable.add(() => {

                 if (ybuttonComponent.value == 1) {
                  //Sphere_Left_YButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  ybuttonComponent.repeatFunctionInterval = setInterval(YrepeatFunction, 10);
                 }
                 if(ybuttonComponent.value == 0){
                     //Sphere_Left_YButton.scaling=new BABYLON.Vector3(1,1,1);  
                     clearInterval(ybuttonComponent.repeatFunctionInterval);
                 }
             });            
        }
        if (motionController.handness === 'right') {
             const xr_ids = motionController.getComponentIds();
             let triggerComponent = motionController.getComponent(xr_ids[0]);//xr-standard-trigger
             triggerComponent.onButtonStateChangedObservable.add(() => {
                 if (triggerComponent.pressed) {
                     //Box_Right_Trigger.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 
                 }else{
                     //Box_Right_Trigger.scaling= new BABYLON.Vector3(1,1,1);
                 
                 }
             });
             let squeezeComponent = motionController.getComponent(xr_ids[1]);//xr-standard-squeeze
             squeezeComponent.onButtonStateChangedObservable.add(() => {
                 if (squeezeComponent.pressed) {
                     //Box_Right_Squeeze.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  
                 }else{
                     //Box_Right_Squeeze.scaling=new BABYLON.Vector3(1,1,1);
                 }
             });
             let thumbstickComponent = motionController.getComponent(xr_ids[2]);//xr-standard-thumbstick
             thumbstickComponent.onButtonStateChangedObservable.add(() => {
                 if (thumbstickComponent.pressed) {
                     //Box_Right_ThumbStick.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     //Box_Right_ThumbStick.scaling=new BABYLON.Vector3(1,1,1);
                 }

             });
             thumbstickComponent.onAxisValueChangedObservable.add((axes) => {
                 //Box_Right_ThumbStick is moving according to stick axes but camera rotation is also changing..
                 //Box_Right_ThumbStick.position.x += (axes.x)/100;
                 //Box_Right_ThumbStick.position.y += (axes.y)/100;
                // console.log(values.x, values.y);
             });

             let abuttonComponent = motionController.getComponent(xr_ids[3]);//a-button
             abuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (abuttonComponent.pressed) {
                     //Sphere_Right_AButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     //Sphere_Right_AButton.scaling=new BABYLON.Vector3(1,1,1);  
                 }
             });
             let bbuttonComponent = motionController.getComponent(xr_ids[4]);//b-button
             bbuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (bbuttonComponent.pressed) {
                     //Sphere_Right_BButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                    
                 }else{
                     //Sphere_Right_BButton.scaling=new BABYLON.Vector3(1,1,1);  
                 }
             });
        }

        for(var n =0; n<csvArray.length; n++){
          if(pickedMesh.name == csvArray[n][0]){
            csvArray[n][1] = pickedMesh.position.x;
            csvArray[n][2] = pickedMesh.position.y;
            csvArray[n][3] = pickedMesh.position.z;
            csvArray[n][4] = pickedMesh.rotation.x;
            csvArray[n][5] = pickedMesh.rotation.y;
            csvArray[n][6] = pickedMesh.rotation.z;
            csvArray[n][7] = pickedMesh.scaling.x;
            csvArray[n][8] = pickedMesh.scaling.y;
            csvArray[n][9] = pickedMesh.scaling.z;
          }
        }
    })

  });
  // Display "loading" text
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  loadingText.text = "Loading the Colyseus SDK file...";
  loadingText.color = "#fff000";
  loadingText.fontFamily = "Roboto";
  loadingText.fontSize = 30;
  loadingText.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
  loadingText.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
  loadingText.paddingBottom = "5px";
  advancedTexture.addControl(loadingText);

  id_text.text = `...`;
  id_text.color = "#fff000";
  id_text.fontSize = 30;
// テキストの位置設定（左上）
  id_text.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
  id_text.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
  advancedTexture.addControl(id_text);

  // build scene only after Colyseus SDK script is loaded.
  externalScript.onload = function() {
      // build the final scene
      buildScene(scene);
  };
return scene;
};
var buildScene = async function (scene) {
  var colyseusSDK = new Colyseus.Client(HOST_ENDPOINT);
  loadingText.text = "Connecting with the server, please wait...";
  var sphere={};
  // var sphere=BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
  // sphere.name = "startsphere";
  // sphere.dispose();;
  //
  // Connect with Colyseus server
  //
  room = await colyseusSDK.joinOrCreate(ROOM_NAME);
  loadingText.text = `Connection established!-${ROOM_NAME}`;
  id_text.text = `${room.sessionId}`;
  // Local entity map
  // var playerEntities = {};
  // var playerNextPosition = {};
  // var playerNextRotation = {};
  var sphereEntities = {};
  //var mainCamera = {};
  var id_textEntities = {};
  var textPosition = {};

  // var modelEntities = {};
  // var modelNextPosition = {};
  // var modelNextRotation = {};
  // var modelNextScaling = {};

  // 
  // schema callback: on player add
  // 
  room.state.players.onAdd((player, sessionId) => {
      //var isCurrentPlayer = (sessionId === room.sessionId);
      camera_id = new BABYLON.FreeCamera(`camera-${sessionId}`, new BABYLON.Vector3(Math.random()*40-20, 2.5, Math.random()*40+15), scene);
      //var camera_id = new BABYLON.FreeCamera(`camera-${sessionId}`, Math.PI / 2, 1.0, 550, scene);
      camera_id.rotation =new BABYLON.Vector3(0, Math.PI, 0);
      var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
      var text = new BABYLON.GUI.TextBlock();
      text.color = getRandomColor(); // ランダムな色を設定
      //text.text = player.player_name;
      text.text = `${sessionId}`;
      advancedTexture.addControl(text);
      text.linkWithMesh(camera_id);
      text.linkOffsetY = -20;
      function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      // var camera_id = new BABYLON.FreeCamera(`camera-${sessionId}`, new BABYLON.Vector3(0, 100, 10), scene);
      // //var camera_id = new BABYLON.FreeCamera(`camera-${sessionId}`, Math.PI / 2, 1.0, 550, scene);
      // camera_id.rotation =new BABYLON.Vector3(Math.PI/2, Math.PI/2, 0);
      camera_id.attachControl(canvas, true);
      //camera_id.inputs.removeByType('FreeCameraKeyboardMoveInput'); // 既存のキーボード入力をクリア
      scene.addCamera(camera_id);
      if(sessionId === room.sessionId){
        scene.activeCamera = camera_id;
      }
      //scene.activeCamera = camera;
      camera_id.position.set(player.x, player.y, player.z);
      camera_id.rotation.set(player.a, player.b, player.c);
      // Set player mesh properties
      // sphere = BABYLON.MeshBuilder.CreateSphere(`player-${sessionId}`, {
      //   segments: 8,
      //   diameter: 1
      // });


      BABYLON.SceneLoader.ImportMesh("", "https://assets.babylonjs.com/meshes/", "HVGirl.glb", scene, function (newMeshes, particleSystems, skeletons, animationGroups) {
        for(var i =0; i<newMeshes.length; i++){
          newMeshes[i].name = "room";
          //newMeshes[i].visibility =1.0;
        }
        animationGroups[0].name = `Idle-${sessionId}`;
        animationGroups[1].name = `Samba-${sessionId}`;
        animationGroups[2].name = `Walking-${sessionId}`;
        animationGroups[3].name = `WalkingBack-${sessionId}`;

        var transformNode = newMeshes[1].parent.parent;
        transformNode.position.y = -15;
        // transformNode.freezeWorldMatrix = false;

// rotation を変更
//transformNode.rotation = new BABYLON.Vector3(Math.PI / 2, Math.PI, 0);

// 変換を再び凍結
//transformNode.freezeWorldMatrix = true;
        //transformNode.rotation.set(90, 180, 0);
        sphere = newMeshes[0];
        sphere.name = `player-${sessionId}`;
        //sphere.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
        //sphere.material.alpha =0.5;
        // sphere.position.x = camera_id.position.x;
        // sphere.position.z = camera_id.position.z;
        sphere.position = camera_id.position;
        //sphere.rotation.y = camera_id.rotation.y;
        sphereEntities[sessionId] = sphere;

      //sphere.position = new BABYLON.Vector3(0, -9, 0);
      //Scale the model down        
      sphere.scaling.scaleInPlace(0.6);

      //Lock camera on the character 

    //Hero character variables 
    // var heroSpeed = 0.1;
    // var heroSpeedBackwards = 0.1;
    // var heroRotationSpeed = 0.03;
    // var animating = true;

    // const walkAnim = scene.getAnimationGroupByName("Walking");
    // const walkBackAnim = scene.getAnimationGroupByName("WalkingBack");
    // const idleAnim = scene.getAnimationGroupByName("Idle");
    // const sambaAnim = scene.getAnimationGroupByName("Samba");

    

    //Rendering loop (executed for everyframe)
    // scene.registerBeforeRender(function() {	
    // //scene.onBeforeRenderObservable.add(() => {
    //     var keydown = false;
    //     //Manage the movements of the character (e.g. position, direction)
    //     if (map["t"]) {
    //       //console.log("t");
    //         sphere.moveWithCollisions(hero.forward.scaleInPlace(heroSpeed));
    //         keydown = true;
    //     }
    //     if (map["g"]) {
    //         sphere.moveWithCollisions(hero.forward.scaleInPlace(-heroSpeedBackwards));
    //         keydown = true;
    //     }
    //     if (map["f"]) {
    //         sphere.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
    //         keydown = true;
    //     }
    //     if (map["h"]) {
    //         sphere.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
    //         keydown = true;
    //     }
    //     if (map["b"]) {
    //         keydown = true;
    //     }

    //     //Manage animations to be played  
    //     if (keydown) {
    //         if (!animating) {
    //             animating = true;
    //             if (map["g"]) {
    //                 //Walk backwards
    //                 walkBackAnim.start(true, 1.0, walkBackAnim.from, walkBackAnim.to, false);
    //             }
    //             else if
    //                 (map["b"]) {
    //                 //Samba!
    //                 sambaAnim.start(true, 1.0, sambaAnim.from, sambaAnim.to, false);
    //             }
    //             else {
    //                 //Walk
    //                 walkAnim.start(true, 1.0, walkAnim.from, walkAnim.to, false);
    //             }
    //         }
    //     }
    //     else {

    //         if (animating) {
    //             //Default animation is idle when no key is down     
    //             idleAnim.start(true, 1.0, idleAnim.from, idleAnim.to, false);

    //             //Stop all animations besides Idle Anim when no key is down
    //             sambaAnim.stop();
    //             walkAnim.stop();
    //             walkBackAnim.stop();

    //             //Ensure animation are played only once per rendering loop
    //             animating = false;
    //         }
    //     }
    // });
});

      // BABYLON.SceneLoader.ImportMesh("","./Metaverse_Babylon/Models/","player_camera.glb", scene, 
      // //BABYLON.SceneLoader.ImportMesh("","./Models/", "lab.glb", scene, 
      // function (meshes) {
      //   //console.log(meshes.length);
      //   for(var i =1; i<meshes.length; i++){
      //     meshes[i].name = "room";
      //     meshes[i].visibility =0.5;
      //   }
      //   // const mesh = meshes[0];
      //   // mesh.name = `player-${sessionId}`;
      //   sphere = meshes[0];
      //   sphere.name = `player-${sessionId}`;
      //   sphere.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
      //   //sphere.material.alpha =0.5;
      //   sphere.position = camera_id.position;
      //   sphere.rotation = camera_id.rotation;
      //   sphereEntities[sessionId] = sphere;
      // },
      // );
      // sphere = BABYLON.MeshBuilder.CreateBox(`player-${sessionId}`, { size: 1 }, scene);
      // sphere.material = new BABYLON.StandardMaterial(`playerMat-${sessionId}`);
      //sphere.material.emissiveColor = (isCurrentPlayer) ? BABYLON.Color3.Yellow() : BABYLON.Color3.Gray();
      // if(sphere){
      //   sphere.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);
      //   sphere.position = camera_id.position;
      //   sphere.rotation = camera_id.rotation;
      //   sphereEntities[sessionId] = sphere;
      // }

      // Set player spawning position

      for(var i=0;i<100;i++){move[sessionId+i] = 0;}
      playerEntities[sessionId] = camera_id;
      playerNextPosition[sessionId] = camera_id.position.clone();
      playerNextRotation[sessionId] = camera_id.rotation.clone();
      //sphereEntities[sessionId] = sphere;
      id_textEntities[sessionId] = id_text.text;
      textPosition[sessionId] = text;
      animating[sessionId] = true;
      walkAnim[sessionId] = scene.getAnimationGroupByName(`Walking-${sessionId}`);
      walkBackAnim[sessionId] = scene.getAnimationGroupByName(`WalkingBack-${sessionId}`);
      idleAnim[sessionId] = scene.getAnimationGroupByName(`Idle-${sessionId}`);
      sambaAnim[sessionId] = scene.getAnimationGroupByName(`Samba-${sessionId}`);


      if(pickedMesh.position && pickedMesh.rotation && pickedMesh.scaling){
        modelNextPosition[pickedMesh.name] = pickedMesh.position;
        modelNextRotation[pickedMesh.name] = pickedMesh.rotation;
        modelNextScaling[pickedMesh.name] = pickedMesh.scaling;
      }


      // listen for individual player changes
      player.onChange(() => {
          playerNextPosition[sessionId].set(player.x, player.y, player.z);
          playerNextRotation[sessionId].set(player.a, player.b, player.c);
          id_textNext[sessionId] = player.player_name;
          //console.log(id_textNext);

          //console.log(player);
          if(modelNextPosition[player.name] && modelNextRotation[player.name] && modelNextScaling[player.name]){
          modelNextPosition[player.name].set(player.posx, player.posy, player.posz);
          modelNextRotation[player.name].set(player.rotx, player.roty, player.rotz);
          modelNextScaling[player.name].set(player.scalx, player.scalx, player.scalx);
          }


      });
  });

  // 
  // schema callback: on player remove
  // 
  room.state.players.onRemove((player, sessionId) => {
      playerEntities[sessionId].dispose();
      sphereEntities[sessionId].dispose();
      //mainCamera[sessionId].dispose();
      //id_textEntities[sessionId].dispose();
      textPosition[sessionId].dispose();
      delete playerEntities[sessionId];
      delete playerNextPosition[sessionId];
      delete sphereEntities[sessionId];
      //delete mainCamera[sessionId];
      delete id_textEntities[sessionId];
      delete id_textNext[sessionId];
      delete textPosition[sessionId];
  });

  // on room disconnection
  room.onLeave(code => {
      loadingText.text = "Disconnected from the room.";
  });

  // Add click event handler to move current player
  // scene.onPointerDown = (event, pointer) => {
  //     if (event.button == 0) {
  //         var targetPosition = pointer.pickedPoint.clone();

  //         // Position adjustments for the current play ground.
  //         targetPosition.y = -1;
  //         if (targetPosition.x > 245) targetPosition.x = 245;
  //         else if (targetPosition.x < -245) targetPosition.x = -245;
  //         if (targetPosition.z > 245) targetPosition.z = 245;
  //         else if (targetPosition.z < -245) targetPosition.z = -245;

  //         // set current player's next position immediatelly
  //         playerNextPosition[room.sessionId] = targetPosition;

  //         // Send position update to the server
  //         room.send("updatePosition", {
  //             x: targetPosition.x,
  //             y: targetPosition.y,
  //             z: targetPosition.z,
  //         });
  //     }
  // };

  //
  // Smooth player positions using lerp
  // https://doc.babylonjs.com/typedoc/classes/babylon.scalar#lerp
  //

  //window.addEventListener("keydown", function (event) {
  scene.registerBeforeRender(function() {	
    var playerByName = scene.getMeshByName(`player-${room.sessionId}`);
    if (playerByName) {
    hideAllChildren(playerByName);
    playerByName.rotation.x = 0;
    }
  })
  scene.registerAfterRender(function() {	

    if(xrCamera && xrCamera.rotation){
      box.rotation = xrCamera.rotation;
    }

    //var targetPosition = pointer.pickedPoint.clone();
    var playerByName = scene.getMeshByName(`player-${room.sessionId}`);

    var objectByName = scene.getCameraByName(`camera-${room.sessionId}`);
    if(xr_Check == 1){
       //objectByName.position = xr.baseExperience.camera.position;
       //objectByName.rotation = xr.baseExperience.camera.rotation;
       var target = xr.baseExperience.camera.target.subtract(xr.baseExperience.camera.position);
       console.log(target);
       objectByName.position = BABYLON.Vector3.Lerp(objectByName.position, xr.baseExperience.camera.position, 0.5);
       objectByName.rotation = BABYLON.Vector3.Lerp(objectByName.rotation, xr.baseExperience.camera.rotation, 0.5);
    }
    //var objectByName = xr.baseExperience.camera;
    //var objectByName = scene.activeCamera;
    if (objectByName && playerByName) {
        //var objectByName = scene.getCameraByName(`camera-${room.sessionId}`);
        //objectByName.position = camera_id.position;
        playerByName.position = objectByName.position;
        //playerByName.rotation.y = objectByName.rotation.y;
        playerByName.rotation = new BABYLON.Vector3(0, objectByName.rotation.y, 0);
        //playerByName.rotation.x = 0;
        //playerByName.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
        //SphereByName.material.alpha =0.5;
        var targetPosition = objectByName.position;
        var targetRotation = objectByName.rotation;
        //console.log(objectByName.position)
      //var targetPosition = objectByName.position;
          // set current player's next position immediatelly
          playerNextPosition[room.sessionId] = targetPosition;
          playerNextRotation[room.sessionId] = targetRotation;
          modelNextPosition[pickedMesh.name] = pickedMesh.position;
          modelNextRotation[pickedMesh.name] = pickedMesh.rotation;
          modelNextScaling[pickedMesh.name] = pickedMesh.scaling;
          //console.log(modelNextPosition);
          // Send position update to the server
          // if(pickedMesh.position){
          room.send("updatePosition", {
              x: targetPosition.x,
              y: targetPosition.y,
              z: targetPosition.z,
              a: targetRotation.x,
              b: targetRotation.y,
              c: targetRotation.z,
              name: pickedMesh.name,
              posx: pickedMesh.position.x,
              posy: pickedMesh.position.y,
              posz: pickedMesh.position.z,
              rotx: pickedMesh.rotation.x,
              roty: pickedMesh.rotation.y,
              rotz: pickedMesh.rotation.z,
              scalx: pickedMesh.scaling.x,
              scaly: pickedMesh.scaling.y,
              scalz: pickedMesh.scaling.z,
              player_name: id_text.text,
          });
          //console.log("1");
        // }
          //console.log('colyseus');

      for (let sessionId in playerEntities) {
          var entity = playerEntities[sessionId];
          var sphereentity = sphereEntities[sessionId];
          //var id_textentity = id_textEntities[sessionId];
          var textentity = textPosition[sessionId];
          targetPosition = playerNextPosition[sessionId];
          targetRotation = playerNextRotation[sessionId];
          textentity.text = id_textNext[sessionId];
          //id_textentity = id_textNext[sessionId];
          
          entity.position = BABYLON.Vector3.Lerp(entity.position, targetPosition, 0.5);
          entity.rotation = BABYLON.Vector3.Lerp(entity.rotation, targetRotation, 0.5);
          if(sphereentity && sphereentity.position && sphereentity.rotation){
          //移動平均の計算
          var move_total = 0;
          var move_average = 0;
          move[sessionId+0]=Math.sqrt((sphereentity.position.x-entity.position.x)*(sphereentity.position.x-entity.position.x)+(sphereentity.position.z-entity.position.z)*(sphereentity.position.z-entity.position.z));
          for(var i=0; i<99; i++){
            move[sessionId+99-i]=move[sessionId+98-i]
          }
          for(var i=0; i<100; i++){
            move_total+=move[sessionId+i]
          }
          move_average = move_total/100;
          //console.log(move_average);


          //entity.position = targetPosition;
          //entity.rotation = targetRotation;
            // var walkAnim = scene.getAnimationGroupByName(`Walking-${sessionId}`);
            // var idleAnim = scene.getAnimationGroupByName(`Idle-${sessionId}`);
            walkAnim[sessionId] = scene.getAnimationGroupByName(`Walking-${sessionId}`);
            idleAnim[sessionId] = scene.getAnimationGroupByName(`Idle-${sessionId}`);
            // if((walkAnim[sessionId])&&(idleAnim[sessionId])){
            //if (Math.abs(sphereentity.position.x-entity.position.x)>0.01||Math.abs(sphereentity.position.z-entity.position.z)>0.01||Math.abs(sphereentity.rotation.y-(entity.rotation.y+Math.PI))>0.01) {
            //if (Math.sqrt((sphereentity.position.x-entity.position.x)*(sphereentity.position.x-entity.position.x)+(sphereentity.position.z-entity.position.z)*(sphereentity.position.z-entity.position.z))>0.002||Math.abs(sphereentity.rotation.y-(entity.rotation.y+Math.PI))>0.01) {
            if (move_average>0.00001||Math.abs(sphereentity.rotation.y-(entity.rotation.y+Math.PI))>1) {
              if (!animating[sessionId]) {
                  animating[sessionId] = true;
                  walkAnim[sessionId].start(true, 1.0, walkAnim[sessionId].from, walkAnim[sessionId].to, false); 
                  console.log("move");         
              }
            }
            else {
              if (animating[sessionId]) {
                  //Default animation is idle when no key is down     
                  idleAnim[sessionId].start(true, 1.0, idleAnim[sessionId].from, idleAnim[sessionId].to, false);
                  //Stop all animations besides Idle Anim when no key is down
                  walkAnim[sessionId].stop();
                  //Ensure animation are played only once per rendering loop
                  animating[sessionId] = false;
                  console.log("nonmove"); 
              }
            }
            // }
            sphereentity.position = new BABYLON.Vector3(entity.position.x, entity.position.y-2.0, entity.position.z);
            
            // sphereentity.rotation.y = entity.rotation.y;
            // sphereentity.rotation.x = 0;
            // sphereentity.rotation.z = 0;
            sphereentity.rotation = new BABYLON.Vector3(0, entity.rotation.y+Math.PI, 0);

            // sphereentity.rotation.x = 0;
            // sphereentity.rotation.z = 0;

            //sphereentity.rotation.x = 0;
          }
          //sphereentity.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
      }
      for (let modelName in modelEntities) {
        var modelentity = modelEntities[modelName];
        var modelPosition = modelNextPosition[modelName];
        var modelRotation = modelNextRotation[modelName];
        var modelScaling = modelNextScaling[modelName];
        if(modelentity && modelentity.position && modelentity.rotation && modelentity.scaling){
        modelentity.position = BABYLON.Vector3.Lerp(modelentity.position, modelPosition, 0.5);
        modelentity.rotation = BABYLON.Vector3.Lerp(modelentity.rotation, modelRotation, 0.5);
        modelentity.scaling = BABYLON.Vector3.Lerp(modelentity.scaling, modelScaling, 0.5);
        // modelentity.position = modelPosition;
        // modelentity.rotation = modelRotation;
        // modelentity.scaling = modelScaling;
        //console.log(modelentity);
        }
        //sphereentity.scaling = new BABYLON.Vector3(0.3, 0.3, 0.3);
      }
    }
  })
};

createScene().then(sceneToRender => {
  engine.runRenderLoop(() => sceneToRender.render());
});
window.addEventListener("resize", () => {
  engine.resize();
});