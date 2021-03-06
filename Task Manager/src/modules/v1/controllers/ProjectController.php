<?php

namespace app\modules\v1\controllers;

use app\modules\models\Projects;
use yii\data\ActiveDataProvider;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\rest\OptionsAction;

class ProjectController extends ActiveController
{
    public $modelClass = Projects::class;

    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();

        $behaviors['corsFilter'] = [
            'class' => Cors::class,
            'cors' => [
                // restrict access to domains:
                'Origin' => ['*'],
                'Access-Control-Request-Method' => ['POST', 'GET', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
                'Access-Control-Allow-Credentials' => false,
                'Access-Control-Request-Headers' => ['*'],
                'Access-Control-Max-Age' => 3600,                 // Cache (seconds)
                'Access-Control-Expose-Headers' => ['*'],
                'Access-Control-Allow-Origin' => ['*'],

            ],
        ];
        return $behaviors;
    }

    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        $actions['options'] = ['class' => OptionsAction::class];
        return $actions;
    }

    //host/v1/projects?filter={"creator_id":2}
    //host/v1/projects

    public function actionIndex($filter = null)
    {
        $filter = json_decode($filter, true);

        if ($filter) {

            $query = Projects::find()
                ->andWhere($filter);
            return new ActiveDataProvider([
                'query' => $query,
            ]);
        }

        return new ActiveDataProvider([
            'query' => Projects::find()
        ]);
    }
}