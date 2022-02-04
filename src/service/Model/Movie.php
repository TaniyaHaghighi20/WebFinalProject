<?php
namespace movie\Model;
class Movie
{
private $name;
private $yearOfCreation;
private $poster;
private $description;

    /**
     * @param $name
     * @param $yearOfCreation
     * @param $poster
     * @param $description
     */
    public function __construct($name, $yearOfCreation, $poster, $description)
    {
        $this->name = $name;
        $this->yearOfCreation = $yearOfCreation;
        $this->poster = $poster;
        $this->description = $description;
    }


    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param mixed $name
     */
    public function setName($name)
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getYearOfCreation()
    {
        return $this->yearOfCreation;
    }

    /**
     * @param mixed $yearOfCreation
     */
    public function setYearOfCreation($yearOfCreation)
    {
        $this->yearOfCreation = $yearOfCreation;
    }

    /**
     * @return mixed
     */
    public function getPoster()
    {
        return $this->poster;
    }

    /**
     * @param mixed $poster
     */
    public function setPoster($poster)
    {
        $this->poster = $poster;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param mixed $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }


}