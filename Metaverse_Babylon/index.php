<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>sample</title>
</head>
<body>
<p><?php
// ファイルへのパス
date_default_timezone_set('Asia/Tokyo');
$path = './Models/';
// ファイルがアップロードされているかと、POST通信でアップロードされたかを確認
if( !empty($_FILES['file1']['tmp_name']) && is_uploaded_file($_FILES['file1']['tmp_name']) ) {
	// ファイルを指定したパスへ保存する
	$name = $_FILES['file1']['name'];
	$filename = date("YmdHis").$name;
	//if( move_uploaded_file( $_FILES['file1']['tmp_name'], $path."upload.glb") ) {
	if( move_uploaded_file( $_FILES['file1']['tmp_name'], $path.$filename) ) {
		echo 'アップロードされたファイルを保存しました。';
		$csvpath = './csv/';
		// CSVファイルのパスを指定します
		$csvFilePath = $csvpath.'filename.csv';
		// CSVファイルを書き込みモードでオープンします
		$fileHandle = fopen($csvFilePath, 'a');

		// 書き込むデータの例（配列として表現）
		$data = array(
			array($filename),
		);

		// データをCSVファイルに書き込みます
		foreach ($data as $row) {
			fputcsv($fileHandle, $row);
		}

		// ファイルハンドルを閉じます
		fclose($fileHandle);

		echo 'CSVファイルが作成されました: ' . $csvFilePath;
	} else {
		echo 'アップロードされたファイルの保存に失敗しました。';
	}
}
if( !empty($_FILES['file2']['tmp_name']) && is_uploaded_file($_FILES['file2']['tmp_name']) ) {
	// ファイルを指定したパスへ保存する
	$name = $_FILES['file2']['name'];
	$filename = date("YmdHis").$name;
	if( move_uploaded_file( $_FILES['file2']['tmp_name'], $path.$filename) ) {
		echo 'アップロードされたファイルを保存しました。';
		$csvpath = './csv/';
		// CSVファイルのパスを指定します
		$csvFilePath = $csvpath.'filename.csv';
		// CSVファイルを書き込みモードでオープンします
		$fileHandle = fopen($csvFilePath, 'a');

		// 書き込むデータの例（配列として表現）
		$data = array(
			array($filename, 'space'),
		);

		// データをCSVファイルに書き込みます
		foreach ($data as $row) {
			fputcsv($fileHandle, $row);
		}

		// ファイルハンドルを閉じます
		fclose($fileHandle);

		echo 'CSVファイルが作成されました: ' . $csvFilePath;

	} else {
		echo 'アップロードされたファイルの保存に失敗しました。';
	}
}
?></p>
<?php
	header("Location:Babylon_yamabe.php");
?>
</body>
</html>