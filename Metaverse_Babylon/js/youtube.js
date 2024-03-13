// // YouTube APIを使用して動画情報を取得する関数
// function getYouTubeVideoInfo(videoId, apiKey, callback) {
//     var apiUrl = 'https://www.googleapis.com/youtube/v3/videos';
//     var params = {
//         id: videoId,
//         key: apiKey,
//         part: 'snippet,contentDetails'
//     };

//     $.getJSON(apiUrl, params, function (data) {
//         if (data.items.length > 0) {
//             var videoInfo = data.items[0];
//             callback(videoInfo);
//         } else {
//             console.error('Error retrieving YouTube video information.');
//         }
//     });
// }
// const canvas = document.getElementById("renderCanvas");
// const engine = new BABYLON.Engine(canvas, true);
// // Babylon.jsのシーンを作成
// var scene = new BABYLON.Scene(engine);
// const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0,0,-10),scene);
//     camera.attachControl(canvas, true);
// // YouTube動画のIDとAPIキーを指定
// var videoId = 's-SqVc3IkmI';
// var apiKey = 'AIzaSyBnMokrSNU2jojg37Buzd6tCaQkgpJvawc';

// // YouTube動画情報を取得してビデオテクスチャを作成
// getYouTubeVideoInfo(videoId, apiKey, function (videoInfo) {
//     var videoUrl = 'https://www.youtube.com/watch?v=' + videoId;

//     // ビデオテクスチャを作成
//     var videoTexture = new BABYLON.VideoTexture("video", videoUrl, scene, true, false);

//     // ビデオテクスチャを適用したマテリアルを作成
//     var material = new BABYLON.StandardMaterial("material", scene);
//     material.diffuseTexture = videoTexture;

//     // プレーンを作成してビデオテクスチャを適用
//     var plane = BABYLON.MeshBuilder.CreatePlane("plane", { width: 16, height: 9 }, scene);
//     plane.material = material;

//     // カメラ、ライト等の必要なものを追加

//     // レンダリングループを開始
//     engine.runRenderLoop(function () {
//         scene.render();
//     });
// });

// const canvas = document.getElementById("renderCanvas");
// const engine = new BABYLON.Engine(canvas, true);
// // Babylon.jsシーンの作成
// var scene = new BABYLON.Scene(engine);

// // YouTube埋め込みコードの取得
// var youtubeEmbedCode = document.querySelector('iframe').outerHTML;

// // 3Dオブジェクトの作成
// var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 2 }, scene);

// // マテリアルにビデオテクスチャを適用
// var material = new BABYLON.StandardMaterial("videoMaterial", scene);
// material.emissiveTexture = new BABYLON.Texture(youtubeEmbedCode, scene);
// sphere.material = material;

// // カメラの設定
// var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1, -5), scene);
// camera.setTarget(BABYLON.Vector3.Zero());

// // ライトの追加
// var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

// // レンダリングループの開始
// engine.runRenderLoop(function () {
//     scene.render();
// });




var canvas = document.getElementById("renderCanvas");
        var engine = new BABYLON.Engine(canvas, true);

        var scene = new BABYLON.Scene(engine);
// カメラの設定
var camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 1, -5), scene);
camera.setTarget(BABYLON.Vector3.Zero());
        // カメラやライト、メッシュなどのコードは省略

        // ビデオテクスチャを作成
        var videoTexture = new BABYLON.VideoTexture("video", "https://o365tsukuba-my.sharepoint.com/personal/s2320806_u_tsukuba_ac_jp/_layouts/15/stream.aspx?id=%2Fpersonal%2Fs2320806%5Fu%5Ftsukuba%5Fac%5Fjp%2FDocuments%2F%E3%83%A1%E3%82%BF%E3%83%90%E3%83%BC%E3%82%B9%E6%95%99%E5%AE%A4%E3%83%87%E3%83%A2%E8%AA%AC%E6%98%8E%E5%8B%95%E7%94%BB%5F20240222%2Emp4&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview", scene);

        // プレーンメッシュにビデオテクスチャを適用
        var plane = BABYLON.Mesh.CreatePlane("plane", 5, scene);
        plane.material = new BABYLON.StandardMaterial("planeMaterial", scene);
        plane.material.diffuseTexture = videoTexture;

        // ビデオ再生開始
        // videoTexture.video.play();

        engine.runRenderLoop(function () {
            scene.render();
        });

        window.addEventListener("resize", function () {
            engine.resize();
        });