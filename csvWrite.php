<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $csvArrayJSON = $_POST["csvArray"];
    $csvArray = json_decode($csvArrayJSON, true);
    //echo($csvArray[0]);
    // $jsArray に JavaScript からの配列が格納されます
    // ここで $jsArray を使用して PHP 処理を行う
}

$csvpath = './Metaverse_Babylon/csv/';
// CSVファイルのパスを指定します
$csvFilePath = $csvpath.'csvArray.csv';
// CSVファイルを書き込みモードでオープンします

//追記
//$fileHandle = fopen($csvFilePath, 'a');

//リセットして書き込み
$fileHandle = fopen($csvFilePath, 'w');

// 書き込むデータの例（配列として表現）
// $data = array(
//     //array($filename),
//     $csvArray
// );

$twoDimArray = array(
    array("データ1-1", "データ1-2", "データ1-3"),
    array("データ2-1", "データ2-2", "データ2-3"),
    // 他のデータ行
);

// データをCSVファイルに書き込みます
foreach ($csvArray as $row) {
    fputcsv($fileHandle, $row);
    //fwrite($fileHandle, $row);
}

// ファイルハンドルを閉じます
fclose($fileHandle);
?>
<?php
	header("Location:index.php");
?>