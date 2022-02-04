<?php

namespace service\Helper;
use PDO;
use PDOException;

class DBConnector
{

    /** @var mixed $db */
    private $db;
    /**
     * @var \PDO $connection
     */
    private $connection;

    public function __construct( )
    {
        $this->db="movieDB";
    }

    /**
     * @throws \Exception
     * @return void
     */
    public function connect() : void
    {
        $servername = "localhost";
        $username = "root";
        $password = "1895Th1895!";


        $sql ="";
        try {
            $conn = new PDO("mysql:host=$servername", $username, $password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $sql = "CREATE DATABASE IF NOT EXISTS ". $this->db;
            $conn->exec($sql);
            $sql = "use ". $this->db;
            $conn->exec($sql);
            $sql = "
use movieDB;
           create table if not exists movie_info(
           id integer auto_increment primary key ,
           name nvarchar(100) not null ,
           yearOfCreation integer not null ,
           poster nvarchar(1000) NOT NULL,
           description TEXT not null
)";
            $conn->exec($sql);
            $this->connection=$conn;
        }
        catch(PDOException $e)
        {
            throw new PDOException();
        }
    }

    /**
     * @param string $query
     * @return bool
     */
    public function execQuery(string $query) : bool
    {
        try {
            $this->connection->exec($query);
        } catch(PDOException $e) {
//            echo "user not found"."<br>" ;
            $this->exceptionHandler($e->getMessage());
            return false;
        }
        return true;
    }

    /**
     * @param string $message
     * @throws \Exception
     * @return void
     */
    private function exceptionHandler(string $message): void
    {
        echo $message();
    }

    /**
     * @return \PDO
     */
    public function getConnection(): \PDO
    {
        return $this->connection;
    }

    /**
     * @param \PDO $connection
     */
    public function setConnection(\PDO $connection): void
    {
        $this->connection = $connection;
    }


}