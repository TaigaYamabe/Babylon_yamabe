function main() {
const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas);

function createScene() {
const scene = new BABYLON.Scene(engine);

// ファイルアップロードのイベントハンドラを設定
var modelInput = document.getElementById("modelInput");
modelInput.addEventListener("change", function (event) {
    var file = event.target.files[0];
    if (file) {
        // 選択されたファイルを読み込む
        var reader = new FileReader();
        reader.onload = function (e) {
            var data = e.target.result;
            loadModel(data);
        };
        reader.readAsArrayBuffer(file);
    }
});

// 3Dモデルを読み込む関数
function loadModel(modelData) {
    BABYLON.SceneLoader.ImportMesh("", "", new Blob([modelData]), scene, function (meshes) {
        if (meshes.length > 0) {
            // モデルが読み込まれたら、カメラを調整してモデルを表示する
            var camera = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2, 3, BABYLON.Vector3.Zero(), scene);
            camera.attachControl(canvas, true);
            scene.activeCamera = camera;

            // ライトを追加
            var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

            // シーンをレンダリング
            engine.runRenderLoop(function () {
                scene.render();
            });
        }
    });
}
}

const scene = createScene();

// レンダリングループを開始
engine.runRenderLoop(function () {
    scene.render();
});
}
window.addEventListener("DOMContentLoaded", main);






// function main() {
// //   const parameter = {
// //     name:  'ロボ・ロボお',
// //     add: '神聖グンマー帝国🔥',
// //     telephone: '090-1212-1212',
// // };
//     const canvas = document.getElementById("renderCanvas");
  
//     const engine = new BABYLON.Engine(canvas);
  
//     var pos =new BABYLON.Vector3(1, 0, 0);
//     // console.log(pos.x)
//     function createScene() {
  
//       const scene = new BABYLON.Scene(engine);
//       //scene.debugLayer.show();
//       scene.debugLayer.show({
//         embedMode: true,
//       });
      
//       var obj_mat ={};
//       var map ={}; //object for multiple key presses
//       var space ={};
//       //let hamburger = "<?php echo $php_string; ?>";
      
//       //キー入力を受け付ける宣言
//       //キー入力があるたびに、map変数の値がセットされる
//       scene.actionManager = new BABYLON.ActionManager(scene);
//       scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
//       map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; 
//       }));

//       scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
//       map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
//       }));
//       var distance = 0.005;
  
//       // カメラを追加
//       // const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 15, 0), scene);
//       // camera.attachControl(canvas, true);

//       //FPS視点カメラ
//       const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,20,0),scene);
//       camera.attachControl(canvas, true);

  
//       // 照明を追加
//       //const light = new BABYLON.HemisphericLight();
//       const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
//       light.diffuse = new BABYLON.Color3(1, 1, 1);

//       //赤色のマテリアル
//       var red = new BABYLON.StandardMaterial("red", scene);
//       red.diffuseColor = new BABYLON.Color3(1, 0, 0);


//       // const box2 = BABYLON.MeshBuilder.CreateBox("box2", {});
//       // box2.scaling = new BABYLON.Vector3(5, 5, 5);
//       // box2.position = new BABYLON.Vector3(0, 10, 0);

//       // GLBファイルの読み込む
//       //BABYLON.SceneLoader.Append("https://ft-lab.github.io/gltf/apple/", "apple.glb", scene, 
//       //Modelsの中にglb形式の3Dモデルをアップロードしファイル名を変更すれば表示される。
//       //glb形式のデータはスマホアプリ「Scaniverse」により作成

//       //BABYLON.SceneLoader.Append("https://raw.githubusercontent.com/TaigaYamabe/babylon/main/glb_data/", "scene.babylon", scene);
//       //BABYLON.SceneLoader.ImportMesh("", "https://raw.githubusercontent.com/TaigaYamabe/babylon/main/glb_data/", "scene.babylon", scene);
//       //BABYLON.SceneLoader.ImportMeshAsync("", "https://raw.githubusercontent.com/TaigaYamabe/babylon/main/glb_data/", "scene.babylon", scene); 

//       // BABYLON.SceneLoader.ImportMeshAsync("a", "./Models/", "upload.glb")
//       // .then((result) => {
//       //   const glbMesh = result.meshes[1];
//       //   obj = glbMesh;
//       //   obj_mat = glbMesh.material;
//       //   // scene.addMesh(glbMesh);
//       //   glbMesh.position = new BABYLON.Vector3(0, 20, 0);
//       //   glbMesh.scaling = new BABYLON.Vector3(100, 100, 100);
//       // });

//     //  BABYLON.SceneLoader.LoadAssetContainer("./Models/", fileInput1.name, scene,


//     // BABYLON.SceneLoader.LoadAssetContainer("./Models/", "upload.glb", scene,
//     //  //BABYLON.SceneLoader.LoadAssetContainer("./Models/", php, scene,
//     //   function(container){
//     //     const glbMesh = container.meshes[1];
//     //     obj = glbMesh;
//     //     obj_mat = glbMesh.material;
//     //     scene.addMesh(glbMesh);
//     //     scene.addMaterial(glbMesh.material);
//     //     glbMesh.position = pos.add(new BABYLON.Vector3(0, 20, 0));
//     //     glbMesh.scaling = new BABYLON.Vector3(10, 10, 10);
//     //     //console.log(container);
//     //     // scene.activeCamera = null;
//     //     // scene.createDefaultCameraOrLight(true);
//     //     // scene.activeCamera.attachControl(canvas, false);
//     //   }
//     //   );


