<?php
header("Content-type:text/html;charset=utf-8");
$file_name = $_GET['name'];
$file_name = iconv("utf-8", "gb2312", $file_name);
$file_sub_path = $_SERVER['DOCUMENT_ROOT'] . "/ISDN/downfile/";

$file_path = $file_sub_path . $file_name;
if (!file_exists($file_path)) {
	echo "没有该文件文件";
	return;
}
$fp = fopen($file_path, "r");
$file_size = filesize($file_path);
Header("Content-type: application/octet-stream");
Header("Accept-Ranges: bytes");
Header("Accept-Length:" . $file_size);
Header("Content-Disposition: attachment; filename=" . $file_name);
$buffer = 1024;
$file_count = 0;
while (!feof($fp) && $file_count < $file_size) {
	$file_con = fread($fp, $buffer);
	$file_count += $buffer;
	echo $file_con;
}
fclose($fp);
exit ;
?>
