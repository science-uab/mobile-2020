<?php
  error_reporting(0);
  $connect = mysqli_connect("localhost", "root", "", "testing");
  $query = "SELECT * FROM tbl_images";
  $result = mysqli_query($connect, $query);

 	$output = '<table>';

  while($row = mysqli_fetch_array($result)) {
   $output .= '<tr>
     <td>'.$row[name].'</td>
     <td>
	 <a href="/media/'.$row[name].'">
      <img src="/media/'.$row[name].'" height="60px" width="75px" class="imgc" />
	  </a>
    </tr>
   ';
  }

  $output .= '</table>';

die($output);
?>
