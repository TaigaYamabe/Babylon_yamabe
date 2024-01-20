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
    <!-- <form method="post" action="http://localhost/index2.php" enctype="multipart/form-data" id="form">
        <input type="file" name="file2">
        <button type="button" id="submit-button">3Dモデルアップロード</button> 
    </form> -->
    <canvas id="renderCanvas"></canvas>
</header>
    <!-- Babylon.jsとSceneLoaderの読み込み-->
    <script src="https://preview.babylonjs.com/babylon.js"></script>
    <script src="https://preview.babylonjs.com/loaders/babylonjs.loaders.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- これから作成するscript.jsの読み込み-->
    <!-- <script type="text/javascript" src=js/script.js></script> -->
    <script type="text/javascript" src=js/colyseus.js></script>
</body>
</html>