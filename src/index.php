<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,DELETE,PUT');
header("Access-Control-Allow-Headers: Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
use movie\Controller\MovieController;
use service\Helper\DBConnector;

include ("loader.php");

$controller = new MovieController();

$controller->switcher($_SERVER['REQUEST_METHOD'],$_SERVER['REQUEST_URI']);



