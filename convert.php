<?php
/**
 * @param $file_name
 * @return bool
 */
function convert($file_name) {
    if(file_exists($file_name)){
        $content=file_get_contents($file_name);
        $name=basename($file_name);
        $preencoded=[
            "content"=>$content,
            "name"=>$name
        ];
        $encoded=json_encode($preencoded);
       return file_put_contents($file_name.".json",$encoded);
    }
    return false;
}
 if($argc>1){
    $files=array_slice($argv,1);
    ob_start();
    array_map(function ($file){
        echo $file,var_dump(convert($file)),"\n";
    },$files);
    $content=ob_get_contents();
    ob_end_clean();
    echo $content;
 }