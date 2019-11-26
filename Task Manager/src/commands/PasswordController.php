<?php

declare(strict_types=1);

namespace app\commands;

use app\models\User;
use yii\console\Controller;

class PasswordController extends Controller
{
    public function actionIndex($id, $password)
    {
        $user = User::findOne($id);
        if ($user) {
            $user->setPassword($password);
            $user->save();
        }
    }
}