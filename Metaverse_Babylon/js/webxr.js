const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

var createScene = async function () {

var scene = new BABYLON.Scene(engine);
var non_vr_camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, 10), scene);
non_vr_camera.rotation =new BABYLON.Vector3(0, Math.PI, 0);
// non_vr_camera.position = new BABYLON.Vector3(0,20,-10);
//console.log("non vr camera position"+non_vr_camera.position);
//non_vr_camera.setTarget(BABYLON.Vector3.Zero());
non_vr_camera.attachControl(canvas, true);
var num = 1;
var xr = await scene.createDefaultXRExperienceAsync({
  //floorMeshes: [environment.ground] /* Array of meshes to be used as landing points */
});
xr.teleportation.detach();
xr.baseExperience.onStateChangedObservable.add((state)=>{
  if(state === BABYLON.WebXRState.IN_XR){

      console.log('WebXR camera position(before_enteringVR): '+xr.baseExperience.camera.position);
      xr.baseExperience.camera.position.set(0, 0, 10);
      console.log('WebXR camera position(after_enteringVR): '+xr.baseExperience.camera.position);
  
  }        
});

// const plane = BABYLON.MeshBuilder.CreateBox("cube", { size: 5 }, scene);
// plane.scaling = new BABYLON.Vector3(10, 5, 1)
var plane = BABYLON.MeshBuilder.CreatePlane("space", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./texture/メタバース教室.png", scene);
var material = new BABYLON.StandardMaterial("material", scene);
material.diffuseTexture = texture;
plane.material = material;
plane.position = new BABYLON.Vector3(1.5, -4, -44);
plane.scaling = new BABYLON.Vector3(4.0, 2.2, 1);
plane.rotation =new BABYLON.Vector3(0, Math.PI, 0);

var screen = BABYLON.MeshBuilder.CreatePlane("space", { size: 5 }, scene);
// テクスチャの作成と割り当て
//var texture = new BABYLON.Texture("./texture/メタバース教室.png", scene);
var material = new BABYLON.StandardMaterial("material", scene);
//material.diffuseTexture = texture;
screen.material = material;
screen.position = new BABYLON.Vector3(-19, -4, -43);
screen.scaling = new BABYLON.Vector3(3.7, 2.2, 1);
screen.rotation =new BABYLON.Vector3(0, Math.PI, 0);
//plane.parent = non_vr_camera;

var plane1 = BABYLON.MeshBuilder.CreatePlane("plane1", { size: 5 }, scene);
// テクスチャの作成と割り当て
var texture = new BABYLON.Texture("./texture/移動.png", scene);
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
var texture = new BABYLON.Texture("./texture/回転.png", scene);
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
var texture = new BABYLON.Texture("./texture/拡大縮小.png", scene);
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
var texture = new BABYLON.Texture("./texture/カメラ.jpg", scene);
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

//物をつかむ機能
const tmpRay = new BABYLON.Ray();
// tmpRay.origin = new BABYLON.Vector3();
// tmpRay.direction = new BABYLON.Vector3();
// tmpRay.length = 10;
var hit;
var tmpMesh;
var startCube=BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
var pickedMesh=startCube;
pickedMesh.setEnabled(false);
var pickedMesh_parent;
var pickedMesh_pos;


var obj =BABYLON.MeshBuilder.CreateBox("cube", { size: 1 }, scene);
      obj.dispose();
var obj_mat ={};
var space ={};
var csvArray = [["delete:"]];
for(var n =1; n<jsArray2[0].length; n++){
    csvArray[0].push(jsArray2[0][n]);
}

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

const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
      light.diffuse = new BABYLON.Color3(1, 1, 1);
      light.specular = new BABYLON.Color3(1, 1, 1); // スペキュラカラー
      light.groundColor = new BABYLON.Color3(0.8, 0.8, 0.8); // 地面のカラー
      light.intensity = 1; // ライトの強度
// var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
// sphere.position.y = 1;

 //背景画像-----------------------------------------------------------------------------------
 var dome = new BABYLON.PhotoDome(
    "testdome",
    "./texture/green.jpeg",
    {
        resolution: 32,
        size: 1000
    },
    scene
);


  //-----------------------------------------------------------------------------------------

    //キー入力確認用
    var Box_Left_Trigger = BABYLON.MeshBuilder.CreateBox("Box_Left_Trigger",{},scene);
    Box_Left_Trigger.position = new BABYLON.Vector3(-2.5,10,3);
  
    var Box_Left_Squeeze = BABYLON.MeshBuilder.CreateBox("Box_Left_Squeeze",{},scene);
    Box_Left_Squeeze.position = new BABYLON.Vector3(-2.5,9,3);
  
    var Sphere_Left_YButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_YButton", {diameter:1}, scene);
    Sphere_Left_YButton.position = new BABYLON.Vector3(-2,10,3);
  
    var Sphere_Left_XButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Left_XButton", {diameter:1}, scene);
    Sphere_Left_XButton.position = new BABYLON.Vector3(-2,10,2);
  
  
    var Box_Left_ThumbStick = BABYLON.MeshBuilder.CreateBox("Box_Left_ThumbStick",{size:0.5},scene);
    Box_Left_ThumbStick.position = new BABYLON.Vector3(-1,10,1);
  
  
    var Box_Right_Trigger = BABYLON.MeshBuilder.CreateBox("Box_Right_Trigger",{},scene);
    Box_Right_Trigger.position = new BABYLON.Vector3(2.5,11,3);
  
    var Box_Right_Squeeze = BABYLON.MeshBuilder.CreateBox("Box_Right_Squeeze",{},scene);
    Box_Right_Squeeze.position = new BABYLON.Vector3(2.5,9,3);
  
    var Sphere_Right_BButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_BButton", {diameter:1}, scene);
    Sphere_Right_BButton.position = new BABYLON.Vector3(2,10,3);
  
    var Sphere_Right_AButton = BABYLON.MeshBuilder.CreateSphere("Sphere_Right_AButton", {diameter:1}, scene);
    Sphere_Right_AButton.position = new BABYLON.Vector3(2,10,2);
  
    var Box_Right_ThumbStick = BABYLON.MeshBuilder.CreateBox("Box_Right_ThumbStick",{size:0.5},scene);
    Box_Right_ThumbStick.position = new BABYLON.Vector3(1,10,1);

  BABYLON.SceneLoader.ImportMesh("","./Models/","classroom_window.glb", scene, 
    //BABYLON.SceneLoader.ImportMesh("","./Models/", "lab.glb", scene, 
    function (meshes) {
      console.log(meshes.length);
      for(var i =0; i<meshes.length; i++){
        meshes[i].name = "space";
      }
      const mesh = meshes[0];
      mesh.name = "space";
      mesh.position = new BABYLON.Vector3(0, -20, 0);
      mesh.scaling = new BABYLON.Vector3(-10, 10, 10);
    },
  );

  var loadedMeshes = [];
  function loadAndAddMeshes(fileURL1,fileURL2, space, scene) {
    return new Promise(function (resolve, reject) {
        BABYLON.SceneLoader.ImportMesh("", fileURL1,fileURL2, scene, function (newMeshes) {
          if(space =="space"){
            newMeshes[0].name ="space";
            newMeshes[1].name ="space";
          }
          else{
            for(var n =0; n<newMeshes.length; n++){
            newMeshes[n].name =fileURL2 + n;
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
    loadPromises.push(loadAndAddMeshes("./Models/",jsArray1[i][0], jsArray1[i][1],scene));
  }
  Promise.all(loadPromises).then(function () {
    // メッシュを特定の順序でシーンに追加
    // 例: i番目の.glbファイルのメッシュを最初に追加
    console.log(loadPromises.length);
    for(var i =0; i<loadPromises.length; i++){
    //scene.addMesh(loadedMeshes[i][0]);
    if(loadedMeshes[i][0].name=="space"){
      //if(k!=-1){loadedMeshes[k][1].dispose();}
      //k=i;
      //loadedMeshes[i][0].name = "space";
      loadedMeshes[i][0].scaling = new BABYLON.Vector3(-10, 10, 10);
      loadedMeshes[i][0].position = new BABYLON.Vector3(0, -20, 0);
      loadedMeshes[i][0].rotation = new BABYLON.Vector3(0, 0, 0);
    }else{
      // //loadedMeshes[i][0].name="object"
      loadedMeshes[i][0].scaling = new BABYLON.Vector3(-10, 10, 10);
      loadedMeshes[i][0].position = new BABYLON.Vector3(0, 0, 0);
      // //obj = loadedMeshes[i][0];
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
      for(var n =1; n<csvArray[0].length; n++){
        if(scene.meshes[m].name == csvArray[0][n]){
          scene.meshes[m].isVisible = false;
        }
      }
    }
    
    console.log(csvArray);
    document.getElementById("csvArray").value = JSON.stringify(csvArray);
  });
  
  document.addEventListener('keyup', function (event) {
    // 押されたキーのキーコードを取得
    var keyCode = event.keyCode;

    // キーコードが例えばEnterキーの場合
    if (keyCode === 53) {
      if(obj.name !== "cube"){
        for(var n =0; n<csvArray[0].length; n++){
          if(csvArray[0][n] === obj.name){
            break;
          }
          if(n == csvArray[0].length-1 && csvArray[0][n] !== obj.name){
            csvArray[0].push(obj.name);
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
        obj =pickResult.pickedMesh;
        obj_mat = obj.material;
      }
    }
scene.registerAfterRender(function() {	
//"a"または"A"を押し続けている間、if文を実行
if((map["ArrowUp"])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(-distance, 0, 0));
    //xr.baseExperience.camera.translate(BABYLON.Axis.X, -2*distance, BABYLON.Space.WORLD);
}
//"d"または"D"を押し続けている間、if文を実行
if((map["ArrowDown"])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(distance, 0, 0));
}
//"w"または"W"を押し続けている間、if文を実行
if((map[","])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, distance, 0));
}
//"s"または"S"を押し続けている間、if文を実行
if((map["."])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, -distance, 0));
}
//"w"または"W"を押し続けている間、if文を実行
if((map["ArrowRight"])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, 0,distance));
}
//"s"または"S"を押し続けている間、if文を実行
if((map["ArrowLeft"])){
    xr.baseExperience.camera.position = xr.baseExperience.camera.position.add(new BABYLON.Vector3(0, 0, -distance));
}
if(obj.name != "space"){
    //"a"または"A"を押し続けている間、if文を実行
    if((map["a"] || map["A"])){
      if(obj != null){
       obj.translate(BABYLON.Axis.X, -2*distance, BABYLON.Space.WORLD);
      }
    }
    //"d"または"D"を押し続けている間、if文を実行
    if((map["d"] || map["D"])){
        obj.translate(BABYLON.Axis.X, 2*distance, BABYLON.Space.WORLD);
    }
    //"w"または"W"を押し続けている間、if文を実行
    if((map["w"] || map["W"])){
        obj.translate(BABYLON.Axis.Z, 2*distance, BABYLON.Space.WORLD);
    }
    //"s"または"S"を押し続けている間、if文を実行
    if((map["s"] || map["S"])){
        obj.translate(BABYLON.Axis.Z, -2*distance, BABYLON.Space.WORLD);
    }
    //"q"または"Q"を押し続けている間、if文を実行
    if((map["q"] || map["Q"])){
      obj.translate(BABYLON.Axis.Y, 2*distance, BABYLON.Space.WORLD);
    }
    //"e"または"E"を押し続けている間、if文を実行
    if((map["e"] || map["E"])){
      obj.translate(BABYLON.Axis.Y, -2*distance, BABYLON.Space.WORLD);
    }
    //"1"を押し続けている間、if文を実行
    if((map["1"])){
      //obj.rotate(BABYLON.Axis.Y, distance/5, BABYLON.Space.WORLD);
      obj.rotation = obj.rotation.add(new BABYLON.Vector3(0, 0, distance));
    }
    if((map["2"])){
      obj.rotation = obj.rotation.add(new BABYLON.Vector3(0, distance, 0));
      //obj.rotate(BABYLON.Axis.X, distance/5, BABYLON.Space.WORLD);
    }
    if((map["3"])){
      obj.scaling = obj.scaling.add(new BABYLON.Vector3(distance/2, distance/2, distance/2));
    }
    if((map["4"])){
      obj.scaling = obj.scaling.add(new BABYLON.Vector3(-distance/2, -distance/2, -distance/2));
    }
    if((map["5"])){
      obj.isVisible = false;
    }
    for(var n =1; n<csvArray.length; n++){
      if(obj.name == csvArray[n][0]){
        csvArray[n][1] = obj.position.x;
        csvArray[n][2] = obj.position.y;
        csvArray[n][3] = obj.position.z;
        csvArray[n][4] = obj.rotation.x;
        csvArray[n][5] = obj.rotation.y;
        csvArray[n][6] = obj.rotation.z;
        csvArray[n][7] = obj.scaling.x;
        csvArray[n][8] = obj.scaling.y;
        csvArray[n][9] = obj.scaling.z;
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
    if (event.key === "z") {
      console.log("エクスポート中");
      var glbFileName = "scene.glb";
      var options = {
        shouldExportNode: function (node) { return true; }
      };
      BABYLON.SceneSerializer.Serialize(scene, null, glbFileName, engine, function () {
      console.log("エクスポートが完了しました: " + glbFileName);
    });
    }
  });

  // var _prevPickedMesh = "";
  // var myPickedMesh = null;
  // var moveCamState = 0;//0:not move, 1:move to play dome, 2: back home
  // //var initCamPos = camera.position;
  // var pickedMeshInitPos = null;
  // //var alpha = -Math.PI/2, beta = Math.PI/2;


  // scene.onPointerObservable.add((pointerInfo) => {
  //     switch (pointerInfo.type) {
  //         case BABYLON.PointerEventTypes.POINTERDOWN:
  //             var pickResult = pointerInfo.pickInfo;
  //             if (pickResult.hit) {
  //                 var pickedMesh = pickResult.pickedMesh;
  //                 console.log(pickedMesh.name);
  //                 if (pickedMesh.name == "getout") {//back home
  //                     outSphere.position.y = playDomePos.y;
  //                     return;
  //                 }
  //             }
  //         break;
  //         case BABYLON.PointerEventTypes.POINTERUP:
  //           var pickResult = pointerInfo.pickInfo;
  //             if (pickResult.hit) {
  //                 var pickedMesh = pickResult.pickedMesh;
  //                 console.log(pickedMesh.name);
  //             }
  //             break;
  //         }

  // });


  //コントローラキー入力
  xr.input.onControllerAddedObservable.add((controller) => {
    controller.onMotionControllerInitObservable.add((motionController) => {
        if (motionController.handness === 'left') {
             const xr_ids = motionController.getComponentIds();
             let triggerComponent = motionController.getComponent(xr_ids[0]);//xr-standard-trigger
             triggerComponent.onButtonStateChangedObservable.add(() => {
                 if (triggerComponent.pressed) {
                     Box_Left_Trigger.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 
                 }else{
                     Box_Left_Trigger.scaling= new BABYLON.Vector3(1,1,1);
                 
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
                            }
                            else if(pickResult.pickedMesh == plane2){
                              num=2;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                            }
                            else if(pickResult.pickedMesh == plane3){
                              num=3;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane3.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                              plane4.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                            }
                            else if(pickResult.pickedMesh == plane4){
                              num=4;
                              plane1.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane2.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane3.scaling = new BABYLON.Vector3(0.05, 0.05, 1);
                              plane4.scaling = new BABYLON.Vector3(0.06, 0.06, 1);
                            }
                            else
                            {
                              if(pickResult.pickedMesh.name != "space" && !pickedMesh.isEnabled()){
                                pickedMesh = pickResult.pickedMesh;
                                pickedMesh.material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0); // 例: 黄色
                              }
                              if(pickResult.pickedMesh.name != "space" && pickedMesh.isEnabled()){
                                pickedMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0); 
                                pickedMesh = pickResult.pickedMesh;
                                pickedMesh.material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0); // 例: 黄色
                              }
                              if(pickResult.pickedMesh.name == "space" && pickedMesh.isEnabled()){
                                pickedMesh.material.emissiveColor = new BABYLON.Color3(0, 0, 0); 
                                pickedMesh=startCube;
                              }
                              
                              // pickedMesh_parent = pickResult.pickedMesh.parent;
                              // pickedMesh_pos = pickedMesh.getAbsolutePosition();
                              // console.log(controller.grip.position);
                              // console.log(pickedMesh.name);
                              // console.log("world position: ", pickedMesh_pos);
                              // pickedMesh.parent= controller.grip;
                              //pickedMesh.setParent(motionController.rootMesh);
                              // pickedMesh.position = new BABYLON.Vector3(10,0,0);
                              if (pickedMesh.name == "getout") {//back home
                                  outSphere.position.y = playDomePos.y;
                                  return;
                              }
                            }
                          }
                      break;
                      }
            
              });
              //    if(triggerComponent.pressed){
              //     controller.getWorldPointerRayToRef(tmpRay, true);
              //     //controller.getPointerRayToRef(tmpRay, true);
              //     hit = scene.pickWithRay(tmpRay, null, false);

              //     if (hit.pickedMesh !=undefined){
              //         tmpMesh = hit.pickedMesh;
              //         console.log("name:"+hit.pickedMesh.name);
              //       tmpMesh.parent= controller.grip;//tmpMesh is set on inappropriate position.
              //       tmpMesh.setParent(motionController.rootMesh);
              //         //hit.pickedMesh.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
              //     }
              
              // //released button
              // }
              //else{
              //   hit.pickedMesh.scaling= new BABYLON.Vector3(1,1,1);
              // }
             });
             // ボタンが押された瞬間のみ反応するアクションを作成
           
             let squeezeComponent = motionController.getComponent(xr_ids[1]);//xr-standard-squeeze
             squeezeComponent.onButtonStateChangedObservable.add((eventData) => {
                 if (eventData.pressed && eventData.value === 1) {
                  //console.log(eventData.value);
                     Box_Left_Squeeze.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
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
                     Box_Left_Squeeze.scaling=new BABYLON.Vector3(1,1,1);
                 }
             });
             let thumbstickComponent = motionController.getComponent(xr_ids[2]);//xr-standard-thumbstick
             thumbstickComponent.onButtonStateChangedObservable.add(() => {
                 if (thumbstickComponent.pressed) {
                     Box_Left_ThumbStick.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     Box_Left_ThumbStick.scaling=new BABYLON.Vector3(1,1,1);
                 }
             /*
                 let axes = thumbstickComponent.axes;
                 Box_Left_ThumbStick.position.x += axes.x;
                 Box_Left_ThumbStick.position.y += axes.y;
             */
             });
             thumbstickComponent.onAxisValueChangedObservable.add((axes) => {
                 //https://playground.babylonjs.com/#INBVUY#87
                 //inactivate camera rotation : not working so far

                 /*
                 let rotationValue = 0;
                 const matrix = new BABYLON.Matrix();
                 let deviceRotationQuaternion = webXRInput.xrCamera.getDirection(BABYLON.Axis.Z).toQuaternion(); // webXRInput.xrCamera.rotationQuaternion;
                 var angle = rotationValue * (Math.PI / 8);
                 var quaternion = BABYLON.Quaternion.RotationAxis(BABYLON.Axis.Y, angle);
                 const move = new BABYLON.Vector3(0,0,0);
                 deviceRotationQuaternion = deviceRotationQuaternion.multiply(quaternion);
                 BABYLON.Matrix.FromQuaternionToRef(deviceRotationQuaternion, matrix);
                 const addPos = BABYLON.Vector3.TransformCoordinates(move, matrix);
                 addPos.y = 0;

                 webXRInput.xrCamera.position = webXRInput.xrCamera.position.add(addPos);
                // webXRInput.xrCamera.rotationQuaternion = BABYLON.Quaternion.Identity();
                 
                 //webXRInput.xrCamera.rotation = new BABYLON.Vector3(0,0,0);
                 */
                 //Box_Left_ThumbStick is moving according to stick axes but camera rotation is also changing..
                 if(num == 1){
                  Box_Left_ThumbStick.position.x += (axes.x)/100;
                  Box_Left_ThumbStick.position.y -= (axes.y)/100;
 
                  pickedMesh.position.x += (axes.x)/100;
                  pickedMesh.position.y -= (axes.y)/100;
                 }
                 if(num == 2){
                  pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3((axes.y)/10, 0, 0));
                  pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, (axes.x)/10), 0);
                 }
                 if(num == 3){
                  pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(-axes.y/10, -axes.y/10, -axes.y/10));
                 }
                 if(num == 4){
                  xr.baseExperience.camera.position.x -= (axes.x)/30;
                  xr.baseExperience.camera.position.z += (axes.y)/30;
                 }
                // console.log(values.x, values.y);
             });

             
             function XrepeatFunction() {
              if(num == 1){
                pickedMesh.position.z += 0.01;
              }
              if(num == 2){
                pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0.01, 0, 0));
              }
              if(num == 3){
                pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(-0.01, -0.01, -0.01));
              }
              if(num == 4){
                xr.baseExperience.camera.position.y -= 0.01;
              }
          }
             let xbuttonComponent = motionController.getComponent(xr_ids[3]);//x-button
             xbuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (xbuttonComponent.value == 1) {
                  Sphere_Left_XButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  xbuttonComponent.repeatFunctionInterval = setInterval(XrepeatFunction, 10);
                  //console.log("1");
                 }
                 if(xbuttonComponent.value == 0){
                  Sphere_Left_XButton.scaling=new BABYLON.Vector3(1,1,1);  
                  //console.log("0");
                  clearInterval(xbuttonComponent.repeatFunctionInterval);
                 }
             });
             function YrepeatFunction() {
              if(num == 1){
                pickedMesh.position.z -= 0.01;
              }
              if(num == 2){
                pickedMesh.rotation = pickedMesh.rotation.add(new BABYLON.Vector3(0, 0.01, 0));
              }
              if(num == 3){
                pickedMesh.scaling = pickedMesh.scaling.add(new BABYLON.Vector3(0.01, 0.01, 0.01));
              }
              if(num == 4){
                xr.baseExperience.camera.position.y += 0.01;
              }
             }
             let ybuttonComponent = motionController.getComponent(xr_ids[4]);//y-button
             ybuttonComponent.onButtonStateChangedObservable.add(() => {

                 if (ybuttonComponent.value == 1) {
                  Sphere_Left_YButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  ybuttonComponent.repeatFunctionInterval = setInterval(YrepeatFunction, 10);
                 }
                 if(ybuttonComponent.value == 0){
                     Sphere_Left_YButton.scaling=new BABYLON.Vector3(1,1,1);  
                     clearInterval(ybuttonComponent.repeatFunctionInterval);
                 }
             });
             /* not worked.
             let thumbrestComponent = motionController.getComponent(xr_ids[5]);//thumrest
             thumbrestComponent.onButtonStateChangedObservable.add(() => {
                 //not worked
                 if ((thumbrestComponent.value>0.1&&thumbrestComponent.value<0.6) {
                     sphere1.position.y=10;
                 }
                 if(thumbrestComponent.touched){
                      sphere1.position.y=10;
                 }

             });  
             */              
        }
        if (motionController.handness === 'right') {
             const xr_ids = motionController.getComponentIds();
             let triggerComponent = motionController.getComponent(xr_ids[0]);//xr-standard-trigger
             triggerComponent.onButtonStateChangedObservable.add(() => {
                 if (triggerComponent.pressed) {
                     Box_Right_Trigger.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 
                 }else{
                     Box_Right_Trigger.scaling= new BABYLON.Vector3(1,1,1);
                 
                 }
             });
             let squeezeComponent = motionController.getComponent(xr_ids[1]);//xr-standard-squeeze
             squeezeComponent.onButtonStateChangedObservable.add(() => {
                 if (squeezeComponent.pressed) {
                     Box_Right_Squeeze.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                  
                 }else{
                     Box_Right_Squeeze.scaling=new BABYLON.Vector3(1,1,1);
                 }
             });
             let thumbstickComponent = motionController.getComponent(xr_ids[2]);//xr-standard-thumbstick
             thumbstickComponent.onButtonStateChangedObservable.add(() => {
                 if (thumbstickComponent.pressed) {
                     Box_Right_ThumbStick.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     Box_Right_ThumbStick.scaling=new BABYLON.Vector3(1,1,1);
                 }

             });
             thumbstickComponent.onAxisValueChangedObservable.add((axes) => {
                 //Box_Right_ThumbStick is moving according to stick axes but camera rotation is also changing..
                 Box_Right_ThumbStick.position.x += (axes.x)/100;
                 Box_Right_ThumbStick.position.y += (axes.y)/100;
                // console.log(values.x, values.y);
             });

             let abuttonComponent = motionController.getComponent(xr_ids[3]);//a-button
             abuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (abuttonComponent.pressed) {
                     Sphere_Right_AButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                 }else{
                     Sphere_Right_AButton.scaling=new BABYLON.Vector3(1,1,1);  
                 }
             });
             let bbuttonComponent = motionController.getComponent(xr_ids[4]);//b-button
             bbuttonComponent.onButtonStateChangedObservable.add(() => {
                 if (bbuttonComponent.pressed) {
                     Sphere_Right_BButton.scaling= new BABYLON.Vector3(1.2,1.2,1.2);
                    
                 }else{
                     Sphere_Right_BButton.scaling=new BABYLON.Vector3(1,1,1);  
                 }
             });
             /* not worked.
             let thumbrestComponent = motionController.getComponent(xr_ids[5]);//thumrest
             thumbrestComponent.onButtonStateChangedObservable.add(() => {
                 //not worked
                 if ((thumbrestComponent.value>0.1&&thumbrestComponent.value<0.6) {
                     sphere1.position.y=10;
                 }
                 if(thumbrestComponent.touched){
                      sphere1.position.y=10;
                 }

             });  
             */              

            /*
             const xr_ids = motionController.getComponentIds();
             for (let i=0;i<xr_ids.length;i++){
                 console.log("right:"+xr_ids[i]);
             }
            */
        }

    })

  });
return scene;
};

createScene().then(sceneToRender => {
    engine.runRenderLoop(() => sceneToRender.render());
});
window.addEventListener("resize", () => {
    engine.resize();
  });