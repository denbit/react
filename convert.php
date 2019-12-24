<?php
/**
 * @param $file_name
 *
 * @return bool
 */
function convert(string $file_name): string
{
	if (file_exists($file_name)) {
		$content = file_get_contents($file_name);
		$name = basename($file_name);
		$preencoded = [
			"content" => $content ,
			"name"    => $name,
		];
		$encoded = json_encode($preencoded);

		return file_put_contents(__DIR__."/src/".$name.".json" , $encoded);
	} else {
		$name = basename($file_name);
		$preencoded = [
			"content" => "" ,
			"name"    => $name,
		];
		$encoded = json_encode($preencoded);

		return file_put_contents(__DIR__."/src/".$name.".json" , $encoded);
	}
}

ob_start();
$file_addon = __DIR__."/src/templates/";
$func = fn (string $file): int => (print $file.' '.convert($file)
	." bytes written "."\n");
if ($argc > 1) {
	$files = array_slice($argv , 1);
	array_walk($files , fn (string $file): string => $file_addon.$file);
	array_map($func , $files);
} else {
	$it = new FilesystemIterator($file_addon ,
		FilesystemIterator::CURRENT_AS_PATHNAME
		| FilesystemIterator::SKIP_DOTS);
	array_map($func , iterator_to_array($it));
}
$content = ob_get_contents();
ob_end_clean();
echo $content;