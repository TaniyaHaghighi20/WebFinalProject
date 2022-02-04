<?php

namespace movie\Helper;

use movie\model\Movie;
use PDO;
use service\Helper\DBConnector;

class MovieHelper
{
    public function insert(Movie $movie)
    {

        $name= trim($movie->getName());
        $poster= trim($movie->getPoster());
        $year= trim($movie->getYearOfCreation());
        $desc= trim($movie->getDescription());
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare(
                "
                        insert into movie_info(
                     name,yearOfCreation,poster,description
                    )values ('$name',$year,'$poster','$desc');
"
            );
            $sth->execute();
        }catch (\PDOException $exception){
            http_response_code(400);
            echo $exception->getMessage();
        }
    }

    public function fetch(String $search)
    {
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare("
            select * from movie_info where name='$search' or yearOfCreation='$search';");
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['phpResult'=>$result]);

        }catch (\PDOException $exception){
            http_response_code(503);
            echo $exception->getMessage();
        }


    }

    public function fetchAll()
    {
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare("
                                       select * from movie_info");
            $sth->execute();
            $result = $sth->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode(['phpResult'=>$result]);

        }catch (\PDOException $exception){
            http_response_code(503);
            echo $exception->getMessage();
        }
    }
    public function update(Movie $movie,$id)
    {
        $name= trim($movie->getName());
        $poster= trim($movie->getPoster());
        $year= trim($movie->getYearOfCreation());
        $desc= trim($movie->getDescription());
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare(" 
            
            UPDATE movie_info
            SET name='$name',yearOfCreation=$year,poster='$poster',description='$desc'
             where id=$id;
        ");
            $sth->execute();
        }catch (\PDOException $exception){
            http_response_code(400);
            echo $exception->getMessage();
        }
    }

    public function delete($id)
    {
        try {
            $connection = new DBConnector();
            $connection->connect();
            $conn=$connection->getConnection();
            $sth=$conn->prepare("
delete from movie_info where id='$id'");
            $sth->execute();
        }catch (\PDOException $exception){
            http_response_code(503);
            echo $exception->getMessage();
        }
    }

}