//       BABYLON.SceneLoader.Append("./Models/", "upload.glb", scene, 
//         function () {
        
//           const mesh = scene.meshes[0];
//           obj = mesh;
//           obj_mat = mesh.material;
//           mesh.position = pos.add(new BABYLON.Vector3(0, 20, 0));
//           mesh.scaling = new BABYLON.Vector3(10, 10, 10);
  
//           // scene.activeCamera = null;
//           // scene.createDefaultCameraOrLight(true);
//           // scene.activeCamera.attachControl(canvas, false);
//         },
//       );

     
      
//       BABYLON.SceneLoader.LoadAssetContainer("./Models/", "space.glb", scene,
//       function(container){
//         const glbMesh = container.meshes[1];
//         space = glbMesh;
//         scene.addMesh(glbMesh);
//         scene.addMaterial(glbMesh.material);
//         glbMesh.position = new BABYLON.Vector3(0, 0, 0);
//         glbMesh.scaling = new BABYLON.Vector3(10, 10, 10);
//         //console.log(scene);
//         // scene.activeCamera = null;
//         // scene.createDefaultCameraOrLight(true);
//         // scene.activeCamera.attachControl(canvas, false);
//       }
//       );
     

//       scene.registerBeforeRender(function () {
//         const deltaTime = engine.getDeltaTime() / 1000;
//         //console.log(deltaTime)
//  });

//       // const box = BABYLON.MeshBuilder.CreateBox("box", {});
//       // box.scaling = new BABYLON.Vector3(0.2, 0.15, 0.3);
//       // box.position = new BABYLON.Vector3(0, 2, 0);


//       //クリックイベント検出
//       window.addEventListener("click", function () {
//       // pickでポインタ情報を取得する
//       var pickResult = scene.pick(scene.pointerX, scene.pointerY);
//       // もしクリックが壁にhitした場合、ぶつかった画像の位置を更新する
//       if(pickResult.pickedMesh != space){

//         if (pickResult.hit) {

//           obj.material = obj_mat;
//           obj =pickResult.pickedMesh;
//           obj_mat = obj.material;
//           //pickResult.pickedMesh.scaling.y  += 1;
//           //obj.material.specularColor = new BABYLON.Color3(1, 0, 0);
//           // pickResult.pickedMesh.emissiveColor = new BABYLON.Color3(1, 0, 0);
//           // pickResult.pickedMesh.diffuseColor = new BABYLON.Color3(1, 0, 0);

//           //pickResult.pickedMesh.material = red;
//           console.log(data.x);
  
        
//         }
//       }
//       //キーボード入力
//       scene.registerAfterRender(function() {	
//         if(obj != space){
//         //"a"または"A"を押し続けている間、if文を実行
//         if((map["a"] || map["A"])){
//            obj.translate(BABYLON.Axis.X, -distance, BABYLON.Space.WORLD);
//         }
//         //"d"または"D"を押し続けている間、if文を実行
//         if((map["d"] || map["D"])){
//             obj.translate(BABYLON.Axis.X, distance, BABYLON.Space.WORLD);
//         }
//         //"w"または"W"を押し続けている間、if文を実行
//         if((map["w"] || map["W"])){
//             obj.translate(BABYLON.Axis.Z, distance, BABYLON.Space.WORLD);
//         }
//         //"s"または"S"を押し続けている間、if文を実行
//         if((map["s"] || map["S"])){
//             obj.translate(BABYLON.Axis.Z, -distance, BABYLON.Space.WORLD);
//         }
//         //"q"または"Q"を押し続けている間、if文を実行
//         if((map["q"] || map["Q"])){
//           obj.translate(BABYLON.Axis.Y, distance, BABYLON.Space.WORLD);
//         }
//         //"e"または"E"を押し続けている間、if文を実行
//         if((map["e"] || map["E"])){
//           obj.translate(BABYLON.Axis.Y, -distance, BABYLON.Space.WORLD);
//         }
//         //"1"を押し続けている間、if文を実行
//         if((map["1"])){
//           obj.rotate(BABYLON.Axis.Y, distance/5, BABYLON.Space.WORLD);
//         }
//         if((map["2"])){
//           obj.rotate(BABYLON.Axis.X, distance/5, BABYLON.Space.WORLD);
//         }
//         if((map["3"])){
//           obj.scaling = obj.scaling.add(new BABYLON.Vector3(distance/2, distance/2, distance/2));
//         }
//         if((map["4"])){
//           obj.scaling = obj.scaling.add(new BABYLON.Vector3(-distance/2, -distance/2, -distance/2));
//         }
//         if((map["5"])){
//           obj.dispose()
//         }
//         //console.log(obj.position);
//         data = obj.position;
     
        
//         }
//     });
// });
//       return scene;
//     }
  
//     const scene = createScene();

    
   
//     engine.runRenderLoop(() => {
//       //console.log(obj.position);
//       const parameter = {
//         name:  data.x,
//         add: 0,
//         telephone: 0,
//       };
//       // console.log(data.x);
//       fetch('../3D.php', 
//           {
//               method: 'POST', // HTTP-メソッドを指定
//               headers: { 'Content-Type': 'application/json' }, // jsonを指定
//               body: JSON.stringify(parameter),
//           }
//       ) 
//       scene.render();
//     });
  
//     window.addEventListener("resize", () => {
//       engine.resize();
//     });
//   }
  
//   window.addEventListener("DOMContentLoaded", main);