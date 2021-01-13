<?php
error_reporting(0);
require_once("vendor/autoload.php");

\Tinify\setKey("cybXb9kFgW2NqgSKN3LMH5Frg7ftGNfk");
// 允许上传的图片后缀
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".",$_FILES["file"]["name"]);
$dir_fa = dirname(__FILE__)."/article_img";
$dir_son = $dir_fa . "/" . $_POST["UserId"];
$true_name = $_POST["article_img"];
// echo $_FILES["file"]["size"];
$extension = end($temp);     // 获取文件后缀名
if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& ($_FILES["file"]["size"] < 4194304)   // 小于 4M
&& in_array($extension, $allowedExts))
{
    if ($_FILES["file"]["error"] > 0)
    {
        //echo "错误：: " . $_FILES["file"]["error"] . "<br>";
        $json = array("code"=>"201","path"=>NULL);
        echo json_encode($json);
        return;
    }
    else
    {
        //echo "上传文件名: " . $_FILES["file"]["name"] . "<br>";
        //echo "文件类型: " . $_FILES["file"]["type"] . "<br>";
        //echo "文件大小: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
        //echo "文件临时存储的位置: " . $_FILES["file"]["tmp_name"] . "<br>";
        if(is_dir($dir_son)){
            //echo "文件夹已存在";
        }
        else{
            $res=mkdir(iconv("UTF-8", "GBK", $dir_son),0777,true);
            if ($res){
                //echo "目录 $dir_son 创建成功";
            }else{
                //echo "目录 $dir_son 创建失败";
            }
        }
        $true_pos = $dir_son . "/" . $true_name;
        $true_pos3 = $dir_son . "/" . $_FILES["file"]["name"];
        // 判断当前目录是否存在该文件
        if (file_exists($true_pos))
        {
            //echo $_FILES["file"]["name"] . " 文件已经存在。 ";
            unlink($true_pos);
            //unlink($true_pos3);
            $if_success = move_uploaded_file($_FILES["file"]["tmp_name"], $true_pos);
            //echo $if_success;
        }
        else
        {
            // 如果目录不存在该文件则将文件上传到目录下
            $if_success = move_uploaded_file($_FILES["file"]["tmp_name"], $true_pos);
            //echo $if_success;
            
        }
        //$source = \Tinify\fromFile($true_pos3);
        //$source->toFile($true_pos);
        //unlink($true_pos3);
        $true_pos2 = "article_img"."/".$_POST["UserId"]."/".$true_name;
        //echo "文件存储在: " . $true_pos2;
        $json = array("code"=>"200","path"=>$true_pos2);
        echo json_encode($json);
        return;
    }
}
else
{   
    $json = array("code"=>"201","path"=>$true_pos2);
    unlink($true_pos);
    echo json_encode($json);
    return;
    //echo "非法的文件格式";
}
?>