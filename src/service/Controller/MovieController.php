<?php

namespace movie\Controller;

use movie\Helper\MovieHelper;
use movie\Model\Actions;
use movie\Model\Movie;

class MovieController
{
    public function switcher($uri,$request)
    {
        switch ($uri)
        {
            case Actions::CREATE:
                $this->createAction($request);
                break;
            case Actions::UPDATE:
                $this->updateAction($request);
                break;
            case Actions::DELETE:
                $this->deleteAction($request);
                break;
            case Actions::READ_ALL:
                $this->readAllAction($request);
                break;
            default:
                break;
        }
    }

    public function createAction($request)
    {
        $_POST = json_decode(file_get_contents("php://input"),true);
        $arr = $_POST["movie"];

        $name=$arr['name'];
        $poster= $arr['poster'];
        $year= $arr['year'];
        $desc= $arr['desc'];

        $movie = new Movie($name,$year,$poster,$desc);
        $movieHelper= new MovieHelper();
        $movieHelper->insert($movie);
    }

    public function readAllAction($request)
    {
             $movieHelper= new MovieHelper();
            if (str_contains($request,"?")){
                $ind=strpos($request, "=",  0);
                $search=substr($request,$ind+1);
                $movieHelper->fetch($search);
            }else{
                $movieHelper->fetchAll();
            }
    }

    public function updateAction($request)
    {
        $_POST = json_decode(file_get_contents("php://input"),true);
        $arr = $_POST["movie"];

        $name=$arr['editName'];
        $poster= $arr['editPoster'];
        $year= $arr['editYear'];
        $desc= $arr['editDesc'];
        $id=$arr['editId'];

        $movie = new Movie($name,$year,$poster,$desc);
        $movieHelper= new MovieHelper();
        $movieHelper->update($movie,$id);
    }

    private function deleteAction($request)
    {
        $movieHelper= new MovieHelper();
        $id = basename($request);
        $movieHelper->delete($id);
    }


}