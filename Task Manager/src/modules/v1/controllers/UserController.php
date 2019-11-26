<?php

namespace app\modules\v1\controllers;

use Yii;
use yii\base\InvalidConfigException;
use yii\base\UserException;
use yii\data\ActiveDataProvider;
use yii\db\Exception;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\Cors;
use yii\rest\ActiveController;
use yii\rest\OptionsAction;
use yii\web\NotFoundHttpException;
use yii\filters\VerbFilter;
use app\models\User;

class UserController extends ActiveController
{
    /**
     * @var User $modelClass
     */
    public $modelClass = User::class;
    public $enableCsrfValidation = false;

    public function behaviors()
    {
        $behaviors = parent::behaviors();
//        $behaviors['authenticator'] = [
//            'class' => HttpBearerAuth::class,
//            'except' => ['login', 'create', 'index']
//        ];
        $behaviors['verbs'] = [
            'class' => VerbFilter::class,
            'actions' => [
                'index' => ['GET'],
                'create' => ['POST'],
                'delete' => ['POST'],
            ],
        ];
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
        unset($actions['index'], $actions['update'], $actions['create'], $actions['delete'], $actions['view']);
        $actions['options'] = ['class' => OptionsAction::class];
        return $actions;
    }

    public function login($data)
    {
        $model = $this->findByUsernameOrEmail($data['username']);

        if ($model && $model->validatePassword($data['password'])) {
            $model->setScenario($this->modelClass::SCENARIO_LOGIN);
            return $model;
        }
        throw new UserException('Login or password incorrect');
    }

    public function actionIndex()
    {
        $modelClass = $this->modelClass;
        $query = $modelClass::find();
        return new ActiveDataProvider([
            'query' => $query,
        ]);
    }

    public function actionCreate()
    {
        $data = Yii::$app->getRequest()->getBodyParams();

        if (isset($data['login'])) {
            return $this->login($data);
        }

        /**
         * @var User $model
         */
        $model = new $this->modelClass();
        $model->load($data, '');
        $model->setPassword($model->password);
        $model->generateAccessToken();
        if (!$model->validate() || !$model->save()) {
            throw new UserException(array_values($model->getFirstErrors())[0]);
        }
        unset($model->password);
        return $model;
    }

    public function actionUpdate($id)
    {
        $data = Yii::$app->getRequest()->getBodyParams();
        $model = $this->findModel($id);

        if (!$model) {
            throw new UserException('User not found');
        }

        $currentPassword = $data['currentPassword'] ?? null;
        if ($currentPassword && !$model->validatePassword($currentPassword)) {
            throw new UserException('Current password incorrect');
        }

        $model->load($data, '');
        if ($currentPassword) {
            $model->setPassword($model->password);
        }

        if (!$model->validate() || !$model->save()) {
            throw new UserException(array_values($model->getFirstErrors())[0]);
        }
        return $model;
    }

    public function actionDelete($id)
    {
        return $this->findModel($id)->delete();
    }

    public function actionView($id)
    {
        return $this->findModel($id);
    }

    protected function findModel($id)
    {
        $modelClass = $this->modelClass;
        if (($model = $modelClass::findOne($id)) !== null) {
            return $model;
        }

        throw new NotFoundHttpException('Login or password incorrect');
    }

    protected function findByUsernameOrEmail($usernameEmail)
    {
        $modelClass = $this->modelClass;

        if ($model = $modelClass::findByUsernameOrEmail($usernameEmail)) {
            return $model;
        }

        throw new NotFoundHttpException('Login or password incorrect');
    }
}