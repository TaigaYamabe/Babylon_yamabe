<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Scene</title>
    <style>
        html, body {
            overflow: scroll;
            width   : 100%;
            height  : 100%;
            margin  : 0;
            padding : 0;
        }

        #renderCanvas {
            overflow: scroll;
            width   : 100%;
            height  : 100%;
            touch-action: none;
        }
    </style>
</head>
<body>
<header id="header">
    <!-- 
    actionはindex.phpのWeb アクセス用 URL
    -->
    <form enctype="multipart/form-data"  action="upload.php" method="POST">
        <input type="file" name="file1" value="value" />
        <input type="submit" value="アップロード" />
    </form>


    <!-- <form enctype="multipart/form-data"  action="index.php" method="POST">
        <input type="file" name="file2" value="value" />
        <input type="submit" value="空間アップロード" />
    </form> -->

    <form action="csvWrite.php" method="post" id="myForm">
        <input type="hidden" name="csvArray" id="csvArray" value="">
        <input type="submit" value="保存">
    </form>
    <!-- <button id="playButton">再生</button>
    <button id="pauseButton">一時停止</button> -->
    <div>
        <label for="textInput">Name: </label>
        <input type="text" id="textInput">
    </div>
    <!-- <video width="640" height="360" controls>
    <source src="Metaverse_Babylon/movie/sea.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video> -->
    <div id="custom-controls">
            <button id="play-pause">Play</button>
            <input id="seek-bar" type="range" value="0">
            <button id="mute">Unmute</button>
            <input id="volume-bar" type="range" value="100">
    </div>
    <!-- <video id="sampleVideo">
	<source src="Metaverse_Babylon/movie/授業サンプル.mp4">
    </video> -->
    <!-- <form method="post" action="http://localhost/index2.php" enctype="multipart/form-data" id="form">
        <input type="file" name="file2">
        <button type="button" id="submit-button">3Dモデルアップロード</button> 
    </form> -->
    <!-- Babylon.jsのビデオテクスチャ用のHTML要素 -->
    <video id="video" autoplay loop crossorigin="anonymous" style="display:none"></video>
    <canvas id="renderCanvas"></canvas>
</header>
    <script>
//         const form1 = document.getElementById("form1")
//         const form2 = document.getElementById("form2")
//         const submitButton1 = document.getElementById("submit-button1")
//         const submitButton2 = document.getElementById("submit-button2")

// submitButton1.onclick = () => {
//   const formData = new FormData(form1)
//   const action = form1.getAttribute("action")
//   const options = {
//     method: 'POST',
//     body: formData,
//   }
//   fetch(action, options).then((e) => {
//   })
// }
// submitButton2.onclick = () => {
//   const formData = new FormData(form2)
//   const action = form2.getAttribute("action")
//   const options = {
//     method: 'POST',
//     body: formData,
//   }
//   fetch(action, options).then((e) => {
//   })
// }

    </script>

    <!-- Babylon.jsとSceneLoaderの読み込み-->
    <script src="https://preview.babylonjs.com/babylon.js"></script>
    <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
    <script src="https://cdn.babylonjs.com/gui/babylon.gui.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- これから作成するscript.jsの読み込み-->
 
    <?php
// CSVファイルのパス
$csvFilePath1 = './Metaverse_Babylon/csv/filename.csv';

// 配列でデータを保持するための変数
$phpArray1 = array();

// CSVファイルを読み込む
if (($handle = fopen($csvFilePath1, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        // CSVの各行を配列に変換して追加
        $phpArray1[] = $data;
    }
    fclose($handle);
}

$csvFilePath2 = './Metaverse_Babylon/csv/csvArray.csv';

// 配列でデータを保持するための変数
$phpArray2 = array();

// CSVファイルを読み込む
if (($handle = fopen($csvFilePath2, "r")) !== FALSE) {
    while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
        // CSVの各行を配列に変換して追加
        $phpArray2[] = $data;
    }
    fclose($handle);
}
?>

<script>
var jsArray1 = <?php echo json_encode($phpArray1); ?>;
var jsArray2 = <?php echo json_encode($phpArray2); ?>;
</script>
    <!-- <script type="text/javascript" src=js/script.js></script> -->
    <script type="text/javascript" src=Metaverse_Babylon/js/webxr_iphone.js></script>
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/s-SqVc3IkmI" frameborder="0" allowfullscreen></iframe> -->
    <!-- <iframe width="560" height="315" src="https://www.youtube.com/embed/s-SqVc3IkmI?si=09dC32DjRPCX4cWC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> -->
</body>
</html>