<?php
try{
     require_once "../dump/db_conn.php";
     $query = "SELECT * FROM names WHERE name = ?";
     $stmt = $db->prepare($query);
     $stmt->bindParam(1, $_GET['data']);
     $stmt->execute();
     $toJSON = [];
     while($assoc = $stmt->fetch(PDO::FETCH_ASSOC)){
          $toJSON = $assoc;
     }
     echo json_encode($toJSON);


}catch(PDOException $e){
     echo $e;
}