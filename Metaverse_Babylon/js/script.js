var obj ={};

function main() {
  var csvArray = [];
    const canvas = document.getElementById("renderCanvas");
  
    const engine = new BABYLON.Engine(canvas);
  
    var pos =new BABYLON.Vector3(1, 0, 0);
    // console.log(pos.x)
    function createScene() {
  
      //console.log(pos);
      // 新しいシーンオブジェクトを作成
      const scene = new BABYLON.Scene(engine);
      //scene.debugLayer.show();
      
      var obj_mat ={};
      var map ={}; //object for multiple key presses
      var space ={};
      var k=-1;
      //let hamburger = "<?php echo $php_string; ?>";
      
      //キー入力を受け付ける宣言
      //キー入力があるたびに、map変数の値がセットされる
      scene.actionManager = new BABYLON.ActionManager(scene);
      scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {								
      map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown"; 
      }));

      scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {								
      map[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
      }));
      var distance = 0.005;
  
      // カメラを追加
      // const camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 15, 0), scene);
      // camera.attachControl(canvas, true);

      //FPS視点カメラ
      const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,20,-10),scene);
      camera.attachControl(canvas, true);

  
      // 照明を追加
      //const light = new BABYLON.HemisphericLight();
      const light = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);
      light.diffuse = new BABYLON.Color3(1, 1, 1);
      light.specular = new BABYLON.Color3(1, 1, 1); // スペキュラカラー
      light.groundColor = new BABYLON.Color3(0.8, 0.8, 0.8); // 地面のカラー
      light.intensity = 1; // ライトの強度

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

      //赤色のマテリアル
      // var red = new BABYLON.StandardMaterial("red", scene);
      // red.diffuseColor = new BABYLON.Color3(1, 0, 0);

    console.log(jsArray1);
    console.log(jsArray1.length);
    //console.log(jsArray[0][0]);
    //console.log('./Models/'+jsArray[0][0]);



    BABYLON.SceneLoader.ImportMesh("","https://raw.githubusercontent.com/TaigaYamabe/GLB_data/main/","classroom_window.glb", scene, 
    //BABYLON.SceneLoader.ImportMesh("","./Models/", "lab.glb", scene, 
    function (meshes) {
      console.log(meshes.length);
      for(var i =0; i<meshes.length; i++){
        meshes[i].name = "space";
      }
      const mesh = meshes[0];
      //mesh.name = "space";
      mesh.position = new BABYLON.Vector3(0, 0, 0);
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
        loadedMeshes[i][0].position = new BABYLON.Vector3(0, 0, 0);
        loadedMeshes[i][0].rotation = new BABYLON.Vector3(0, 0, 0);
      }else{
        //loadedMeshes[i][0].name="object"
        loadedMeshes[i][0].scaling = new BABYLON.Vector3(-10, 10, 10);
        loadedMeshes[i][0].position = new BABYLON.Vector3(0, 20, 0);
        obj = loadedMeshes[i][0];
      }
      }
      for(var m =0; m<scene.meshes.length; m++){
        scene.meshes[m].rotation = new BABYLON.Vector3(0, 0, 0);
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
      }
      console.log(csvArray);
      document.getElementById("csvArray").value = JSON.stringify(csvArray);
    });
      //クリックイベント検出
      window.addEventListener("click", function () {
      // pickでポインタ情報を取得する
      var pickResult = scene.pick(scene.pointerX, scene.pointerY);
      // もしクリックが壁にhitした場合、ぶつかった画像の位置を更新する
      if(pickResult.pickedMesh.name != "space"){

        if (pickResult.hit) {
          obj.material = obj_mat;
          obj =pickResult.pickedMesh;
          obj_mat = obj.material;
        }
      }
      //キーボード入力
      scene.registerAfterRender(function() {	
        if(obj.name != "space"){
        //"a"または"A"を押し続けている間、if文を実行
        if((map["a"] || map["A"])){
           obj.translate(BABYLON.Axis.X, -2*distance, BABYLON.Space.WORLD);
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
          obj.dispose()
        }

        for(var n =0; n<csvArray.length; n++){
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
      return scene;
    }
  
    const scene = createScene();

    
   
    engine.runRenderLoop(() => {
      scene.render();
    });
    
  
    window.addEventListener("resize", () => {
      engine.resize();
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
  }
  
  window.addEventListener("DOMContentLoaded", main);