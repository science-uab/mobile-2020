
<?php
	$target_dir = "./media/";
	$file = basename($_FILES["poza"]["name"]);
	$target_file = $target_dir . basename($_FILES["poza"]["name"]);

	// $target_file numele pozei <img src="http://localhost/media/$target_file" />

	if (move_uploaded_file($_FILES["poza"]["tmp_name"], $target_file)) {


		$conn = mysqli_connect("localhost","root","","testing");
		$sql = "INSERT INTO tbl_images (name) VALUES ('$file')";
		$ceva = mysqli_query($conn, $sql);

	    die("OK");
	} else {
	    echo "Sorry, there was an error uploading your file.";
	}
?>
